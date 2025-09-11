import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  hasMore: boolean
  baseUrl: string
  searchParams: URLSearchParams
}

export default function Pagination({ currentPage, hasMore, baseUrl, searchParams }: PaginationProps) {
  const prevParams = new URLSearchParams(searchParams)
  prevParams.set('page', String(Math.max(1, currentPage - 1)))
  
  const nextParams = new URLSearchParams(searchParams)
  nextParams.set('page', String(currentPage + 1))
  
  return (
    <div className="flex justify-center gap-4 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?${prevParams.toString()}`}
          className="px-4 py-2 bg-fight-black border border-fight-red text-fight-red rounded-lg hover:bg-fight-red hover:text-off-white transition-colors font-semibold"
        >
          ← Previous
        </Link>
      )}
      <span className="px-4 py-2 text-off-white">
        Page {currentPage}
      </span>
      {hasMore && (
        <Link
          href={`${baseUrl}?${nextParams.toString()}`}
          className="px-4 py-2 bg-fight-black border border-fight-red text-fight-red rounded-lg hover:bg-fight-red hover:text-off-white transition-colors font-semibold"
        >
          Next →
        </Link>
      )}
    </div>
  )
}