import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-fight-black border-b border-fight-red/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-off-white hover:text-fight-red transition-colors">
            Local Boxing Classes
          </Link>
          <div className="flex gap-6">
            <Link href="/states" className="text-off-white hover:text-fight-red transition-colors">
              Browse States
            </Link>
            <Link href="/classes" className="text-off-white hover:text-fight-red transition-colors">
              Search by ZIP
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}