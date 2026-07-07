'use client'

import { Eye } from 'lucide-react'

interface Props {
orders: any[]
search: string
refreshOrders: () => Promise<void>
onView: (order: any) => void
orderStatusFilter: string
paymentStatusFilter: string
}

export default function OrderTable({ orders, search, onView, orderStatusFilter, paymentStatusFilter }: Props) {

const filtered = orders.filter((order) => {
const q = search.toLowerCase()
const matchSearch =
order.customer_name?.toLowerCase().includes(q) ||
order.customer_email?.toLowerCase().includes(q) ||
String(order.id).includes(q)
const matchOrder =
  orderStatusFilter === 'All' ||
  order.order_status?.toLowerCase() === orderStatusFilter.toLowerCase()

const matchPayment =
  paymentStatusFilter === 'All' ||
  order.payment_status?.toLowerCase() === paymentStatusFilter.toLowerCase()
return matchSearch && matchOrder && matchPayment
})

const orderStatusStyle: Record<string, string> = {
Delivered: 'bg-green-50 text-green-700',
Shipped: 'bg-blue-50 text-blue-700',
Processing: 'bg-orange-50 text-orange-700',
Cancelled: 'bg-red-50 text-red-600',
Pending: 'bg-[#F8F4EE] text-black/60',
}

const paymentStatusStyle: Record<string, string> = {
Paid: 'bg-green-50 text-green-700',
Pending: 'bg-orange-50 text-orange-600',
Failed: 'bg-red-50 text-red-600',
}

return (
<div className="overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

{/* Header */}
<div className="flex items-center justify-between border-b border-[#EEE7DE] px-7 py-5">
<div>
<h2 className="text-[16px] font-semibold text-black">Orders</h2>
<p className="mt-0.5 text-[12px] text-black/35">{filtered.length} total orders</p>
</div>
<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F2EA]">
<span className="text-[13px] font-semibold text-[#C9A86A]">{filtered.length}</span>
</div>
</div>

{/* Table */}
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="border-b border-[#F0E9E0] bg-[#FCFAF8]">
{['Order ID', 'Customer', 'Tracking', 'Amount', 'Payment', 'Status', 'Date', 'Action'].map(h => (
<th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-[3px] text-black/35 font-medium">{h}</th>
))}
</tr>
</thead>
<tbody className="divide-y divide-[#F5F0EA]">
{filtered.length === 0 ? (
<tr>
<td colSpan={8} className="py-16 text-center text-sm text-black/25">No orders found</td>
</tr>
) : (
filtered.map((order) => (
<tr key={order.id} className="group transition-colors hover:bg-[#FDFBF8]">

<td className="px-5 py-4">
<span className="text-[13px] font-medium text-black/70">#{order.id}</span>
</td>

<td className="px-5 py-4">
<p className="text-[13px] font-medium text-black">{order.customer_name}</p>
<p className="text-[11px] text-black/35">{order.customer_email}</p>
</td>

<td className="px-5 py-4">
{order.tracking_id ? (
<span className="rounded-lg border border-[#E8DED3] bg-[#F8F4EE] px-3 py-1.5 text-[11px] text-[#8a6b35]">
{order.tracking_id}
</span>
) : (
<span className="text-[12px] text-black/25">—</span>
)}
</td>

<td className="px-5 py-4">
<span className="text-[14px] font-semibold text-black">₹{order.total_amount}</span>
</td>

<td className="px-5 py-4">
<span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium ${paymentStatusStyle[order.payment_status] || 'bg-gray-50 text-gray-500'}`}>
<span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
{order.payment_status}
</span>
</td>

<td className="px-5 py-4">
<span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium ${orderStatusStyle[order.order_status] || 'bg-gray-50 text-gray-500'}`}>
<span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
{order.order_status}
</span>
</td>

<td className="px-5 py-4 text-[12px] text-black/40">
{new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
</td>

<td className="px-5 py-4">
<button
onClick={() => onView(order)}
className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] bg-[#FAF6F0] transition-all hover:border-[#C9A86A] hover:bg-[#C9A86A]/10"
>
<Eye size={14} className="text-[#8a6b35]" />
</button>
</td>

</tr>
))
)}
</tbody>
</table>
</div>
</div>
)
}