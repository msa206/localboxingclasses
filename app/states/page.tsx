import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getStates } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Boxing Classes by State',
  description: 'Browse boxing classes and gyms across all US states. Find the perfect boxing gym near you.',
}

export default async function StatesPage() {
  const statesData = await getStates()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'States' }]} />

        <h1 className="text-4xl font-bold text-black mb-4">
          Boxing Classes by State
        </h1>
        <p className="text-gray-600 mb-8">
          Select your state to find local boxing gyms and classes
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {statesData.map((state) => (
            <Link
              key={state.slug}
              href={`/${state.abbr.toLowerCase()}`}
              className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-fight-red/50 transition-colors shadow-sm hover:shadow-md"
            >
              <h2 className="font-bold text-black group-hover:text-fight-red transition-colors">
                {state.state}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {state.count} gyms
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}