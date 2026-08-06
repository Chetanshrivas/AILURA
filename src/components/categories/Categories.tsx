'use client'

import { useRef, useState } from 'react'
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

  // Touch has no hover, so a thumb touch flips the card immediately.
  // Navigation only happens via the explicit button on the back face.
  const [flippedTitle, setFlippedTitle] = useState<string | null>(null)

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
        <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
          {categoryGrid.map((item: any, index) => {
            const isService = item.type === 'service'
            const tilt = isService ? 0.8 : -0.8
            const details: string = item.details || defaultDetails[item.type] || ''
            const shortDetails: string = item.shortDetails || details
            const isFlipped = flippedTitle === item.title

            return (
              <motion.div
                key={item.title}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotate: tilt }
                    : { opacity: 0, y: 40, rotate: 0 }
                }
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ rotate: 0 }}
                onTouchStart={() => setFlippedTitle(item.title)}
                className="group relative"
                style={{ perspective: '1200px' }}
              >
                {/* Offset gold frame */}
                <div className="pointer-events-none absolute -bottom-2 -right-2 h-full w-full rounded-xl border border-[#C9A86A]/40 transition-all duration-500 group-hover:-bottom-1.5 group-hover:-right-1.5 sm:-bottom-3 sm:-right-3 sm:rounded-2xl" />

                {/* Flip container — desktop flips on hover, mobile flips on touch (isFlipped) */}
                <div
                  className={`relative h-[160px] w-full transition-transform duration-700 ease-out sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >

                  {/* FRONT face */}
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

                  {/* BACK face — short text on mobile, full detail on desktop */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl p-3 shadow-xl sm:rounded-2xl sm:p-5 md:p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{
                      background: 'radial-gradient(120% 140% at 100% 0%, #2a1f14 0%, #1a1208 55%, #120d07 100%)',
                    }}
                  >
                    {/* Subtle corner flourish */}
                    <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full sm:-right-8 sm:-top-8 sm:h-28 sm:w-28" style={{ background: 'radial-gradient(circle, rgba(201,168,106,0.18) 0%, transparent 70%)' }} />

                    <div>
                      <div className="mb-2 flex items-center gap-1.5 sm:mb-3">
                        <span className={`h-[3px] w-[3px] rounded-full ${isService ? 'bg-[#E8D9BC]' : 'bg-[#C9A86A]'}`} />
                        <span className={`text-[8px] tracking-[3px] sm:text-[10px] sm:tracking-[4px] ${isService ? 'text-[#E8D9BC]/80' : 'text-[#C9A86A]/70'}`}>
                          {isService ? 'SERVICE' : 'COLLECTION'} · 0{index + 1}
                        </span>
                      </div>

                      <h3
                        className="mb-2 leading-tight text-white sm:mb-3"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, fontSize: 'clamp(16px, 3.2vw, 30px)' }}
                      >
                        {item.title}
                      </h3>

                      <div className="mb-2 h-[1px] w-8 bg-gradient-to-r from-[#C9A86A] to-transparent sm:mb-3 sm:w-10" />

                      <p className="block max-w-[95%] text-[10px] leading-relaxed text-white/60 sm:hidden">
                        {shortDetails}
                      </p>
                      <p className="hidden max-w-[95%] text-[13px] leading-[1.8] text-white/60 sm:block lg:text-[14.5px]">
                        {details}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        goTo(item)
                      }}
                      className="group/btn inline-flex w-fit items-center gap-2 border-b border-[#C9A86A]/40 pb-1 text-[9px] uppercase tracking-[3px] text-[#D4B06A] transition-colors duration-300 hover:border-[#D4B06A] hover:text-white sm:text-[11px] sm:tracking-[4px]"
                    >
                      {isService ? 'Book Now' : 'Discover'}
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                    </button>

                    <div className="pointer-events-none absolute inset-2 rounded-lg border border-[#C9A86A]/30 sm:inset-3 sm:rounded-xl" />
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