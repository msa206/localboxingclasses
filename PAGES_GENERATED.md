# Generated Pages Documentation

This document lists all pages that are built at runtime for the Local Boxing Classes website.

## Build Summary
- **Total Pages Generated**: 94
- **Generation Type**: Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- **Build Date**: Generated from latest build output

## Page Categories

### 1. Static Pages (○)
These pages are prerendered as static content:

```
○  /                                    - Homepage with ZIP search
○  /_not-found                         - 404 error page
○  /about                              - About Us page
○  /boxing-classes-for-women           - Women's boxing hub page
○  /cities                             - All cities directory
○  /free-trial-gyms                    - Free trial gyms hub page
○  /kids-boxing-classes                - Kids boxing hub page
○  /robots.txt                         - SEO robots file
○  /sitemap.xml                        - SEO sitemap
○  /states                             - All states directory
```

### 2. Hardcoded City Category Pages (○)
Legacy hardcoded pages for specific cities:

```
○  /ca/los-angeles/boxing-classes-for-women       - LA women's boxing
○  /ca/los-angeles/boxing-gyms-with-free-trials   - LA free trial gyms
○  /il/chicago/boxing-classes-for-women           - Chicago women's boxing
○  /il/chicago/boxing-gyms-with-free-trials       - Chicago free trial gyms
○  /nv/las-vegas/boxing-classes-for-women         - Vegas women's boxing
○  /nv/las-vegas/boxing-gyms-with-free-trials     - Vegas free trial gyms
○  /ny/new-york/boxing-classes-for-women          - NYC women's boxing
○  /ny/new-york/boxing-gyms-with-free-trials      - NYC free trial gyms
○  /tx/houston/boxing-classes-for-women           - Houston women's boxing
○  /tx/houston/boxing-gyms-with-free-trials       - Houston free trial gyms
```

### 3. Dynamic Server-Rendered Pages (ƒ)
These pages are server-rendered on demand:

```
ƒ  /classes                            - ZIP code search results (Edge runtime)
```

### 4. Static Site Generated Pages (●)
These pages use `generateStaticParams()` and are prerendered:

#### State Pages (10 total)
```
●  /[st]                               - State overview pages
   ├ /ca                               - California
   ├ /fl                               - Florida
   ├ /ga                               - Georgia
   ├ /il                               - Illinois
   ├ /ny                               - New York
   ├ /nv                               - Nevada
   ├ /oh                               - Ohio
   ├ /pa                               - Pennsylvania
   ├ /tx                               - Texas
   └ /va                               - Virginia
```

#### City Pages (42 total)
Main city pages for cities with the most gyms:

```
●  /[st]/[city]                        - City gym listings
   ├ /ca/los-angeles                   - Los Angeles, CA
   ├ /ca/stockton                      - Stockton, CA
   ├ /ca/fresno                        - Fresno, CA
   ├ /fl/jacksonville                  - Jacksonville, FL
   ├ /ga/atlanta                       - Atlanta, GA
   ├ /il/chicago                       - Chicago, IL
   ├ /ny/new-york                      - New York, NY
   ├ /nv/las-vegas                     - Las Vegas, NV
   ├ /oh/columbus                      - Columbus, OH
   ├ /pa/philadelphia                  - Philadelphia, PA
   ├ /tx/houston                       - Houston, TX
   ├ /va/virginia-beach                - Virginia Beach, VA
   └ [+30 more city pages]
```

#### Dynamic Category Pages (30 total)
These pages are generated for cities with more than 5 gyms:

```
●  /[st]/[city]/kids-boxing-classes    - Kids boxing for qualifying cities (10 cities)
   ├ /ca/los-angeles/kids-boxing-classes
   ├ /fl/jacksonville/kids-boxing-classes
   ├ /ga/atlanta/kids-boxing-classes
   ├ /il/chicago/kids-boxing-classes
   ├ /ny/new-york/kids-boxing-classes
   ├ /nv/las-vegas/kids-boxing-classes
   ├ /oh/columbus/kids-boxing-classes
   ├ /pa/philadelphia/kids-boxing-classes
   ├ /tx/houston/kids-boxing-classes
   └ /va/virginia-beach/kids-boxing-classes

●  /[st]/[city]/boxing-classes-for-women - Women's boxing for qualifying cities (10 cities)
   ├ /ca/los-angeles/boxing-classes-for-women
   ├ /fl/jacksonville/boxing-classes-for-women
   ├ /ga/atlanta/boxing-classes-for-women
   ├ /il/chicago/boxing-classes-for-women
   ├ /ny/new-york/boxing-classes-for-women
   ├ /nv/las-vegas/boxing-classes-for-women
   ├ /oh/columbus/boxing-classes-for-women
   ├ /pa/philadelphia/boxing-classes-for-women
   ├ /tx/houston/boxing-classes-for-women
   └ /va/virginia-beach/boxing-classes-for-women

●  /[st]/[city]/boxing-gyms-with-free-trials - Free trial gyms for qualifying cities (10 cities)
   ├ /ca/los-angeles/boxing-gyms-with-free-trials
   ├ /fl/jacksonville/boxing-gyms-with-free-trials
   ├ /ga/atlanta/boxing-gyms-with-free-trials
   ├ /il/chicago/boxing-gyms-with-free-trials
   ├ /ny/new-york/boxing-gyms-with-free-trials
   ├ /nv/las-vegas/boxing-gyms-with-free-trials
   ├ /oh/columbus/boxing-gyms-with-free-trials
   ├ /pa/philadelphia/boxing-gyms-with-free-trials
   ├ /tx/houston/boxing-gyms-with-free-trials
   └ /va/virginia-beach/boxing-gyms-with-free-trials
```

## Generation Logic

### Category Page Generation Rules
- **Kids Boxing Classes**: Generated for cities with >5 total gyms
- **Women's Boxing Classes**: Generated for cities with >5 total gyms
- **Free Trial Gyms**: Generated for cities with >5 total gyms

### Static Generation Strategy
- **Homepage, About, Hubs**: Static (○)
- **State/City Listings**: SSG with ISR 24h revalidation (●)
- **ZIP Search**: SSR with Edge runtime (ƒ)
- **Category Pages**: SSG for qualifying cities only (●)

## Bundle Sizes
- **First Load JS**: ~105-110 kB shared across all pages
- **Individual Pages**: 136 B - 1.02 kB per page
- **Total Build Output**: 148 optimized static pages

## SEO Features
- All static pages include proper metadata
- JSON-LD structured data on category pages
- Canonical URLs via metadata base
- Sitemap includes all static routes
- Breadcrumb navigation on all pages

---
*Generated from Next.js build output - Last updated: December 2024*