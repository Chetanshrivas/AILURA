'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getPaginatedProducts, getCategories } from '../../service/products'
import { Product } from '../../types/product'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { Search, ShoppingBag, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'

const PAGE_SIZE = 16

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart)

  const [products, setProducts] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState<string[]>(['ALL'])

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [sort, setSort] = useState<'FEATURED' | 'PRICE_LOW' | 'PRICE_HIGH'>('FEATURED')
  const [searchOpen, setSearchOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const requestIdRef = useRef(0)
  const topRef = useRef<HTMLDivElement>(null)

  // ── Categories ek baar load ──
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  // ── URL ke ?category= ko initial filter mein set karo ──
  useEffect(() => {
    const urlCategory = searchParams.get('category')
    if (urlCategory) setCategory(urlCategory)
  }, [searchParams])

  // ── Search debounce: typing rukne ke 400ms baad hi query ──
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400)
    return () => clearTimeout(t)
  }, [searchInput])

  // ── Fetcher: sirf CURRENT page ke 12 products laata hai ──
  const fetchProducts = useCallback(
    async (pageNum: number) => {
      const myRequestId = ++requestIdRef.current
      setLoading(true)
      setError(false)

      try {
        const { data, count, totalPages: tp } = await getPaginatedProducts({
          page: pageNum,
          limit: PAGE_SIZE,
          category,
          search,
          sort,
        })

        if (myRequestId !== requestIdRef.current) return // stale response, ignore

        setProducts(data)          
        setTotalCount(count)
        setTotalPages(tp)
        setPage(pageNum)
      } catch (err) {
        if (myRequestId === requestIdRef.current) setError(true)
      } finally {
        if (myRequestId === requestIdRef.current) setLoading(false)
      }
    },
    [category, search, sort]
  )

  // ── Filter (category/search/sort) badalte hi page 1 se fetch ──
  useEffect(() => {
    fetchProducts(1)
  }, [category, search, sort]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Page number click karne pe fetch + top pe scroll ──
  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return
    fetchProducts(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── Page numbers ka array banate hain (max 5 dikhte hain, ... ke saath) ──
  const getPageNumbers = () => {
    const delta = 1
    const range: (number | string)[] = []
    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)

    range.push(1)
    if (left > 2) range.push('...')
    for (let i = left; i <= right; i++) range.push(i)
    if (right < totalPages - 1) range.push('...')
    if (totalPages > 1) range.push(totalPages)

    return range
  }

  return (
    <>
      <Navbar />

      <main ref={topRef} className="min-h-screen bg-[#F8F5F0] px-4 pt-24 pb-16 sm:px-6 md:px-8 md:pt-28 lg:px-20 lg:pt-32">

        <div className="mb-10 md:mb-14 lg:mb-16">
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

        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                  ${category.toLowerCase() === item.toLowerCase()
                    ? 'bg-black/85 text-white'
                    : 'border border-black/15 bg-transparent hover:border-[#C9A86A] text-black/70'
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

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
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="border-0 border-b border-black/20 bg-transparent py-1 pr-1 pl-2 text-[9px] uppercase tracking-[2px] text-black/70 outline-none cursor-pointer appearance-none hover:border-[#C9A86A] transition-colors"
              >
                <option value="FEATURED">Featured</option>
                <option value="PRICE_LOW">Price: Low</option>
                <option value="PRICE_HIGH">Price: High</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 opacity-100 mb-6 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35" />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-11 w-full border-b border-black/15 bg-transparent pl-10 pr-4 text-[13px] outline-none placeholder:text-black/30 focus:border-[#C9A86A] transition-colors"
            />
          </div>
        </div>

        <div className="mb-8 md:mb-12 h-[1px] w-full bg-black/8" />

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

        {!loading && error && (
          <div className="py-20 text-center text-[11px] uppercase tracking-[4px] text-red-500/60">
            Kuch gadbad ho gayi. Please try again.
            <button
              onClick={() => fetchProducts(page)}
              className="mt-4 block mx-auto border border-black/15 px-6 py-2 text-[10px] uppercase tracking-[3px] hover:border-[#C9A86A] hover:text-[#C9A86A]"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="py-20 text-center text-[11px] uppercase tracking-[4px] text-black/35">
                No collections found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-14 xl:grid-cols-4 xl:gap-x-8">
                  {products.map((product) => (
                    <div key={product.slug} className="group">
                      <div className="relative overflow-hidden bg-white">
                        <Link href={`/product/${product.slug}`}>
                          <img
                            src={product.image_urls?.[0] || '/placeholder.jpg'}
                            alt={product.title}
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                        </Link>

                        {product.category && (
                          <div className="absolute left-2 top-2 md:left-3 md:top-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[9px] uppercase tracking-[2px] text-black/70">
                            {product.category}
                          </div>
                        )}

                        {product.discount_percent > 0 && (
                          <div className="absolute right-2 top-2 md:right-3 md:top-3 bg-black px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[9px] uppercase tracking-[2px] text-white">
                            -{product.discount_percent}%
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

                {/* ── Real Pagination: page numbers, sirf current page ka data load ── */}
                {totalPages > 1 && (
                  <div className="mt-12 md:mt-16 flex flex-col items-center gap-3">
                    <p className="text-[9px] uppercase tracking-[3px] text-black/35">
                      Page {page} of {totalPages} — {totalCount} total
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        aria-label="Previous page"
                        className="flex h-9 w-9 items-center justify-center border border-black/15 hover:border-[#C9A86A] hover:text-[#C9A86A] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      {getPageNumbers().map((p, idx) =>
                        p === '...' ? (
                          <span key={`dots-${idx}`} className="px-2 text-[11px] text-black/30">
                            ···
                          </span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => goToPage(p as number)}
                            className={`
                              flex h-9 w-9 items-center justify-center text-[11px] transition-colors
                              ${p === page
                                ? 'bg-black/85 text-white'
                                : 'border border-black/15 hover:border-[#C9A86A] hover:text-[#C9A86A] text-black/60'
                              }
                            `}
                          >
                            {p}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        aria-label="Next page"
                        className="flex h-9 w-9 items-center justify-center border border-black/15 hover:border-[#C9A86A] hover:text-[#C9A86A] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
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