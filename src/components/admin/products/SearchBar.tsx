'use client'

import { Search, Plus } from 'lucide-react'

interface Props {
  search: string
  setSearch: (value: string) => void
  onAddProduct: () => void
}

export default function SearchBar({ search, setSearch, onAddProduct }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="h-12 w-full rounded-2xl border border-[#E7E1D8] bg-white pl-11 pr-4 text-[13px] outline-none transition-colors focus:border-[#C9A86A]"
        />
      </div>

      {/* Add */}
      <button
        onClick={onAddProduct}
        className="flex items-center gap-2 rounded-2xl bg-[#C9A86A] px-6 py-3 text-[12px] uppercase tracking-[3px] text-white transition-all hover:bg-[#b8923a] active:scale-[0.98]"
      >
        <Plus size={16} />
        Add Product
      </button>

    </div>
  )
}