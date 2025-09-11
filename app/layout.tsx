import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://localboxingclasses.com'),
  title: {
    default: 'Find Boxing Classes Near You | Local Boxing Classes',
    template: '%s | Local Boxing Classes'
  },
  description: 'Find boxing classes near you by ZIP, or browse by state and city. Discover local boxing gyms for beginners, kids, and women.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-fight-black`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}