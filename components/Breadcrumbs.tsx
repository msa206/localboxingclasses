import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-slate-muted hover:text-off-white transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-slate-muted">/</span>
            {item.href ? (
              <Link href={item.href} className="text-slate-muted hover:text-off-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-off-white">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}