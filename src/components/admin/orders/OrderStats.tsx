'use client'

import { ShoppingCart, Clock3, CheckCircle2, IndianRupee } from 'lucide-react'

interface Props { orders: any[] }

export default function OrderStats({ orders }: Props) {
const total = orders.length
const pending = orders.filter(o => o.order_status?.toLowerCase() === 'pending').length
const delivered = orders.filter(o => o.order_status?.toLowerCase() === 'delivered').length
const revenue = orders.reduce((acc, o) => acc + Number(o.total_amount || 0), 0)

const fmt = (n: number) => {
if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`
return `₹${n}`
}

const stats = [
{ title: 'Total Orders', value: total, icon: ShoppingCart, bg: 'bg-[#F8F2EA]', color: 'text-[#C9A86A]' },
{ title: 'Pending', value: pending, icon: Clock3, bg: 'bg-orange-50', color: 'text-orange-500' },
{ title: 'Delivered', value: delivered, icon: CheckCircle2, bg: 'bg-green-50', color: 'text-green-600' },
{ title: 'Revenue', value: fmt(revenue), icon: IndianRupee, bg: 'bg-[#F8F2EA]', color: 'text-[#C9A86A]' },
]

return (
<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
{stats.map((item) => {
const Icon = item.icon
return (
<div key={item.title} className="rounded-[24px] border border-[#ECE3D8] bg-white p-6 shadow-sm">
<div className="flex items-start justify-between">
<div>
<p className="text-[11px] uppercase tracking-[3px] text-black/40">{item.title}</p>
<h2 className="mt-3 text-[34px] font-light leading-none text-black">{item.value}</h2>
</div>
<div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}>
<Icon size={19} className={item.color} />
</div>
</div>
</div>
)
})}
</div>
)
}
