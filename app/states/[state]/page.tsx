import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import { statesData, mockGyms, citiesByState } from '@/lib/mock-data'

export async function generateStaticParams() {
  return statesData.map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params
  const stateData = statesData.find(s => s.slug === state)
  if (!stateData) return {}
  
  return {
    title: `Boxing Classes in ${stateData.state}`,
    description: `Find ${stateData.count} boxing gyms and classes in ${stateData.state}. Browse by city or view all locations.`,
  }
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params
  const stateData = statesData.find(s => s.slug === state)
  
  if (!stateData) {
    notFound()
  }
  
  const cities = citiesByState[state] || []
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'States', href: '/states' },
        { label: stateData.state }
      ]} />
      
      <h1 className="text-4xl font-bold text-off-white mb-4">
        Boxing Classes in {stateData.state}
      </h1>
      <p className="text-slate-muted mb-8">
        {stateData.count} boxing gyms and classes across {stateData.state}
      </p>
      
      {cities.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-off-white mb-6">Top Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/states/${state}/${city.slug}`}
                className="p-4 bg-fight-black/50 border border-slate-muted/30 rounded-lg hover:border-fight-red hover:text-fight-red transition-colors text-center"
              >
                <div className="font-semibold text-off-white">{city.name}</div>
                <div className="text-sm text-slate-muted">{city.count} gyms</div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      <section>
        <h2 className="text-2xl font-bold text-off-white mb-6">All Gyms in {stateData.state}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockGyms.map((gym) => (
            <GymCard key={gym.id} {...gym} />
          ))}
        </div>
      </section>
    </div>
  )
}