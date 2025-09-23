import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import GymCard from '@/components/GymCard'
import Pagination from '@/components/Pagination'
import EmptyState from '@/components/EmptyState'
import ZipSearchBar from '@/components/ZipSearchBar'
import { searchGymsByZip } from '@/lib/data'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ zip?: string; radius?: string; page?: string }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams
  const zip = params.zip ?? ''
  
  if (!zip) {
    return {
      title: 'Search Boxing Classes by ZIP Code',
      description: 'Enter your ZIP code to find boxing gyms and classes near you.',
      robots: 'noindex, follow',
    }
  }

  return {
    title: `Boxing Classes Near ${zip}`,
    description: `Find boxing gyms and classes near ZIP code ${zip}. Discover local boxing training for beginners, kids, and experienced fighters.`,
    robots: 'noindex, follow',
  }
}

export default async function ClassesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const zip = params.zip ?? ''
  const radius = Math.max(1, Math.min(100, Number(params.radius ?? 25)))
  const page = Math.max(1, Number(params.page ?? 1))
  const limit = 50
  const offset = (page - 1) * limit

  if (!zip) {
    return (
      <div className="bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: 'ZIP Search' }]} />
          
          <h1 className="text-4xl font-bold text-black mb-4">
            Search Boxing Classes by ZIP Code
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your ZIP code to find boxing gyms within your preferred distance
          </p>
          
          <div className="max-w-2xl mx-auto">
            <ZipSearchBar />
          </div>
        </div>
      </div>
    )
  }

  // Fetch real search results from database
  const { gyms: searchResults, total } = await searchGymsByZip(
    zip,
    radius,
    limit,
    offset
  )

  const hasMore = searchResults.length === limit
  
  return (
    <div className="bg-white pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: 'ZIP Search', href: '/classes' },
          { label: `Results for ${zip}` }
        ]} />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Boxing Classes near {zip}
          </h1>
          <p className="text-gray-600 mb-6">
            Showing gyms within {radius} miles • {searchResults.length} results
          </p>
          
          <div className="max-w-2xl">
            <ZipSearchBar />
          </div>
        </div>
      
      {searchResults.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((gym) => (
              <GymCard key={gym.id} {...gym} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            hasMore={hasMore}
            baseUrl="/classes"
            searchParams={new URLSearchParams({ zip, radius: String(radius) })}
          />
        </>
      ) : (
        <EmptyState
          title="No gyms found"
          description={`We couldn't find any boxing gyms within ${radius} miles of ZIP code ${zip}.`}
          action={{
            label: 'Try a larger radius',
            href: `/classes?zip=${zip}&radius=50`
          }}
        />
      )}
      </div>
    </div>
  )
}