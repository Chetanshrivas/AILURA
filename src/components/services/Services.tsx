'use client'

import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    title: 'Luxury Press-On Nails',
    description:
      'Handcrafted luxury nail collections designed for modern elegance.',
    image: '/collections/wedding.jpg',
  },
  {
    title: 'Bridal Nail Collections',
    description:
      'Curated wedding-ready nail artistry for your special day.',
    image: '/collections/holiday.jpg',
  },
  {
    title: 'Custom Nail Art',
    description:
      'Personalized designs tailored to your unique style.',
    image: '/collections/party.jpg',
  },
  {
    title: 'Nail Consultation',
    description:
      'Professional recommendations for your perfect look.',
    image: '/collections/hero.jpg',
  },
]

export default function Services() {
  const scrollToAppointment = () => {
    document
      .getElementById('appointment')
      ?.scrollIntoView({
        behavior: 'smooth',
      })
  }

  return (
    <section id="services" className="bg-[#F8F5F0] py-16 md:py-20">
      <div className="px-6 md:px-12 lg:px-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-8 md:w-10 bg-[#C9A86A]" />
          <p className="text-[8px] md:text-[9px] uppercase tracking-[4px] md:tracking-[5px] text-[#C9A86A]">
            Atelier Services
          </p>
          <div className="h-[1px] w-8 md:w-10 bg-[#C9A86A]" />
        </div>

        {/* Heading row */}
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <h2 className="text-[30px] sm:text-[36px] leading-none md:text-[50px] lg:text-[70px] font-light">
            Reserve Your Experience.
          </h2>

          <button
            onClick={scrollToAppointment}
            className="hidden lg:block text-xs uppercase tracking-[4px] border-b border-[#C9A86A] pb-2 hover:text-[#C9A86A] transition-colors"
          >
            Book Now →
          </button>
        </div>

        {/* ── Desktop Grid — rounded cards ── */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group transition-all duration-500"
            >
              <div
                className="overflow-hidden"
                style={{ borderRadius: '18px' }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-[420px] w-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-6 flex justify-between gap-4">
                <div>
                  <h3 className="text-3xl">{service.title}</h3>
                  <p className="mt-3 text-black/55">{service.description}</p>
                </div>

                <button
                  onClick={scrollToAppointment}
                  className="h-12 w-12 shrink-0 border flex items-center justify-center hover:bg-[#C9A86A] hover:text-white hover:border-[#C9A86A] transition-colors duration-300"
                  style={{ borderRadius: '12px' }}
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile / Tablet — rounded scroll cards ── */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            {services.map((service, index) => (
              <div
                key={service.title}
                className="flex-shrink-0 w-[68vw] sm:w-[300px]"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Rounded image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: '320px',
                    borderRadius: '18px',
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content below image */}
                <div className="mt-5">
                  <span className="text-[8px] uppercase tracking-[2px] text-[#C9A86A]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1.5 text-[19px] sm:text-[22px] font-light leading-tight text-black">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[11px] sm:text-[12px] leading-[1.6] text-black/45">
                    {service.description}
                  </p>
                  <button
                    onClick={scrollToAppointment}
                    className="mt-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[3px] text-black border-b border-[#C9A86A] pb-1 active:opacity-60 transition-opacity"
                  >
                    Book Now
                    <ArrowUpRight size={11} className="text-[#C9A86A]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {services.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-full transition-all ${i === 0 ? 'w-4 bg-[#C9A86A]' : 'w-1.5 bg-black/12'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}