# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Local Boxing Classes is a Next.js 15 application that serves as a nationwide directory of boxing classes. It uses Supabase for data storage (read-only) and is deployed to Vercel with Edge runtime optimization.

## Key Commands

```bash
# Development
npm run dev         # Start development server at http://localhost:3000

# Build & Production
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint

# Testing
# No test framework currently configured
```

## Architecture & Data Flow

### Data Access Pattern
- **Read-only Supabase integration** - No database writes or schema modifications
- Two Supabase clients:
  - `lib/supabase-server.ts` - Server/build-time client (can use service role)
  - `lib/supabase-client.ts` - Browser/SSR client (anon key only)

### Rendering Strategy
- **SSG (Static Generation)**: Home, states, state/city pages - built at compile time
- **ISR (Incremental Static Regeneration)**: State/city pages - revalidate every 24 hours
- **SSR (Server-Side Rendering)**: ZIP search results - Edge runtime for performance

### Database Schema (Read-Only)
```sql
-- Existing tables (DO NOT modify)
public.gyms: id, name, site, phone_number, full_address, street, city, state, postal_code, review_count, review_stars, working_hours, latitude, longitude, source_url

public.zips: zip, city, state, latitude, longitude

-- RPC for proximity search
public.gyms_near_zip(p_zip text, p_radius_mi int, p_limit int, p_offset int)
```

## Important Constraints

1. **No Database Modifications**: Never create schema, migrations, RPCs, or SQL. All database objects exist already.
2. **No Individual Gym Pages**: MVP excludes `/gyms/[slug]` routes - only list views with external links.
3. **Canonical Domain**: Always use `https://localboxingclasses.com` as the canonical URL.
4. **Edge Runtime**: Use Edge runtime for `/classes` (ZIP search) for better performance.
5. **Environment Variables**: Never commit secrets. Required vars:
   - `NEXT_PUBLIC_SITE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE` (server-only)

## Route Structure

```
/                           # SSG - Hero with ZIP search
/states                     # SSG - Grid of states with gym counts
/states/[state]            # SSG + ISR 24h - State gym listings
/states/[state]/[city]     # SSG + ISR 24h - City gym listings
/classes?zip=&radius=      # SSR Edge - ZIP proximity search results
/sitemap.xml               # SSG - States + cities only
/robots.txt                # SSG
```

## Component Architecture

Core components in `/components`:
- `Header` / `Footer` - Global navigation
- `ZipSearchBar` - ZIP input with radius selection
- `GymCard` - Displays gym info with Call/Website/Maps links
- `Pagination` - Query-based pagination
- `Breadcrumbs` - Navigation hierarchy
- `EmptyState` - No results handling
- `JsonLdScript` - Structured data wrapper

## SEO Implementation

- **Metadata**: Set in `app/layout.tsx` with `metadataBase`
- **Canonical URLs**: Implemented via metadata base
- **JSON-LD**: ItemList schema on listing pages (capped at 100 items)
- **Sitemap**: Generated at build time, excludes individual gym pages
- **Host Redirect**: www → apex domain configured in `next.config.ts`

## Brand Guidelines

```css
--bg: #0B0B0B;      /* Black background */
--accent: #E11D2E;  /* Fight Red accent */
--text: #F8F8F8;    /* Off-white text */
--muted: #1F2937;   /* Slate for secondary text */
```

## Development Notes

- Mock data available in `lib/mock-data.ts` for development without Supabase
- JSON-LD helper in `lib/json-ld.ts` for structured data generation
- All styling uses Tailwind CSS v4 with CSS variables
- TypeScript strict mode enabled
- Path alias `@/*` configured for absolute imports