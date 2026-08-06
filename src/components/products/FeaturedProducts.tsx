'use client'

import Link from 'next/link'
import { useCartStore } from '../../store/cartStore'
import { ShoppingBag, ArrowRight, Eye } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Product {
  id?: number
  title: string
  slug: string
  description: string
  price: number
  original_price: number
  discount_percent: number
  category: string
  stock: number
  featured: boolean
  image_urls: string[]
}

interface Props {
  products: Product[]
}

interface FlyingItem {
  id: number
  src: string
  startX: number
  startY: number
  startW: number
  startH: number
  endX: number
  endY: number
}

function getCartIconCenter(): { x: number; y: number } | null {
  const icons = document.querySelectorAll<HTMLElement>('[data-cart-icon="true"]')
  for (const icon of icons) {
    const rect = icon.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) {
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }
  }
  return null
}

// ── Product image with hover (desktop) / touch (mobile) carousel ──
// Koi IntersectionObserver nahi — sirf explicit interaction pe chalega
function  ProductImage({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const images = product.image_urls?.length ? product.image_urls : ['/placeholder.jpg']

  const startCarousel = () => {
    if (images.length <= 1) return
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length)
      }, 900)
    }, 10)
  }

  const stopCarousel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutRef.current = null
    intervalRef.current = null
    setActiveIndex(0)
  }

  useEffect(() => {
    return () => stopCarousel()
  }, [])

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        onMouseEnter={startCarousel}
        onMouseLeave={stopCarousel}
        onTouchStart={startCarousel}
        onTouchEnd={stopCarousel}
        onTouchCancel={stopCarousel}
        className="relative aspect-[4/5] w-full overflow-hidden"
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={product.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* {images.length > 1 && (
          <div className="absolute top-2 left-1/2 z-10 flex -translate-x-1/2 gap-1 md:top-3">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-3 bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )} */}
      </div>
    </Link>
  )
}

export default function FeaturedProducts({ products }: Props) {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8)
  const addToCart = useCartStore((state) => state.addToCart)

  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([])
  const [mounted, setMounted] = useState(false)
  const flyIdRef = useRef(0)

  useEffect(() => setMounted(true), [])

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault()

    addToCart({
      ...product,
      id: product.id!,
      quantity: 1,
    })

    const card = e.currentTarget.closest('.group')
    const imgEl = card?.querySelector('img')
    const cartCenter = getCartIconCenter()

    if (imgEl && cartCenter) {
      const rect = imgEl.getBoundingClientRect()
      const id = ++flyIdRef.current

      setFlyingItems((prev) => [
        ...prev,
        {
          id,
          src: imgEl.src,
          startX: rect.left,
          startY: rect.top,
          startW: rect.width,
          startH: rect.height,
          endX: cartCenter.x,
          endY: cartCenter.y,
        },
      ])

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('cart-bump'))
        setFlyingItems((prev) => prev.filter((f) => f.id !== id))
      }, 750)
    }
  }

  return (
    <section
      className="
        bg-[#F8F5F0]
        px-4 py-20
        md:px-8
        lg:px-16 lg:py-40
        xl:px-20
      "
    >
      <div className="mb-20">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#C9A86A]" />
          <p className="text-[11px] uppercase tracking-[6px] text-[#C9A86A]">
            THE ATELIER
          </p>
          <div className="h-[1px] w-12 bg-[#C9A86A]" />
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="
              font-light leading-[0.9] tracking-[-4px]
              text-[52px]
              sm:text-[68px]
              md:text-[88px]
              lg:text-[110px]
            "
          >
            Curated Luxury Nail
            <br />
            Collections
          </h2>

          <Link
            href="/products"
            className="
              hidden md:flex items-center gap-3
              text-[12px] uppercase tracking-[4px]
              text-black/70
              transition-all duration-300 hover:text-[#C9A86A]
            "
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div
        className="
          grid grid-cols-2 gap-4
          md:grid-cols-3 md:gap-8
          xl:grid-cols-4 xl:gap-10
        "
      >
        {featuredProducts.map((product) => (
          <div key={product.slug} className="group">

            <div className="relative overflow-hidden bg-white">
              <ProductImage product={product} />

              <div
                className="
                  pointer-events-none
                  absolute inset-0 bg-black/0
                  transition-all duration-500
                  hidden md:block
                  group-hover:bg-black/20
                "
              />

              {product.discount_percent > 0 && (
                <div
                  className="
                    absolute left-2 top-2
                    bg-black text-white
                    px-2 py-1
                    text-[8px] uppercase tracking-[2px]
                    md:left-4 md:top-4 md:px-3 md:py-2 md:text-[10px]
                  "
                >
                  <span className="md:hidden">
                    -{product.discount_percent}%
                  </span>
                  <span className="hidden md:inline">
                    {product.discount_percent}% OFF
                  </span>
                </div>
              )}

              <div className="
absolute bottom-0 left-0 right-0
flex items-center
translate-y-0 opacity-100
md:translate-y-full md:opacity-0
md:group-hover:translate-y-0 md:group-hover:opacity-100
transition-all duration-300
">

  <button
    onClick={(e) => handleAddToCart(e, product)}
    className="flex flex-1 items-center justify-center gap-1.5 bg-black py-2.5 md:py-3.5 text-[8px] md:text-[9px] uppercase tracking-[2px] md:tracking-[3px] text-white hover:bg-[#C9A86A] transition-colors duration-200"
  >
    <ShoppingBag size={11} className="md:hidden" />
    <ShoppingBag size={13} className="hidden md:block" />
    <span>Add to Bag</span>
  </button>

  <Link
    href={`/product/${product.slug}`}
    className="flex items-center justify-center bg-white border-l border-black/10 hover:bg-[#C9A86A] hover:text-white transition-colors duration-200 w-10 py-2.5 md:w-12 md:py-3.5"
  >
    <Eye size={12} className="md:hidden" />
    <Eye size={14} className="hidden md:block" />
  </Link>

</div>
            </div>

            <div className="mt-3 md:mt-4">

  <div className="flex items-baseline justify-between gap-1">

    <Link href={`/product/${product.slug}`}>

      <h3 className="text-[13px] sm:text-[15px] md:text-[17px] font-light leading-tight transition-colors duration-300 group-hover:text-[#C9A86A]">
        {product.title}
      </h3>

    </Link>

    <span className="shrink-0 text-[12px] sm:text-[14px] md:text-[15px] font-light text-black/80">
      ₹{product.price}
    </span>

  </div>

  {product.discount_percent > 0 && (
    <span className="mt-1 block text-[10px] md:text-[11px] text-black/30 line-through">
      ₹{product.original_price}
    </span>
  )}

</div>

          </div>
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[4px]"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[9999]">
            {flyingItems.map((item) => (
              <img
                key={item.id}
                src={item.src}
                alt=""
                className="fly-to-cart absolute rounded-lg object-cover shadow-xl"
                style={
                  {
                    left: item.startX,
                    top: item.startY,
                    width: item.startW,
                    height: item.startH,
                    '--end-x': `${item.endX - item.startX - item.startW / 2}px`,
                    '--end-y': `${item.endY - item.startY - item.startH / 2}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>,
          document.body
        )}
    </section>
  )
}