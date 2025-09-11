'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ZipSearchBar() {
  const router = useRouter()
  const [zip, setZip] = useState('')
  const [radius, setRadius] = useState('25')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zip.match(/^\d{5}$/)) {
      router.push(`/classes?zip=${zip}&radius=${radius}`)
    }
  }

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZip(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <input
          type="text"
          value={zip}
          onChange={handleZipChange}
          placeholder="Enter ZIP code"
          className="w-full px-6 py-4 pl-12 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-fight-red focus:bg-gray-50 transition-all"
          maxLength={5}
          pattern="\d{5}"
          required
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <select
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        className="px-6 py-4 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-fight-red focus:bg-gray-50 transition-all cursor-pointer"
      >
        <option value="10">10 miles</option>
        <option value="25">25 miles</option>
        <option value="50">50 miles</option>
      </select>
      <button
        type="submit"
        className="px-8 py-4 bg-fight-red text-white font-bold rounded-xl hover:bg-fight-red/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-fight-red/20"
      >
        Search
      </button>
    </form>
  )
}