'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { updateAppointmentStatus } from '../../../service/appointments'

interface Props {
  open: boolean
  onClose: () => void
  appointment: any
  refreshAppointments: () => Promise<void>
}

export default function AppointmentDetailsModal({
  open,
  onClose,
  appointment,
  refreshAppointments,
}: Props) {
  const [status, setStatus] = useState(appointment?.status || '')

  useEffect(() => {
    if (appointment) {
      setStatus(appointment.status || '')
    }
  }, [appointment])

  if (!open || !appointment) return null

  async function saveChanges() {
    try {
      const statusChanged = status !== appointment.status
      await updateAppointmentStatus(appointment.id, status)

      if (statusChanged) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'appointment_updated',
            appointment: {
              full_name: appointment.full_name,
              email: appointment.email,
              service: appointment.service,
              appointment_date: appointment.appointment_date,
              appointment_time: appointment.appointment_time,
              status,
            },
          }),
        })
      }

      await refreshAppointments()
      toast.success('Appointment Updated')
      onClose()
    } catch {
      toast.error('Update Failed')
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

        <div className="flex items-center justify-between border-b border-[#EEE7DE] px-7 py-5">
          <h2 className="text-[16px] font-semibold text-black">Appointment Details</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] bg-[#FAF6F0] hover:border-[#C9A86A] transition-colors"
          >
            <X size={14} className="text-[#8a6b35]" />
          </button>
        </div>

        <div className="space-y-6 p-7">

          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[3px] text-black/35 font-medium">Customer</p>
            <p className="text-[14px] font-medium text-black">{appointment.full_name}</p>
            <p className="text-[12px] text-black/40">{appointment.email}</p>
            <p className="text-[12px] text-black/40">{appointment.phone}</p>
          </div>

          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[3px] text-black/35 font-medium">Appointment</p>
            <p className="text-[13px] text-black/70">Service: <span className="text-black">{appointment.service}</span></p>
            <p className="text-[13px] text-black/70">Date: <span className="text-black">{appointment.appointment_date}</span></p>
            <p className="text-[13px] text-black/70">Time: <span className="text-black">{appointment.appointment_time}</span></p>
          </div>

          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[3px] text-black/35 font-medium">Notes</p>
            <p className="text-[13px] text-black/60">{appointment.notes || '—'}</p>
          </div>

          <div>
            <label className="mb-2 block text-[10px] uppercase tracking-[3px] text-black/35 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-[#E7E1D8] bg-white px-4 py-3 text-[13px] outline-none focus:border-[#C9A86A] transition-colors"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>

            {status !== appointment.status && (
              <p className="mt-2 text-[12px] text-[#C9A86A]">
                ✦ Customer will receive an email notification about this update.
              </p>
            )}
          </div>

          <button
            onClick={saveChanges}
            className="w-full rounded-xl bg-[#C9A86A] py-3.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  )
}