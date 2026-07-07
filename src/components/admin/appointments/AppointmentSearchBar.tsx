'use client'

import { Search } from 'lucide-react'

interface Props {
  search: string
  setSearch: (value: string) => void
}

export default function AppointmentSearchBar({ search, setSearch }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, email or phone..."
        className="h-11 w-full rounded-xl border border-[#E7E1D8] bg-white pl-11 pr-4 text-[13px] outline-none focus:border-[#C9A86A] transition-colors"
      />
    </div>
  )
}