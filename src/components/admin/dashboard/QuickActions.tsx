'use client'

import Link from 'next/link'
import { Plus, ShoppingCart, CalendarDays, BarChart3, ArrowUpRight } from 'lucide-react'

const actions = [
{
title: 'Add Product',
desc: 'List a new nail collection',
href: '/admin/products',
icon: Plus,
color: 'bg-[#C9A86A]',
textColor: 'text-white',
},
{
title: 'Manage Orders',
desc: 'View & update order status',
href: '/admin/orders',
icon: ShoppingCart,
color: 'bg-[#0E0B07]',
textColor: 'text-white',
},
{
title: 'Appointments',
desc: 'Confirm & schedule bookings',
href: '/admin/appointments',
icon: CalendarDays,
color: 'bg-[#F8F2EA]',
textColor: 'text-black',
},
{
title: 'Analytics',
desc: 'Revenue & performance data',
href: '/admin/analytics',
icon: BarChart3,
color: 'bg-[#F8F2EA]',
textColor: 'text-black',
},
]

export default function QuickActions() {
return (
<div className="rounded-[28px] border border-[#ECE3D8] bg-white overflow-hidden">

{/* Header */}
<div className="px-7 pt-6 pb-5 border-b border-[#F0EBE3]">
<p className="text-[10px] uppercase tracking-[4px] text-[#C9A86A] mb-1">Shortcuts</p>
<h2 className="text-xl font-semibold text-black">Quick Actions</h2>
</div>

<div className="p-5 grid gap-3">
{actions.map((item) => {
const Icon = item.icon
return (
<Link
key={item.title}
href={item.href}
className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 hover:scale-[1.015] hover:shadow-sm ${item.color}`}
>
<div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.textColor === 'text-white' ? 'bg-white/15' : 'bg-black/8'}`}>
<Icon size={17} className={item.textColor} />
</div>
<div className="flex-1 min-w-0">
<p className={`text-[13px] font-semibold ${item.textColor}`}>{item.title}</p>
<p className={`text-[11px] mt-0.5 ${item.textColor === 'text-white' ? 'text-white/55' : 'text-black/40'}`}>{item.desc}</p>
</div>
<ArrowUpRight size={15} className={item.textColor === 'text-white' ? 'text-white/50' : 'text-black/25'} />
</Link>
)
})}
</div>
</div>
)
}