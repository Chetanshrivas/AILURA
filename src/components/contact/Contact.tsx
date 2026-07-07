'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import { Phone, Mail, MapPin, Instagram, MessageCircle, ShieldCheck, Clock3, Gem, RotateCcw, Sparkles } from 'lucide-react'

export default function Contact() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '', email: '', phone: '',
    service: 'Luxury Manicure',
    appointment_date: '', appointment_time: '', notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error('Please login to book an appointment'); router.push('/login'); return }
    if (!formData.full_name || !formData.email || !formData.phone || !formData.appointment_date || !formData.appointment_time) {
      toast.error('Please fill all required fields'); return
    }
    try {
      setLoading(true)
      const { error } = await supabase
        .from('appointments')
        .insert([{
          user_id: user.id,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          notes: formData.notes,
          status: 'Pending',
        }])
      if (error) throw error

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'appointment_placed',
          appointment: {
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            notes: formData.notes,
          },
        }),
      })

      toast.success('Appointment request submitted successfully')
      setFormData({ full_name: '', email: '', phone: '', service: 'Luxury Manicure', appointment_date: '', appointment_time: '', notes: '' })
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: Phone, label: 'Telephone', value: '+91 78270 97159' },
    { icon: Mail, label: 'Email', value: 'ailurastudio1616@gmail.com' },
    { icon: MapPin, label: 'Atelier', value: 'Sco-41, Mansha Vega Street, Sector-82,\nFaridabad, Haryana 121007' },
    { icon: Instagram, label: 'Instagram', value: '@ailura.studio' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+91 78270 97159' },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-[#F8F5F0] px-5 py-16 mb-6 md:px-20 md:py-24 lg:px-32 lg:pb-32">

      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#C9A86A]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#C9A86A]/[0.05] blur-[100px]" />

      <div className="relative mx-auto">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* ── Left ── */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-10 bg-[#C9A86A]" />
              <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A]">Visit the Atelier</p>
            </div>

            <h2
              className="mb-6 font-light leading-[0.92] text-[#111]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 6vw, 72px)' }}
            >
              Begin your<br />
              <em className="italic text-[#C9A86A]">ritual.</em>
            </h2>

            <p className="mb-10 max-w-[300px] text-[11px] leading-[1.9] text-black/45">
              Reservations, bespoke requests, or simply to say hello. Our team replies within the day.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="group flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A86A]/30 transition-all duration-300 group-hover:border-[#C9A86A] group-hover:bg-[#C9A86A]/5">
                    <Icon size={16} className="text-[#C9A86A]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="mb-1.5 text-[8px] uppercase tracking-[4px] text-[#C9A86A]">{label}</p>
                    <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#111]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative divider */}
            <div className="mt-12 hidden items-center gap-3 lg:flex">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C9A86A]/40 to-transparent" />
              <Sparkles size={13} className="text-[#C9A86A]/60" />
              <div className="h-px flex-1 bg-gradient-to-l from-[#C9A86A]/40 to-transparent" />
            </div>

            <p className="mt-8 hidden max-w-[280px] text-[11px] italic leading-[1.9] text-black/35 lg:block" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}>
              "Every appointment is a quiet moment of craft, curated exclusively for you."
            </p>
          </div>

          {/* ── Right ── */}
          <div className="relative border border-[#E7DED0] bg-[#FCFBF8] p-7 md:p-10">

            {/* Corner accents */}
            <div className="pointer-events-none absolute -left-[1px] -top-[1px] h-6 w-6 border-l border-t border-[#C9A86A]" />
            <div className="pointer-events-none absolute -right-[1px] -top-[1px] h-6 w-6 border-r border-t border-[#C9A86A]" />
            <div className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-6 w-6 border-b border-l border-[#C9A86A]" />
            <div className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-6 w-6 border-b border-r border-[#C9A86A]" />

            <div className="mb-8 flex items-center justify-between border-b border-black/8 pb-6">
              <div>
                <p className="mb-1.5 text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Reservation Form</p>
                <h3
                  className="font-light text-[#111]"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '30px' }}
                >
                  Book Your Visit
                </h3>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A86A]/30 sm:flex">
                <Gem size={18} className="text-[#C9A86A]" strokeWidth={1.5} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Full Name *</label>
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange}
                    className="w-full border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors focus:border-[#C9A86A]" />
                </div>
                <div>
                  <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors focus:border-[#C9A86A]" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Phone *</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors focus:border-[#C9A86A]" />
                </div>
                <div>
                  <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Service *</label>
                  <select name="service" value={formData.service} onChange={handleChange}
                    className="w-full border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors focus:border-[#C9A86A]">
                    {['Luxury Manicure','Luxury Pedicure','Gel Extensions','Bridal Nail Art','Press-On Nails','Chrome Nails','Cat Eye Nails','Custom Nail Design','Nail Repair'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Date *</label>
                  <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange}
                    className="w-full border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors focus:border-[#C9A86A]" />
                </div>
                <div>
                  <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Time *</label>
                  <select name="appointment_time" value={formData.appointment_time} onChange={handleChange}
                    className="w-full border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors focus:border-[#C9A86A]">
                    <option value="">Select Time</option>
                    {[
                      '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
                      '12:00 PM','12:30 PM','01:00 PM','01:30 PM',
                      '02:00 PM','02:30 PM','03:00 PM','03:30 PM',
                      '04:00 PM','04:30 PM','05:00 PM','05:30 PM',
                      '06:00 PM','06:30 PM','07:00 PM','07:30 PM',
                    ].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2.5 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Notes</label>
                <textarea rows={4} name="notes" value={formData.notes} onChange={handleChange}
                  placeholder="Anything you'd like us to know..."
                  className="w-full resize-none border-0 border-b border-[#D8D0C3] bg-transparent py-2.5 text-[13px] text-[#111] outline-none transition-colors placeholder:text-black/20 focus:border-[#C9A86A]" />
              </div>

              <div className="border-t border-black/8 pt-6">
                <div className="mb-5 grid grid-cols-2 gap-3">
                  {[
                    { icon: ShieldCheck, text: 'Secure information' },
                    { icon: Clock3, text: '24hr confirmation' },
                    { icon: Gem, text: 'Luxury specialists' },
                    { icon: RotateCcw, text: 'Easy rescheduling' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-[11px] text-black/45">
                      <Icon size={13} className="text-[#C9A86A] shrink-0" strokeWidth={1.5} />
                      {text}
                    </div>
                  ))}
                </div>

                <div className="relative mb-5 overflow-hidden border border-[#E7DED0] bg-[#F8F5F0] p-4">
                  <div className="absolute right-0 top-0 h-16 w-16 bg-[#C9A86A]/5 blur-2xl" />
                  <p className="relative mb-2.5 text-[8px] uppercase tracking-[4px] text-[#C9A86A]">Booking Policy</p>
                  <ul className="relative space-y-1 text-[11px] leading-[1.8] text-black/45">
                    <li>• Appointment requests are manually reviewed.</li>
                    <li>• Confirmation sent after availability check.</li>
                    <li>• Rescheduling available before appointment time.</li>
                    <li>• Please arrive 10 minutes before your slot.</li>
                  </ul>
                </div>

                <button type="submit" disabled={loading}
                  className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden text-[10px] uppercase tracking-[5px] text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ background: '#1A130F' }}>
                  <span className="absolute inset-0 -translate-x-full bg-[#C9A86A] transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative flex items-center gap-2">
                    {loading ? 'Booking...' : 'Request Appointment'}
                  </span>
                </button>

                <p className="mt-4 text-center text-[10px] text-black/30">
                  By requesting, you agree to our booking terms & atelier etiquette.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}