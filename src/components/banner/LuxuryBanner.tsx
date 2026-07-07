
'use client'

import { motion } from 'framer-motion'

export default function LuxuryBanner() {
  return (
    <section className="bg-[#F5ECE3] px-6 py-10 md:px-12">

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-[40px]"
      >

        <img
          src="/banner/luxury-banner.jpeg"
          alt="Luxury Banner"
          className="w-full object-cover"
        />

      </motion.div>

    </section>
  )
}

