interface EmptyStateProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-off-white mb-2">{title}</h2>
      {description && (
        <p className="text-slate-muted mb-6">{description}</p>
      )}
      {action && (
        <a
          href={action.href}
          className="inline-block px-6 py-3 bg-fight-red text-off-white font-bold rounded-lg hover:bg-fight-red/80 transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  )
}