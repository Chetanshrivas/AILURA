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
          className="text-[11px] uppercase tracking-[5px] text-[#C9A86A]"
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
          text-[220px]
          xl:text-[260px]
          2xl:text-[300px]
          leading-[0.82]
          tracking-[-10px]
        "
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600,
            color: '#161311',
            textShadow: `
              0 1px 0 #ddd1b8,
              0 2px 0 #d3c4a3,
              0 3px 0 #c8b78e,
              0 4px 0 #bda979,
              0 5px 0 #b29c64,
              0 6px 1px rgba(0,0,0,0.25),
              0 8px 8px rgba(0,0,0,0.2),
              0 16px 24px rgba(0,0,0,0.18),
              0 26px 40px rgba(0,0,0,0.14)
            `,
          }}
        >
          WHERE
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LUXURY
          <br />
          MEETS
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;ARTISTRY.
        </h2>

        {/* Ground Shadow — grounds the 3D text on the floor */}
        <div
          className="pointer-events-none absolute left-0 right-0 z-10"
          style={{
            top: '580px',
            height: '90px',
            background: 'radial-gradient(ellipse 60% 100% at center, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.06) 45%, transparent 75%)',
            filter: 'blur(6px)',
          }}
        />

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
            src="/collections/about1.png"
            alt="About"
            className="
            relative
            h-[520px]
            w-[720px]
            object-cover
          "
          />
        </motion.div>

        {/* Quote */}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 max-w-[620px] italic leading-[1.4] text-[#8a6610]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '36px', fontWeight: 500 }}
        >
          "Luxury is not just about how you look — it is about how you feel."
        </motion.p>

        {/* Description — luxury upgrade */}

        <div className="mt-10 max-w-[780px]">
          <span
            className="block leading-none text-[#C9A86A]/40 select-none"
            style={{ fontFamily: 'Georgia, serif', fontSize: '90px' }}
          >
            "
          </span>
          <p className="-mt-10 text-[19px] leading-[1.95] font-light text-black/55">
            Founded by <span className="italic text-[#C9A86A]">Isha Kandari</span>,
            AILURA was born from a vision to create a salon experience where
            elegance, artistry, and personalized care come together seamlessly.
            After a successful corporate career, Isha chose to pursue her
            lifelong passion for beauty and luxury — establishing AILURA in 2025.
          </p>
          <p className="mt-5 text-[19px] leading-[1.95] font-light text-black/55">
            What began as an exclusive Nail &amp; Lash Studio, driven by the trust
            and love of our clients, has now evolved into a full-fledged{' '}
            <span className="text-black/70">Luxury Unisex Salon &amp; Studio</span> —
            offering premium hair, skin, nail, lash, and beauty services under one roof.
          </p>

          <div className="mt-8 flex items-center gap-5">
            <div className="h-[1px] w-14 bg-[#C9A86A]" />
            <p
              className="text-[15px] uppercase tracking-[6px] text-black/60"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              Luxury &nbsp;·&nbsp; Artistry &nbsp;·&nbsp; Confidence
            </p>
          </div>
        </div>

        {/* Stats — luxury upgrade, 5 stats */}

        <div className="mt-12 grid grid-cols-5 border-t border-[#E7DED4] pt-10">
  {[
    { value: '10', suffix: '+', label: 'Certified Professionals' },
    { value: '12', suffix: '+', label: 'Years of Experience' },
    { value: '1500', suffix: '+', label: 'Services Delivered' },
    { value: '500', suffix: '+', label: 'Happy Clients' },
    { value: '2025', suffix: '', label: 'Established' },
  ].map((stat, i) => (
    <div key={stat.label} className="group">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="h-[3px] w-[3px] rounded-full bg-[#C9A86A]" />
        <span className="text-[9px] uppercase tracking-[3px] text-[#C9A86A]/70">
          0{i + 1}
        </span>
      </div>
      <h3
        className="italic font-light leading-none text-[#111] transition-colors duration-500 group-hover:text-[#C9A86A]"
        style={{ fontFamily: 'Georgia, serif', fontSize: '44px' }}
      >
        {stat.value}
        <span className="text-[#C9A86A]">{stat.suffix}</span>
      </h3>
      <p className="mt-3 text-xs uppercase tracking-[3px] text-black/40 max-w-[130px]">
        {stat.label}
      </p>
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
      src="/collections/about1.png"
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
      leading-[0.82]

      tracking-[-4px]

      text-[70px]

      sm:text-[90px]

      md:text-[120px]
    "
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 600,
        color: '#161311',
        textShadow: `
          0 1px 0 #ddd1b8,
          0 2px 0 #d3c4a3,
          0 3px 0 #c8b78e,
          0 4px 1px rgba(0,0,0,0.22),
          0 6px 6px rgba(0,0,0,0.18),
          0 12px 18px rgba(0,0,0,0.14)
        `,
      }}
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

    {/* Ground Shadow — grounds the 3D text on the floor */}
    <div
      className="pointer-events-none absolute left-0 right-0"
      style={{
        top: '245px',
        height: '40px',
        background: 'radial-gradient(ellipse 60% 100% at center, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.06) 45%, transparent 75%)',
        filter: 'blur(4px)',
      }}
    />

  </div>

  {/* Quote */}

  <motion.p
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative z-20 mt-8 max-w-[300px] italic leading-[1.35] text-[#8a6610]"
    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '20px', fontWeight: 500 }}
  >
    "Luxury is not just about how you look — it is about how you feel."
  </motion.p>

  {/* Description — luxury upgrade */}

  <div className="relative z-20 mt-6 max-w-[320px]">
    <span
      className="block leading-none text-[#C9A86A]/40 select-none"
      style={{ fontFamily: 'Georgia, serif', fontSize: '48px' }}
    >
      "
    </span>
    <p className="-mt-5 text-[14px] leading-[1.85] text-black/55">
      Founded by <span className="italic text-[#C9A86A]">Isha Kandari</span>,
      AILURA was born from a vision to create a salon experience where
      elegance, artistry, and personalized care come together seamlessly —
      evolving into a full-fledged{' '}
      <span className="text-black/70">Luxury Unisex Salon &amp; Studio</span>{' '}
      in 2025.
    </p>

    <div className="mt-6 flex items-center gap-3">
      <div className="h-[1px] lg-w-8 w-4 bg-[#C9A86A]" />
      <p
        className="text-[10px] uppercase tracking-[4px] text-black/60"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
      >
        Luxury · Artistry · Confidence
      </p>
    </div>
  </div>

  {/* Stats — luxury upgrade */}

  <div className="relative z-20 mt-12 grid grid-cols-3 gap-4 border-t border-[#E7DED4] pt-6">
    {[
      { value: '1500', suffix: '+', label: 'Clients' },
      { value: '98', suffix: '%', label: 'Rating' },
      { value: '2025', suffix: '', label: 'Established' },
    ].map((stat) => (
      <div key={stat.label}>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="h-[3px] w-[3px] rounded-full bg-[#C9A86A]" />
        </div>
        <h3
          className="italic font-light leading-none"
          style={{ fontFamily: 'Georgia, serif', fontSize: '20px' }}
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