'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { categoryGrid } from '../../data/categories'

const defaultDetails: Record<string, string> = {
  service: 'Book a personalised session with our expert stylists.',
  collection: 'A luxury handcrafted collection, curated for elegance.',
}

export default function Categories() {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  const goTo = (item: { type: string; title: string }) => {
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
      {/* Section label */}
      <div className="mb-7 flex items-center gap-4 sm:mb-8">
        <div className="h-[1px] w-8 bg-[#C9A86A] sm:w-10" />
        <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A] sm:text-[10px]">
          Premium Collections &amp; Services
        </p>
        <div className="h-[1px] w-8 bg-[#C9A86A] sm:w-10" />
      </div>

      {/* Heading */}
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

      {/* Grid */}
      <div className="mx-auto max-w-[1100px]">
        <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
          {categoryGrid.map((item: any, index) => {
            const isService = item.type === 'service'
            const tilt = isService ? 0.8 : -0.8
            const details: string = item.details || defaultDetails[item.type] || ''

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotate: tilt }
                    : { opacity: 0, y: 40, rotate: 0 }
                }
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ rotate: 0 }}
                className="group relative"
              >
                {/* Offset gold frame */}
                <div className="pointer-events-none absolute -bottom-2 -right-2 h-full w-full rounded-xl border border-[#C9A86A]/40 transition-all duration-500 group-hover:-bottom-1.5 group-hover:-right-1.5 sm:-bottom-3 sm:-right-3 sm:rounded-2xl" />

                {/* MOBILE — tap-driven card (no flip) */}
                <div
                  onClick={() => goTo(item)}
                  className="group/mobile relative h-[160px] w-full cursor-pointer overflow-hidden rounded-xl shadow-md transition-shadow duration-300 active:shadow-xl sm:hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 ease-out group-active/mobile:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C9A86A]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-active/mobile:opacity-100" />
                  <div className="pointer-events-none absolute inset-2 rounded-lg border border-[#C9A86A]/0 transition-all duration-300 group-active/mobile:border-[#C9A86A]/70" />

                  <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
                    <span className={`h-[3px] w-[3px] rounded-full ${isService ? 'bg-[#E8D9BC]' : 'bg-[#C9A86A]'}`} />
                    <span className={`text-[8px] tracking-[3px] ${isService ? 'text-[#E8D9BC]/80' : 'text-white/60'}`}>
                      {isService ? 'SERVICE' : 'COLLECTION'} · 0{index + 1}
                    </span>
                  </div>

                  <div className="absolute right-2.5 top-2.5 h-5 w-5 rounded-tr-lg border-r border-t border-[#C9A86A]/0 opacity-0 transition-all duration-300 group-active/mobile:border-[#C9A86A]/80 group-active/mobile:opacity-100" />

                  <div className="absolute bottom-0 left-0 w-full p-3">
                    <div className="mb-1.5 h-[1px] w-8 origin-left scale-x-0 bg-[#C9A86A] transition-transform duration-500 group-active/mobile:scale-x-100" />
                    <h3 className="font-light text-white text-[15px] leading-tight">
                      {item.title}
                    </h3>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[3px] text-[#D4B06A]">
                      {isService ? 'Book Now' : 'Discover'}
                      <span className="transition-transform duration-300 group-active/mobile:translate-x-1.5">→</span>
                    </span>
                  </div>
                </div>

                {/* DESKTOP / TABLET — 3D flip on hover */}
                <div className="hidden sm:block" style={{ perspective: '1200px' }}>
                  <div className="relative h-[220px] w-full transition-transform duration-700 ease-out md:h-[260px] lg:h-[300px] xl:h-[340px] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                    {/* Front */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl shadow-md transition-shadow duration-500 group-hover:shadow-xl sm:rounded-2xl [backface-visibility:hidden]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                      <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 sm:left-4 sm:top-4">
                        <span className={`h-[3px] w-[3px] rounded-full ${isService ? 'bg-[#E8D9BC]' : 'bg-[#C9A86A]'}`} />
                        <span className={`text-[8px] tracking-[3px] sm:text-[10px] sm:tracking-[4px] ${isService ? 'text-[#E8D9BC]/80' : 'text-white/60'}`}>
                          {isService ? 'SERVICE' : 'COLLECTION'} · 0{index + 1}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-3 sm:p-5 md:p-6">
                        <div className="mb-2 h-[1px] w-8 bg-[#C9A86A] sm:mb-3 sm:w-10" />
                        <h3 className="font-light text-white" style={{ fontSize: 'clamp(16px, 3.5vw, 32px)' }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-xl md:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                      style={{ background: 'radial-gradient(120% 140% at 100% 0%, #2a1f14 0%, #1a1208 55%, #120d07 100%)' }}
                    >
                      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,106,0.18) 0%, transparent 70%)' }} />

                      <div>
                        <div className="mb-3 flex items-center gap-1.5">
                          <span className={`h-[3px] w-[3px] rounded-full ${isService ? 'bg-[#E8D9BC]' : 'bg-[#C9A86A]'}`} />
                          <span className={`text-[10px] tracking-[4px] ${isService ? 'text-[#E8D9BC]/80' : 'text-[#C9A86A]/70'}`}>
                            {isService ? 'SERVICE' : 'COLLECTION'} · 0{index + 1}
                          </span>
                        </div>

                        <h3
                          className="mb-3 leading-tight text-white"
                          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600, fontSize: 'clamp(16px, 3.2vw, 30px)' }}
                        >
                          {item.title}
                        </h3>

                        <div className="mb-3 h-[1px] w-10 bg-gradient-to-r from-[#C9A86A] to-transparent" />

                        <p className="max-w-[95%] text-[13px] leading-[1.8] text-white/60 lg:text-[14.5px]">
                          {details}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          goTo(item)
                        }}
                        className="group/btn inline-flex w-fit items-center gap-2 border-b border-[#C9A86A]/40 pb-1 text-[11px] uppercase tracking-[4px] text-[#D4B06A] transition-colors duration-300 hover:border-[#D4B06A] hover:text-white"
                      >
                        {isService ? 'Book Now' : 'Discover'}
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                      </button>

                      <div className="pointer-events-none absolute inset-3 rounded-xl border border-[#C9A86A]/30" />
                    </div>
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