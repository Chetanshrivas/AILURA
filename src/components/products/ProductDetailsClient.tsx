// 'use client'

// import { useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import { useCartStore } from '../../store/cartStore'
// import { Product } from '../../types/product'
// import { ShoppingBag, Truck, RefreshCw, Sparkles, Check } from 'lucide-react'
// import Link from 'next/link'

// interface Props {
//   product: Product
// }

// const FEATURES = [
//   'Reusable up to 3 wears with care',
//   'Hypoallergenic, cruelty-free formulation',
//   'Includes prep kit, glue & wooden stick',
//   'Sizing across 12 widths for a couture fit',
// ]

// export default function ProductDetailsClient({ product }: Props) {
//   const router = useRouter()
//   const addToCart = useCartStore((state) => state.addToCart)

//   const [selectedIndex, setSelectedIndex] = useState(0)
//   const [fadeKey, setFadeKey] = useState(0)
//   const [quantity, setQuantity] = useState(1)
//   const [added, setAdded] = useState(false)
//   const thumbsRef = useRef<HTMLDivElement>(null)

//   // Touch swipe state
//   const touchStartX = useRef<number>(0)
//   const touchEndX = useRef<number>(0)

//   const images = product.image_urls || []
//   const selectedImage = images[selectedIndex]

//   const handleSelectImage = (index: number) => {
//     setSelectedIndex(index)
//     setFadeKey(k => k + 1)
//   }

//   const handlePrev = () => {
//     const newIndex = (selectedIndex - 1 + images.length) % images.length
//     handleSelectImage(newIndex)
//   }

//   const handleNext = () => {
//     const newIndex = (selectedIndex + 1) % images.length
//     handleSelectImage(newIndex)
//   }

//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX
//   }

//   const handleTouchEnd = (e: React.TouchEvent) => {
//     touchEndX.current = e.changedTouches[0].clientX
//     const diff = touchStartX.current - touchEndX.current
//     if (Math.abs(diff) > 40) {
//       if (diff > 0) handleNext()
//       else handlePrev()
//     }
//   }

//   const handleAddToCart = () => {
//     addToCart({ ...product, id: product.id!, quantity })
//     setAdded(true)
//     setTimeout(() => setAdded(false), 2000)
//   }

//   const handleBuyNow = () => {
//     const cartItems = useCartStore.getState().items
//     const alreadyInCart = cartItems.find((i) => i.id === product.id)
//     if (!alreadyInCart) {
//       addToCart({ ...product, id: product.id!, quantity })
//     }
//     router.push('/cart')
//   }

//   return (
//     <div>
//       <style>{`
//         @keyframes imgFadeIn {
//           from { opacity: 0; transform: scale(1.03); }
//           to   { opacity: 1; transform: scale(1); }
//         }
//         .img-fade {
//           animation: imgFadeIn 0.45s cubic-bezier(0.25,0.1,0.25,1) both;
//         }
//       `}</style>

//       {/* Back Link */}
//       <Link
//         href="/products"
//         className="mb-4 md:mb-10 inline-flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[4px] text-black/40 hover:text-[#C9A86A] transition-colors"
//       >
//         ← Atelier
//       </Link>

//       <div className="mt-3 md:mt-5 grid gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">

//         {/* LEFT: Images */}
//         <div className="flex flex-col-reverse gap-3 md:gap-4 lg:flex-row">

//           {/* Thumbnails */}
//           <div
//             ref={thumbsRef}
//             className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:gap-3 lg:snap-none"
//           >
//             {images.map((image, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleSelectImage(index)}
//                 className={`shrink-0 snap-center border transition-all duration-200 ${
//                   selectedIndex === index ? 'border-[#C9A86A]' : 'border-black/8 hover:border-black/25'
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt=""
//                   className="h-16 w-16 object-cover sm:h-18 sm:w-18 md:h-20 md:w-20"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* Main Image — swipeable */}
//           <div
//             className="flex-1 overflow-hidden bg-white relative select-none"
//             onTouchStart={handleTouchStart}
//             onTouchEnd={handleTouchEnd}
//           >
//             <img
//               key={fadeKey}
//               src={selectedImage}
//               alt={product.title}
//               className="w-full object-cover aspect-[4/5] img-fade"
//               draggable={false}
//             />

//             {/* Dot indicators — mobile only */}
//             {images.length > 1 && (
//               <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 lg:hidden">
//                 {images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSelectImage(index)}
//                     className={`h-1.5 rounded-full transition-all duration-300 ${
//                       selectedIndex === index
//                         ? 'w-4 bg-[#C9A86A]'
//                         : 'w-1.5 bg-white/60'
//                     }`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT: Details */}
//         <div className="lg:sticky lg:top-32 h-fit">

//           {/* Category + line */}
//           <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
//             <div className="h-[1px] w-8 md:w-10 bg-[#C9A86A]" />
//             <p className="text-[10px] md:text-[11px] uppercase tracking-[4px] md:tracking-[5px] text-[#C9A86A]">
//               {product.category} Collection
//             </p>
//           </div>

//           {/* Title */}
//           <h1 className="font-light leading-none tracking-[-1.5px] md:tracking-[-2px] text-[34px] sm:text-[42px] md:text-[52px] lg:text-[64px] xl:text-[72px]">
//             {product.title}
//           </h1>

//           {/* Short desc */}
//           {product.description && (
//             <p className="mt-3 md:mt-4 text-[13px] md:text-[14px] text-black/50 leading-relaxed">
//               {product.description.split('.')[0]}.
//             </p>
//           )}

//           {/* Price row */}
//           <div className="mt-6 md:mt-8 flex items-baseline gap-3 md:gap-4 border-b border-black/8 pb-5 md:pb-6">
//             <span className="text-[28px] md:text-[32px] lg:text-[36px] font-light">₹{product.price}</span>
//             {product.discount_percent > 0 && (
//               <span className="text-[14px] md:text-[16px] text-black/30 line-through">₹{product.original_price}</span>
//             )}
//             <span className="ml-auto text-[9px] md:text-[10px] uppercase tracking-[4px] text-black/30">
//               In Atelier
//             </span>
//           </div>

//           {/* Description */}
//           {product.description && (
//             <p className="mt-5 md:mt-6 text-[12px] md:text-[13px] leading-[1.9] text-black/55">
//               {product.description}
//             </p>
//           )}

//           {/* Features */}
//           <ul className="mt-5 md:mt-6 space-y-2 md:space-y-2.5">
//             {FEATURES.map((f) => (
//               <li key={f} className="flex items-start gap-2.5 md:gap-3 text-[11px] md:text-[12px] text-black/50">
//                 <Check size={12} className="mt-0.5 shrink-0 text-[#C9A86A]" />
//                 {f}
//               </li>
//             ))}
//           </ul>

//           {/* Quantity + CTA */}
//           <div className="mt-7 md:mt-8 flex gap-2 md:gap-3">

//             {/* Quantity */}
//             <div className="flex items-center border border-black/15 shrink-0">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="flex h-12 w-10 md:h-14 md:w-12 items-center justify-center text-black/50 hover:text-black transition-colors text-lg"
//               >
//                 −
//               </button>
//               <span className="w-8 md:w-10 text-center text-[13px] md:text-[14px]">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="flex h-12 w-10 md:h-14 md:w-12 items-center justify-center text-black/50 hover:text-black transition-colors text-lg"
//               >
//                 +
//               </button>
//             </div>

//             {/* Add to Bag */}
//             <button
//               onClick={handleAddToCart}
//               className={`flex flex-1 items-center justify-center gap-2 md:gap-3 py-3 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[3px] md:tracking-[4px] transition-all duration-300 active:scale-[0.98] ${
//                 added ? 'bg-[#C9A86A] text-white' : 'bg-[#C9A86A] text-white hover:bg-black'
//               }`}
//             >
//               <ShoppingBag size={14} className="md:hidden" />
//               <ShoppingBag size={15} className="hidden md:block" />
//               <span>{added ? 'Added to Bag' : 'Add to Bag'}</span>
//             </button>
//           </div>

//           {/* View Bag */}
//           <button
//             onClick={handleBuyNow}
//             className="mt-2.5 md:mt-3 w-full border border-black/15 py-3 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[3px] md:tracking-[4px] text-black/60 hover:border-black hover:text-black transition-all duration-300 active:scale-[0.98]"
//           >
//             View Bag & Checkout
//           </button>

//           {/* Service Strip */}
//           <div className="mt-8 md:mt-10 grid grid-cols-3 gap-2 md:gap-4 border-t border-black/8 pt-6 md:pt-8 text-center">
//             <div>
//               <Truck size={15} className="mx-auto mb-1.5 md:mb-2 text-black/30" />
//               <p className="text-[8px] md:text-[9px] uppercase tracking-[2px] text-black/50">Express</p>
//               <p className="text-[8px] md:text-[9px] text-black/30 mt-0.5">Nationwide 2-day</p>
//             </div>
//             <div>
//               <RefreshCw size={15} className="mx-auto mb-1.5 md:mb-2 text-black/30" />
//               <p className="text-[8px] md:text-[9px] uppercase tracking-[2px] text-black/50">Returns</p>
//               <p className="text-[8px] md:text-[9px] text-black/30 mt-0.5">30-day atelier</p>
//             </div>
//             <div>
//               <Sparkles size={15} className="mx-auto mb-1.5 md:mb-2 text-black/30" />
//               <p className="text-[8px] md:text-[9px] uppercase tracking-[2px] text-black/50">Couture</p>
//               <p className="text-[8px] md:text-[9px] text-black/30 mt-0.5">Hand-finished</p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '../../store/cartStore'
import { Product } from '../../types/product'
import { ShoppingBag, Truck, RefreshCw, Sparkles, Check, Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  product: Product
}

const FEATURES = [
  'Reusable up to 3 wears with care',
  'Hypoallergenic, cruelty-free formulation',
  'Includes prep kit, glue & wooden stick',
  'Sizing across 12 widths for a couture fit',
]

export default function ProductDetailsClient({ product }: Props) {
  const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const images = product.image_urls || []
  const selectedImage = images[selectedIndex]

  const handleSelectImage = (index: number) => {
    setSelectedIndex(index)
    setFadeKey(k => k + 1)
  }

  const handlePrev = () => {
    const newIndex = (selectedIndex - 1 + images.length) % images.length
    handleSelectImage(newIndex)
  }

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % images.length
    handleSelectImage(newIndex)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  const handleAddToCart = () => {
    addToCart({ ...product, id: product.id!, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    const cartItems = useCartStore.getState().items
    const alreadyInCart = cartItems.find((i) => i.id === product.id)
    if (!alreadyInCart) {
      addToCart({ ...product, id: product.id!, quantity })
    }
    router.push('/cart')
  }

  return (
    <div>
      <style>{`
        @keyframes imgFadeIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        .img-fade {
          animation: imgFadeIn 0.45s cubic-bezier(0.25,0.1,0.25,1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-up {
          animation: slideUp 0.5s cubic-bezier(0.25,0.1,0.25,1) both;
        }
      `}</style>

      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden">

        {/* Full screen image with overlays */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '3/4' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main image */}
          <img
            key={fadeKey}
            src={selectedImage}
            alt={product.title}
            className="img-fade absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Dark gradient top */}
          <div
            className="absolute inset-x-0 top-0"
            style={{ height: '120px', background: 'linear-gradient(to bottom, rgba(14,11,7,0.75) 0%, transparent 100%)' }}
          />

          {/* Dark gradient bottom */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: '220px', background: 'linear-gradient(to top, rgba(14,11,7,0.96) 0%, rgba(14,11,7,0.5) 60%, transparent 100%)' }}
          />

          {/* Top bar — back + AILURA + wishlist */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 pt-4">
            <Link href="/products">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(201,168,106,0.3)',
                  background: 'rgba(14,11,7,0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ArrowLeft size={15} color="#C9A86A" />
              </div>
            </Link>

            <p style={{ fontSize: '10px', letterSpacing: '6px', color: '#C9A86A', textTransform: 'uppercase', opacity: 0.8 }}>
              AILURA
            </p>

            <button
              onClick={() => setWishlisted(w => !w)}
              style={{
                width: '36px', height: '36px',
                border: '1px solid rgba(201,168,106,0.3)',
                background: 'rgba(14,11,7,0.4)',
                backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Heart
                size={15}
                color="#C9A86A"
                fill={wishlisted ? '#C9A86A' : 'none'}
              />
            </button>
          </div>

          {/* Bottom overlay — title + category + dots */}
          <div className="absolute bottom-0 inset-x-0 px-5 pb-5">

            {/* Stock badge */}
            {product.stock && product.stock <= 5 && (
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: '5px', height: '5px', background: '#C9A86A', borderRadius: '50%' }} />
                <span style={{ fontSize: '9px', letterSpacing: '3px', color: '#C9A86A', textTransform: 'uppercase' }}>
                  Only {product.stock} left in atelier
                </span>
              </div>
            )}

            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <div style={{ height: '1px', width: '20px', background: 'rgba(201,168,106,0.4)' }} />
              <span style={{ fontSize: '9px', letterSpacing: '4px', color: 'rgba(201,168,106,0.65)', textTransform: 'uppercase' }}>
                {product.category} Collection
              </span>
            </div>

            {/* Title */}
            <h1 style={{ margin: '0 0 14px', fontSize: '34px', fontWeight: 300, color: '#F5EDD8', lineHeight: 1.05, letterSpacing: '-1px' }}>
              {product.title}
            </h1>

            {/* Swipe dots */}
            {images.length > 1 && (
              <div className="flex items-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectImage(index)}
                    style={{
                      height: '3px',
                      width: selectedIndex === index ? '16px' : '6px',
                      background: selectedIndex === index ? '#C9A86A' : 'rgba(255,255,255,0.25)',
                      borderRadius: '2px',
                      border: 'none',
                      padding: 0,
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip — right side */}
          {images.length > 1 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectImage(index)}
                  style={{
                    width: '40px', height: '40px',
                    border: selectedIndex === index ? '1px solid #C9A86A' : '1px solid rgba(255,255,255,0.2)',
                    overflow: 'hidden',
                    padding: 0,
                    transition: 'border 0.2s',
                  }}
                >
                  <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="slide-up" style={{ background: '#F8F5F0', padding: '20px 20px 32px' }}>

          {/* Price + discount */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline gap-3">
              <span style={{ fontSize: '28px', fontWeight: 300, color: '#111' }}>₹{product.price}</span>
              {product.discount_percent > 0 && (
                <>
                  <span style={{ fontSize: '14px', color: '#bbb', textDecoration: 'line-through' }}>₹{product.original_price}</span>
                  <span style={{ fontSize: '10px', color: '#16a34a', letterSpacing: '1px' }}>
                    {product.discount_percent}% off
                  </span>
                </>
              )}
            </div>
            <span style={{ fontSize: '9px', letterSpacing: '3px', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>In Atelier</span>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#E8DED3', marginBottom: '16px' }} />

          {/* Description */}
          {product.description && (
            <p style={{ margin: '0 0 16px', fontSize: '12px', lineHeight: 1.9, color: 'rgba(0,0,0,0.5)' }}>
              {product.description.split('.')[0]}.
            </p>
          )}

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {FEATURES.slice(0, 3).map((f) => (
              <span
                key={f}
                style={{
                  fontSize: '9px', letterSpacing: '2px', color: '#C9A86A',
                  border: '1px solid rgba(201,168,106,0.3)', padding: '4px 10px',
                  textTransform: 'uppercase',
                }}
              >
                {f.split(',')[0]}
              </span>
            ))}
          </div>

          {/* Qty + Add to bag */}
          <div className="flex gap-2 mb-2.5">
            <div className="flex items-center" style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex items-center justify-center text-lg"
                style={{ width: '36px', height: '48px', background: 'none', border: 'none', color: '#999' }}
              >−</button>
              <span style={{ width: '28px', textAlign: 'center', fontSize: '13px', color: '#111' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex items-center justify-center text-lg"
                style={{ width: '36px', height: '48px', background: 'none', border: 'none', color: '#999' }}
              >+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{
                height: '48px',
                background: added ? '#1a1a1a' : '#C9A86A',
                border: 'none',
                color: added ? '#C9A86A' : '#0E0B07',
                fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
              }}
            >
              <ShoppingBag size={13} />
              {added ? 'Added to Bag' : 'Add to Bag'}
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full transition-all active:scale-[0.98]"
            style={{
              height: '44px', background: 'none',
              border: '1px solid rgba(0,0,0,0.12)',
              color: 'rgba(0,0,0,0.55)', fontSize: '10px',
              letterSpacing: '3px', textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
            }}
          >
            View Bag & Checkout
          </button>

          {/* Service strip */}
          <div
            className="grid grid-cols-3 text-center mt-5 pt-4"
            style={{ borderTop: '1px solid #E8DED3' }}
          >
            <div>
              <Truck size={13} style={{ margin: '0 auto 4px', color: '#bbb', display: 'block' }} />
              <p style={{ fontSize: '8px', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', margin: 0 }}>Express</p>
              <p style={{ fontSize: '8px', color: '#bbb', margin: '2px 0 0' }}>2-day</p>
            </div>
            <div style={{ borderLeft: '1px solid #E8DED3', borderRight: '1px solid #E8DED3' }}>
              <RefreshCw size={13} style={{ margin: '0 auto 4px', color: '#bbb', display: 'block' }} />
              <p style={{ fontSize: '8px', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', margin: 0 }}>Returns</p>
              <p style={{ fontSize: '8px', color: '#bbb', margin: '2px 0 0' }}>30-day</p>
            </div>
            <div>
              <Sparkles size={13} style={{ margin: '0 auto 4px', color: '#bbb', display: 'block' }} />
              <p style={{ fontSize: '8px', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', margin: 0 }}>Couture</p>
              <p style={{ fontSize: '8px', color: '#bbb', margin: '2px 0 0' }}>Hand-finished</p>
            </div>
          </div>

          {/* Full description */}
          {product.description && (
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E8DED3' }}>
              <p style={{ margin: '0 0 8px', fontSize: '9px', letterSpacing: '4px', color: '#C9A86A', textTransform: 'uppercase' }}>Details</p>
              <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.9, color: 'rgba(0,0,0,0.5)' }}>{product.description}</p>
            </div>
          )}

          {/* Features list */}
          <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none' }}>
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5" style={{ marginBottom: '8px' }}>
                <Check size={11} style={{ marginTop: '2px', flexShrink: 0, color: '#C9A86A' }} />
                <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.5)' }}>{f}</span>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* ── DESKTOP LAYOUT — same as before ── */}
      <div className="hidden lg:block">

        <Link
          href="/products"
          className="mb-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[4px] text-black/40 hover:text-[#C9A86A] transition-colors"
        >
          ← Atelier
        </Link>

        <div className="mt-5 grid gap-16 lg:grid-cols-2">

          {/* LEFT: Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3 overflow-y-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectImage(index)}
                  className={`shrink-0 border transition-all duration-200 ${selectedIndex === index ? 'border-[#C9A86A]' : 'border-black/8 hover:border-black/25'}`}
                >
                  <img src={image} alt="" className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>

            <div
              className="flex-1 overflow-hidden bg-white"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                key={fadeKey}
                src={selectedImage}
                alt={product.title}
                className="w-full object-cover aspect-[4/5] img-fade"
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="lg:sticky lg:top-32 h-fit">

            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-[#C9A86A]" />
              <p className="text-[11px] uppercase tracking-[5px] text-[#C9A86A]">
                {product.category} Collection
              </p>
            </div>

            <h1 className="font-light leading-none tracking-[-2px] text-[64px] xl:text-[72px]">
              {product.title}
            </h1>

            {product.description && (
              <p className="mt-4 text-[14px] text-black/50 leading-relaxed">
                {product.description.split('.')[0]}.
              </p>
            )}

            <div className="mt-8 flex items-baseline gap-4 border-b border-black/8 pb-6">
              <span className="text-[36px] font-light">₹{product.price}</span>
              {product.discount_percent > 0 && (
                <span className="text-[16px] text-black/30 line-through">₹{product.original_price}</span>
              )}
              <span className="ml-auto text-[10px] uppercase tracking-[4px] text-black/30">In Atelier</span>
            </div>

            {product.description && (
              <p className="mt-6 text-[13px] leading-[1.9] text-black/55">{product.description}</p>
            )}

            <ul className="mt-6 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[12px] text-black/50">
                  <Check size={12} className="mt-0.5 shrink-0 text-[#C9A86A]" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              <div className="flex items-center border border-black/15 shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-14 w-12 items-center justify-center text-black/50 hover:text-black transition-colors text-lg">−</button>
                <span className="w-10 text-center text-[14px]">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex h-14 w-12 items-center justify-center text-black/50 hover:text-black transition-colors text-lg">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-3 py-4 text-[11px] uppercase tracking-[4px] transition-all duration-300 active:scale-[0.98] ${added ? 'bg-black text-[#C9A86A]' : 'bg-[#C9A86A] text-white hover:bg-black'}`}
              >
                <ShoppingBag size={15} />
                {added ? 'Added to Bag' : 'Add to Bag'}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="mt-3 w-full border border-black/15 py-4 text-[11px] uppercase tracking-[4px] text-black/60 hover:border-black hover:text-black transition-all duration-300 active:scale-[0.98]"
            >
              View Bag & Checkout
            </button>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-black/8 pt-8 text-center">
              <div>
                <Truck size={15} className="mx-auto mb-2 text-black/30" />
                <p className="text-[9px] uppercase tracking-[2px] text-black/50">Express</p>
                <p className="text-[9px] text-black/30 mt-0.5">Nationwide 2-day</p>
              </div>
              <div>
                <RefreshCw size={15} className="mx-auto mb-2 text-black/30" />
                <p className="text-[9px] uppercase tracking-[2px] text-black/50">Returns</p>
                <p className="text-[9px] text-black/30 mt-0.5">30-day atelier</p>
              </div>
              <div>
                <Sparkles size={15} className="mx-auto mb-2 text-black/30" />
                <p className="text-[9px] uppercase tracking-[2px] text-black/50">Couture</p>
                <p className="text-[9px] text-black/30 mt-0.5">Hand-finished</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}