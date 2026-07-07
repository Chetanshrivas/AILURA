'use client'

import { Package, ShoppingCart, AlertTriangle, IndianRupee, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../service/products'
import { getOrders } from '../../../service/orders'

export default function StatsCards() {
const [revenue, setRevenue] = useState(0)
const [orders, setOrders] = useState(0)
const [products, setProducts] = useState(0)
const [lowStock, setLowStock] = useState(0)
const [loading, setLoading] = useState(true)

useEffect(() => {
async function loadData() {
try {
const [productData, orderData] = await Promise.all([getProducts(), getOrders()])
const rev = orderData.reduce((acc, item) => acc + Number(item.total_amount || 0), 0)
setRevenue(rev)
setOrders(orderData.length)
setProducts(productData.length)
setLowStock(productData.filter((item) => item.stock <= 10).length)
} catch (error) {
console.error(error)
} finally {
setLoading(false)
}
}
loadData()
}, [])

const formatVal = (val: number) => {
if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`
return `₹${val}`
}

const stats = [
{
title: 'Total Revenue',
value: loading ? '—' : formatVal(revenue),
sub: 'All time earnings',
icon: IndianRupee,
accent: '#C9A86A',
bg: 'bg-[#FBF6EE]',
iconBg: 'bg-[#C9A86A]',
iconColor: 'text-white',
},
{
title: 'Total Orders',
value: loading ? '—' : String(orders),
sub: 'Orders placed',
icon: ShoppingCart,
accent: '#6366f1',
bg: 'bg-indigo-50',
iconBg: 'bg-indigo-500',
iconColor: 'text-white',
},
{
title: 'Products',
value: loading ? '—' : String(products),
sub: 'Active listings',
icon: Package,
accent: '#0ea5e9',
bg: 'bg-sky-50',
iconBg: 'bg-sky-500',
iconColor: 'text-white',
},
{
title: 'Low Stock',
value: loading ? '—' : String(lowStock),
sub: '10 units or less',
icon: AlertTriangle,
accent: '#ef4444',
bg: lowStock > 0 ? 'bg-red-50' : 'bg-[#F8F5F0]',
iconBg: lowStock > 0 ? 'bg-red-500' : 'bg-black/20',
iconColor: 'text-white',
},
]

return (
<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
{stats.map((item) => {
const Icon = item.icon
return (
<div
key={item.title}
className={`rounded-[28px] border border-[#ECE3D8] ${item.bg} p-6 transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}
>
<div className="flex items-start justify-between mb-5">
<div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}>
<Icon size={20} className={item.iconColor} />
</div>
<TrendingUp size={14} className="text-black/20 mt-1" />
</div>

<p className="text-[10px] uppercase tracking-[3px] text-black/40 mb-2">{item.title}</p>

{loading ? (
<div className="h-9 w-24 bg-black/8 rounded-lg animate-pulse mb-1" />
) : (
<h2 className="text-[32px] font-bold text-black leading-none mb-1" style={{ letterSpacing: '-1px' }}>
{item.value}
</h2>
)}

<p className="text-[11px] text-black/35">{item.sub}</p>
</div>
)
})}
</div>
)
}