'use client'

import { Eye } from 'lucide-react'

interface Props {
  appointments: any[]
  search: string
  onView: (appointment: any) => void
}

export default function AppointmentsTable({ appointments, search, onView }: Props) {

  const query = search.toLowerCase()

  const filtered = appointments.filter((a) =>
    a.full_name?.toLowerCase().includes(query) ||
    a.email?.toLowerCase().includes(query) ||
    a.phone?.toLowerCase().includes(query)
  )

  // Sabse recent sabse upar — date + time combine karke sort karo
  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(`${a.appointment_date} ${a.appointment_time || ''}`).getTime()
    const dateB = new Date(`${b.appointment_date} ${b.appointment_time || ''}`).getTime()
    // agar created_at available hai to usse fallback / primary bhi use kar sakte ho
    if (!isNaN(dateA) && !isNaN(dateB)) return dateB - dateA
    return (b.created_at || '').localeCompare(a.created_at || '')
  })

  const statusStyle: Record<string, string> = {
    Confirmed: 'bg-green-50 text-green-700',
    Cancelled: 'bg-red-50 text-red-600',
    Pending: 'bg-[#F8F4EE] text-black/60',
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EEE7DE] px-7 py-5">
        <div>
          <h2 className="text-[16px] font-semibold text-black">Appointments</h2>
          <p className="mt-0.5 text-[12px] text-black/35">{sorted.length} total appointments</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F2EA]">
          <span className="text-[13px] font-semibold text-[#C9A86A]">{sorted.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0E9E0] bg-[#FCFAF8]">
              {['#', 'Customer', 'Service', 'Date', 'Time', 'Status', 'Action'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-[3px] text-black/35 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F5F0EA]">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm text-black/25">No appointments found</td>
              </tr>
            ) : (
              sorted.map((appointment, index) => (
                <tr key={appointment.id} className="group transition-colors hover:bg-[#FDFBF8]">

                  <td className="px-5 py-4">
                    <span className="text-[13px] font-medium text-black/40">{index + 1}</span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium text-black">{appointment.full_name}</p>
                      {index === 0 && (
                        <span className="rounded-md bg-[#C9A86A]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8a6b35]">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-black/35">{appointment.email}</p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[13px] text-black/60">{appointment.service}</span>
                  </td>

                  <td className="px-5 py-4 text-[12px] text-black/40">
                    {appointment.appointment_date}
                  </td>

                  <td className="px-5 py-4 text-[12px] text-black/40">
                    {appointment.appointment_time}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium ${statusStyle[appointment.status] || 'bg-gray-50 text-gray-500'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => onView(appointment)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] bg-[#FAF6F0] transition-all hover:border-[#C9A86A] hover:bg-[#C9A86A]/10"
                    >
                      <Eye size={14} className="text-[#8a6b35]" />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}