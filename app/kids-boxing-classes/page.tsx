import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getAllCities } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Kids Boxing Classes - Find Youth Boxing Programs Near You',
  description: 'Discover the best kids boxing classes and youth boxing programs across the United States. Safe, fun, and educational boxing training for children.',
}

export default async function KidsBoxingHub() {
  // Get all cities data
  const allCities = await getAllCities()

  // Starting with Los Angeles only for prototyping
  const priorityCities = [
    { name: 'Los Angeles', state: 'CA', slug: 'los-angeles-ca' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Kids Boxing' }
          ]} />

          <div className="text-center mt-8">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
              Kids <span className="text-fight-red">Boxing Classes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Safe, fun, and educational boxing programs for children. Build confidence,
              discipline, and fitness through youth boxing training.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Why Kids Boxing?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Build Confidence</h3>
              <p className="text-gray-600">
                Boxing helps children develop self-confidence and self-esteem through
                skill progression and achievement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Learn Discipline</h3>
              <p className="text-gray-600">
                Structured training teaches focus, respect, and self-control while
                having fun in a safe environment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Stay Active</h3>
              <p className="text-gray-600">
                Keep kids physically active with engaging workouts that improve
                coordination, strength, and cardiovascular health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            Find Kids Boxing Classes by City
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Currently available in Los Angeles - More cities coming soon!
          </p>

          <div className="flex justify-center">
            <Link
              href="/ca/los-angeles/kids-boxing-classes"
              className="group p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-fight-red hover:shadow-lg transition-all text-center"
            >
              <div className="text-xl font-bold text-black group-hover:text-fight-red transition-colors mb-2">
                Los Angeles, CA
              </div>
              <div className="text-sm text-gray-600">
                View Kids Boxing Programs →
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              More cities will be added soon. Check back for updates!
            </p>
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Programs for Every Age
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Ages 5-7</h3>
              <p className="text-gray-600 text-sm">
                Introduction to boxing basics, focus on coordination and fun activities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Ages 8-10</h3>
              <p className="text-gray-600 text-sm">
                Fundamental techniques, footwork, and beginning sparring drills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Ages 11-13</h3>
              <p className="text-gray-600 text-sm">
                Advanced techniques, conditioning, and supervised sparring.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Ages 14-17</h3>
              <p className="text-gray-600 text-sm">
                Competition preparation, advanced training, and mentorship programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Your Child Started?
          </h2>
          <p className="text-gray-300 mb-8">
            Find the perfect kids boxing program in your area. Safe, structured,
            and designed to help children thrive.
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center px-8 py-4 bg-fight-red text-white font-bold rounded-lg hover:bg-fight-red/90 transition-colors"
          >
            Search by ZIP Code
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}