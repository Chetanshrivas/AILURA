'use client'

import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'

export default function OrderSuccessPage() {

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F5F0] px-5 py-16">

      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-[220px] w-[220px] rounded-full bg-[#C9A86A]/[0.08] blur-[50px] sm:-right-20 sm:-top-20 sm:h-[300px] sm:w-[300px] sm:blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-[180px] w-[180px] rounded-full bg-[#C9A86A]/[0.06] blur-[50px] sm:-bottom-16 sm:-left-16 sm:h-[240px] sm:w-[240px] sm:blur-[60px]" />

      <div className="relative mx-auto max-w-[380px] text-center sm:max-w-[520px]">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A86A]/35 sm:h-20 sm:w-20">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#C9A86A] sm:h-14 sm:w-14">
            <Check size={22} className="text-white sm:size-[26px]" strokeWidth={2.5} />
          </div>
        </div>

        <p className="mt-5 text-[9px] uppercase tracking-[5px] text-[#C9A86A] sm:mt-7 sm:tracking-[6px]">
          Order confirmed
        </p>

        <h1
          className="mt-2.5 font-light leading-[0.95] text-[#111] sm:mt-3.5"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px, 8vw, 56px)' }}
        >
          Thank you.
        </h1>

        <p className="mx-auto mt-3.5 max-w-[320px] text-[12px] leading-[1.8] text-black/45 sm:mt-4.5 sm:max-w-[360px] sm:text-[13px] sm:leading-[1.9]">
          Your ritual has been reserved. A confirmation has been sent to your inbox, and your atelier team is already at work.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-2 sm:mt-11">
          <Link
            href="/account/orders"
            className="bg-[#C9A86A] py-[15px] text-[10px] uppercase tracking-[3px] text-white transition-colors hover:bg-[#b8923a] sm:py-4"
          >
            View orders
          </Link>
          <Link
            href="/products"
            className="border border-black/12 py-[15px] text-[10px] uppercase tracking-[3px] text-[#111] transition-colors hover:border-black/25 sm:py-4"
          >
            Continue shopping
          </Link>
        </div>

        {/* Decorative divider */}
        <div className="mt-6 flex items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
          <span className="h-px w-6 bg-[#C9A86A]/30 sm:w-8" />
          <Sparkles size={12} className="text-[#C9A86A]/60 sm:size-[14px]" />
          <span className="h-px w-6 bg-[#C9A86A]/30 sm:w-8" />
        </div>

      </div>
    </main>
  )
}