'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section
      id="about"
      className="
      relative
      overflow-hidden
      bg-[#F8F5F0]
      px-4
      py-2
      md:px-12
      md:py-8
      lg:px-20
      lg:py-15
    "
    >
      {/* Label */}

      <div className="mb-8 flex items-center gap-4">
        <div className="h-[1px] w-10 bg-[#C9A86A]" />

        <p
          className="
          text-[11px]
          uppercase
          tracking-[5px]
          text-[#C9A86A]
        "
        >
          The House of AILURA
        </p>

        <div className="h-[1px] w-10 bg-[#C9A86A]" />
      </div>

      {/* Desktop Layout */}

      <div className="relative hidden lg:block">

        {/* Huge Text */}

        <h2
          className="
          relative
          z-20
          text-[#111111]
          text-[220px]
          xl:text-[260px]
          2xl:text-[300px]
          leading-[0.82]
          tracking-[-10px]
        "
        >
          WHERE
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LUXURY
          <br />
          MEETS
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;ARTISTRY.
        </h2>

        {/* Floating Image */}

        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
          absolute
          right-0
          top-[180px]
          z-10
        "
        >
          <div
            className="
            absolute
            -bottom-8
            -right-8
            h-full
            w-full
            border
            border-[#DCC8A4]
          "
          />

          <img
            src="/collections/about.jpg"
            alt="About"
            className="
            relative
            h-[520px]
            w-[720px]
            object-cover
          "
          />
        </motion.div>

        {/* Description — luxury upgrade */}

        <div className="mt-20 max-w-[780px]">
          <span
            className="block leading-none text-[#C9A86A]/40 select-none"
            style={{ fontFamily: 'Georgia, serif', fontSize: '90px' }}
          >
            "
          </span>
          <p className="-mt-10 text-[24px] leading-[2] font-light text-black/55">
            AILURA creates handcrafted luxury nail
            collections inspired by{' '}
            <span className="italic text-[#C9A86A]">elegance, fashion</span>{' '}
            and modern beauty. Every design
            is curated to elevate confidence and
            celebrate individuality through premium
            craftsmanship.
          </p>
        </div>

        {/* Stats — luxury upgrade */}

        <div className="mt-12 flex border-t border-[#E7DED4] pt-10">
          {[
            { value: '500', suffix: '+', label: 'Happy Clients' },
            { value: '98', suffix: '%', label: 'Satisfaction' },
            { value: '1', suffix: '', label: 'Years Craft' },
          ].map((stat, i) => (
            <div key={stat.label} className="group flex items-center">
              {i > 0 && <div className="mr-16 h-14 w-[1px] bg-[#E7DED4]" />}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="h-[3px] w-[3px] rounded-full bg-[#C9A86A]" />
                  <span className="text-[9px] uppercase tracking-[3px] text-[#C9A86A]/70">
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="italic font-light leading-none text-[#111] transition-colors duration-500 group-hover:text-[#C9A86A]"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '52px' }}
                >
                  {stat.value}
                  <span className="text-[#C9A86A]">{stat.suffix}</span>
                </h3>
                <p className="mt-3 text-xs uppercase tracking-[4px] text-black/40">
                  {stat.label}
                </p>
              </div>
              {i < 2 && <div className="w-16" />}
            </div>
          ))}
        </div>
      </div>

{/* Mobile + Tablet */}

<div
  className="
  relative
  lg:hidden
  overflow-hidden

  min-h-[780px]

  sm:min-h-[850px]

  md:min-h-[950px]
"
>

  {/* Background Image */}

  <motion.div
    initial={{
      opacity: 0,
      scale: 0.9,
    }}
    whileInView={{
      opacity: 1,
      scale: 1,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      duration: 0.8,
    }}
    className="
    absolute

    right-[-40px]

    top-[320px]

    z-0
  "
  >
    <img
      src="/collections/about.jpg"
      alt="About"
      className="
      w-[180px]

      sm:w-[250px]

      md:w-[320px]

      object-cover

      opacity-90
    "
    />
  </motion.div>

  {/* Huge Text */}

  <div className="relative z-20">

    <h2
      className="
      text-[#111111]

      leading-[0.82]

      tracking-[-4px]

      text-[70px]

      sm:text-[90px]

      md:text-[120px]
    "
    >

      <div>
        WHERE
      </div>

      <div className="ml-8 sm:ml-16">
        LUXURY
      </div>

      <div className="ml-2">
        MEETS
      </div>

      <div className="ml-12 sm:ml-24">
        ARTISTRY.
      </div>

    </h2>

  </div>

  {/* Description — luxury upgrade */}

  <div className="relative z-20 mt-10 max-w-[320px]">
    <span
      className="block leading-none text-[#C9A86A]/40 select-none"
      style={{ fontFamily: 'Georgia, serif', fontSize: '48px' }}
    >
      "
    </span>
    <p className="-mt-5 text-[15px] leading-[1.9] text-black/55">
      AILURA creates handcrafted luxury nail
      collections inspired by{' '}
      <span className="italic text-[#C9A86A]">elegance, fashion</span>{' '}
      and modern beauty. Every design
      is curated to elevate confidence and
      celebrate individuality through premium
      craftsmanship.
    </p>
  </div>

  {/* Stats — luxury upgrade */}

  <div className="relative z-20 mt-12 grid grid-cols-3 gap-4 border-t border-[#E7DED4] pt-6">
    {[
      { value: '500', suffix: '+', label: 'Clients' },
      { value: '98', suffix: '%', label: 'Rating' },
      { value: '01', suffix: '', label: 'Years' },
    ].map((stat) => (
      <div key={stat.label}>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="h-[3px] w-[3px] rounded-full bg-[#C9A86A]" />
        </div>
        <h3
          className="italic font-light leading-none"
          style={{ fontFamily: 'Georgia, serif', fontSize: '30px' }}
        >
          {stat.value}
          <span className="text-[#C9A86A]">{stat.suffix}</span>
        </h3>
        <p className="mt-2 text-[10px] uppercase tracking-[3px] text-black/40">
          {stat.label}
        </p>
      </div>
    ))}
  </div>

</div>


    </section>
  )
}