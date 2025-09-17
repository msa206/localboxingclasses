# URL Slug Navigation Map - Local Boxing Classes

## 📍 Complete URL Structure

```
https://localboxingclasses.com/
│
├── / (Homepage)
│   Page Order:
│   1. Hero Section with ZIP Search Bar (prominent)
│   2. Kids Boxing Classes CTA Button → /kids-boxing-classes
│   3. "Search Local Boxing Classes by State" section
│      - Grid of all states with gym counts
│      - Links to → /ca, /ny, /tx, etc.
│   4. "Search Popular Cities for Boxing Classes" section
│      - Top 20 cities prioritized (NY, Houston, Brooklyn, etc.)
│      - Links to → /ny/new-york, /ca/los-angeles, etc.
│      - "View All Cities" button → /cities
│
├── /states (Browse States Hub)
│   Page Order:
│   1. Breadcrumb: Home / States
│   2. "Boxing Classes by State" heading
│   3. Grid of all 50+ states with gym counts
│      Each state card shows:
│      - State name
│      - Number of gyms
│      - Links to → /[st] (e.g., /ca, /ny, /tx)
│
├── /[st] (Individual State Page - Dynamic)
│   Examples: /ca, /ny, /tx, /il, /fl
│   Page Order:
│   1. Breadcrumb: Home / States / [State Name]
│   2. "Boxing Classes in [State]" heading with total count
│   3. "Top Cities" section (up to 10 cities by gym count)
│      - Links to → /[st]/[city]
│   4. "All Gyms in [State]" section
│      - 4-column grid (XL), 3-column (LG), 2-column (MD)
│      - Each gym card shows:
│        * Name, Address, Phone, Website
│        * Star rating & review count
│        * External links (no individual gym pages)
│
├── /[st]/[city] (City-Specific Page - Dynamic)
│   Examples: /ca/los-angeles, /tx/houston, /ny/new-york
│   Page Order:
│   1. Breadcrumb: Home / States / [State] / [City]
│   2. "Boxing Classes in [City], [ST]" heading with count
│   3. "Search by Category" section
│      - Kids Boxing Classes button → /[st]/[city]/kids-boxing-classes
│      - Beginner Classes (Coming Soon - disabled)
│      - Women's Boxing (Coming Soon - disabled)
│   4. Gym cards grid (4 columns on XL screens)
│   5. "Looking for more options?" CTA → /classes
│
├── /[st]/[city]/kids-boxing-classes (Kids Boxing Facet - Dynamic)
│   Examples: /ca/los-angeles/kids-boxing-classes, /ny/new-york/kids-boxing-classes
│   Page Order:
│   1. Breadcrumb: Home / States / [State] / [City] / Kids Boxing Classes
│   2. "Kids Boxing Classes in [City], [ST]" heading
│   3. Benefits section (3 cards)
│   4. Kids-specific gym listings (filtered)
│   5. Information about youth boxing programs
│
├── /cities (All Cities Directory Hub)
│   Page Order:
│   1. Breadcrumb: Home / Cities
│   2. "Boxing Classes by City" heading
│   3. Statistics bar: Total Cities | Total Studios | States
│   4. Alphabet navigation (A-Z)
│   5. Cities grouped by letter, sorted by:
│      - Gym count (descending)
│      - Then alphabetically if counts match
│   Each city card links to → /[st]/[city]
│
├── /classes (ZIP Code Search)
│   Two states:
│
│   A. No ZIP parameter (/classes):
│      1. Breadcrumb: ZIP Search
│      2. "Search Boxing Classes by ZIP Code" heading
│      3. ZIP Search Bar with radius selector
│
│   B. With ZIP parameter (/classes?zip=90210&radius=25):
│      1. Breadcrumb: ZIP Search / Results for [ZIP]
│      2. "Boxing Classes near [ZIP]" heading
│      3. Results count and radius info
│      4. ZIP Search Bar (for new searches)
│      5. Gym cards with distance indicators
│      6. Pagination if > 50 results
│
├── /kids-boxing-classes (Kids Boxing Main Hub)
│   Page Order:
│   1. Breadcrumb: Kids Boxing Classes
│   2. Hero section "Kids Boxing Classes"
│   3. "Why Kids Boxing?" benefits section (3 cards)
│   4. "Find Kids Boxing Classes by City" section
│      - Currently LA only → /ca/los-angeles/kids-boxing-classes
│   5. "Programs for Every Age" section (4 age groups)
│   6. Black CTA section with ZIP search button
│
├── /sitemap.xml (Auto-generated)
│   Contains all states and cities
│
└── /robots.txt (SEO configuration)
```

## 🔗 Dynamic Route Patterns

### State Slugs (`/[st]`)
**Format**: lowercase state abbreviations
**Examples**:
- Single letter: `/ca`, `/tx`, `/fl`
- Two letters: `/ny`, `/il`, `/wa`
- Special: `/dc` (District of Columbia)

### City Slugs (`/[st]/[city]`)
**Format**: state abbr + city slug
**Examples**:
- `/ca/los-angeles`
- `/ca/san-francisco`
- `/ny/new-york`
- `/tx/san-antonio`
- `/il/chicago`

## 📊 Data Sources & Queries

| Route | Data Function | Supabase Query |
|-------|--------------|----------------|
| `/` | `getStates()`, `getAllCities()` | Fetches all states + cities |
| `/states` | `getStates()` | Groups gyms by state |
| `/[st]` | `getGymsByStateAbbr()`, `getCitiesByStateAbbr()` | Filters by state abbreviation |
| `/[st]/[city]` | `getGymsByCityAbbr()` | Filters by state + city |
| `/[st]/[city]/kids-boxing-classes` | `getKidsBoxingGyms()` | Filters for offers_kids = true |
| `/cities` | `getAllCities()` | All cities with counts |
| `/classes` | `searchGymsByZip()` | RPC: `lbc_gyms_near_zip` |

## 🎯 User Navigation Flows

### Flow 1: Geographic Browse
```
Home → States → /ca → /ca/los-angeles → View Gyms
```

### Flow 2: Direct City Access
```
Home → Cities → Find "Chicago" → /il/chicago → View Gyms
```

### Flow 3: ZIP Proximity Search
```
Home → Enter ZIP in Hero → Results with Distance → Call/Visit Gym
```

### Flow 4: Popular Cities Quick Access
```
Home → Click "Houston, TX" → /tx/houston → View Gyms
```

### Flow 5: Kids Boxing Discovery
```
Home → Kids Boxing Classes → /kids-boxing-classes → /ca/los-angeles/kids-boxing-classes → View Kids Programs
```

## 🔄 Rendering Methods

| Route Type | Method | Revalidation |
|------------|--------|--------------|
| Homepage | SSG | Build time |
| States hub | SSG | Build time |
| State pages (/[st]) | SSG + ISR | 24 hours |
| City pages (/[st]/[city]) | SSG + ISR | 24 hours |
| Kids facet | SSG + ISR | 24 hours |
| Cities hub | SSG | Build time |
| ZIP search | SSR (Edge) | On demand |
| Kids boxing | SSG | Build time |

## 📱 Responsive Grid Layouts

### Gym Card Grids
- **Mobile**: 1 column
- **Tablet (MD)**: 2 columns
- **Desktop (LG)**: 3 columns
- **Wide (XL)**: 4 columns

### State/City Selection Grids
- **States Page**: 4 columns (LG), 3 (MD), 2 (mobile)
- **Cities in State**: 5 columns (LG), 3 (MD), 2 (mobile)
- **Cities Directory**: 3 columns (LG), 2 (MD), 1 (mobile)

## 🚫 No Routes For

- Individual gym pages (`/gyms/[id]` does not exist) <--- this is okay because I dont want each gym to have their own page yet
- User accounts/login <----no plan for this
- Admin panel   <----no plan for this
- API routes (except Next.js internals)

## 🔍 Query Parameters

### `/classes` Search Parameters
- `zip` - 5-digit ZIP code (required for results)
- `radius` - Search radius in miles (1-100, default: 25)
- `page` - Pagination (default: 1)

Example: `/classes?zip=10001&radius=50&page=2`

## 📈 Database Integration

All data comes from Supabase `public.lbc_boxing_gyms` view:
- Read-only access
- Using anon key for security
- No direct database writes
- RPC function for ZIP proximity search

## 🏷️ Category Filters

City pages now include category search to filter gyms by specialization:

### Current Categories:
- **Kids Boxing Classes** - Active, links to `/[st]/[city]/kids-boxing-classes`

### Planned Categories (Coming Soon):
- **Beginner Classes** - For newcomers to boxing
- **Women's Boxing** - Female-focused programs
- **Competitive Boxing** - For amateur/pro fighters
- **Fitness Boxing** - Non-contact cardio workouts

## 🎨 URL Design Principles

1. **Short & Clean**: Use state abbreviations instead of full names
2. **Canonical**: Single URL per location (no `/states/california` and `/ca`)
3. **SEO Friendly**: ZIP landing pages for local search
4. **Faceted**: Kids boxing as sub-route of cities
5. **Hierarchical**: State → City → Facet structure

---

*Last Updated: September 2025*
*Total Routes: ~500+ (with all dynamic combinations)*