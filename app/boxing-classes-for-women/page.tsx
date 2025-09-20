import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import MarkdownContent from '@/components/MarkdownContent'
import { womenBoxingContent } from '@/content/pages/women-boxing'

export const metadata: Metadata = {
  title: 'Boxing Classes for Women - Female-Focused Boxing Programs',
  description: 'Discover women-focused boxing classes and programs across the United States. Empowering, supportive, and designed specifically for women.',
}

export default function BoxingClassesForWomenHub() {
  // Starting with Los Angeles, Chicago, New York City, Houston, and Las Vegas for prototyping
  const priorityCities = [
    { name: 'Los Angeles', state: 'CA', slug: 'los-angeles', stateSlug: 'ca', href: '/ca/los-angeles/boxing-classes-for-women' },
    { name: 'Chicago', state: 'IL', slug: 'chicago', stateSlug: 'il', href: '/il/chicago/boxing-classes-for-women' },
    { name: 'New York City', state: 'NY', slug: 'new-york', stateSlug: 'ny', href: '/ny/new-york/boxing-classes-for-women' },
    { name: 'Houston', state: 'TX', slug: 'houston', stateSlug: 'tx', href: '/tx/houston/boxing-classes-for-women' },
    { name: 'Las Vegas', state: 'NV', slug: 'las-vegas', stateSlug: 'nv', href: '/nv/las-vegas/boxing-classes-for-women' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Boxing Classes for Women' }
          ]} />

          <div className="text-center mt-8">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
              Boxing Classes for <span className="text-fight-red">Women</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering women through boxing. Find supportive, female-focused training programs
              designed to build strength, confidence, and community.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Why Women's Boxing?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Empowerment</h3>
              <p className="text-gray-600">
                Build physical and mental strength while developing self-defense skills
                in a supportive, women-focused environment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Community</h3>
              <p className="text-gray-600">
                Train alongside like-minded women who support and motivate each other
                to reach their fitness and personal goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Total Fitness</h3>
              <p className="text-gray-600">
                Get an incredible full-body workout that improves strength, cardio,
                coordination, and mental resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            Find Boxing Classes for Women by City
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Currently available in select cities - More locations coming soon!
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {priorityCities.map((city) => (
              <Link
                key={`${city.stateSlug}-${city.slug}`}
                href={city.href}
                className="group p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-fight-red hover:shadow-lg transition-all text-center"
              >
                <div className="text-xl font-bold text-black group-hover:text-fight-red transition-colors mb-2">
                  {city.name}, {city.state}
                </div>
                <div className="text-sm text-gray-600">
                  View Women's Boxing Programs →
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              More cities will be added soon. Check back for updates!
            </p>
          </div>
        </div>
      </section>

      {/* Program Types Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Types of Women's Boxing Programs
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Beginner Classes</h3>
              <p className="text-gray-600 text-sm">
                Perfect for women new to boxing, focusing on fundamentals and proper form.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Fitness Boxing</h3>
              <p className="text-gray-600 text-sm">
                High-energy workouts combining boxing techniques with cardio and strength training.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Self-Defense</h3>
              <p className="text-gray-600 text-sm">
                Practical boxing skills combined with self-defense techniques for real-world situations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Competitive Training</h3>
              <p className="text-gray-600 text-sm">
                Advanced programs for women interested in amateur boxing competitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <MarkdownContent content={womenBoxingContent} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Boxing Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Find women-focused boxing programs in your area. Join a supportive community
            and discover your inner strength.
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