'use client'

import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/products' },
  { label: 'Appointments', href: '#contact' },
  { label: 'About', href: '#about' },
]

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Refund Policy']

export default function Footer() {
  return (
    <footer className="relative bg-[#0E0B07] text-white " style={{ marginTop: '-1px' }}>

      {/* Wave — absolute top pe, cream fill upar, dark neeche */}
      <div className="absolute top-0 left-0 w-full" style={{ zIndex: 1 }}>
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: 'clamp(40px, 5vw, 70px)', transform: 'translateY(-99%)' }}
        >
          <path
            d="M0,70 L0,35 C180,5 360,60 540,35 C720,10 900,60 1080,35 C1260,10 1350,45 1440,30 L1440,70 Z"
            fill="#0E0B07"
          />
        </svg>
      </div>

      {/* Main grid */}
      <div className="relative z-10 px-6 pt-16 pb-10 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

        
{/* Brand — luxury wordmark, ek hi word jaisa lagega */}
<div className="sm:col-span-2 lg:col-span-1">
  <p className="text-[30px] uppercase tracking-[10px] text-white/90 font-light">
    <span className="text-[#C9A86A]">A</span>ILURA
  </p>

  <div className="mt-4 flex items-center gap-2.5">
    <span className="h-[1px] w-3 bg-gradient-to-r from-[#C9A86A] to-transparent" />
    <span className="text-[6px] uppercase tracking-[4px] text-[#C9A86A]/70">
      Est. 2026 · Faridabad
    </span>
  </div>

  <p className="mt-6 text-[11px] leading-[2] text-white/35 max-w-[240px]">
    Premium luxury nail artistry inspired by{' '}
    <span className="text-white/55 italic">elegance, beauty</span>{' '}
    and cinematic fashion aesthetics.
  </p>

  <div className="mt-7 flex items-center gap-2.5">
    {[
      { icon: <Instagram size={13} strokeWidth={1.5} />, label: 'Instagram', href: 'https://www.instagram.com/ailura.studio?igsh=NDB6emI0cnE3M3Ez' },
      { icon: <Facebook size={13} strokeWidth={1.5} />, label: 'Facebook', href: 'https://www.facebook.com/share/1LhJ9mCsFo/' },
    ].map(({ icon, label, href }) => (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        className="group flex h-9 w-9 items-center justify-center border border-white/8 transition-all duration-300 hover:border-[#C9A86A]/60 hover:scale-105 hover:shadow-[0_0_12px_rgba(201,168,106,0.25)]">
        <span className="text-white/20 transition-colors duration-300 group-hover:text-[#C9A86A]">{icon}</span>
      </a>
    ))}
  </div>
</div>

          {/* Navigate */}
          <div>
            <p className="mb-6 text-[8px] uppercase tracking-[5px] text-[#C9A86A]/80">Navigate</p>
            <div className="flex flex-col gap-4">
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href}
                  className="group flex items-center w-fit text-[11px] tracking-wide text-white/35 hover:text-white transition-colors duration-300">
                  <span className="mr-0 h-px w-0 bg-[#C9A86A] transition-all duration-300 group-hover:mr-2.5 group-hover:w-3" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-6 text-[8px] uppercase tracking-[5px] text-[#C9A86A]/80">Contact</p>
            <div className="flex flex-col gap-4 text-[11px] leading-relaxed text-white/35">
              <a href="mailto:ailurastudio1616@gmail.com"
                className="hover:text-white transition-colors duration-300 break-all">
                ailurastudio1616@gmail.com
              </a>
              <a href="tel:+917827097159"
                className="hover:text-white transition-colors duration-300">
                +91 78270 97159
              </a>
              <p className="leading-[1.8]">
                Sco-41, Mansha Vega Street,<br />
                Sector-82, Faridabad 121007
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-6 text-[8px] uppercase tracking-[5px] text-[#C9A86A]/80">Atelier Hours</p>
            <div className="flex flex-col gap-4">
              {[
                { day: 'Mon – Fri', time: '10am – 9pm' },
                { day: 'Saturday', time: '10am – 9pm' },
                { day: 'Sunday', time: '10am – 9pm' },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between gap-4">
                  <span className="text-[11px] text-white/35">{day}</span>
                  <span className="text-[11px] text-white/55">{time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.05] px-6 py-5 md:px-12 lg:px-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] uppercase tracking-[3px] text-white/18">
            © 2026 Ailura. All rights reserved.
          </p>
          {/* <div className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((label) => (
              <span key={label} className="text-[9px] uppercase tracking-[2px] text-white/18 cursor-default">
                {label}
              </span>
            ))}
          </div> */}
        </div>
      </div>

    </footer>
  )
}