'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../../components/layout/Navbar'
import Footer from '../../../components/layout/Footer'
import { ArrowLeft, ArrowUpRight, CalendarDays } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import { getMyAppointments } from '../../../service/appointments'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

 useEffect(() => {
  const loadData = async () => {
    try {

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
        return
      }

      const data =
        await getMyAppointments(
          session.user.id
        )

      setAppointments(data || [])

    } catch (error) {

      console.log(error)

      router.replace('/login')

    } finally {

      setLoading(false)

    }
  }

  loadData()
}, [router])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-50 text-green-700 border-green-200'
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
  }

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
        Appointments
      </p>
    </div>
    <Link
      href="/account"
      className="inline-flex items-center gap-1.5 text-[8px] md:text-[9px] uppercase tracking-[3px] text-black/35 hover:text-[#C9A86A] transition-colors"
    >
      <ArrowLeft size={11} />
      <span className="hidden sm:inline">Back to Account</span>
      <span className="sm:hidden">Account</span>
    </Link>
  </div>

  <h1 className="text-[38px] font-light tracking-[-2px] md:text-[72px]">
    My Appointments.
  </h1>
  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/45">
    Review upcoming visits, appointment details and your luxury salon experiences.
  </p>
</div>

          {/* Content */}
          {loading ? (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="flex flex-col items-center gap-8">

      <div className="flex items-center gap-3 sm:gap-5">
        {['A','I','L','U','R','A'].map((letter, i) => (
          <span
            key={i}
            className={`leading-none opacity-0
              ${[1,3,5].includes(i) ? 'text-[#C9A86A]' : 'text-[#1a1208]'}`}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(36px, 8vw, 80px)',
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
        Loading
      </p>

    </div>
  </div>
          ) : appointments.length === 0 ? (
            <div className="border border-black/10 bg-white p-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A86A]/10">
                <CalendarDays size={34} className="text-[#C9A86A]" />
              </div>
              <h2 className="mt-6 text-3xl font-light">No Appointments Yet</h2>
              <p className="mt-3 text-sm text-black/45">
                Your future appointments will appear here.
              </p>
              <Link
                href="/#contact"
                className="mt-8 inline-flex h-12 items-center justify-center border border-[#C9A86A] px-8 text-[10px] uppercase tracking-[4px] text-[#C9A86A] transition-all hover:bg-[#C9A86A] hover:text-white"
              >
                Book Appointment
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {appointments.map((appointment) => (
                <Link
                  key={appointment.id}
                  href={`/account/appointments/${appointment.id}`}
                  className="group border border-black/10 bg-white p-6 md:p-8 transition-all duration-300 hover:border-[#C9A86A]/40 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-[10px] uppercase tracking-[4px] text-[#C9A86A]">
                        Appointment #{appointment.id}
                      </p>
                      <h2 className="mt-3 text-2xl font-light md:text-3xl truncate">
                        {appointment.service}
                      </h2>
                      <p className="mt-3 text-[12px] text-black/50">
                        {new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                      <p className="mt-1 text-[12px] text-black/40">
                        {appointment.appointment_time}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-black/20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C9A86A]"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1.5 text-[10px] capitalize tracking-wide ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="mt-6 border-t border-black/5 pt-5">
                    <span className="text-[10px] uppercase tracking-[4px] text-black/35 transition-colors group-hover:text-[#C9A86A]">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}