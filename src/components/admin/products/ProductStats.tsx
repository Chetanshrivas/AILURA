'use client'

import { Package, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

interface Props {
  products: any[]
}

export default function ProductStats({ products }: Props) {
  const total = products.length
  const active = products.filter((p) => p.stock > 10).length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length
  const outStock = products.filter((p) => p.stock === 0).length

  const stats = [
    { title: 'Total Products', value: total, icon: Package, bg: 'bg-[#F8F2EA]', color: 'text-[#C9A86A]' },
    { title: 'Active Products', value: active, icon: CheckCircle2, bg: 'bg-green-50', color: 'text-green-600' },
    { title: 'Low Stock', value: lowStock, icon: AlertTriangle, bg: 'bg-orange-50', color: 'text-orange-500' },
    { title: 'Out Of Stock', value: outStock, icon: XCircle, bg: 'bg-red-50', color: 'text-red-500' },
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
                <h2 className="mt-3 text-[36px] font-light text-black leading-none">{item.value}</h2>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}>
                <Icon size={20} className={item.color} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}