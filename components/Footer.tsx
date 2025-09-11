import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
              <span className="text-xl font-bold text-white">Local Boxing Classes</span>
            </div>
            <p className="text-gray-400 text-sm">
              Find boxing gyms near you
            </p>
          </div>
          
          <div className="md:text-center">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col md:flex-row md:justify-center gap-4">
              <Link href="/states" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                All States
              </Link>
              <Link href="/cities" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                All Cities
              </Link>
              <Link href="/classes" className="text-gray-400 hover:text-fight-red text-sm transition-colors">
                ZIP Search
              </Link>
            </div>
          </div>
          
          <div className="md:text-right">
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex md:justify-end space-x-4">
              <button className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-fight-red/20 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-fight-red/20 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-900 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Local Boxing Classes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}