'use client'

import { useEffect, useState } from 'react'
import { Eye, ArrowUpRight } from 'lucide-react'
import { getOrders } from '../../../service/orders'
import Link from 'next/link'

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
processing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
shipped: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400' },
delivered: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-400' },
cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400' },
}

export default function RecentOrders() {
const [orders, setOrders] = useState<any[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
async function loadOrders() {
try {
const data = await getOrders()
setOrders(data?.slice(0, 5) || [])
} catch (error) {
console.error(error)
} finally {
setLoading(false)
}
}
loadOrders()
}, [])

return (
<div className="rounded-[28px] border border-[#ECE3D8] bg-white overflow-hidden">

{/* Header */}
<div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-[#F0EBE3]">
<div>
<p className="text-[10px] uppercase tracking-[4px] text-[#C9A86A] mb-1">Orders</p>
<h2 className="text-xl font-semibold text-black">Recent Orders</h2>
</div>
<Link
href="/admin/orders"
className="flex items-center gap-1.5 text-[11px] uppercase tracking-[2px] text-black/40 hover:text-[#C9A86A] transition-colors"
>
View All <ArrowUpRight size={13} />
</Link>
</div>

<div className="p-5">
{loading ? (
<div className="space-y-3">
{Array.from({ length: 5 }).map((_, i) => (
<div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-2xl bg-[#F8F5F0]">
<div className="h-8 w-8 rounded-full bg-black/8" />
<div className="flex-1 space-y-2">
<div className="h-3 w-24 bg-black/8 rounded" />
<div className="h-2.5 w-32 bg-black/5 rounded" />
</div>
<div className="h-3 w-16 bg-black/8 rounded" />
</div>
))}
</div>
) : orders.length === 0 ? (
<div className="py-12 text-center text-sm text-black/30">No orders yet</div>
) : (
<div className="space-y-2">
{orders.map((order) => {
const status = order.order_status?.toLowerCase() || 'pending'
const style = statusStyles[status] || statusStyles.pending
return (
<div
key={order.id}
className="flex items-center gap-4 rounded-2xl border border-[#F1ECE6] p-4 hover:bg-[#FDFAF6] transition-colors group"
>
{/* Order ID badge */}
<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F2EA]">
<span className="text-[10px] font-semibold text-[#C9A86A]">#{order.id}</span>
</div>

{/* Info */}
<div className="flex-1 min-w-0">
<p className="text-[13px] font-medium text-black truncate">{order.customer_name}</p>
<p className="text-[11px] text-black/40 truncate">{order.customer_email}</p>
</div>

{/* Amount */}
<div className="text-right shrink-0">
<p className="text-[14px] font-semibold text-black">₹{order.total_amount}</p>
<p className="text-[10px] text-black/35">{order.total_items} items</p>
</div>

{/* Status */}
<div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0 ${style.bg}`}>
<div className={`h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`} />
<span className={`text-[10px] uppercase tracking-[1px] font-medium ${style.text}`}>
{status}
</span>
</div>

{/* Eye button */}
<Link
href="/admin/orders"
className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E7DDD1] bg-white hover:bg-[#C9A86A] hover:text-white hover:border-[#C9A86A] transition-all duration-200"
>
<Eye size={15} />
</Link>
</div>
)
})}
</div>
)}
</div>
</div>
)
}