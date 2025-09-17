import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getAllCities } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Boxing Classes by City',
  description: 'Browse boxing studios and gyms in major cities across the United States. Find the perfect boxing class in your city.',
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default async function CitiesPage() {
  // Fetch real cities data from database
  const allCities = await getAllCities()

  // Group cities by first letter
  const citiesByLetter = allCities.reduce((acc, city) => {
    const firstLetter = city.name[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push({
      name: city.name,
      state: city.state,
      stateSlug: city.stateSlug,
      citySlug: city.slug,
      count: city.count
    })
    return acc
  }, {} as Record<string, Array<{name: string, state: string, stateSlug: string, citySlug: string, count: number}>>)

  // Sort cities within each letter group
  Object.keys(citiesByLetter).forEach(letter => {
    citiesByLetter[letter].sort((a, b) => a.name.localeCompare(b.name))
  })

  // Calculate statistics
  const cityStats = {
    totalCities: allCities.length,
    totalGyms: allCities.reduce((sum, city) => sum + city.count, 0),
    totalStates: new Set(allCities.map(city => city.state)).size,
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Cities' }]} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Boxing Classes by City
          </h1>
          <p className="text-gray-600 mb-8">
            Browse boxing studios and gyms in {cityStats.totalCities} cities across the United States. Find the perfect boxing class in your city or explore studios nationwide.
          </p>
          
          {/* Statistics */}
          <div className="flex justify-center gap-12 mb-8">
            <div>
              <div className="text-3xl font-bold text-fight-red">{cityStats.totalCities}</div>
              <div className="text-sm text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fight-red">{cityStats.totalGyms}</div>
              <div className="text-sm text-gray-600">Studios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-fight-red">{cityStats.totalStates}</div>
              <div className="text-sm text-gray-600">States</div>
            </div>
          </div>
        </div>

        {/* Alphabet Navigation */}
        <div className="bg-gray-50 rounded-lg p-3 mb-8 overflow-x-auto">
          <div className="flex justify-center gap-1 min-w-fit">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded text-sm font-semibold transition-colors flex-shrink-0 ${
                  citiesByLetter[letter]
                    ? 'bg-white text-black hover:bg-fight-red hover:text-white border border-gray-300'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        {/* Cities by Letter */}
        <div className="space-y-12">
          {alphabet.map((letter) => {
            const cities = citiesByLetter[letter]
            if (!cities) return null

            return (
              <div key={letter} id={letter} className="scroll-mt-20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-fight-red text-white rounded-lg flex items-center justify-center text-xl font-bold mr-4">
                    {letter}
                  </div>
                  <div className="text-sm text-gray-600">
                    {cities.length} {cities.length === 1 ? 'city' : 'cities'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cities.map((city) => (
                    <Link
                      key={`${city.stateSlug}-${city.citySlug}`}
                      href={`/states/${city.stateSlug}/${city.citySlug}`}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-fight-red/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-black group-hover:text-fight-red transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {city.state}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-fight-red">
                            {city.count}
                          </div>
                          <div className="text-xs text-gray-600">
                            {city.count === 1 ? 'studio' : 'studios'}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm text-fight-red group-hover:underline">
                          View studios →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}