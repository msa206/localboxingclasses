import Link from 'next/link'
import ZipSearchBar from '@/components/ZipSearchBar'
import { statesData } from '@/lib/mock-data'

// Top 20 cities by gym count in descending order
const topCities = [
  { name: 'New York, NY', state: 'new-york', city: 'new-york', count: 125 },
  { name: 'Los Angeles, CA', state: 'california', city: 'los-angeles', count: 85 },
  { name: 'Chicago, IL', state: 'illinois', city: 'chicago', count: 75 },
  { name: 'Houston, TX', state: 'texas', city: 'houston', count: 65 },
  { name: 'Philadelphia, PA', state: 'pennsylvania', city: 'philadelphia', count: 58 },
  { name: 'Phoenix, AZ', state: 'arizona', city: 'phoenix', count: 55 },
  { name: 'Dallas, TX', state: 'texas', city: 'dallas', count: 52 },
  { name: 'Miami, FL', state: 'florida', city: 'miami', count: 48 },
  { name: 'San Francisco, CA', state: 'california', city: 'san-francisco', count: 45 },
  { name: 'Brooklyn, NY', state: 'new-york', city: 'brooklyn', count: 45 },
  { name: 'Boston, MA', state: 'massachusetts', city: 'boston', count: 42 },
  { name: 'Atlanta, GA', state: 'georgia', city: 'atlanta', count: 40 },
  { name: 'San Diego, CA', state: 'california', city: 'san-diego', count: 38 },
  { name: 'Austin, TX', state: 'texas', city: 'austin', count: 38 },
  { name: 'Seattle, WA', state: 'washington', city: 'seattle', count: 36 },
  { name: 'San Antonio, TX', state: 'texas', city: 'san-antonio', count: 35 },
  { name: 'Denver, CO', state: 'colorado', city: 'denver', count: 32 },
  { name: 'Las Vegas, NV', state: 'nevada', city: 'las-vegas', count: 30 },
  { name: 'Portland, OR', state: 'oregon', city: 'portland', count: 28 },
  { name: 'San Jose, CA', state: 'california', city: 'san-jose', count: 28 },
]

export default function Home() {
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