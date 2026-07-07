'use client'

export default function LuxuryStrip() {

  const items = [
    'Luxury Finish',
    'Long Lasting',
    'Ethical Beauty',
    'Couture Nails',
    'Handcrafted',
    'Atelier Made',
  ]

  return (

    <section
      className="
      overflow-hidden
     
      bg-[#F8F5F0]
      py-4

      md:py-5
    "
    >

      <div className="marquee">

        <div className="marquee-content">

          {[...items, ...items].map(
            (item, index) => (

              <div
                key={index}
                className="
                flex
                items-center
                gap-6

                md:gap-10
              "
              >

                <span
                  className="
                  text-xl
                  italic
                  font-serif
                  text-black/60

                  md:text-3xl

                  lg:text-3xl
                "
                >
                  {item}
                </span>

                <span
                  className="
                  text-[#C9A86A]

                  text-lg

                  md:text-2xl
                "
                >
                  ✦
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </section>

  )

}