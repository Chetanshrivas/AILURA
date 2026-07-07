'use client'

import { CheckCircle2, XCircle, TrendingUp } from 'lucide-react'

interface Props {
  coupons: any[]
}

export default function CouponAnalytics({ coupons }: Props) {

  const active = coupons.filter(c => c.active).length
  const inactive = coupons.filter(c => !c.active).length
  const used = coupons.reduce((acc, c) => acc + Number(c.used_count || 0), 0)

  const rows = [
    { label: 'Active Coupons', value: active, icon: CheckCircle2, tone: 'text-green-700' },
    { label: 'Inactive Coupons', value: inactive, icon: XCircle, tone: 'text-red-600' },
    { label: 'Total Usage', value: used, icon: TrendingUp, tone: 'text-[#8a6b35]' },
  ]

  return (
    <div className="rounded-[24px] border border-[#E9E2D9] bg-white p-7">

      <h2 className="mb-5 text-[16px] font-semibold text-black">Coupon Analytics</h2>

      <div className="space-y-3">
        {rows.map((row) => {
          const Icon = row.icon
          return (
            <div key={row.label} className="flex items-center justify-between rounded-xl border border-[#F0E9E0] bg-[#FCFAF8] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                  <Icon size={15} className={row.tone} />
                </div>
                <span className="text-[13px] text-black/60">{row.label}</span>
              </div>
              <span className="text-[16px] font-semibold text-black">{row.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}