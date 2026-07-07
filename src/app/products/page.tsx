'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { getProducts } from '../../service/products'
import { Product } from '../../types/product'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { Search, ShoppingBag, Eye } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const PAGE_SIZE = 12

export default function ProductsPage() {
  const addToCart = useCartStore((state) => state.addToCart)
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [sort, setSort] = useState('FEATURED')
  const [loading, setLoading] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Reset visible count whenever filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search, category, sort])

  const categories = useMemo(() => {
    return ['ALL', ...new Set(products.map((p) => p.category))]
  }, [products])

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'ALL' ? true : product.category === category
      return matchesSearch && matchesCategory
    })
    if (sort === 'PRICE_LOW') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'PRICE_HIGH') list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === 'FEATURED') list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return list
  }, [products, search, category, sort])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] px-4 pt-24 pb-20 sm:px-6 md:px-8 md:pt-28 lg:px-20 lg:pt-32">

  {/* ── Hero Heading ── */}
<div className="mb-10 md:mb-14 lg:mb-16">

  {/* Top row — label + return link */}
  <div className="flex items-center justify-between mb-5 md:mb-8">
    <div className="flex items-center gap-3">
      <div className="h-[1px] w-4 md:w-7 bg-[#C9A86A]" />
      <p className="text-[7px] md:text-[11px] uppercase tracking-[4px] md:tracking-[6px] text-[#C9A86A]">
        THE ATELIER
      </p>
    </div>
    <Link
      href="/"
      className="text-[8px] md:text-[9px] uppercase tracking-[3px] text-black/35 hover:text-[#C9A86A] transition-colors"
    >
      ← Return to Website
    </Link>
  </div>

  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <h1 className="font-light leading-[0.9] tracking-[-2px] text-[38px] sm:text-[52px] md:text-[72px] lg:text-[96px] xl:text-[100px]">
      Every set,{' '}
      <span className="text-[#C9A86A] italic">handcrafted</span>
      <br />
      in India.
    </h1>
    <p className="max-w-xs text-[10px] md:text-[11px] leading-[1.9] text-black/50 lg:mb-3 lg:max-w-[340px]">
      Curated nail collections sculpted for timeless elegance.
      Choose your mood.
    </p>
  </div>
</div>

      {/* ── Filters Row ── */}
<div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

  {/* Category Pills — horizontal scroll on mobile */}
  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
    {categories.map((item) => (
      <button
        key={item}
        onClick={() => setCategory(item)}
        className={`
          shrink-0 whitespace-nowrap
          px-4 py-2 sm:px-5 sm:py-2.5
          text-[10px] sm:text-[11px] uppercase tracking-[3px]
          transition-all duration-200
          ${category === item
            ? 'bg-black/85 text-white'
            : 'border border-black/15 bg-transparent hover:border-[#C9A86A] text-black/70'
          }
        `}
      >
        {item}
      </button>
    ))}
  </div>

  {/* Search + Sort — left/right split on mobile, normal row on sm+ */}
  <div className="flex items-center justify-between sm:justify-end sm:gap-4 shrink-0">
    <button
      onClick={() => setSearchOpen((v) => !v)}
      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[3px] text-black/50 hover:text-[#C9A86A] transition-colors"
    >
      <Search size={14} />
      <span>Search</span>
    </button>

  <div className="flex items-center gap-2">
  <span className="text-[9px] uppercase tracking-[3px] text-black/40">Sort</span>
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="border-0 border-b border-black/20 bg-transparent py-1 pr-1 pl-2 text-[9px] uppercase tracking-[2px] text-black/70 outline-none cursor-pointer appearance-none hover:border-[#C9A86A] transition-colors"
  >
    <option value="FEATURED">Featured</option>
    <option value="PRICE_LOW">Price: Low</option>
    <option value="PRICE_HIGH">Price: High</option>
  </select>
</div>
  </div>
</div>

        {/* Search Bar — collapsible */}
        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 opacity-100 mb-6 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35" />
            <input
              type="text"
              placeholder="Search collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full border-b border-black/15 bg-transparent pl-10 pr-4 text-[13px] outline-none placeholder:text-black/30 focus:border-[#C9A86A] transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 md:mb-12 h-[1px] w-full bg-black/8" />

        {/* ── Skeleton Loading — looks like real cards, no layout shift ── */}
        {loading && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] w-full bg-black/5" />
                <div className="mt-3 md:mt-4 space-y-2">
                  <div className="h-3 w-3/4 bg-black/8" />
                  <div className="h-2.5 w-1/2 bg-black/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Products Grid ── */}
        {!loading && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-[11px] uppercase tracking-[4px] text-black/35">
                No collections found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4 xl:gap-x-8">
                  {visibleProducts.map((product) => (
                    <div key={product.slug} className="group">

                      {/* Image */}
                      <div className="relative overflow-hidden bg-white">
                        <Link href={`/product/${product.slug}`}>
                          <img
                            src={product.image_urls?.[0] || '/placeholder.jpg'}
                            alt={product.title}
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                        </Link>

                        {/* Category badge */}
                        {product.category && (
                          <div className="absolute left-2 top-2 md:left-3 md:top-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[9px] uppercase tracking-[2px] text-black/70">
                            {product.category}
                          </div>
                        )}

                        {/* Discount badge */}
                        {product.discount_percent > 0 && (
                          <div className="absolute right-2 top-2 md:right-3 md:top-3 bg-black px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[9px] uppercase tracking-[2px] text-white">
                            -{product.discount_percent}%
                          </div>
                        )}

                        {/* Hover action bar — always visible on mobile, hover on desktop */}
                        <div className="
                          absolute bottom-0 left-0 right-0
                          flex items-center
                          /* mobile: always show */
                          translate-y-0 opacity-100
                          /* md+: hide then reveal on hover */
                          md:translate-y-full md:opacity-0
                          md:group-hover:translate-y-0 md:group-hover:opacity-100
                          transition-all duration-300
                        ">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart({ ...product, id: product.id!, quantity: 1 })
                            }}
                            aria-label="Add to cart"
                            className="flex flex-1 items-center justify-center gap-1.5 bg-black/85 py-2.5 md:py-3.5 text-[8px] md:text-[9px] uppercase tracking-[2px] md:tracking-[3px] text-white hover:bg-[#C9A86A] transition-colors duration-200 active:scale-95"
                          >
                            <ShoppingBag size={11} className="md:hidden" />
                            <ShoppingBag size={13} className="hidden md:block" />
                            <span>Add to Bag</span>
                          </button>

                          <Link
                            href={`/product/${product.slug}`}
                            aria-label="View product"
                            className="flex items-center justify-center bg-white border-l border-black/10 hover:bg-[#C9A86A] hover:text-white transition-colors duration-200 w-10 py-2.5 md:w-12 md:py-3.5"
                          >
                            <Eye size={12} className="md:hidden" />
                            <Eye size={14} className="hidden md:block" />
                          </Link>
                        </div>
                      </div>

                      {/* Card Info */}
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

                        {product.description && (
                          <p className="mt-1 text-[10px] md:text-[11px] leading-[1.6] text-black/40 line-clamp-1">
                            {product.description}
                          </p>
                        )}

                        {product.discount_percent > 0 && (
                          <span className="mt-0.5 block text-[10px] md:text-[11px] text-black/30 line-through">
                            ₹{product.original_price}
                          </span>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="mt-12 md:mt-16 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="border border-black/15 px-10 py-3.5 text-[10px] uppercase tracking-[4px] text-black/60 hover:border-[#C9A86A] hover:text-[#C9A86A] transition-all duration-300"
                    >
                      Load More — {filteredProducts.length - visibleCount} remaining
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  )
}