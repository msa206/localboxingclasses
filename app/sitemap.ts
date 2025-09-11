import { MetadataRoute } from 'next'
import { statesData, citiesByState } from '@/lib/mock-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://localboxingclasses.com'
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/states`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/classes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]
  
  const statePages: MetadataRoute.Sitemap = statesData.map((state) => ({
    url: `${baseUrl}/states/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  const cityPages: MetadataRoute.Sitemap = []
  for (const [stateSlug, cities] of Object.entries(citiesByState)) {
    for (const city of cities) {
      cityPages.push({
        url: `${baseUrl}/states/${stateSlug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    }
  }
  
  return [...staticPages, ...statePages, ...cityPages]
}