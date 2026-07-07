'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
LayoutDashboard, Package, ShoppingCart,
CalendarDays, TicketPercent, BarChart3,
} from 'lucide-react'

const menuItems = [
{
section: 'MAIN',
items: [
{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
{ name: 'Products', href: '/admin/products', icon: Package },
{ name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
{ name: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
],
},
{
section: 'MANAGEMENT',
items: [
{ name: 'Coupons', href: '/admin/coupons', icon: TicketPercent },
{ name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
],
},
]

export default function AdminSidebar() {
const pathname = usePathname()

return (
<aside className="flex h-screen w-[280px] flex-col border-r border-[#ECE3D8] bg-white">

{/* Logo */}
<div className="border-b border-[#ECE3D8] px-6 py-6">
<div className="flex items-center gap-3">
<Image src="/logo/logo.png" alt="AILURA" width={44} height={44} className="rounded-xl" />
<div>
<h2 className="text-[15px] font-light tracking-[6px] text-black">AILURA</h2>
<p className="text-[10px] tracking-[2px] text-black/35">Admin Panel</p>
</div>
</div>
</div>

{/* Nav */}
<div className="flex-1 overflow-y-auto px-4 py-5">
{menuItems.map((section) => (
<div key={section.section} className="mb-6">
<p className="mb-2 px-3 text-[9px] font-medium uppercase tracking-[4px] text-black/25">
{section.section}
</p>
{section.items.map((item) => {
const Icon = item.icon
const active = pathname === item.href
return (
<Link
key={item.href}
href={item.href}
className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] transition-all duration-200 ${
active
? 'bg-[#0E0B07] text-white shadow-md'
: 'text-black/55 hover:bg-[#F8F2EA] hover:text-black'
}`}
>
<Icon size={17} className={active ? 'text-[#C9A86A]' : ''} />
<span>{item.name}</span>
{active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C9A86A]" />}
</Link>
)
})}
</div>
))}
</div>

{/* Bottom user */}
<div className="border-t border-[#ECE3D8] px-4 py-4">
<div className="flex items-center gap-3 rounded-xl bg-[#F8F5F0] px-3 py-3">
<img src="https://i.pravatar.cc/100" alt="" className="h-9 w-9 rounded-full" />
<div>
<p className="text-[12px] font-medium text-black">Ailura Admin</p>
<p className="text-[10px] text-black/40">Administrator</p>
</div>
<div className="ml-auto h-2 w-2 rounded-full bg-green-400" />
</div>
</div>

</aside>
)
}