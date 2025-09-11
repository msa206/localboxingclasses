import Link from 'next/link'
import ZipSearchBar from '@/components/ZipSearchBar'

const featuredStates = [
  { name: 'California', slug: 'california', count: 450 },
  { name: 'Texas', slug: 'texas', count: 380 },
  { name: 'Florida', slug: 'florida', count: 320 },
  { name: 'New York', slug: 'new-york', count: 290 },
  { name: 'Illinois', slug: 'illinois', count: 180 },
  { name: 'Pennsylvania', slug: 'pennsylvania', count: 160 },
]

const featuredCities = [
  { name: 'Los Angeles, CA', state: 'california', city: 'los-angeles' },
  { name: 'New York, NY', state: 'new-york', city: 'new-york' },
  { name: 'Chicago, IL', state: 'illinois', city: 'chicago' },
  { name: 'Houston, TX', state: 'texas', city: 'houston' },
  { name: 'Miami, FL', state: 'florida', city: 'miami' },
  { name: 'Phoenix, AZ', state: 'arizona', city: 'phoenix' },
]

export default function Home() {
  return (
    <div className="text-off-white">
      <section className="py-20 px-4 bg-gradient-to-b from-fight-black to-fight-black/90">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find <span className="text-fight-red">Boxing Classes</span> Near You
          </h1>
          <p className="text-xl text-slate-muted mb-10 max-w-2xl mx-auto">
            Discover local boxing gyms perfect for beginners, kids, and experienced fighters. Search by ZIP code or browse by location.
          </p>
          <ZipSearchBar />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Popular States</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredStates.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="group p-6 bg-fight-black/50 border border-fight-red/30 rounded-xl hover:border-fight-red transition-colors"
              >
                <h3 className="text-xl font-bold group-hover:text-fight-red transition-colors">
                  {state.name}
                </h3>
                <p className="text-slate-muted text-sm mt-1">{state.count} gyms</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/states"
              className="inline-block px-6 py-3 bg-fight-red text-off-white font-bold rounded-lg hover:bg-fight-red/80 transition-colors"
            >
              View All States
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-fight-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredCities.map((city) => (
              <Link
                key={city.city}
                href={`/states/${city.state}/${city.city}`}
                className="p-4 text-center bg-fight-black border border-slate-muted/30 rounded-lg hover:border-fight-red/50 hover:text-fight-red transition-colors"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}