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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="text"
        value={zip}
        onChange={handleZipChange}
        placeholder="Enter ZIP code"
        className="flex-1 px-4 py-3 bg-fight-black border border-fight-red/40 rounded-lg text-off-white placeholder-slate-muted focus:outline-none focus:border-fight-red"
        maxLength={5}
        pattern="\d{5}"
        required
      />
      <select
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        className="px-4 py-3 bg-fight-black border border-fight-red/40 rounded-lg text-off-white focus:outline-none focus:border-fight-red"
      >
        <option value="10">10 miles</option>
        <option value="25">25 miles</option>
        <option value="50">50 miles</option>
      </select>
      <button
        type="submit"
        className="px-6 py-3 bg-fight-red text-off-white font-bold rounded-lg hover:bg-fight-red/80 transition-colors"
      >
        Search
      </button>
    </form>
  )
}