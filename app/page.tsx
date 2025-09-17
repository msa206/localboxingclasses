import Link from 'next/link'
import ZipSearchBar from '@/components/ZipSearchBar'
import { getStates, getAllCities } from '@/lib/data'

export default async function Home() {
  // Fetch real data from Supabase
  const [statesData, allCities] = await Promise.all([
    getStates(),
    getAllCities()
  ])

  // Priority cities to show first
  const priorityCities = [
    'New York',
    'Houston',
    'Brooklyn',
    'Philadelphia',
    'Las Vegas',
    'Atlanta',
    'Boston'
  ]

  // Process all cities with state abbreviations
  const processedCities = allCities.map(city => {
    const stateInfo = statesData.find(s => s.state === city.state)
    const stateAbbr = stateInfo?.abbr || city.state.substring(0, 2).toUpperCase()
    return {
      name: `${city.name}, ${stateAbbr}`,
      cityName: city.name,
      state: city.stateSlug,
      city: city.slug,
      count: city.count
    }
  })

  // Separate priority cities and others
  const prioritySet = new Set(priorityCities.map(c => c.toLowerCase()))
  const priorityCityData: typeof processedCities = []
  const otherCities: typeof processedCities = []

  processedCities.forEach(city => {
    if (prioritySet.has(city.cityName.toLowerCase())) {
      priorityCityData.push(city)
    } else {
      otherCities.push(city)
    }
  })

  // Sort priority cities by the defined order
  priorityCityData.sort((a, b) => {
    const aIndex = priorityCities.findIndex(c => c.toLowerCase() === a.cityName.toLowerCase())
    const bIndex = priorityCities.findIndex(c => c.toLowerCase() === b.cityName.toLowerCase())
    return aIndex - bIndex
  })

  // Sort other cities by gym count
  otherCities.sort((a, b) => b.count - a.count)

  // Combine priority cities first, then others (up to 20 total)
  const topCities = [...priorityCityData, ...otherCities].slice(0, 20)

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat blur-sm scale-125" 
          style={{
            backgroundImage: 'url(/two-boxers-sparring.webp)',
            backgroundPosition: 'calc(50% + 100px) calc(50% + 60px)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg">
            Find <span className="text-fight-red">Boxing Classes</span>
            <br />Near You
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover local boxing gyms perfect for beginners, kids, and experienced fighters. 
            Search by ZIP code or browse by location.
          </p>
          <ZipSearchBar />

          {/* Kids Boxing CTA */}
          <div className="mt-8">
            <Link
              href="/boxing/kids"
              className="inline-flex items-center px-8 py-4 bg-white text-fight-red font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Kids Boxing Gyms
            </Link>
          </div>
        </div>
      </section>

      {/* Popular States Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">Search Local Boxing Classes by State</h2>
            <p className="text-gray-600">Browse boxing gyms by state</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {statesData.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-fight-red/50 transition-colors shadow-sm hover:shadow-md text-center"
              >
                <h3 className="font-bold text-black group-hover:text-fight-red transition-colors">
                  {state.state}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {state.count} gyms
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-black">Search Popular Cities for Boxing Classes</h2>
            <p className="text-gray-600">Top cities with the most boxing gyms</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topCities.map((city) => (
              <Link
                key={`${city.state}-${city.city}`}
                href={`/states/${city.state}/${city.city}`}
                className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-fight-red/50 transition-colors shadow-sm hover:shadow-md text-center"
              >
                <h3 className="font-semibold text-black group-hover:text-fight-red transition-colors">
                  {city.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {city.count} gyms
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/cities"
              className="inline-flex items-center px-8 py-4 bg-fight-red text-white font-bold rounded-xl hover:bg-fight-red/90 transition-all duration-300 hover:scale-105"
            >
              View All Cities
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}