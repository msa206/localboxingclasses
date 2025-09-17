import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import EmptyState from '@/components/EmptyState'
import { getStates, getStateBySlug, getCityBySlug, getGymsByCity, getCitiesByState } from '@/lib/data'

export async function generateStaticParams() {
  const states = await getStates()
  const params = []

  for (const state of states) {
    const cities = await getCitiesByState(state.slug)
    for (const city of cities) {
      params.push({
        state: state.slug,
        city: city.slug,
      })
    }
  }
  return params
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ state: string; city: string }>
}): Promise<Metadata> {
  const { state, city } = await params
  const stateData = await getStateBySlug(state)
  const cityData = await getCityBySlug(state, city)

  if (!stateData || !cityData) return {}

  return {
    title: `Boxing Classes in ${cityData.name}, ${stateData.state}`,
    description: `Discover ${cityData.count} boxing gyms and classes in ${cityData.name}, ${stateData.state}. Find the perfect boxing gym for beginners, kids, and experienced fighters.`,
  }
}

export default async function CityPage({
  params
}: {
  params: Promise<{ state: string; city: string }>
}) {
  const { state, city } = await params
  const stateData = await getStateBySlug(state)
  const cityData = await getCityBySlug(state, city)

  if (!stateData || !cityData) {
    notFound()
  }

  const gyms = await getGymsByCity(state, city)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'States', href: '/states' },
          { label: stateData.state, href: `/states/${state}` },
          { label: cityData.name }
        ]} />
        
        <h1 className="text-4xl font-bold text-black mb-4">
          Boxing Classes in {cityData.name}, {stateData.state}
        </h1>
        <p className="text-gray-600 mb-8">
          {cityData.count} boxing gyms and classes in {cityData.name}
        </p>
        
        <section>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gyms.length > 0 ? (
              gyms.map((gym) => (
                <GymCard key={gym.id} {...gym} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No gyms found"
                  description={`We couldn't find any boxing gyms in ${cityData.name} yet.`}
                  action={{
                    label: 'Browse all gyms in ' + stateData.state,
                    href: `/states/${state}`
                  }}
                />
              </div>
            )}
          </div>
        </section>
        
        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-2">Looking for more options?</h2>
          <p className="text-gray-600 mb-4">
            Try searching by ZIP code to find boxing gyms within a specific radius of your location.
          </p>
          <a
            href="/classes"
            className="inline-block px-6 py-3 bg-fight-red text-white font-bold rounded-lg hover:bg-fight-red/90 transition-colors"
          >
            Search by ZIP Code
          </a>
        </div>
      </div>
    </div>
  )
}