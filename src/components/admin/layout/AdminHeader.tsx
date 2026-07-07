'use client'

import { useRouter } from 'next/navigation'
import { Bell, Globe, LogOut } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { useEffect, useState } from 'react'

interface Notification {
id: string
type: string
title: string
message: string
route: string
read: boolean
createdAt: number
}

export default function AdminHeader() {
const router = useRouter()
const [email, setEmail] = useState('')
const [notifications, setNotifications] = useState<Notification[]>([])
const [showDropdown, setShowDropdown] = useState(false)

useEffect(() => {
supabase.auth.getUser().then(({ data: { user } }) => {
setEmail(user?.email || 'Administrator')
})

const saved = localStorage.getItem('admin_notifications')
if (saved) {
try { setNotifications(JSON.parse(saved)) } catch {}
}

const channel = supabase
.channel('admin-live')
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
const n: Notification = {
id: `order-${payload.new.id}-${Date.now()}`,
type: 'order',
title: '🛍️ New Order',
message: `#${payload.new.id} · ${payload.new.customer_name} · ₹${payload.new.total_amount}`,
route: '/admin/orders',
read: false,
createdAt: Date.now(),
}
setNotifications(prev => {
const updated = [n, ...prev].slice(0, 50)
localStorage.setItem('admin_notifications', JSON.stringify(updated))
return updated
})
})
.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, (payload) => {
const n: Notification = {
id: `appt-${payload.new.id}-${Date.now()}`,
type: 'appointment',
title: '📅 New Appointment',
message: `${payload.new.full_name} · ${payload.new.service} · ${payload.new.appointment_date}`,
route: '/admin/appointments',
read: false,
createdAt: Date.now(),
}
setNotifications(prev => {
const updated = [n, ...prev].slice(0, 50)
localStorage.setItem('admin_notifications', JSON.stringify(updated))
return updated
})
})
.subscribe()

return () => { supabase.removeChannel(channel) }
}, [])

const unreadCount = notifications.filter(n => !n.read).length

const save = (updated: Notification[]) => {
setNotifications(updated)
localStorage.setItem('admin_notifications', JSON.stringify(updated))
}

const markAllRead = (e: React.MouseEvent) => {
e.stopPropagation()
save(notifications.map(n => ({ ...n, read: true })))
}

const clearAll = (e: React.MouseEvent) => {
e.stopPropagation()
setNotifications([])
localStorage.removeItem('admin_notifications')
}

const handleNotifClick = (n: Notification) => {
save(notifications.map(x => x.id === n.id ? { ...x, read: true } : x))
setShowDropdown(false)
router.push(n.route)
}

const timeAgo = (ts: number) => {
const m = Math.floor((Date.now() - ts) / 60000)
if (m < 1) return 'Just now'
if (m < 60) return `${m}m ago`
const h = Math.floor(m / 60)
if (h < 24) return `${h}h ago`
return `${Math.floor(h / 24)}d ago`
}

const handleLogout = async () => {
await supabase.auth.signOut({ scope: 'global' })
router.push('/login')
router.refresh()
}

return (
<>
{showDropdown && (
<div className="fixed inset-0 z-[9998]" onClick={() => setShowDropdown(false)} />
)}

<header className="relative flex h-[72px] items-center justify-between bg-white px-8" style={{ zIndex: 9997 }}>

<div>
<h1 className="text-[15px] font-semibold text-black">Admin Panel</h1>
<p className="text-[11px] text-black/35">Manage products, orders & appointments</p>
</div>

<div className="flex items-center gap-3">

<button
onClick={() => router.push('/')}
className="flex items-center gap-2 rounded-xl border border-[#E8E1D8] px-4 py-2 text-[12px] text-black/60 hover:bg-[#F8F5F0] transition-all"
>
<Globe size={14} />
Website
</button>

{/* Bell */}
<div className="relative">
<button
onClick={() => setShowDropdown(p => !p)}
className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8E1D8] hover:bg-[#F8F5F0] transition-all"
>
<Bell size={16} />
{unreadCount > 0 && (
<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A86A] text-[9px] text-white font-medium">
{unreadCount > 9 ? '9+' : unreadCount}
</span>
)}
</button>

{showDropdown && (
<div
className="overflow-hidden rounded-2xl border border-[#E8E1D8] bg-white shadow-xl"
style={{ position: 'fixed', top: '80px', right: '32px', zIndex: 9999, width: '320px' }}
>
<div className="flex items-center justify-between border-b border-[#E8E1D8] px-4 py-3">
<div className="flex items-center gap-2">
<p className="text-[10px] uppercase tracking-[3px] text-black/50">Notifications</p>
{notifications.length > 0 && (
<span className="rounded-full bg-[#F8F2EA] px-2 py-0.5 text-[9px] text-[#C9A86A]">
{notifications.length}
</span>
)}
</div>
<div className="flex items-center gap-3">
{unreadCount > 0 && (
<button onClick={markAllRead} className="text-[10px] uppercase tracking-[2px] text-[#C9A86A] hover:text-[#b28e4d]">
Mark all read
</button>
)}
{notifications.length > 0 && (
<button onClick={clearAll} className="text-[10px] uppercase tracking-[2px] text-red-400 hover:text-red-600">
Clear
</button>
)}
</div>
</div>

{notifications.length === 0 ? (
<div className="py-10 text-center">
<Bell size={22} className="mx-auto mb-3 text-black/10" />
<p className="text-[12px] text-black/25">No notifications yet</p>
</div>
) : (
<div className="max-h-72 overflow-y-auto divide-y divide-black/5">
{notifications.map((n) => (
<div
key={n.id}
onClick={() => handleNotifClick(n)}
className={`cursor-pointer flex gap-3 items-start px-4 py-3 hover:bg-[#F8F5F0] transition-colors ${!n.read ? 'bg-[#FDF9F3]' : ''}`}
>
<div className="mt-2 shrink-0">
<div className={`h-2 w-2 rounded-full ${!n.read ? 'bg-[#C9A86A]' : 'bg-transparent'}`} />
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center justify-between gap-2">
<p className="text-[12px] font-medium text-black/80">{n.title}</p>
<span className="text-[9px] text-black/25 shrink-0">{timeAgo(n.createdAt)}</span>
</div>
<p className="mt-0.5 text-[11px] text-black/40 truncate">{n.message}</p>
</div>
</div>
))}
</div>
)}
</div>
)}
</div>

{/* User */}
<div className="flex items-center gap-2.5 rounded-xl border border-[#ECE3D8] px-3 py-2">
<img src="https://i.pravatar.cc/100" alt="" className="h-8 w-8 rounded-full" />
<div>
<p className="text-[12px] font-medium text-black">Ailura Admin</p>
<p className="text-[10px] text-black/40 truncate max-w-[120px]">{email}</p>
</div>
</div>

<button
onClick={handleLogout}
className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-[12px] text-red-600 transition-all hover:bg-red-100"
>
<LogOut size={14} />
Logout
</button>

</div>
</header>
</>
)
}