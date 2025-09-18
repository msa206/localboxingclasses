import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 relative">
              <Image
                src="/boxing-man-icon.png"
                alt="Boxing Icon"
                width={32}
                height={32}
                className="object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(6360%) hue-rotate(355deg) brightness(89%) contrast(126%)'
                }}
              />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-fight-red transition-colors">
              Local Boxing Classes
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/states" className="text-gray-300 hover:text-white transition-colors font-medium">
              Browse States
            </Link>
            <Link href="/cities" className="text-gray-300 hover:text-white transition-colors font-medium">
              Browse Cities
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium">
              About
            </Link>
            <Link href="/classes" className="bg-fight-red text-white px-4 py-2 rounded-lg font-medium hover:bg-fight-red/90 transition-colors">
              Search by ZIP
            </Link>
          </div>
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}