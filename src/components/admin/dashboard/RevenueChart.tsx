'use client'

import { useEffect, useState } from 'react'
import { getOrders } from '../../../service/orders'
import { TrendingUp, ShoppingBag, IndianRupee, ArrowUpRight } from 'lucide-react'
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function RevenueChart() {
  const [revenue, setRevenue] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)
  const [paidRevenue, setPaidRevenue] = useState(0)
  const [pendingRevenue, setPendingRevenue] = useState(0)
  const [trendData, setTrendData] = useState<{ label: string; revenue: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadData() {
      try {
        const orders = await getOrders()

        const total = orders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0)

        const paid = orders
          .filter((o: any) => String(o.payment_status || '').toLowerCase().trim() === 'paid')
          .reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0)

        const pending = orders
          .filter((o: any) => String(o.payment_status || '').toLowerCase().trim() === 'pending')
          .reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0)

        setRevenue(total)
        setPaidRevenue(paid)
        setPendingRevenue(pending)
        setOrdersCount(orders.length)

        // Last 7 din ka revenue trend
        const days: { key: string; label: string; revenue: number }[] = []
        for (let i = 6; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const key = d.toISOString().split('T')[0]
          const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
          days.push({ key, label, revenue: 0 })
        }
        orders.forEach((o: any) => {
          if (!o.created_at) return
          const key = new Date(o.created_at).toISOString().split('T')[0]
          const day = days.find(d => d.key === key)
          if (day) day.revenue += Number(o.total_amount) || 0
        })
        setTrendData(days)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const formatRevenue = (val: number) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`
    return `₹${val}`
  }

  const pieData = [
    { name: 'Paid', value: paidRevenue, color: '#22c55e' },
    { name: 'Pending', value: pendingRevenue, color: '#f59e0b' },
  ]
  const hasPieData = paidRevenue + pendingRevenue > 0
  const showCharts = mounted && !loading

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F0EBE3] px-7 py-5">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-[3px] text-[#C9A86A]">Analytics</p>
          <h2 className="text-[16px] font-semibold text-black">Revenue Overview</h2>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[11px] text-green-600">
          <TrendingUp size={12} />
          <span>Live Data</span>
        </div>
      </div>

      <div className="p-7">

        {/* Main revenue card — dark luxury */}
        <div
          className="relative mb-5 overflow-hidden rounded-[20px] p-7"
          style={{ background: 'linear-gradient(135deg, #0E0B07 0%, #1a1208 60%, #2a1c0a 100%)' }}
        >
          <div className="absolute right-0 top-0 h-48 w-48 opacity-10" style={{ background: 'radial-gradient(circle, #C9A86A 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 h-32 w-32 opacity-5" style={{ background: 'radial-gradient(circle, #C9A86A 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[9px] uppercase tracking-[4px] text-[#C9A86A]/70">Total Revenue</p>
                <p className="text-[10px] text-white/30">All time earnings</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(201,168,106,0.15)', border: '1px solid rgba(201,168,106,0.25)' }}>
                <IndianRupee size={16} color="#C9A86A" />
              </div>
            </div>

            {loading ? (
              <div className="h-12 w-36 animate-pulse rounded-lg bg-white/10" />
            ) : (
              <h3 className="text-[42px] font-light text-white" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>
                {formatRevenue(revenue)}
              </h3>
            )}

            <div className="mt-4 flex items-center gap-1.5">
              <ArrowUpRight size={13} color="#C9A86A" />
              <span className="text-[11px] text-[#C9A86A]">{ordersCount} total orders placed</span>
            </div>
          </div>
        </div>

        {/* Paid + Pending row */}
        <div className="mb-5 grid grid-cols-2 gap-4">

          <div className="rounded-[16px] p-5" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[2px] text-green-600">Paid</p>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-100">
                <ShoppingBag size={13} className="text-green-600" />
              </div>
            </div>
            {loading ? (
              <div className="h-7 w-20 animate-pulse rounded bg-green-100" />
            ) : (
              <h4 className="text-[22px] font-semibold text-green-700">{formatRevenue(paidRevenue)}</h4>
            )}
            <p className="mt-1 text-[10px] text-green-500">Successfully collected</p>
          </div>

          <div className="rounded-[16px] p-5" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[2px] text-amber-600">Pending</p>
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100">
                <IndianRupee size={13} className="text-amber-600" />
              </div>
            </div>
            {loading ? (
              <div className="h-7 w-20 animate-pulse rounded bg-amber-100" />
            ) : (
              <h4 className="text-[22px] font-semibold text-amber-700">{formatRevenue(pendingRevenue)}</h4>
            )}
            <p className="mt-1 text-[10px] text-amber-500">Awaiting collection</p>
          </div>

        </div>

        {/* Revenue Trend + Split */}
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">

          <div className="rounded-[16px] border border-[#ECE3D8] p-5">
            <p className="mb-3 text-[11px] uppercase tracking-[2px] text-black/35">Last 7 Days</p>
            <div
              className="relative w-full min-w-0 overflow-hidden"
              style={{
                width: '100%',
                height: 220,
                minHeight: 220,
              }}
            >
              {!showCharts ? (
                <div className="h-full w-full animate-pulse rounded-lg bg-[#FAF6F0]" />
              ) : (
                <ResponsiveContainer
                  width="99%"
                  height={220}
                >
                  <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revTrendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A86A" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#C9A86A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0E9E0" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.35)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'rgba(0,0,0,0.35)' }} axisLine={false} tickLine={false} width={45} />
                    <Tooltip
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{ borderRadius: 12, border: '1px solid #E9E2D9', fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#C9A86A" strokeWidth={2} fill="url(#revTrendFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="rounded-[16px] border border-[#ECE3D8] p-5">
            <p className="mb-3 text-[11px] uppercase tracking-[2px] text-black/35">Payment Split</p>
            <div
              className="relative w-full min-w-0 overflow-hidden"
              style={{
                width: '100%',
                height: 220,
                minHeight: 220,
              }}
            >
              {!showCharts ? (
                <div className="h-full w-full animate-pulse rounded-lg bg-[#FAF6F0]" />
              ) : !hasPieData ? (
                <div className="flex h-full items-center justify-center text-[11px] text-black/25">No payment data</div>
              ) : (
                <ResponsiveContainer
                  width="99%"
                  height={220}
                >
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: 12, border: '1px solid #E9E2D9', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-black/50">Paid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-black/50">Pending</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}