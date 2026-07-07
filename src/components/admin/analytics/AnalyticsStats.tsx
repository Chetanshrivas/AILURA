'use client'

import { IndianRupee, ShoppingCart, CalendarDays, TicketPercent } from 'lucide-react'

interface Props {
  revenue: number
  orders: number
  appointments: number
  coupons: number
}

export default function AnalyticsStats({ revenue, orders, appointments, coupons }: Props) {

  const stats = [
    { title: 'Revenue', value: `₹${revenue.toLocaleString()}`, icon: IndianRupee, subtitle: 'Total business revenue' },
    { title: 'Orders', value: orders, icon: ShoppingCart, subtitle: 'All orders placed' },
    { title: 'Appointments', value: appointments, icon: CalendarDays, subtitle: 'Total bookings' },
    { title: 'Coupons', value: coupons, icon: TicketPercent, subtitle: 'Marketing coupons' },
  ]

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#C9A86A]/10 blur-2xl" />

            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F2EA]">
                <Icon size={18} className="text-[#8a6b35]" />
              </div>

              <p className="text-[12px] text-black/35">{item.title}</p>
              <h2 className="mt-1.5 text-[26px] font-semibold text-black">{item.value}</h2>
              <p className="mt-1 text-[11px] text-black/35">{item.subtitle}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}