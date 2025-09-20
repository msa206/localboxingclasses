interface GymCardProps {
  name: string
  full_address?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  phone_number?: string | null
  site?: string | null
  source_url?: string | null
  review_stars?: number | null
  review_count?: number | null
  distance_mi?: number | null
  offers_kids?: boolean | null
  offers_kickboxing?: boolean | null
  offers_free_trial?: boolean | null
  beginner_friendly?: boolean | null
  women_focused?: boolean | null
  priorityTag?: 'kids' | 'free-trial' | 'women' | 'beginner' | 'kickboxing'
}

export default function GymCard({
  name,
  full_address,
  city,
  state,
  postal_code,
  phone_number,
  site,
  source_url,
  review_stars,
  review_count,
  distance_mi,
  offers_kids,
  offers_kickboxing,
  offers_free_trial,
  beginner_friendly,
  women_focused,
  priorityTag,
}: GymCardProps) {
  const address = full_address || `${city}, ${state} ${postal_code}`
  
  return (
    <article className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-fight-red/30 transition-all duration-300 flex flex-col h-full">
      <header className="flex items-start justify-between gap-3 mb-3 min-h-[3.5rem]">
        <h2 className="text-xl font-bold text-black group-hover:text-fight-red transition-colors line-clamp-2">{name}</h2>
        {distance_mi && (
          <span className="text-sm text-fight-red font-semibold whitespace-nowrap bg-fight-red/10 px-2 py-1 rounded-full flex-shrink-0">
            {distance_mi.toFixed(1)} mi
          </span>
        )}
      </header>

      <div className="flex items-start gap-2 text-gray-600 mb-3 min-h-[2.5rem]">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-sm line-clamp-2">{address}</p>
      </div>

      {(review_stars || review_count) && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {review_stars && <span className="text-yellow-500 text-sm font-semibold">{review_stars.toFixed(1)}★</span>}
            {review_count && <span className="text-gray-500 text-sm ml-1">({review_count} reviews)</span>}
          </div>
        </div>
      )}

      {/* Feature Pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Priority tag rendered first with checkmark if specified */}
        {priorityTag === 'kids' && offers_kids && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            ✓ Kids Programs
          </span>
        )}
        {priorityTag === 'free-trial' && offers_free_trial && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✓ Free Trial
          </span>
        )}
        {priorityTag === 'women' && women_focused && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            ✓ Women Classes
          </span>
        )}
        {priorityTag === 'beginner' && beginner_friendly && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            ✓ Beginner Friendly
          </span>
        )}
        {priorityTag === 'kickboxing' && offers_kickboxing && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            ✓ Kickboxing
          </span>
        )}

        {/* Remaining tags in default order (skip if already shown as priority) */}
        {offers_kids && priorityTag !== 'kids' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            ✓ Kids Programs
          </span>
        )}
        {offers_free_trial && priorityTag !== 'free-trial' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Free Trial
          </span>
        )}
        {beginner_friendly && priorityTag !== 'beginner' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Beginner Friendly
          </span>
        )}
        {offers_kickboxing && priorityTag !== 'kickboxing' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Kickboxing
          </span>
        )}
        {women_focused && priorityTag !== 'women' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            Women Classes
          </span>
        )}
      </div>

      {/* Spacer to push buttons to bottom */}
      <div className="flex-grow"></div>

      <div className="flex flex-wrap gap-3 mt-auto">
        {phone_number && (
          <a
            href={`tel:${phone_number}`}
            className="inline-flex items-center px-4 py-2 bg-fight-red text-white rounded-lg hover:bg-fight-red/90 transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </a>
        )}
        {site && (
          <a
            href={site}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-fight-red hover:text-fight-red transition-colors font-medium text-sm"
          >
            <img src="/website_icon.svg" alt="Website" className="mr-2" style={{ width: '16.64px', height: '16.64px' }} />
            Website
          </a>
        )}
      </div>
    </article>
  )
}