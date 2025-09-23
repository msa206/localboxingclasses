import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import { getStates, getStateByAbbr, getGymsByCityAbbr, getCitiesByStateAbbr } from '@/lib/data'

export async function generateStaticParams() {
  const states = await getStates()
  const params: { st: string; city: string }[] = []

  for (const state of states) {
    const cities = await getCitiesByStateAbbr(state.abbr)
    for (const city of cities) {
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
    title: `Boxing Classes in ${cityData.name}, ${stateData.abbr.toUpperCase()}`,
    description: `Find ${cityData.count} boxing gyms and classes in ${cityData.name}, ${stateData.state}. Compare locations, read reviews, and find the perfect boxing gym.`,
  }
}

export default async function CityPage({ params }: { params: Promise<{ st: string; city: string }> }) {
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

  const gyms = await getGymsByCityAbbr(st, citySlug)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'States', href: '/states' },
          { label: stateData.state, href: `/${st}` },
          { label: cityData.name }
        ]} />

        <h1 className="text-4xl font-bold text-black mb-4">
          Boxing Classes in {cityData.name}, {stateData.abbr.toUpperCase()}
        </h1>
        <p className="text-gray-600 mb-8">
          {gyms.length} boxing gyms and classes in {cityData.name}
        </p>

        {/* Search by Category Section - Only show if city has more than 5 gyms */}
        {cityData.count > 5 && (
          <section className="mb-10 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-bold text-black mb-4">Search by Category</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${st}/${citySlug}/kids-boxing-classes`}
                className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-fight-red text-fight-red font-semibold rounded-lg hover:bg-fight-red hover:text-white transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Kids Boxing Classes
              </Link>
              <Link
                href={`/${st}/${citySlug}/boxing-gyms-with-free-trials`}
                className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-fight-red text-fight-red font-semibold rounded-lg hover:bg-fight-red hover:text-white transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free Trial Gyms
              </Link>
              <Link
                href={`/${st}/${citySlug}/boxing-classes-for-women`}
                className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-fight-red text-fight-red font-semibold rounded-lg hover:bg-fight-red hover:text-white transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Boxing Classes for Women
              </Link>
            </div>
          </section>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gyms.map((gym) => (
            <GymCard key={gym.id} {...gym} />
          ))}
        </div>

        {gyms.length > 0 && (
          <div className="mt-12 p-8 bg-gray-50 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-black mb-3">Looking for more options?</h2>
            <p className="text-gray-600 mb-6">Search for boxing gyms near your exact location</p>
            <Link
              href="/classes"
              className="inline-block px-8 py-4 bg-fight-red text-white font-bold rounded-xl hover:bg-fight-red/90 transition-all duration-300 hover:scale-105"
            >
              Search by ZIP Code
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}