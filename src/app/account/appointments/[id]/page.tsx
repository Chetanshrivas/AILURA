'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'
import Navbar from '../../../../components/layout/Navbar'
import Footer from '../../../../components/layout/Footer'
import { ArrowLeft, CalendarDays, Clock3, Sparkles, User, Phone, Mail, FileText } from 'lucide-react'
import { getAppointmentById } from '../../../../service/appointments'

export default function AppointmentDetailPage() {
  const params = useParams()
  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
  const loadAppointment = async () => {

    try {

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
        return
      }

      const data =
        await getAppointmentById(
          Number(params.id)
        )

      if (!data) {
        router.replace('/account/appointments')
        return
      }

      setAppointment(data)

    } catch (error) {

      console.log(error)

      router.replace(
        '/account/appointments'
      )

    } finally {

      setLoading(false)

    }
  }

  loadAppointment()
}, [params.id, router])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-50 border-green-200 text-green-700'
      case 'completed': return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'cancelled': return 'bg-red-50 border-red-200 text-red-700'
      default: return 'bg-yellow-50 border-yellow-200 text-yellow-700'
    }
  }

if (loading) return (
  <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0]">
    <div className="flex flex-col items-center gap-8">

      <div className="flex items-center gap-3 sm:gap-5">
        {['A','I','L','U','R','A'].map((letter, i) => (
          <span
            key={i}
            className={`leading-none opacity-0
              ${[1,3,5].includes(i) ? 'text-[#C9A86A]' : 'text-[#1a1208]'}`}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(56px, 12vw, 140px)',
              fontWeight: 400,
              animation: `letterDrop 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s forwards`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div
        className="h-[1px] bg-[#C9A86A]"
        style={{ animation: 'expandLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both' }}
      />

      <p
        className="text-[8px] uppercase tracking-[8px] text-[#C9A86A]/60"
        style={{ animation: 'fadeIn 0.6s ease 1.2s both' }}
      >
        Luxury Nail Atelier
      </p>

    </div>
  </div>
)
  if (!appointment) return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] text-sm text-black/40">
      Appointment Not Found
    </div>
  )

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] px-4 pt-28 pb-20 md:px-8 lg:px-20">
        <div className="mx-auto max-w-7xl">

         

          {/* Heading */}
          {/* Heading */}
<div className="mb-12">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="h-px w-4 md:w-8 bg-[#C9A86A]" />
      <p className="text-[7px] md:text-[10px] uppercase tracking-[4px] md:tracking-[5px] text-[#C9A86A]">
        Appointment Details
      </p>
    </div>
    <Link
      href="/account/appointments"
      className="inline-flex items-center gap-1.5 text-[8px] md:text-[9px] uppercase tracking-[3px] text-black/35 hover:text-[#C9A86A] transition-colors"
    >
      <ArrowLeft size={11} />
      <span className="hidden sm:inline">Back to Appointments</span>
      <span className="sm:hidden">Appointments</span>
    </Link>
  </div>

  <h1 className="text-[38px] font-light tracking-[-2px] md:text-[72px]">
    Luxury Session.
  </h1>
  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/45">
    View your appointment details and booking information.
  </p>
</div>

          {/* Grid */}
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

            {/* Left */}
            <div className="space-y-5">

              {/* Service */}
              <div className="border border-black/10 bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-[#C9A86A]" />
                  <p className="text-[10px] uppercase tracking-[4px] text-[#C9A86A]">Selected Service</p>
                </div>
                <h2 className="mt-5 text-3xl font-light md:text-4xl">{appointment.service}</h2>
              </div>

              {/* Notes */}
              <div className="border border-black/10 bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-[#C9A86A]" />
                  <h3 className="text-xl font-light">Notes</h3>
                </div>
                <p className="mt-5 text-[13px] leading-[1.9] text-black/55">
                  {appointment.notes || 'No special notes were provided for this appointment.'}
                </p>
              </div>

            </div>

            {/* Right */}
            <div className="space-y-5">

              {/* Status */}
              <div className="border border-black/10 bg-white p-6">
                <p className="mb-4 text-[9px] uppercase tracking-[4px] text-black/40">Appointment Status</p>
                <span className={`inline-flex rounded-full border px-4 py-1.5 text-[11px] capitalize tracking-wide ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>

              {/* Date */}
              <div className="border border-black/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} className="text-[#C9A86A]" />
                  <h3 className="text-[13px] font-light uppercase tracking-[3px] text-black/50">Date</h3>
                </div>
                <p className="mt-4 text-2xl font-light">
                  {new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>

              {/* Time */}
              <div className="border border-black/10 bg-white p-6">
                <div className="flex items-center gap-3">
                  <Clock3 size={16} className="text-[#C9A86A]" />
                  <h3 className="text-[13px] font-light uppercase tracking-[3px] text-black/50">Time</h3>
                </div>
                <p className="mt-4 text-2xl font-light">{appointment.appointment_time}</p>
              </div>

              {/* Client Info */}
              <div className="border border-black/10 bg-white p-6">
                <p className="mb-5 text-[9px] uppercase tracking-[4px] text-[#C9A86A]">Client Information</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User size={14} className="shrink-0 text-[#C9A86A]" />
                    <span className="text-[13px] text-black/70">{appointment.full_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="shrink-0 text-[#C9A86A]" />
                    <span className="break-all text-[13px] text-black/70">{appointment.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={14} className="shrink-0 text-[#C9A86A]" />
                    <span className="text-[13px] text-black/70">{appointment.phone}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}