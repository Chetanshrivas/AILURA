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

        {/* Description */}

       <div
  className="
  mt-20
  max-w-[780px]
  text-[26px]
"
>
  <p
    className="
    text-[24px]
    leading-[2]
    font-light
    text-black/55
  "
  >
            AILURA creates handcrafted luxury nail
            collections inspired by elegance,
            fashion and modern beauty. Every design
            is curated to elevate confidence and
            celebrate individuality through premium
            craftsmanship.
          </p>
        </div>

        {/* Stats */}

        <div
          className="
          mt-12
          flex
          gap-20
          border-t
          border-[#E7DED4]
          pt-10
        "
        >
          <div>
            <h3 className="text-5xl">500+</h3>
            <p className="mt-2 text-xs uppercase tracking-[4px] text-black/40">
              Happy Clients
            </p>
          </div>

          <div>
            <h3 className="text-5xl">98%</h3>
            <p className="mt-2 text-xs uppercase tracking-[4px] text-black/40">
              Satisfaction
            </p>
          </div>

          <div>
            <h3 className="text-5xl">1</h3>
            <p className="mt-2 text-xs uppercase tracking-[4px] text-black/40">
              Years Craft
            </p>
          </div>
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

  {/* Description */}

  <div
    className="
    relative
    z-20

    mt-10

    max-w-[320px]
  "
  >

    <p
      className="
      text-[15px]

      leading-[1.9]

      text-black/55
    "
    >
      AILURA creates handcrafted luxury nail
      collections inspired by elegance,
      fashion and modern beauty. Every design
      is curated to elevate confidence and
      celebrate individuality through premium
      craftsmanship.
    </p>

  </div>

  {/* Stats */}

  <div
    className="
    relative
    z-20

    mt-12

    grid
    grid-cols-3

    gap-4

    border-t
    border-[#E7DED4]

    pt-6
  "
  >

    <div>

      <h3
        className="
        text-3xl
        font-light
      "
      >
        500+
      </h3>

      <p
        className="
        mt-2

        text-[10px]

        uppercase

        tracking-[3px]

        text-black/40
      "
      >
        Clients
      </p>

    </div>

    <div>

      <h3
        className="
        text-3xl
        font-light
      "
      >
        98%
      </h3>

      <p
        className="
        mt-2

        text-[10px]

        uppercase

        tracking-[3px]

        text-black/40
      "
      >
        Rating
      </p>

    </div>

    <div>

      <h3
        className="
        text-3xl
        font-light
      "
      >
        01
      </h3>

      <p
        className="
        mt-2

        text-[10px]

        uppercase

        tracking-[3px]

        text-black/40
      "
      >
        Years
      </p>

    </div>

  </div>

</div>


    </section>
  )
}