import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import EmptyState from '@/components/EmptyState'
import { statesData, mockGyms, citiesByState } from '@/lib/mock-data'

export async function generateStaticParams() {
  const params = []
  for (const [stateSlug, cities] of Object.entries(citiesByState)) {
    for (const city of cities) {
      params.push({
        state: stateSlug,
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
  const stateData = statesData.find(s => s.slug === state)
  const cities = citiesByState[state] || []
  const cityData = cities.find(c => c.slug === city)
  
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
  const stateData = statesData.find(s => s.slug === state)
  const cities = citiesByState[state] || []
  const cityData = cities.find(c => c.slug === city)
  
  if (!stateData || !cityData) {
    notFound()
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'States', href: '/states' },
        { label: stateData.state, href: `/states/${state}` },
        { label: cityData.name }
      ]} />
      
      <h1 className="text-4xl font-bold text-off-white mb-4">
        Boxing Classes in {cityData.name}, {stateData.state}
      </h1>
      <p className="text-slate-muted mb-8">
        {cityData.count} boxing gyms and classes in {cityData.name}
      </p>
      
      <section>
        <div className="grid gap-6 md:grid-cols-2">
          {mockGyms.length > 0 ? (
            mockGyms.map((gym) => (
              <GymCard key={gym.id} {...gym} />
            ))
          ) : (
            <div className="col-span-2">
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
      
      <div className="mt-12 p-6 bg-fight-black/50 border border-fight-red/20 rounded-lg">
        <h2 className="text-xl font-bold text-off-white mb-2">Looking for more options?</h2>
        <p className="text-slate-muted mb-4">
          Try searching by ZIP code to find boxing gyms within a specific radius of your location.
        </p>
        <a
          href="/classes"
          className="inline-block px-6 py-3 bg-fight-red text-off-white font-bold rounded-lg hover:bg-fight-red/80 transition-colors"
        >
          Search by ZIP Code
        </a>
      </div>
    </div>
  )
}