import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-fight-black border-t border-fight-red/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-off-white font-semibold">Local Boxing Classes</p>
            <p className="text-slate-muted text-sm mt-1">Find boxing gyms near you</p>
          </div>
          <div className="flex gap-6">
            <Link href="/states" className="text-slate-muted hover:text-off-white text-sm transition-colors">
              All States
            </Link>
            <Link href="/classes" className="text-slate-muted hover:text-off-white text-sm transition-colors">
              ZIP Search
            </Link>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-fight-red/10 text-center">
          <p className="text-slate-muted text-xs">
            © {new Date().getFullYear()} Local Boxing Classes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}