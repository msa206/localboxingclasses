import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import EmptyState from '@/components/EmptyState'
import { generateItemListJsonLd, JsonLdScript } from '@/lib/json-ld'
import { getStates, getStateByAbbr, getKidsBoxingGyms, getCitiesByStateAbbr } from '@/lib/data'

export async function generateStaticParams() {
  const states = await getStates()
  const params: { st: string; city: string }[] = []

  for (const state of states) {
    const cities = await getCitiesByStateAbbr(state.abbr)
    // Only generate for cities with more than 5 gyms (matches button display logic)
    const qualifyingCities = cities.filter(city => city.count > 5)
    for (const city of qualifyingCities) {
      params.push({
        st: state.abbr.toLowerCase(),
        city: city.slug,
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ st: string; city: string }> }): Promise<Metadata> {
  const { st, city: citySlug } = await params
  const stateData = await getStateByAbbr(st)
  const cities = await getCitiesByStateAbbr(st)
  const cityData = cities.find(c => c.slug === citySlug)

  if (!stateData || !cityData) return {}

  return {
    title: `Kids Boxing Classes in ${cityData.name}, ${stateData.abbr.toUpperCase()}`,
    description: `Find the best kids boxing classes in ${cityData.name}, ${stateData.state}. Safe, fun youth boxing programs for children of all ages and skill levels.`,
  }
}

export default async function KidsBoxingPage({ params }: { params: Promise<{ st: string; city: string }> }) {
  const { st, city: citySlug } = await params
  const stateData = await getStateByAbbr(st)

  if (!stateData) {
    notFound()
  }

  const cities = await getCitiesByStateAbbr(st)
  const cityData = cities.find(c => c.slug === citySlug)

  if (!cityData) {
    notFound()
  }

  // Fetch kids boxing gyms from database
  const gyms = await getKidsBoxingGyms(cityData.name, stateData.abbr.toUpperCase())

  // Generate JSON-LD structured data
  const jsonLd = generateItemListJsonLd(
    gyms.map(gym => ({
      id: gym.id.toString(),
      name: gym.name,
      full_address: gym.full_address,
      city: gym.city,
      state: gym.state,
      postal_code: gym.postal_code || undefined,
      phone_number: gym.phone_number || undefined,
      source_url: gym.source_url || undefined,
      latitude: gym.latitude || undefined,
      longitude: gym.longitude || undefined,
    })),
    `Kids Boxing Classes in ${cityData.name}, ${stateData.state}`
  )

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FFFFFF'}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JsonLdScript({ data: jsonLd })
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'States', href: '/states' },
          { label: stateData.state, href: `/${st}` },
          { label: cityData.name, href: `/${st}/${citySlug}` },
          { label: 'Kids Boxing Classes' }
        ]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Kids Boxing Classes in <span className="text-fight-red">{cityData.name}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl">
            Find safe and fun kids boxing classes in {cityData.name}. These gyms offer youth programs designed for children of all ages and skill levels.
          </p>
        </div>

        {/* Gyms Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-black mb-8">
            {gyms.length > 0
              ? `${gyms.length} Gyms Offering Kids Boxing Classes in ${cityData.name}`
              : `Kids Boxing Classes in ${cityData.name}`
            }
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gyms.length > 0 ? (
              gyms.map((gym) => (
                <GymCard key={gym.id} {...gym} priorityTag="kids" />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No kids boxing classes found"
                  description={`We couldn't find any gyms offering kids boxing classes in ${cityData.name} yet.`}
                  action={{
                    label: `Browse all ${cityData.name} gyms`,
                    href: `/${st}/${citySlug}`
                  }}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}