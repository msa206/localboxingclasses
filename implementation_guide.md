# Build Brief for Claude Code — **localboxingclasses.com**

> **Non-negotiables (read first):**
>
> * **Do NOT create any database schema, migrations, RPCs, or SQL.** The database work will be handled outside this repo.
> * You **may read** from Supabase (Postgres) in build time (SSG) and at request time (SSR for ZIP search) using the **existing** tables/RPCs described below.
> * **No gym detail pages** in MVP. Only card lists and external links.
> * **Canonical domain:** `https://localboxingclasses.com` on every route.

---

## 1) Goals & Scope

* Nationwide directory of **boxing classes near the user**.
* Users can browse by **state → city** and **search by ZIP**.
* MVP excludes individual gym pages; cards link to **Website** and **Google Maps**.
* **Brand:** Black & Red; bold, athletic, clean.

---

## 2) Tech Stack & Project Setup

* **Framework:** Next.js 15 (App Router) + **TypeScript**.
* **Styling:** Tailwind CSS v4.
* **Data:** Supabase (Postgres + PostGIS) — **reads only** (DB objects already exist).
* **Deploy:** Vercel. Use **Edge runtime** where feasible for `/classes` (ZIP search).
* **Env vars (no secrets committed):**

  ```
  NEXT_PUBLIC_SITE_URL=https://localboxingclasses.com
  SUPABASE_URL=...
  SUPABASE_ANON_KEY=...          # read-only in browser/server
  SUPABASE_SERVICE_ROLE=...      # server-only at build time (never sent to client)
  ```

---

## 3) Pages, Routes, Rendering

* `/` **(SSG)** — Hero with ZIP input (5-digit mask), radius select (10/25/50 mi), featured states/cities.
* `/states` **(SSG)** — Grid of states with gym counts.
* `/states/[state]` **(SSG + ISR 24h)** — Intro section + **card list** of gyms in state + top cities.
* `/states/[state]/[city]` **(SSG + ISR 24h)** — **card list** of gyms in city.
* `/classes` **(SSR, Edge if possible)** — **Search results by ZIP** via Supabase query: `?zip=33101&radius=25&page=1`.
* `/sitemap.xml` **(SSG)** — States + cities (no per-gym URLs).
* `/robots.txt` **(SSG)**.

> **No** `/gyms/[slug]` in MVP.

---

## 4) Expected Data (read-only) — for wiring only

> These objects already exist; **do not implement or modify DB**.

* **Tables (fields available for selects):**

  * `public.gyms`
    `id, name, site, phone_number, full_address, street, city, state, postal_code, review_count, review_stars, working_hours, latitude, longitude, source_url`
  * `public.zips`
    `zip, city, state, latitude, longitude`

* **RPC used by ZIP search (already implemented):**

  * `public.gyms_near_zip(p_zip text, p_radius_mi int, p_limit int, p_offset int)` → rows with:
    `id, name, site, phone_number, full_address, city, state, postal_code, review_count, review_stars, latitude, longitude, source_url, distance_mi`

> If an RPC is unavailable at build time for state/city pages, do a simple **grouped select** via Supabase from `gyms` to compute counts and lists (server/build only).

---

## 5) SEO & Canonical

* **Canonical domain:** set **`metadataBase`** to `https://localboxingclasses.com` and add `<link rel="canonical">` for each route.
* **Redirect:** add a host redirect from `www.localboxingclasses.com` → apex.
* **Titles:**

  * Home: `Find Boxing Classes Near You | Local Boxing Classes`
  * State: `Boxing Classes in [State] | Local Boxing Classes`
  * City: `Boxing Classes in [City], [State] | Local Boxing Classes`
  * ZIP results: `Boxing Classes Near [ZIP] | Local Boxing Classes`
* **Descriptions:** 150–160 chars; emphasize proximity, beginners/kids/women options.
* **Structured Data:** `ItemList` JSON-LD on **listing** pages only (states/cities/ZIP search). Limit to first 100 items per page to keep payload light.
* **Sitemap:** States + cities only (no gym pages).

---

## 6) Brand & UI

* **Colors:**

  * Black `#0B0B0B` (bg)
  * Fight Red `#E11D2E` (accent)
  * Off-White `#F8F8F8` (text on dark)
  * Slate `#1F2937` (muted)
* **Fonts:** Inter or Manrope (400/600/800).
* **Core components:** `Header`, `Footer`, `ZipSearchBar`, `GymCard`, `Filters (radius)`, `EmptyState`, `Pagination`, `Breadcrumbs`.
* **GymCard content:** name, stars (if any), address, phone; buttons: **Call**, **Website**, **Google Maps**.

---

## 7) Code Tasks for Claude Code

### 7.1 Global App Shell & Canonical

* `app/layout.tsx`

  * Configure Tailwind and set CSS vars for colors.
  * Export `metadata` with `metadataBase: new URL('https://localboxingclasses.com')`.
  * In `<head>`, include canonical tag using the current path.

* `next.config.ts`

  * Add redirect from `www.localboxingclasses.com` to apex.

  ```ts
  export default {
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'www.localboxingclasses.com' }],
          destination: 'https://localboxingclasses.com/:path*',
          permanent: true,
        },
      ];
    },
  };
  ```

### 7.2 Supabase Clients (read-only)

* `lib/supabase-server.ts` — server/build client (Node or Edge), **never** expose service role to browser.
* `lib/supabase-client.ts` — browser/SSR client with **anon** key.

### 7.3 Home `/` (SSG)

* Hero with ZIP form (mask `^\d{5}$`), radius select (10/25/50).
* Featured states/cities:

  * Build-time fetch from Supabase and cache as static props **or** read from a small local JSON snapshot generated at build.
* Submit navigates to `/classes?zip=XXXXX&radius=YY`.

### 7.4 States `/states` (SSG)

* Build-time fetch of states and counts from `gyms`. Render grid linking to `/states/[state]`.

### 7.5 State `/states/[state]` (SSG + ISR 24h)

* `generateStaticParams()` from the states list.
* Build-time fetch: gyms for the state and top cities with counts.
* Render **card list** (paginated if large).

### 7.6 City `/states/[state]/[city]` (SSG + ISR 24h)

* `generateStaticParams()` using per-state city lists.
* Build-time fetch: gyms for that city. Render **card list**.

### 7.7 ZIP Search `/classes` (SSR)

* **Do not create any DB objects.** Assume RPC `gyms_near_zip` exists.
* Use **Edge runtime** if compatible:

  ```ts
  export const runtime = 'edge';
  export const dynamic = 'force-dynamic';
  ```
* Read `zip`, `radius` (default 25), `page` from query.
* Call Supabase RPC `gyms_near_zip` with pagination.
* Render **GymCard** list sorted by proximity; prev/next pagination links.

### 7.8 JSON-LD (`ItemList`) helper

* Create a utility that receives an array of gyms and emits JSON-LD for list pages (cap 100). Include `name`, `addressLocality/Region`, `telephone` if present, and `sameAs` pointing to `source_url`.

### 7.9 Sitemaps & Robots

* `app/sitemap.ts` — output states and cities URLs only.
* `app/robots.ts` — allow all; set sitemap to `https://localboxingclasses.com/sitemap.xml`.

### 7.10 Tailwind theme

* Define CSS variables in `globals.css`:

  ```css
  :root{
    --bg:#0B0B0B; --accent:#E11D2E; --text:#F8F8F8; --muted:#1F2937;
  }
  html,body{ background:var(--bg); color:var(--text); }
  ```
* Apply accessible contrast (white text on red chips/buttons).

---

## 8) Example Stubs (wire-up only; no DB creation)

**ZIP Results SSR page** `app/classes/page.tsx`

```tsx
import { createClient } from '@supabase/supabase-js';
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Q = { zip?: string; radius?: string; page?: string };

export default async function ClassesPage({ searchParams }: { searchParams: Q }) {
  const zip = searchParams.zip ?? '';
  const radius = Math.max(1, Number(searchParams.radius ?? 25));
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = 50, offset = (page - 1) * limit;

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  const { data, error } = await supabase.rpc('gyms_near_zip', {
    p_zip: zip, p_radius_mi: radius, p_limit: limit, p_offset: offset
  });

  if (error) {
    return <main className="max-w-6xl mx-auto p-6"><h1 className="text-3xl font-bold">Search error</h1><p className="opacity-80">{error.message}</p></main>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold">Boxing Classes near {zip}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {data?.map((g:any)=>(
          <article key={g.id} className="rounded-2xl border border-[var(--accent)]/40 p-5">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{g.name}</h2>
              <span className="text-sm text-[var(--accent)]">{g.distance_mi} mi</span>
            </header>
            <p className="text-sm opacity-80">{g.full_address ?? `${g.city}, ${g.state} ${g.postal_code}`}</p>
            <div className="mt-2 text-sm opacity-80">
              {g.review_stars ? `${g.review_stars}★` : ''} {g.review_count ? `(${g.review_count})` : ''}
            </div>
            <div className="mt-3 flex gap-3 text-sm">
              {g.phone_number && <a href={`tel:${g.phone_number}`} className="underline">Call</a>}
              {g.site && <a href={g.site} target="_blank" className="underline">Website</a>}
              {g.source_url && <a href={g.source_url} target="_blank" className="underline">Google Maps</a>}
            </div>
          </article>
        ))}
      </div>
      {/* TODO: prev/next pagination with ?page= */}
    </main>
  );
}
```

**Canonical in layout** `app/layout.tsx`

```tsx
export const metadata = {
  metadataBase: new URL('https://localboxingclasses.com'),
  title: { default: 'Local Boxing Classes', template: '%s | Local Boxing Classes' },
  description: 'Find boxing classes near you by ZIP, or browse by state and city.',
};
```

---

## 9) QA Checklist

* No gym detail routes exist.
* All browse pages build statically and revalidate daily.
* `/classes` queries Supabase live and orders by proximity.
* Canonical points to `https://localboxingclasses.com` on every page.
* Host redirect from `www.` to apex works on Vercel.
* JSON-LD validates; Lighthouse green on mobile.

---
