import { supabaseClient } from '@/lib/supabase-client'

export type Gym = {
  id: number
  name: string
  site: string | null
  phone_number: string | null
  full_address: string
  street: string | null
  city: string
  state: string
  postal_code: string | null
  review_count: number | null
  review_stars: number | null
  working_hours: string | null
  latitude: number | null
  longitude: number | null
  source_url: string | null
  distance_mi?: number
  offers_kids?: boolean | null
  offers_kickboxing?: boolean | null
  offers_free_trial?: boolean | null
  beginner_friendly?: boolean | null
  women_focused?: boolean | null
}

export type StateData = {
  state: string
  abbr: string
  slug: string
  count: number
}

export type CityData = {
  name: string
  slug: string
  count: number
  state: string
  stateSlug: string
}

function stateNameToSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-')
}

function cityNameToSlug(cityName: string): string {
  return cityName.toLowerCase().replace(/\s+/g, '-')
}

export const stateAbbreviations: Record<string, string> = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
  'District of Columbia': 'DC', 'DC': 'DC'
}

// Reverse mapping: abbreviation to full name
const abbreviationToState: Record<string, string> = Object.entries(stateAbbreviations).reduce(
  (acc, [name, abbr]) => ({ ...acc, [abbr]: name }),
  {}
)

export async function getStates(): Promise<StateData[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('state')
      .not('state', 'is', null)

    if (error) {
      console.error('Error fetching states:', error)
      return []
    }

    const stateCounts = data.reduce((acc, gym) => {
      const stateAbbr = gym.state
      if (stateAbbr) {
        acc[stateAbbr] = (acc[stateAbbr] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    return Object.entries(stateCounts)
      .map(([stateAbbr, count]) => {
        const fullStateName = abbreviationToState[stateAbbr] || stateAbbr
        return {
          state: fullStateName,
          abbr: stateAbbr,
          slug: stateNameToSlug(fullStateName),
          count
        }
      })
      .sort((a, b) => a.state.localeCompare(b.state))
  } catch (error) {
    console.error('Error in getStates:', error)
    return []
  }
}

export async function getGymsByState(stateSlug: string): Promise<Gym[]> {
  try {
    const stateName = Object.keys(stateAbbreviations).find(
      state => stateNameToSlug(state) === stateSlug
    )

    if (!stateName) {
      return []
    }

    const stateAbbr = stateAbbreviations[stateName]

    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('state', stateAbbr)
      .order('city', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching gyms by state:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getGymsByState:', error)
    return []
  }
}

export async function getGymsByCity(stateSlug: string, citySlug: string): Promise<Gym[]> {
  try {
    const stateName = Object.keys(stateAbbreviations).find(
      state => stateNameToSlug(state) === stateSlug
    )

    if (!stateName) {
      return []
    }

    const stateAbbr = stateAbbreviations[stateName]

    const { data: allCityGyms, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('state', stateAbbr)

    if (error) {
      console.error('Error fetching gyms by city:', error)
      return []
    }

    const cityGyms = allCityGyms?.filter(gym =>
      cityNameToSlug(gym.city) === citySlug
    ) || []

    return cityGyms.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  } catch (error) {
    console.error('Error in getGymsByCity:', error)
    return []
  }
}

export async function getKidsBoxingGyms(city: string, state: string): Promise<Gym[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('city', city)
      .eq('state', state)
      .eq('offers_kids', true)
      .order('review_stars', { ascending: false, nullsFirst: false })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching kids boxing gyms:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getKidsBoxingGyms:', error)
    return []
  }
}

export async function getFreeTrialGyms(city: string, state: string): Promise<Gym[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('city', city)
      .eq('state', state)
      .eq('offers_free_trial', true)
      .order('review_stars', { ascending: false, nullsFirst: false })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching free trial gyms:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getFreeTrialGyms:', error)
    return []
  }
}

export async function getWomenClassesGyms(city: string, state: string): Promise<Gym[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('city', city)
      .eq('state', state)
      .eq('women_focused', true)
      .order('review_stars', { ascending: false, nullsFirst: false })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching women classes gyms:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getWomenClassesGyms:', error)
    return []
  }
}

export async function getCitiesByState(stateSlug: string): Promise<CityData[]> {
  try {
    const stateName = Object.keys(stateAbbreviations).find(
      state => stateNameToSlug(state) === stateSlug
    )

    if (!stateName) {
      return []
    }

    const stateAbbr = stateAbbreviations[stateName]

    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('city')
      .eq('state', stateAbbr)
      .not('city', 'is', null)

    if (error) {
      console.error('Error fetching cities by state:', error)
      return []
    }

    const cityCounts = data.reduce((acc, gym) => {
      const city = gym.city
      if (city) {
        acc[city] = (acc[city] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    return Object.entries(cityCounts)
      .map(([city, count]) => ({
        name: city,
        slug: cityNameToSlug(city),
        count,
        state: stateName,
        stateSlug
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  } catch (error) {
    console.error('Error in getCitiesByState:', error)
    return []
  }
}

export async function searchGymsByZip(
  zip: string,
  radiusMiles: number = 25,
  limit: number = 50,
  offset: number = 0
): Promise<{ gyms: Gym[], total: number }> {
  try {
    const { data, error } = await supabaseClient
      .rpc('lbc_gyms_near_zip', {
        p_zip: zip,
        p_radius_mi: radiusMiles,
        p_limit: limit,
        p_offset: offset
      })

    if (error) {
      console.error('Error searching gyms by ZIP:', error)
      return { gyms: [], total: 0 }
    }

    // Transform the data to match our Gym type
    // The RPC returns postal_code as bigint, but we need it as string
    const gyms: Gym[] = (data || []).map((gym: any) => ({
      ...gym,
      postal_code: gym.postal_code ? String(gym.postal_code) : null,
      review_count: gym.review_count ? Number(gym.review_count) : null,
      working_hours: gym.working_hours ? JSON.stringify(gym.working_hours) : null
    }))

    // Since RPC doesn't support count, we'll estimate based on returned results
    const total = gyms.length === limit ? gyms.length * 2 : gyms.length

    return {
      gyms,
      total
    }
  } catch (error) {
    console.error('Error in searchGymsByZip:', error)
    return { gyms: [], total: 0 }
  }
}

export async function getAllCities(): Promise<CityData[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('city, state')
      .not('city', 'is', null)
      .not('state', 'is', null)

    if (error) {
      console.error('Error fetching all cities:', error)
      return []
    }

    // Group cities by state and count gyms per city
    const stateGroups = data.reduce((acc, gym) => {
      const stateAbbr = gym.state
      if (!acc[stateAbbr]) {
        acc[stateAbbr] = {}
      }
      const city = gym.city
      acc[stateAbbr][city] = (acc[stateAbbr][city] || 0) + 1
      return acc
    }, {} as Record<string, Record<string, number>>)

    const allCities: CityData[] = []

    // For each state, get only the top 10 cities (matching generateStaticParams behavior)
    for (const [stateAbbr, cities] of Object.entries(stateGroups)) {
      const fullStateName = abbreviationToState[stateAbbr] || stateAbbr

      const stateCities = Object.entries(cities)
        .map(([city, count]) => ({
          name: city,
          slug: cityNameToSlug(city),
          count,
          state: fullStateName,
          stateSlug: stateNameToSlug(fullStateName)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10) // Only top 10 cities per state

      allCities.push(...stateCities)
    }

    return allCities.sort((a, b) => b.count - a.count)
  } catch (error) {
    console.error('Error in getAllCities:', error)
    return []
  }
}

export async function getStateBySlug(stateSlug: string): Promise<StateData | null> {
  const states = await getStates()
  return states.find(s => s.slug === stateSlug) || null
}

export async function getStateByAbbr(stateAbbr: string): Promise<StateData | null> {
  const states = await getStates()
  return states.find(s => s.abbr.toLowerCase() === stateAbbr.toLowerCase()) || null
}

export async function getCityBySlug(stateSlug: string, citySlug: string): Promise<CityData | null> {
  const cities = await getCitiesByState(stateSlug)
  return cities.find(c => c.slug === citySlug) || null
}

export async function getGymsByStateAbbr(stateAbbr: string): Promise<Gym[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('state', stateAbbr.toUpperCase())
      .order('city', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching gyms by state abbr:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getGymsByStateAbbr:', error)
    return []
  }
}

export async function getCitiesByStateAbbr(stateAbbr: string): Promise<CityData[]> {
  try {
    const { data, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('city')
      .eq('state', stateAbbr.toUpperCase())
      .not('city', 'is', null)

    if (error) {
      console.error('Error fetching cities by state abbr:', error)
      return []
    }

    const cityCounts = data.reduce((acc, gym) => {
      const city = gym.city
      if (city) {
        acc[city] = (acc[city] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    const stateName = abbreviationToState[stateAbbr.toUpperCase()] || stateAbbr

    return Object.entries(cityCounts)
      .map(([city, count]) => ({
        name: city,
        slug: cityNameToSlug(city),
        count,
        state: stateName,
        stateSlug: stateNameToSlug(stateName)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  } catch (error) {
    console.error('Error in getCitiesByStateAbbr:', error)
    return []
  }
}

export async function getGymsByCityAbbr(stateAbbr: string, citySlug: string): Promise<Gym[]> {
  try {
    const { data: allCityGyms, error } = await supabaseClient
      .from('lbc_boxing_gyms')
      .select('*')
      .eq('state', stateAbbr.toUpperCase())

    if (error) {
      console.error('Error fetching gyms by city:', error)
      return []
    }

    const cityGyms = allCityGyms?.filter(gym =>
      cityNameToSlug(gym.city) === citySlug
    ) || []

    return cityGyms.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  } catch (error) {
    console.error('Error in getGymsByCityAbbr:', error)
    return []
  }
}