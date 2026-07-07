'use client'

import { Search, Plus } from 'lucide-react'

interface Props {
  search: string
  setSearch: (value: string) => void
  onAddCoupon: () => void
}

export default function CouponSearchBar({ search, setSearch, onAddCoupon }: Props) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

      <div className="relative w-full max-w-md">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search coupons by code..."
          className="h-11 w-full rounded-xl border border-[#E7E1D8] bg-white pl-11 pr-4 text-[13px] outline-none focus:border-[#C9A86A] transition-colors"
        />
      </div>

      <button
        onClick={onAddCoupon}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#C9A86A] px-6 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
      >
        <Plus size={15} />
        Add Coupon
      </button>

    </div>
  )
}