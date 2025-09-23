import { MetadataRoute } from 'next'
import { getStates, getAllCities, stateAbbreviations } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://localboxingclasses.com'
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2025-09-21'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/states`,
      lastModified: new Date('2025-09-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Fetch real data from database
  const states = await getStates()
  const allCities = await getAllCities()

  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/${state.abbr.toLowerCase()}`,
    lastModified: new Date('2025-09-21'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const cityPages: MetadataRoute.Sitemap = []
  const categoryPages: MetadataRoute.Sitemap = []

  // Add city pages and category pages
  for (const city of allCities) {
    // Convert full state name to abbreviation
    const stateAbbr = stateAbbreviations[city.state]
    if (!stateAbbr) continue // Skip if state abbreviation not found

    // Add main city page
    cityPages.push({
      url: `${baseUrl}/${stateAbbr.toLowerCase()}/${city.slug}`,
      lastModified: new Date('2025-09-21'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })

    // Add category pages for cities with >5 gyms (matches button display logic)
    if (city.count > 5) {
      const categories = [
        'kids-boxing-classes',
        'boxing-classes-for-women',
        'boxing-gyms-with-free-trials'
      ]

      for (const category of categories) {
        categoryPages.push({
          url: `${baseUrl}/${stateAbbr.toLowerCase()}/${city.slug}/${category}`,
          lastModified: new Date('2025-09-21'),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        })
      }
    }
  }

  return [...staticPages, ...statePages, ...cityPages, ...categoryPages]
}