import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import EmptyState from '@/components/EmptyState'
import { generateItemListJsonLd, JsonLdScript } from '@/lib/json-ld'
import { getStateByAbbr, getCitiesByStateAbbr, getWomenClassesGyms } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Boxing Classes for Women in Houston, Texas',
  description: 'Discover women-focused boxing classes in Houston, TX. Empowering, supportive programs designed specifically for women.',
}

export default async function HoustonWomenBoxingPage() {
  const stateAbbr = 'tx'
  const citySlug = 'houston'

  // Get state data
  const stateData = await getStateByAbbr(stateAbbr)
  if (!stateData) {
    notFound()
  }

  // Get city data
  const cities = await getCitiesByStateAbbr(stateAbbr)
  const cityData = cities.find(c => c.slug === citySlug)
  if (!cityData) {
    notFound()
  }

  // Fetch gyms with women classes from database
  const gyms = await getWomenClassesGyms(cityData.name, stateData.abbr.toUpperCase())

  // Generate JSON-LD structured data
  const jsonLd = generateItemListJsonLd(
    gyms.map(gym => ({
      id: gym.id.toString(),
      name: gym.name,
      full_address: gym.full_address,
      city: gym.city,
      state: gym.state,
      postal_code: gym.postal_code,
      phone_number: gym.phone_number,
      source_url: gym.source_url,
      latitude: gym.latitude,
      longitude: gym.longitude,
    })),
    'Boxing Classes for Women in Houston, Texas'
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
          { label: 'Texas', href: '/tx' },
          { label: 'Houston', href: '/tx/houston' },
          { label: 'Boxing Classes for Women' }
        ]} />

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Boxing Classes for <span className="text-fight-red">Women</span> in Houston
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl">
            Discover empowering women-focused boxing programs in Houston. Join supportive communities where women train together, build strength, and develop confidence in Space City.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-fight-red mb-2">{gyms.length}</div>
              <div className="text-gray-600">Women-Focused Boxing Gyms</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-fight-red mb-2">100%</div>
              <div className="text-gray-600">Supportive Environment</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-3xl font-bold text-fight-red mb-2">All Levels</div>
              <div className="text-gray-600">Welcome</div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Why Choose Women's Boxing in Houston?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Empowerment</h3>
              <p className="text-gray-600 text-sm">
                Build physical and mental strength in a supportive, women-focused environment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Community</h3>
              <p className="text-gray-600 text-sm">
                Train alongside like-minded women who support and motivate each other.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Expert Training</h3>
              <p className="text-gray-600 text-sm">
                Learn from experienced female coaches who understand women's unique fitness goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fight-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-black">Self-Defense</h3>
              <p className="text-gray-600 text-sm">
                Learn practical self-defense skills while getting an amazing workout.
              </p>
            </div>
          </div>
        </div>

        {/* Gyms Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-black mb-8">
            {gyms.length > 0
              ? `${gyms.length} Women's Boxing Programs in Houston`
              : 'Boxing Classes for Women in Houston'
            }
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gyms.length > 0 ? (
              gyms.map((gym) => (
                <GymCard key={gym.id} {...gym} priorityTag="women" />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No women-focused boxing gyms found"
                  description="We couldn't find any boxing gyms with women-specific programs in Houston yet."
                  action={{
                    label: 'Browse all Houston gyms',
                    href: '/tx/houston'
                  }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-fight-red rounded-lg p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Boxing Journey?</h2>
          <p className="text-lg mb-6 opacity-90">
            Contact these Houston gyms directly to learn about their women's boxing programs. Many offer beginner-friendly classes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/classes"
              className="bg-white text-fight-red px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
            >
              Search More Gyms by ZIP
            </a>
            <a
              href="/tx/houston"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-fight-red transition-colors inline-block"
            >
              All Houston Gyms
            </a>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Getting Started with Women's Boxing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-black mb-4">What to Expect:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  Supportive, encouraging environment
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  Classes designed for all fitness levels
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  Focus on proper technique and safety
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  Full-body workout with cardio and strength
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Questions to Ask:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  Do you offer women-only classes?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  What's your approach to beginner training?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  Do you have female coaches available?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">•</span>
                  What equipment is provided vs. what should I bring?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}