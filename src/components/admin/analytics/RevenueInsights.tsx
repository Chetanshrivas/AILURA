'use client'

import { useEffect, useState } from 'react'
import { IndianRupee, ShoppingCart, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface Props {
  revenue: number
  orders: number
  orderList: any[]
}

export default function RevenueInsights({ revenue, orders, orderList }: Props) {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const avgOrderValue = orders ? Math.round(revenue / orders) : 0

  const toLocalKey = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const chartData = (() => {
    const days: { key: string; label: string; revenue: number }[] = []

    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = toLocalKey(d)
      const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      days.push({ key, label, revenue: 0 })
    }

    orderList?.forEach((order) => {
      if (!order.created_at) return
      const key = toLocalKey(new Date(order.created_at))
      const day = days.find(d => d.key === key)
      if (day) day.revenue += Number(order.total_amount || 0)
    })

    return days
  })()

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C9A86A]/10 blur-3xl" />

      <div className="relative flex items-center justify-between border-b border-[#F0EBE3] px-7 py-5">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[3px] text-[#C9A86A]">Analytics</p>
          <h2 className="text-[16px] font-semibold text-black">Revenue Analytics</h2>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[11px] text-green-600">
          <TrendingUp size={12} />
          <span>Live Data</span>
        </div>
      </div>

      <div className="relative p-7">

        <div className="mb-5 grid gap-4 lg:grid-cols-3">

          <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-br from-[#C9A86A] to-[#B99658] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-white/70">Total Revenue</p>
                <h3 className="mt-2 text-[26px] font-semibold">₹{revenue.toLocaleString()}</h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <IndianRupee size={15} />
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-[#ECE3D8] bg-[#FCFAF8] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-black/35">Total Orders</p>
                <h3 className="mt-2 text-[26px] font-semibold text-black">{orders}</h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F2EA]">
                <ShoppingCart size={15} className="text-[#8a6b35]" />
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-[#ECE3D8] bg-[#FCFAF8] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-black/35">Avg Order Value</p>
                <h3 className="mt-2 text-[26px] font-semibold text-black">₹{avgOrderValue}</h3>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8F2EA]">
                <TrendingUp size={15} className="text-[#8a6b35]" />
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-[16px] border border-[#ECE3D8] p-6">
          <p className="mb-4 text-[11px] uppercase tracking-[2px] text-black/35">Last 7 Days Revenue</p>

          <div
            className="relative w-full min-w-0 overflow-hidden"
            style={{ width: '100%', height: 220, minHeight: 220 }}
          >
            {!mounted ? (
              <div className="h-full w-full animate-pulse rounded-lg bg-[#FAF6F0]" />
            ) : (
              <ResponsiveContainer width="99%" height={220}>
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A86A" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#C9A86A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0E9E0" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.35)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'rgba(0,0,0,0.35)' }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #E9E2D9', fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#C9A86A" strokeWidth={2} fill="url(#revenueFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}