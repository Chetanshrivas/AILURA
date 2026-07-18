'use client'

import { ArrowUpRight, Hand, Eye, Scissors, Heart, User, Users, Flower2, Droplet, Wand2, Crown, Sparkles } from 'lucide-react'
import { serviceCategories, ServiceCategory } from '../../data/services'

// ── Yahan tay karo homepage pe kaunsi 4 categories dikhengi (order bhi yahi se control hoga) ──
const featuredCategoryIds = ['nails', 'women', 'men', 'hair-essentials']

// ── Har category ke liye apni image daal do — replace karke apni photos lagao ──
const categoryImages: Record<string, string> = {
  nails: '/collections/S1.jfif',             
  women: '/collections/SW.jfif',            
  men: '/collections/SM.png',               
  'hair-essentials': '/collections/S4.jfif',
  eyelashes: '/collections/wedding.jpg',
  'wellness-rituals': '/collections/hero.jpg',
  facial: '/collections/party.jpg',
  'hands-feet': '/collections/hero.jpg',
  makeup: '/collections/wedding.jpg',
  'pre-bridal-package': '/collections/holiday.jpg',
  'korean-hair-spa': '/collections/party.jpg',
}

const categoryIcons: Record<string, any> = {
  nails: Hand,
  eyelashes: Eye,
  'hair-essentials': Scissors,
  'wellness-rituals': Heart,
  women: User,
  men: Users,
  facial: Flower2,
  'hands-feet': Droplet,
  makeup: Wand2,
  'pre-bridal-package': Crown,
  'korean-hair-spa': Sparkles,
}

function getServiceCount(category: ServiceCategory): number {
  if (category.services) return category.services.length
  if (category.sections) return category.sections.reduce((acc, s) => acc + s.services.length, 0)
  return 0
}

// ── featuredCategoryIds ke order mein hi categories nikalo ──
const featuredCategories = featuredCategoryIds
  .map((id) => serviceCategories.find((c) => c.id === id))
  .filter((c): c is ServiceCategory => c !== undefined)

export default function Services() {
  const scrollToAppointment = (categoryId?: string) => {
    if (categoryId) {
      sessionStorage.setItem('preselect_category', categoryId)
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
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
            onClick={() => scrollToAppointment()}
            className="hidden lg:block text-xs uppercase tracking-[4px] border-b border-[#C9A86A] pb-2 hover:text-[#C9A86A] transition-colors"
          >
            View All Services →
          </button>
        </div>

        {/* ── Desktop Grid — rounded cards ── */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {featuredCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Sparkles
            const count = getServiceCount(category)

            return (
              <div
                key={category.id}
                className="group transition-all duration-500"
              >
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: '18px' }}
                >
                  <img
                    src={categoryImages[category.id] || '/collections/hero.jpg'}
                    alt={category.title}
                    className="h-[420px] w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                    <Icon size={17} className="text-white" strokeWidth={1.5} />
                  </div>

                  <div className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[2px] text-white backdrop-blur-sm">
                    {count} services
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-4">
                  <div>
                    <h3 className="text-3xl capitalize">{category.title.toLowerCase()}</h3>
                    <p className="mt-3 text-black/55">
                      Curated {category.title.toLowerCase()} services, handcrafted by our specialists.
                    </p>
                  </div>

                  <button
                    onClick={() => scrollToAppointment(category.id)}
                    className="h-12 w-12 shrink-0 border flex items-center justify-center hover:bg-[#C9A86A] hover:text-white hover:border-[#C9A86A] transition-colors duration-300"
                    style={{ borderRadius: '12px' }}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile / Tablet — rounded scroll cards ── */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            {featuredCategories.map((category, index) => {
              const Icon = categoryIcons[category.id] || Sparkles
              const count = getServiceCount(category)

              return (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-[68vw] sm:w-[300px]"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: '320px', borderRadius: '18px' }}
                  >
                    <img
                      src={categoryImages[category.id] || '/collections/hero.jpg'}
                      alt={category.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                      <Icon size={15} className="text-white" strokeWidth={1.5} />
                    </div>

                    <div className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[9px] uppercase tracking-[1.5px] text-white backdrop-blur-sm">
                      {count} services
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="text-[8px] uppercase tracking-[2px] text-[#C9A86A]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1.5 text-[19px] sm:text-[22px] font-light leading-tight capitalize text-black">
                      {category.title.toLowerCase()}
                    </h3>
                    <p className="mt-2 text-[11px] sm:text-[12px] leading-[1.6] text-black/45">
                      Curated {category.title.toLowerCase()} services, handcrafted by our specialists.
                    </p>
                    <button
                      onClick={() => scrollToAppointment(category.id)}
                      className="mt-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[3px] text-black border-b border-[#C9A86A] pb-1 active:opacity-60 transition-opacity"
                    >
                      Book Now
                      <ArrowUpRight size={11} className="text-[#C9A86A]" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Scroll dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {featuredCategories.map((_, i) => (
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