'use client'

import { TicketPercent, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'

interface Props {
  coupons: any[]
}

export default function CouponStats({ coupons }: Props) {

  const total = coupons.length
  const active = coupons.filter(c => c.active).length
  const inactive = coupons.filter(c => !c.active).length
  const totalUsed = coupons.reduce((acc, c) => acc + Number(c.used_count || 0), 0)

  const stats = [
    { title: 'Total Coupons', value: total, icon: TicketPercent },
    { title: 'Active', value: active, icon: CheckCircle2 },
    { title: 'Inactive', value: inactive, icon: XCircle },
    { title: 'Used', value: totalUsed, icon: TrendingUp },
  ]

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="rounded-[24px] border border-[#E9E2D9] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-black/35">{item.title}</p>
                <h2 className="mt-2 text-[26px] font-semibold text-black">{item.value}</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F2EA]">
                <Icon size={18} className="text-[#8a6b35]" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}