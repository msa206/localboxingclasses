import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import { getStates, getStateByAbbr, getKidsBoxingGyms, getCitiesByStateAbbr } from '@/lib/data'

export async function generateStaticParams() {
  // Generate params for major cities only to avoid too many pages
  const majorCities = [
    { st: 'ca', city: 'los-angeles' },
    { st: 'ny', city: 'new-york' },
    { st: 'il', city: 'chicago' },
    { st: 'tx', city: 'houston' },
    { st: 'ca', city: 'san-francisco' },
  ]
  return majorCities
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

  // Get kids boxing gyms
  const gyms = await getKidsBoxingGyms(cityData.name, st.toUpperCase())

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'States', href: '/states' },
          { label: stateData.state, href: `/${st}` },
          { label: cityData.name, href: `/${st}/${citySlug}` },
          { label: 'Kids Boxing Classes' }
        ]} />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Kids Boxing Classes in {cityData.name}, {stateData.abbr.toUpperCase()}
          </h1>
          <p className="text-gray-600 text-lg">
            Safe and fun youth boxing programs for children in {cityData.name}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-fight-red/10 p-6 rounded-xl">
            <h3 className="font-bold text-black mb-2">Build Confidence</h3>
            <p className="text-gray-600 text-sm">Boxing helps children develop self-confidence, discipline, and respect</p>
          </div>
          <div className="bg-fight-red/10 p-6 rounded-xl">
            <h3 className="font-bold text-black mb-2">Stay Active</h3>
            <p className="text-gray-600 text-sm">Fun workouts that improve fitness, coordination, and overall health</p>
          </div>
          <div className="bg-fight-red/10 p-6 rounded-xl">
            <h3 className="font-bold text-black mb-2">Learn Self-Defense</h3>
            <p className="text-gray-600 text-sm">Age-appropriate techniques in a safe, controlled environment</p>
          </div>
        </div>

        {gyms.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-black mb-6">
              {gyms.length} Kids Boxing Gyms in {cityData.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {gyms.map((gym) => (
                <GymCard key={gym.id} {...gym} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <h2 className="text-2xl font-bold text-black mb-3">No Kids Programs Listed</h2>
            <p className="text-gray-600 mb-6">
              We don't have specific kids boxing information for gyms in {cityData.name} yet.
              <br />Check out all boxing gyms in the area:
            </p>
            <Link
              href={`/${st}/${citySlug}`}
              className="inline-block px-6 py-3 bg-fight-red text-white font-bold rounded-lg hover:bg-fight-red/90 transition-colors"
            >
              View All {cityData.name} Boxing Gyms
            </Link>
          </div>
        )}

        {/* Information Section */}
        <div className="mt-12 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-black">About Kids Boxing in {cityData.name}</h2>
          <p className="text-gray-600">
            Youth boxing programs in {cityData.name} offer children aged 5-17 the opportunity to learn
            boxing fundamentals in a safe, structured environment. These programs focus on fitness,
            discipline, and fun rather than competition.
          </p>
          <h3 className="text-xl font-bold text-black mt-6">What to Expect</h3>
          <ul className="text-gray-600">
            <li>Age-appropriate training programs</li>
            <li>Certified youth boxing coaches</li>
            <li>Focus on technique and fitness over sparring</li>
            <li>Character development and anti-bullying skills</li>
            <li>Fun, engaging workouts designed for kids</li>
          </ul>
        </div>
      </div>
    </div>
  )
}