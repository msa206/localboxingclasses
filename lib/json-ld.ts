interface GymData {
  id: string
  name: string
  full_address?: string
  city?: string
  state?: string
  postal_code?: string
  phone_number?: string
  source_url?: string
  latitude?: number
  longitude?: number
}

export function generateItemListJsonLd(
  gyms: GymData[],
  listName: string,
  maxItems: number = 100
) {
  const items = gyms.slice(0, maxItems).map((gym, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "LocalBusiness",
      "@id": `https://localboxingclasses.com/gym/${gym.id}`,
      "name": gym.name,
      "address": gym.full_address ? {
        "@type": "PostalAddress",
        "streetAddress": gym.full_address.split(',')[0],
        "addressLocality": gym.city,
        "addressRegion": gym.state,
        "postalCode": gym.postal_code,
      } : undefined,
      "telephone": gym.phone_number,
      "sameAs": gym.source_url,
      "geo": gym.latitude && gym.longitude ? {
        "@type": "GeoCoordinates",
        "latitude": gym.latitude,
        "longitude": gym.longitude,
      } : undefined,
    }
  }))

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "numberOfItems": items.length,
    "itemListElement": items,
  }
}

export function JsonLdScript({ data }: { data: any }) {
  const scriptContent = JSON.stringify(data)
  return scriptContent
}