'use client'

import { Search } from 'lucide-react'

interface Props {
search: string
setSearch: (v: string) => void
orderStatusFilter: string
setOrderStatusFilter: (v: string) => void
paymentStatusFilter: string
setPaymentStatusFilter: (v: string) => void
}

export default function OrderSearchBar({
search, setSearch,
orderStatusFilter, setOrderStatusFilter,
paymentStatusFilter, setPaymentStatusFilter,
}: Props) {
const selectClass = "rounded-xl border border-[#E7E1D8] bg-white px-4 py-2.5 text-[13px] text-black/60 outline-none focus:border-[#C9A86A] transition-colors"

return (
<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

{/* Search */}
<div className="relative w-full max-w-md">
<Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
<input
type="text"
value={search}
onChange={e => setSearch(e.target.value)}
placeholder="Search by name, email or order ID..."
className="h-11 w-full rounded-xl border border-[#E7E1D8] bg-white pl-11 pr-4 text-[13px] outline-none focus:border-[#C9A86A] transition-colors"
/>
</div>

{/* Filters */}
<div className="flex gap-2.5">
<select value={orderStatusFilter} onChange={e => setOrderStatusFilter(e.target.value)} className={selectClass}>
  <option value="All">All</option>
  <option value="pending">Pending</option>
  <option value="processing">Processing</option>
  <option value="shipped">Shipped</option>
  <option value="delivered">Delivered</option>
  <option value="cancelled">Cancelled</option>
</select>

<select value={paymentStatusFilter} onChange={e => setPaymentStatusFilter(e.target.value)} className={selectClass}>
  <option value="All">All</option>
  <option value="paid">Paid</option>
  <option value="pending">Pending</option>
  <option value="failed">Failed</option>
</select>
</div>

</div>
)
}