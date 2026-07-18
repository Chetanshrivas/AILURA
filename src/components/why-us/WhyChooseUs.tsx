'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Clock3, Hand, Truck, ArrowUpRight } from 'lucide-react'

const features = [
  {
    number: '01',
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'Luxury handcrafted nail collections made using premium materials and salon-grade finishing.',
  },
  {
    number: '02',
    icon: Clock3,
    title: 'Long Lasting',
    description: 'Designed for durability and comfort so every set stays beautiful for longer.',
  },
  {
    number: '03',
    icon: Hand,
    title: 'Handcrafted Designs',
    description: 'Every collection is carefully curated and crafted with attention to every detail.',
  },
  {
    number: '04',
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Premium packaging and reliable delivery for a seamless luxury experience.',
  },
]

export default function WhyWomenChoose() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative bg-[#F8F5F0] py-15 md:py-32 overflow-hidden">

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-12 lg:px-10">

        {/* Header */}
        <div className="mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#C9A86A]" />
              <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A]">
                Why Women Choose Us
              </p>
              <div className="h-[1px] w-8 bg-[#C9A86A]" />
            </div>
            <h2
              className="font-light leading-none text-[#111]"
              style={{ fontSize: 'clamp(32px, 5vw, 80px)' }}
            >
              The <span className="italic text-[#C9A86A]">AILURA</span> Difference.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xs text-[13px] leading-[1.9] text-black/40 lg:text-right"
          >
            Four pillars that define every piece we create — from the first sketch to your doorstep.
          </motion.p>
        </div>

        {/* ── Desktop ── */}
        <div ref={ref} className="hidden lg:block">
          {features.map((item, index) => {
            const Icon = item.icon
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex items-center gap-0 border-b border-black/8 first:border-t first:border-black/8 cursor-default overflow-hidden"
                style={{ padding: '28px 0' }}
              >
                {/* Dark bg sliding left to right on hover */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: '#0E0B07', transformOrigin: 'left', zIndex: 0 }}
                  initial={false}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.80, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Subtle gold radial glow behind icon on hover */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: '150px',
                    top: '50%',
                    width: 140,
                    height: 140,
                    marginTop: -70,
                    background: 'radial-gradient(circle, rgba(201,168,106,0.18) 0%, transparent 70%)',
                    zIndex: 0,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Big number */}
                <span
                  className="relative z-10 w-40 flex-shrink-0 italic font-light transition-all duration-500 select-none"
                  style={{
                    fontSize: 'clamp(56px, 5.5vw, 82px)',
                    fontFamily: 'Georgia, serif',
                    color: isHovered ? '#C9A86A' : 'rgba(0,0,0,0.06)',
                    lineHeight: 1,
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  {item.number}
                </span>

                {/* Icon */}
                <motion.div
                  className="relative z-10 mr-10 flex h-12 w-12 flex-shrink-0 items-center justify-center border"
                  style={{
                    borderColor: isHovered ? '#C9A86A' : 'rgba(0,0,0,0.1)',
                    background: isHovered ? 'rgba(201,168,106,0.08)' : 'transparent',
                  }}
                  animate={{
                    rotate: isHovered ? 8 : 0,
                    scale: isHovered ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Icon
                    size={18}
                    style={{ color: isHovered ? '#C9A86A' : 'rgba(0,0,0,0.3)' }}
                    className="transition-colors duration-500"
                  />
                </motion.div>

                {/* Title + gold underline */}
                <div className="relative z-10 w-72 flex-shrink-0">
                  <h3
                    className="font-light leading-tight transition-all duration-500"
                    style={{
                      fontSize: 'clamp(20px, 2vw, 30px)',
                      color: isHovered ? '#ffffff' : 'rgba(0,0,0,0.55)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <motion.div
                    className="mt-2 h-[1px] bg-[#C9A86A]"
                    style={{ transformOrigin: 'left' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>

                {/* Description */}
                <p
                  className="relative z-10 flex-1 text-[13px] leading-[1.9] transition-colors duration-500"
                  style={{ color: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)' }}
                >
                  {item.description}
                </p>

                {/* Arrow hint — fades in on hover */}
                <motion.div
                  className="relative z-10 ml-6 flex-shrink-0"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -8,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ArrowUpRight size={20} style={{ color: '#C9A86A' }} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Mobile ── */}
        <div className="lg:hidden grid grid-cols-1 gap-0">
          {features.map((item, index) => {
            const Icon = item.icon
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 400)}
                className="relative border-b border-black/8 py-8 first:border-t first:border-black/8 overflow-hidden"
              >
                {/* Dark bg sliding left to right on tap */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: '#0E0B07', transformOrigin: 'left', zIndex: 0 }}
                  initial={false}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div className="relative z-10 flex items-start gap-5">

                  {/* Number + icon col */}
                  <div className="flex flex-col items-center gap-2 w-12 flex-shrink-0">
                    <span
                      className="italic font-light leading-none select-none transition-colors duration-500"
                      style={{
                        fontSize: '32px',
                        fontFamily: 'Georgia, serif',
                        color: isHovered ? '#C9A86A' : 'rgba(0,0,0,0.06)',
                      }}
                    >
                      {item.number}
                    </span>
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center border"
                      style={{
                        borderColor: isHovered ? '#C9A86A' : 'rgba(201,168,106,0.3)',
                        background: isHovered ? 'rgba(201,168,106,0.08)' : 'transparent',
                      }}
                      animate={{ rotate: isHovered ? 8 : 0, scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon size={16} style={{ color: '#C9A86A' }} />
                    </motion.div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 pt-1">
                    <h3
                      className="text-[22px] font-light leading-tight transition-colors duration-500"
                      style={{ color: isHovered ? '#ffffff' : '#111' }}
                    >
                      {item.title}
                    </h3>
                    <motion.div
                      className="mt-1.5 mb-2 h-[1px] bg-[#C9A86A]"
                      style={{ transformOrigin: 'left' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <p
                      className="text-[12px] leading-[1.85] transition-colors duration-500"
                      style={{ color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}
                    >
                      {item.description}
                    </p>
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