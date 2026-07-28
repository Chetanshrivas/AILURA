'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { categories } from '../../data/categories'

export default function Categories() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <section
      id="collections"
      className="bg-[#F8F5F0] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 xl:px-20"
    >

      <div className="mb-7 flex items-center gap-4 sm:mb-8">
        <div className="h-[1px] w-8 bg-[#C9A86A] sm:w-10" />
        <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A] sm:text-[10px]">
          Premium Collections
        </p>
        <div className="h-[1px] w-8 bg-[#C9A86A] sm:w-10" />
      </div>

      <div className="mb-10 grid gap-5 sm:mb-14 lg:mb-16 lg:grid-cols-[1.4fr_0.6fr] lg:gap-8">
        <h2
          className="leading-[0.95] text-[#1A1A1A]/70"
          style={{ fontSize: 'clamp(34px, 8vw, 92px)' }}
        >
          Curated Editions for every occasion.
        </h2>
        <div className="flex items-center lg:justify-end">
          <p className="max-w-[320px] text-[11px] leading-[1.8] text-black/45 sm:text-xs lg:text-sm">
            Four signature collections designed for every moment — from luxury parties and elegant weddings to modern work days and holiday escapes.
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8"
      >
        {categories.map((item, index) => (
          <motion.div
            key={item.title}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            onClick={() => router.push(`/products?category=${item.title}`)}
            className="group relative cursor-pointer"
          >
            {/* Offset gold frame — sits behind the card, echoes the About section's bordered-image motif */}
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[#C9A86A]/40 transition-all duration-500 group-hover:-bottom-2 group-hover:-right-2" />

            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
                style={{ height: 'clamp(260px, 45vw, 560px)' }}
              />

              {/* Base gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

              {/* Gold wash on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#C9A86A]/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              {/* Inner gold border that reveals on hover */}
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-[#C9A86A]/0 transition-all duration-500 group-hover:inset-4 group-hover:border-[#C9A86A]/70 sm:inset-4 sm:group-hover:inset-5" />

              {/* Index number */}
              <div className="absolute left-4 top-4 flex items-center gap-2 sm:left-5 sm:top-5">
                <span className="h-[3px] w-[3px] rounded-full bg-[#C9A86A]" />
                <span className="text-[10px] tracking-[4px] text-white/60 sm:text-xs">
                  0{index + 1}
                </span>
              </div>

              {/* Corner mark, top-right — appears on hover for a finished, tailored feel */}
              <div className="absolute right-4 top-4 h-6 w-6 rounded-tr-lg border-r border-t border-[#C9A86A]/0 opacity-0 transition-all duration-500 group-hover:border-[#C9A86A]/80 group-hover:opacity-100 sm:right-5 sm:top-5" />

              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-8">
                <div className="mb-3 h-[1px] w-10 origin-left scale-x-0 bg-[#C9A86A] transition-transform duration-700 group-hover:scale-x-100" />
                <h3
                  className="mb-1.5 font-light text-white"
                  style={{ fontSize: 'clamp(22px, 4vw, 48px)' }}
                >
                  {item.title}
                </h3>
                <p className="mb-4 text-[11px] leading-relaxed text-white/60 sm:text-sm sm:text-white/70">
                  Luxury handcrafted nail collection.
                </p>
                <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[4px] text-[#D4B06A] sm:text-[10px]">
                  Discover
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}