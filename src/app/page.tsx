import Navbar from '../components/layout/Navbar'
import Hero from '../components/hero/Hero'
import Categories from '../components/categories/Categories'
import LuxuryStrip from '../components/banner/LuxuryStrip'
import About from '../components/about/About'
import WhyWomenChoose from '../components/why-us/WhyChooseUs'
import Services from '../components/services/Services'
import AppointmentCTA from '../components/home/AppointmentCTA'
import FeaturedProducts from '../components/products/FeaturedProducts'
import Testimonials from '../components/testimonials/Testimonials'
import FAQ from '../components/faq/FAQ'
import Contact from '../components/contact/Contact'
import Footer from '../components/layout/Footer'
import WhatsAppButton from '../components/WA-auto/WhatsAppButton'
import WelcomePopup from '../components/Welcome/WelcomePopup'

import { getProducts } from '../service/products'

export default async function HomePage() {

  const products = await getProducts()

  return (
    <main>

      <WelcomePopup />
      <Navbar />

      <Hero />

      <WhatsAppButton />

      <LuxuryStrip />

      <Categories />

      <About />

      <WhyWomenChoose />

      <Services />

      <AppointmentCTA />

      <FeaturedProducts
        products={products || []}
      />

      <Testimonials />

      <FAQ />

      <Contact />

      <Footer />
    </main>
  )
}