'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { categoryGrid } from '../../data/categories'

export default function Categories() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  const handleClick = (item: { type: string; title: string }) => {
    if (item.type === 'service') {
      router.push('/#contact')
    } else {
      router.push(`/products?category=${item.title}`)
    }
  }

  return (
    <section
      id="collections"
      className="bg-[#F8F5F0] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 xl:px-20"
    >

      <div className="mb-7 flex items-center gap-4 sm:mb-8">
        <div className="h-[1px] w-8 bg-[#C9A86A] sm:w-10" />
        <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A] sm:text-[10px]">
          Premium Collections &amp; Services
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
            Explore our signature collections, and discover the salon services
            crafted to bring every look to life.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px]">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6"
        >
          {categoryGrid.map((item, index) => {
            const isService = item.type === 'service'
            // subtle alternating tilt — categories tilt left, services tilt right
            const tilt = isService ? 0.8 : -0.8

            return (
              <motion.div
                key={item.title}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotate: tilt }
                    : { opacity: 0, y: 40, rotate: 0 }
                }
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ rotate: 0, scale: 1.015 }}
                onClick={() => handleClick(item)}
                className="group relative cursor-pointer"
              >
                {/* Offset gold frame */}
                <div className="pointer-events-none absolute -bottom-2 -right-2 h-full w-full rounded-xl border border-[#C9A86A]/40 transition-all duration-500 group-hover:-bottom-1.5 group-hover:-right-1.5 sm:-bottom-3 sm:-right-3 sm:rounded-2xl" />

                <div className="relative overflow-hidden rounded-xl shadow-md transition-shadow duration-500 group-hover:shadow-xl sm:rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06] h-[160px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#C9A86A]/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute inset-2 rounded-lg border border-[#C9A86A]/0 transition-all duration-500 group-hover:inset-2.5 group-hover:border-[#C9A86A]/70 sm:inset-3 sm:rounded-xl sm:group-hover:inset-4" />

                  <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 sm:left-4 sm:top-4">
                    <span
                      className={`h-[3px] w-[3px] rounded-full ${
                        isService ? 'bg-[#E8D9BC]' : 'bg-[#C9A86A]'
                      }`}
                    />
                    <span
                      className={`text-[8px] tracking-[3px] sm:text-[10px] sm:tracking-[4px] ${
                        isService ? 'text-[#E8D9BC]/80' : 'text-white/60'
                      }`}
                    >
                      {isService ? 'SERVICE' : 'COLLECTION'} · 0{index + 1}
                    </span>
                  </div>

                  <div className="absolute right-2.5 top-2.5 h-5 w-5 rounded-tr-lg border-r border-t border-[#C9A86A]/0 opacity-0 transition-all duration-500 group-hover:border-[#C9A86A]/80 group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-6 sm:w-6" />

                  <div className="absolute bottom-0 left-0 w-full p-3 sm:p-5 md:p-6">
                    <div className="mb-2 h-[1px] w-8 origin-left scale-x-0 bg-[#C9A86A] transition-transform duration-700 group-hover:scale-x-100 sm:mb-3 sm:w-10" />
                    <h3
                      className="mb-1 font-light text-white sm:mb-1.5"
                      style={{ fontSize: 'clamp(16px, 3.5vw, 32px)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="mb-2 hidden text-[9px] leading-relaxed text-white/60 sm:mb-4 sm:block sm:text-sm sm:text-white/70">
                      {isService
                        ? 'Book a session with our expert stylists.'
                        : 'Luxury handcrafted nail collection.'}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[3px] text-[#D4B06A] sm:gap-2 sm:text-[10px] sm:tracking-[4px]">
                      {isService ? 'Book Now' : 'Discover'}
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

    </section>
  )
}