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
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover transition duration-700 group-hover:scale-105"
                style={{ height: 'clamp(260px, 45vw, 560px)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 text-[10px] tracking-[4px] text-white/60 sm:left-5 sm:top-5 sm:text-xs">
                0{index + 1}
              </div>
              <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-8">
                <h3 className="mb-1.5 font-light text-white" style={{ fontSize: 'clamp(22px, 4vw, 48px)' }}>
                  {item.title}
                </h3>
                <p className="mb-4 text-[11px] leading-relaxed text-white/60 sm:text-sm sm:text-white/70">
                  Luxury handcrafted nail collection.
                </p>
                <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[4px] text-[#D4B06A] sm:text-[10px]">
                  Discover
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}