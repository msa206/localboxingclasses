import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import MarkdownContent from '@/components/MarkdownContent'
import { freeTrialsContent } from '@/content/pages/free-trials'

export const metadata: Metadata = {
  title: 'Boxing Gyms with Free Trials - Try Before You Commit',
  description: 'Find boxing gyms offering free trial classes across the United States. Experience the training, meet the coaches, and find your perfect gym risk-free.',
}

export default function FreeTrialGymsHub() {
  // Priority cities with 3+ gyms offering free trials
  const priorityCities = [
    { name: 'Los Angeles, CA', state: 'CA', slug: 'los-angeles', stateSlug: 'ca', href: '/ca/los-angeles/boxing-gyms-with-free-trials' },
    { name: 'Chicago, IL', state: 'IL', slug: 'chicago', stateSlug: 'il', href: '/il/chicago/boxing-gyms-with-free-trials' },
    { name: 'New York City, NY', state: 'NY', slug: 'new-york', stateSlug: 'ny', href: '/ny/new-york/boxing-gyms-with-free-trials' },
    { name: 'Houston, TX', state: 'TX', slug: 'houston', stateSlug: 'tx', href: '/tx/houston/boxing-gyms-with-free-trials' },
    { name: 'Las Vegas, NV', state: 'NV', slug: 'las-vegas', stateSlug: 'nv', href: '/nv/las-vegas/boxing-gyms-with-free-trials' },
    { name: 'Tucson, AZ', state: 'AZ', slug: 'tucson', stateSlug: 'az', href: '/az/tucson/boxing-gyms-with-free-trials' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Free Trial Gyms' }
          ]} />

          <div className="text-center mt-8">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
              <span className="text-fight-red">Free Trial</span> Boxing Gyms
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Try before you commit! Experience top-rated boxing gyms with free trial classes.
              No contracts, no pressure - just great training.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Why take a free boxing lesson?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Zero Risk</h3>
              <p className="text-gray-600">
                Experience the gym's atmosphere, equipment, and training style without
                any financial commitment upfront.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Meet Your Coaches</h3>
              <p className="text-gray-600">
                Get to know the instructors personally and ensure their teaching style
                matches your learning preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-fight-red mb-3">Find Your Fit</h3>
              <p className="text-gray-600">
                Every gym has its own culture. A free trial helps you find where you
                feel most comfortable and motivated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            Find Free Trial Gyms by City
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
                  {city.name}
                </div>
                <div className="text-sm text-gray-600">
                  View Free Trial Gyms →
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

      {/* What to Expect Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            What to Expect from Your Free Trial
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Gym Tour</h3>
              <p className="text-gray-600 text-sm">
                Complete walkthrough of facilities, equipment, and training areas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Fitness Assessment</h3>
              <p className="text-gray-600 text-sm">
                Optional evaluation to help coaches understand your fitness level and goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Full Class Experience</h3>
              <p className="text-gray-600 text-sm">
                Participate in a complete training session with other members.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-black mb-2">Q&A Session</h3>
              <p className="text-gray-600 text-sm">
                Ask questions about memberships, schedules, and training programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Free Trial Preparation Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">What to Bring</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">✓</span>
                  Comfortable athletic clothing you can move in
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">✓</span>
                  Athletic shoes with good ankle support
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">✓</span>
                  Water bottle to stay hydrated
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">✓</span>
                  Small towel for sweat management
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">✓</span>
                  Positive attitude and open mind
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">Questions to Ask</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">?</span>
                  What membership packages are available?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">?</span>
                  Do you offer beginner-specific classes?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">?</span>
                  Is equipment provided or should I purchase my own?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">?</span>
                  What's the typical class size and schedule?
                </li>
                <li className="flex items-start">
                  <span className="text-fight-red mr-3">?</span>
                  Are there any current promotions or discounts?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <MarkdownContent content={freeTrialsContent} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Boxing Journey?
          </h2>
          <p className="text-gray-300 mb-8">
            Find boxing gyms with free trials in your area. No commitment required -
            just show up and experience world-class training.
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