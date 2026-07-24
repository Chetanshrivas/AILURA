'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Agar video already cached/ready hai (fast refresh, back navigation) toh turant show karo
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true)
    }
  }, [])

  return (
    <section className="relative flex h-svh min-h-[620px] items-center justify-center overflow-hidden">

      {/* ── Poster Image — shows instantly while video loads, prevents black flash ── */}
      <img
        src="/collections/hero-poster.png"
        alt="AILURA Luxury Unisex Salon & Studio"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* ── Video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/MHC.mp4" type="video/mp4" />
      </video>

      {/* Bottom vignette to ground the text */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      {/* ── Content ── */}
      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center text-white sm:px-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4"
        >
          <div className="h-[1px] w-6 bg-[#C9A86A] opacity-80 sm:w-8" />
          <p className="text-[8px] uppercase tracking-[5px] text-white/60 sm:text-[9px] sm:tracking-[7px]">
            Luxury Unisex Salon & Studio
          </p>
          <div className="h-[1px] w-6 bg-[#C9A86A] opacity-80 sm:w-8" />
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-light leading-none"
          style={{
            fontSize: 'clamp(74px, 22vw, 180px)',
            letterSpacing: 'clamp(0.1em, 2vw, 0.22em)',
            color: '#ffffff',
            textShadow: `
              0 1px 0 #d4b96e,
              0 2px 0 #c9a85a,
              0 3px 0 #b8933f,
              0 4px 0 #a07c28,
              0 5px 0 #8a6610,
              0 6px 1px rgba(0,0,0,0.3),
              0 8px 6px rgba(0,0,0,0.25),
              0 14px 20px rgba(0,0,0,0.2),
              0 22px 32px rgba(0,0,0,0.15)
            `,
          }}
        >
          AILURA
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 1 }}
          className="mt-5 max-w-[260px] text-[11px] font-light leading-[1.95] tracking-[0.04em] text-white/55 sm:max-w-sm sm:text-[12px] sm:tracking-[0.06em]"
          style={{
            textShadow: '0 1px 0 rgba(201,168,106,0.3), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          Where refined grooming meets timeless beauty — crafted for every face, every style, every story.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="mt-8 flex w-full max-w-[280px] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
        >
          <Link
            href="#collections"
            className="flex w-full items-center justify-center bg-white py-4 text-[10px] uppercase tracking-[4px] text-black transition-all duration-300 hover:bg-[#C9A86A] hover:text-white sm:w-auto sm:px-8 sm:py-3.5"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              boxShadow: '0 2px 0 #bbb, 0 4px 0 #999, 0 6px 8px rgba(0,0,0,0.35)',
            }}
          >
            See Our Services
          </Link>

          <Link
            href="#contact"
            className="flex w-full items-center justify-center border border-white/25 py-4 text-[10px] uppercase tracking-[4px] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A86A]/60 hover:text-white sm:w-auto sm:px-8 sm:py-3.5"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              boxShadow: '0 2px 0 rgba(201,168,106,0.25), 0 4px 0 rgba(201,168,106,0.12), 0 6px 8px rgba(0,0,0,0.3)',
              textShadow: '0 1px 0 rgba(201,168,106,0.2), 0 2px 6px rgba(0,0,0,0.3)',
            }}
          >
            Reserve Your Slot
          </Link>
        </motion.div>

      </div>

      {/* ── Bottom Wave Divider ── */}
      <div className="absolute bottom-0 left-0 w-full leading-none" style={{ bottom: '-1px' }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: 'clamp(50px, 6vw, 80px)', display: 'block' }}
        >
          <path
            d="M0,80 L0,40 C180,10 360,70 540,40 C720,10 900,70 1080,40 C1260,10 1350,50 1440,35 L1440,80 Z"
            fill="#F8F5F0"
          />
        </svg>
      </div>

    </section>
  )
}