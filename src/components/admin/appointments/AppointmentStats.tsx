'use client'

import { CalendarDays, Clock3, CheckCircle2, XCircle } from 'lucide-react'

interface Props {
  appointments: any[]
}

export default function AppointmentStats({ appointments }: Props) {

  const total = appointments.length
  const pending = appointments.filter(a => a.status === 'Pending').length
  const confirmed = appointments.filter(a => a.status === 'Confirmed').length
  const cancelled = appointments.filter(a => a.status === 'Cancelled').length

  const stats = [
    { title: 'Total Appointments', value: total, icon: CalendarDays },
    { title: 'Pending', value: pending, icon: Clock3 },
    { title: 'Confirmed', value: confirmed, icon: CheckCircle2 },
    { title: 'Cancelled', value: cancelled, icon: XCircle },
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