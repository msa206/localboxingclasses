import Link from 'next/link'
import Image from 'next/image'
import { getAllCities } from '@/lib/data'

export default async function Footer() {
  const allCities = await getAllCities()
  const topCities = allCities.slice(0, 10)
  return (
    <footer className="bg-black border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 relative">
                <Image
                  src="/boxing-man-icon.png"
                  alt="Boxing Icon"
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(6360%) hue-rotate(355deg) brightness(89%) contrast(126%)'
                  }}
                />
              </div>
              <span className="text-xl font-bold text-white">Local Boxing Classes</span>
            </div>
            <p className="text-gray-400 text-sm">
              Find boxing gyms near you
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Popular Cities</h3>
            <div className="flex flex-col gap-2">
              {topCities.map((city) => {
                const stateAbbr = city.stateSlug === 'district-of-columbia' ? 'dc' :
                                   Object.entries({
                                     'alabama': 'al', 'alaska': 'ak', 'arizona': 'az', 'arkansas': 'ar', 'california': 'ca',
                                     'colorado': 'co', 'connecticut': 'ct', 'delaware': 'de', 'florida': 'fl', 'georgia': 'ga',
                                     'hawaii': 'hi', 'idaho': 'id', 'illinois': 'il', 'indiana': 'in', 'iowa': 'ia',
                                     'kansas': 'ks', 'kentucky': 'ky', 'louisiana': 'la', 'maine': 'me', 'maryland': 'md',
                                     'massachusetts': 'ma', 'michigan': 'mi', 'minnesota': 'mn', 'mississippi': 'ms', 'missouri': 'mo',
                                     'montana': 'mt', 'nebraska': 'ne', 'nevada': 'nv', 'new-hampshire': 'nh', 'new-jersey': 'nj',
                                     'new-mexico': 'nm', 'new-york': 'ny', 'north-carolina': 'nc', 'north-dakota': 'nd', 'ohio': 'oh',
                                     'oklahoma': 'ok', 'oregon': 'or', 'pennsylvania': 'pa', 'rhode-island': 'ri', 'south-carolina': 'sc',
                                     'south-dakota': 'sd', 'tennessee': 'tn', 'texas': 'tx', 'utah': 'ut', 'vermont': 'vt',
                                     'virginia': 'va', 'washington': 'wa', 'west-virginia': 'wv', 'wisconsin': 'wi', 'wyoming': 'wy'
                                   }).find(([slug]) => slug === city.stateSlug)?.[1] || city.stateSlug

                return (
                  <Link
                    key={`${city.slug}-${city.stateSlug}`}
                    href={`/${stateAbbr}/${city.slug}`}
                    className="text-gray-400 hover:text-fight-red text-sm transition-colors"
                  >
                    {city.name}, {city.state}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="md:text-right">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col md:items-end gap-4">
              <Link href="/" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                Home
              </Link>
              <Link href="/states" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                All States
              </Link>
              <Link href="/cities" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                All Cities
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                About
              </Link>
              <Link href="/classes" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                ZIP Search
              </Link>
            </div>
          </div>
          
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-900 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Local Boxing Classes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}