import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import EmptyState from '@/components/EmptyState'
import JsonLdScript from '@/components/JsonLdScript'
import { getKidsBoxingGyms } from '@/lib/data'

// ISR - Revalidate every 24 hours
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kids Boxing Classes in Los Angeles, CA - Youth Boxing Programs',
  description: 'Find the best kids boxing classes and youth boxing programs in Los Angeles, California. Safe, supervised training for children of all ages and skill levels.',
}

export default async function LosAngelesKidsBoxingPage() {
  // Fetch gyms that offer kids programs in Los Angeles
  const gyms = await getKidsBoxingGyms('Los Angeles', 'CA')

  // Breadcrumb data for JSON-LD
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://localboxingclasses.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Boxing',
        'item': 'https://localboxingclasses.com/boxing'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Kids',
        'item': 'https://localboxingclasses.com/boxing/kids'
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': 'Los Angeles, CA',
        'item': 'https://localboxingclasses.com/boxing/kids/los-angeles-ca'
      }
    ]
  }

  // ItemList for gyms (max 20 for performance)
  const gymsList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'numberOfItems': Math.min(gyms.length, 20),
    'itemListElement': gyms.slice(0, 20).map((gym, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'SportsActivityLocation',
        '@id': `#gym-${gym.id}`,
        'name': gym.name,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': gym.street || gym.full_address,
          'addressLocality': gym.city,
          'addressRegion': gym.state,
          'postalCode': gym.postal_code
        },
        'telephone': gym.phone_number,
        'url': gym.site,
        'geo': gym.latitude && gym.longitude ? {
          '@type': 'GeoCoordinates',
          'latitude': gym.latitude,
          'longitude': gym.longitude
        } : undefined,
        'aggregateRating': gym.review_stars && gym.review_count ? {
          '@type': 'AggregateRating',
          'ratingValue': gym.review_stars,
          'reviewCount': gym.review_count
        } : undefined,
        'amenityFeature': [
          {
            '@type': 'LocationFeatureSpecification',
            'name': 'Kids Boxing Classes',
            'value': true
          },
          gym.offers_free_trial && {
            '@type': 'LocationFeatureSpecification',
            'name': 'Free Trial',
            'value': true
          },
          gym.beginner_friendly && {
            '@type': 'LocationFeatureSpecification',
            'name': 'Beginner Friendly',
            'value': true
          }
        ].filter(Boolean)
      }
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLdScript data={breadcrumbList} />
      <JsonLdScript data={gymsList} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'Kids Boxing', href: '/boxing/kids' },
          { label: 'Los Angeles, CA' }
        ]} />

        <div className="mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            Kids Boxing Classes in <span className="text-fight-red">Los Angeles, CA</span>
          </h1>
          <p className="text-xl text-gray-600">
            {gyms.length} verified youth boxing programs in Los Angeles
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">
            Youth Boxing Programs in Los Angeles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-2">Why Choose Boxing for Kids?</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Builds confidence and self-esteem</li>
                <li>• Teaches discipline and respect</li>
                <li>• Improves fitness and coordination</li>
                <li>• Provides anti-bullying skills</li>
                <li>• Fun and engaging physical activity</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">What to Look For</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Certified youth instructors</li>
                <li>• Age-appropriate equipment</li>
                <li>• Safe training environment</li>
                <li>• Structured programs by age group</li>
                <li>• Focus on technique over sparring</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gyms Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">
              Gyms Offering Kids Boxing Programs
            </h2>
            <span className="text-gray-600">
              {gyms.length} location{gyms.length !== 1 ? 's' : ''}
            </span>
          </div>

          {gyms.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {gyms.map((gym) => (
                  <div key={gym.id} id={`gym-${gym.id}`} className="flex flex-col">
                    <GymCard {...gym} />
                    {/* Special badges for kids programs */}
                    <div className="mt-3 flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        ✓ Kids Programs
                      </span>
                      {gym.offers_free_trial && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Free Trial
                        </span>
                      )}
                      {gym.beginner_friendly && (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          Beginner Friendly
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Parent Tip:</strong> Always visit the gym first and observe a kids class.
                  Ask about instructor certifications, safety protocols, and age-specific programs.
                  Most gyms offer a free trial class for new students.
                </p>
              </div>
            </>
          ) : (
            <EmptyState
              title="No kids programs found"
              description="We're still verifying which Los Angeles gyms offer dedicated kids boxing programs. Check back soon!"
              action={{
                label: 'View all Los Angeles gyms',
                href: '/states/california/los-angeles'
              }}
            />
          )}
        </section>

        {/* Age Groups Guide */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-6">
            Age-Appropriate Programs in Los Angeles
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="font-bold text-fight-red mb-2">Ages 5-7</h3>
              <p className="text-sm text-gray-600">
                Basic coordination, fun fitness games, introduction to boxing stance and movement
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="font-bold text-fight-red mb-2">Ages 8-10</h3>
              <p className="text-sm text-gray-600">
                Fundamental techniques, proper form, pad work, non-contact partner drills
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="font-bold text-fight-red mb-2">Ages 11-13</h3>
              <p className="text-sm text-gray-600">
                Advanced combinations, defensive skills, controlled sparring (with permission)
              </p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <h3 className="font-bold text-fight-red mb-2">Ages 14-17</h3>
              <p className="text-sm text-gray-600">
                Competition preparation, strength training, advanced tactics and strategy
              </p>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="mt-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Safety First: Questions for Los Angeles Boxing Gyms
            </h3>
            <ul className="text-yellow-800 space-y-1 text-sm">
              <li>• Are instructors certified in youth boxing and first aid?</li>
              <li>• What safety equipment is provided vs. what needs to be purchased?</li>
              <li>• How are children grouped (by age, size, or skill level)?</li>
              <li>• What is the gym's policy on sparring for kids?</li>
              <li>• Is there a structured progression system for skill development?</li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Find More Boxing Options
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/boxing/kids"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Kids Boxing
            </Link>
            <Link
              href="/states/california/los-angeles"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition-colors"
            >
              All LA Boxing Gyms
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/classes?zip=90001&radius=10"
              className="inline-flex items-center justify-center px-6 py-3 bg-fight-red text-white font-bold rounded-lg hover:bg-fight-red/90 transition-colors"
            >
              Search LA by ZIP
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}