'use client'

import { motion } from 'framer-motion'

export default function AppointmentCTA() {
  return (
    <section
      id="appointment"
      className="bg-[#F8F5F0]"
    >
      <div className="relative overflow-hidden">

        {/* Background Image */}
        <img
          src="/collections/appointment-bg.jpg"
          alt="Luxury Appointment"
          className="
            w-full object-cover
            h-[200px]
            sm:h-[340px]
            md:h-[480px]
            lg:h-[680px]
            xl:h-[600px]
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            absolute inset-0
            flex flex-col justify-center
            px-5
            sm:px-8
            md:px-12
            lg:px-20
          "
        >
          {/* Label */}
          <div className="mb-2 flex items-center gap-3">
            <div className="h-[1px] w-6 bg-[#C9A86A]" />
            <p className="
              text-[8px] uppercase tracking-[4px] text-[#C9A86A]
              sm:text-[9px]
              md:text-[10px]
            ">
              RESERVE YOUR SEAT
            </p>
          </div>

          {/* Heading */}
          <h2
            className="
              text-white leading-[0.88]
              max-w-[180px] text-[20px]
              sm:max-w-[280px] sm:text-[38px]
              md:max-w-[420px] md:text-[58px]
              lg:max-w-[600px] lg:text-[80px]
              xl:text-[80px]
            "
          >
            Ready for your
            <br />
            <span className="italic text-[#C9A86A]">
              next appointment?
            </span>
          </h2>

          {/* Description — desktop only, short */}
          <p
            className="
              hidden lg:block
              mt-4 lg:mt-8 max-w-[440px]
              text-sm leading-relaxed text-white/80
            "
          >
            Step into the AILURA atelier. A private, unhurried hour designed entirely around you.
          </p>

          {/* Button */}
          <div  className="mt-4 lg:mt-7">
            <a
  href="#contact"
  className="
    inline-block
    bg-white text-black
    px-2 py-1 text-[7px]
    uppercase tracking-[3px]
    transition-all duration-300
    hover:bg-[#C9A86A] hover:text-white
    sm:px-5 sm:py-2.5 sm:text-[10px]
    md:px-6 md:py-3
    lg:px-8 lg:py-3.5 lg:text-xs
  "
>
  BOOK NOW →
</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}