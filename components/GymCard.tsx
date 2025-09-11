interface GymCardProps {
  name: string
  full_address?: string
  city?: string
  state?: string
  postal_code?: string
  phone_number?: string
  site?: string
  source_url?: string
  review_stars?: number
  review_count?: number
  distance_mi?: number
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
}: GymCardProps) {
  const address = full_address || `${city}, ${state} ${postal_code}`
  
  return (
    <article className="rounded-2xl border border-fight-red/40 bg-fight-black/50 p-5 hover:border-fight-red/60 transition-colors">
      <header className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-off-white">{name}</h2>
        {distance_mi && (
          <span className="text-sm text-fight-red font-semibold whitespace-nowrap">
            {distance_mi.toFixed(1)} mi
          </span>
        )}
      </header>
      
      <p className="text-sm text-slate-muted mt-2">{address}</p>
      
      {(review_stars || review_count) && (
        <div className="mt-2 text-sm text-slate-muted">
          {review_stars && <span className="text-yellow-500">{review_stars.toFixed(1)}★</span>}
          {review_count && <span className="ml-1">({review_count})</span>}
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {phone_number && (
          <a
            href={`tel:${phone_number}`}
            className="px-4 py-2 bg-fight-red text-off-white rounded-lg hover:bg-fight-red/80 transition-colors font-semibold"
          >
            Call
          </a>
        )}
        {site && (
          <a
            href={site}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-fight-red text-fight-red rounded-lg hover:bg-fight-red hover:text-off-white transition-colors font-semibold"
          >
            Website
          </a>
        )}
        {source_url && (
          <a
            href={source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-slate-muted text-slate-muted rounded-lg hover:border-off-white hover:text-off-white transition-colors font-semibold"
          >
            Google Maps
          </a>
        )}
      </div>
    </article>
  )
}