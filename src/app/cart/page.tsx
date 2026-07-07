'use client'

import Link from 'next/link'
import { useCartStore } from '../../store/cartStore'
import { Lock, Truck, ShieldCheck, Heart, Package } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const appliedCoupon = useCartStore((state) => state.coupon)
  const setCoupon = useCartStore((state) => state.setCoupon)
  const removeCoupon = useCartStore((state) => state.removeCoupon)

  const [couponCode, setCouponCode] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [savedItems, setSavedItems] = useState<any[]>([])

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const discount = appliedCoupon
    ? appliedCoupon.discount_type === 'percentage'
      ? Math.min((subtotal * Number(appliedCoupon.discount_value)) / 100, subtotal)
      : Math.min(Number(appliedCoupon.discount_value), subtotal)
    : 0

  const total = Math.max(subtotal - discount, 0)
  const router = useRouter()

  const handleCheckout = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      toast.error('Please login to continue checkout')
      router.push('/login')
      return
    }
    router.push('/checkout')
  }

  const handleSaveForLater = (item: any) => {
    removeFromCart(item.id)
    setSavedItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item])
    toast.success(`${item.title} saved for later`)
  }

  const handleMoveToCart = (item: any) => {
    setSavedItems(prev => prev.filter(i => i.id !== item.id))
    useCartStore.getState().addToCart({ ...item, quantity: 1 })
    toast.success(`${item.title} moved to bag`)
  }

  const applyCoupon = async () => {
    if (!couponCode.trim()) { toast.error('Enter coupon code'); return }
    try {
      setCouponLoading(true)
      const { data, error } = await supabase.from('coupons').select('*').eq('code', couponCode.toUpperCase()).single()
      if (error || !data) { toast.error('Invalid coupon'); return }
      if (!data.active) { toast.error('Coupon inactive'); return }
      if (data.expires_at && new Date(data.expires_at) < new Date()) { toast.error('Coupon expired'); return }
      if (data.usage_limit > 0 && data.used_count >= data.usage_limit) { toast.error('Coupon usage limit reached'); return }
      if (subtotal < Number(data.minimum_order)) { toast.error(`Minimum order ₹${data.minimum_order}`); return }
      setCoupon(data)
      const savedAmount = data.discount_type === 'percentage'
        ? Math.min((subtotal * Number(data.discount_value)) / 100, subtotal)
        : Math.min(Number(data.discount_value), subtotal)
      toast.success(`${data.code} applied — You saved ₹${savedAmount}`)
    } catch {
      toast.error('Failed to apply coupon')
    } finally {
      setCouponLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F5F0] px-4 pt-24 pb-24 sm:px-6 md:px-8 md:pt-28 lg:px-20 lg:pt-32">

        {/* Heading */}
        <div className="mb-6 md:mb-14 lg:mb-16">
          <div className="flex items-center gap-3 mb-3 md:mb-6">
            <div className="h-[1px] w-6 md:w-12 bg-[#C9A86A]" />
            <p className="text-[8px] md:text-[11px] uppercase tracking-[4px] md:tracking-[6px] text-[#C9A86A]">
              Your Atelier Bag
            </p>
          </div>
          <div className="flex items-baseline justify-between md:block">
            <h1 className="font-light leading-none tracking-[-1.5px] md:tracking-[-2px] text-[42px] sm:text-[52px] md:text-[72px] lg:text-[100px]">
              Bag <span className="text-[#C9A86A]">{items.length}</span> {items.length === 1 ? 'piece' : 'pieces'}.
            </h1>
            {items.length > 0 && (
              <span className="text-[13px] text-black/35 font-light md:hidden">₹{subtotal}</span>
            )}
          </div>
          {/* Gold line — mobile only */}
          <div
            className="mt-4 md:hidden"
            style={{ height: '1px', background: 'linear-gradient(to right, #C9A86A44, #C9A86A, #C9A86A44)' }}
          />
        </div>

        {items.length === 0 && savedItems.length === 0 ? (
          <div className="flex flex-col items-center py-20 md:py-24 gap-6 md:gap-8">
            <p className="text-[11px] md:text-[13px] uppercase tracking-[4px] md:tracking-[5px] text-black/35">
              Your bag is empty
            </p>
            <Link href="/products" className="border border-black/20 px-8 md:px-10 py-3 md:py-3.5 text-[10px] md:text-[11px] uppercase tracking-[4px] hover:bg-black hover:text-white transition-all duration-300">
              Continue Browsing
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-10 lg:grid-cols-[1fr_360px] lg:gap-14 xl:grid-cols-[1fr_400px]">

            {/* LEFT */}
            <div>

              {/* Desktop header */}
              <div className="mb-4 hidden md:grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-black/10 pb-4">
                <p className="text-[10px] uppercase tracking-[4px] text-black/35">Piece</p>
                <p className="text-[10px] uppercase tracking-[4px] text-black/35 w-28 text-center">Quantity</p>
                <p className="text-[10px] uppercase tracking-[4px] text-black/35 w-14 text-right">Total</p>
              </div>

              {/* Items */}
              <div className="divide-y divide-black/6">
                {items.map((item) => (
                  <div key={item.id} className="py-4 md:py-7">

                    {/* Mobile */}
                    <div className="flex gap-3 md:hidden">
                      <div className="shrink-0 overflow-hidden bg-white" style={{ width: '90px', height: '112px' }}>
                        <img src={item.image_urls?.[0]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] uppercase tracking-[3px] text-[#C9A86A] mb-1">{item.category}</p>
                        <h3 className="text-[15px] font-light leading-snug text-black mb-1">{item.title}</h3>
                        <p className="text-[11px] text-black/35 mb-3">₹{item.price} · per set</p>

                        {/* Qty + Price */}
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center" style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                            <button onClick={() => decreaseQuantity(item.id)} className="flex items-center justify-center text-black/40 active:bg-black/5" style={{ width: '32px', height: '32px', fontSize: '17px' }}>−</button>
                            <span className="text-center text-[12px] text-black" style={{ width: '26px' }}>{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)} className="flex items-center justify-center text-black/40 active:bg-black/5" style={{ width: '32px', height: '32px', fontSize: '17px' }}>+</button>
                          </div>
                          <span className="text-[15px] font-light text-black">₹{item.price * item.quantity}</span>
                        </div>

                        {/* Save + Remove pills */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveForLater(item)}
                            className="flex items-center gap-1 text-[8px] uppercase tracking-[2px] text-[#C9A86A] px-2.5 py-1"
                            style={{ border: '1px solid rgba(201,168,106,0.4)' }}
                          >
                            <Heart size={8} strokeWidth={1.5} />
                            Save
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[8px] uppercase tracking-[2px] text-black/30 px-2.5 py-1"
                            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-[96px_1fr_auto_auto] items-center gap-6">
                      <div className="overflow-hidden bg-white h-28 w-24">
                        <img src={item.image_urls?.[0]} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[3px] text-[#C9A86A] mb-1">{item.category}</p>
                        <h3 className="text-[18px] font-light">{item.title}</h3>
                        <p className="mt-1 text-[12px] text-black/40">₹{item.price} · per set</p>
                        <button onClick={() => handleSaveForLater(item)} className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-[2px] text-[#C9A86A]/60 hover:text-[#C9A86A] transition-colors">
                          <Heart size={10} strokeWidth={1.5} />Save for later
                        </button>
                      </div>
                      <div className="flex items-center border border-black/12">
                        <button onClick={() => decreaseQuantity(item.id)} className="flex h-10 w-10 items-center justify-center text-black/50 hover:text-black transition-colors">−</button>
                        <span className="w-9 text-center text-[13px]">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="flex h-10 w-10 items-center justify-center text-black/50 hover:text-black transition-colors">+</button>
                      </div>
                      <div className="flex flex-col items-end gap-2 w-16">
                        <p className="text-[15px] font-light">₹{item.price * item.quantity}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-[11px] text-black/25 hover:text-black transition-colors">✕</button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bulk Order Banner */}
              <div className="mt-3 flex items-center justify-between px-4 py-3.5" style={{ background: '#fff', border: '1px solid rgba(201,168,106,0.25)' }}>
                <div className="flex items-center gap-3">
                  <Package size={13} style={{ color: '#C9A86A', flexShrink: 0 }} />
                  <div>
                    <p className="text-[9px] uppercase tracking-[3px] text-black/70" style={{ margin: 0 }}>Bulk Order</p>
                    <p className="text-[10px] text-black/35 mt-0.5" style={{ margin: 0 }}>Special pricing for 10+ sets</p>
                  </div>
                </div>
                <span className="text-[8px] uppercase tracking-[2px] px-2.5 py-1" style={{ color: '#C9A86A', background: '#0E0B07' }}>
                  Coming Soon
                </span>
              </div>

              {/* Bottom actions */}
              <div className="mt-4 flex items-center justify-between border-t border-black/8 pt-4">
                <button onClick={() => items.forEach((item) => removeFromCart(item.id))} className="text-[9px] md:text-[10px] uppercase tracking-[4px] text-black/25 hover:text-black transition-colors">
                  Empty Bag
                </button>
                <Link href="/products" className="text-[9px] md:text-[10px] uppercase tracking-[4px] text-black/45 hover:text-[#C9A86A] transition-colors underline underline-offset-4">
                  Continue Browsing
                </Link>
              </div>

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <div className="mt-6 border-t border-black/8 pt-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart size={11} className="text-[#C9A86A]" strokeWidth={1.5} />
                    <span className="text-[9px] uppercase tracking-[4px] text-black/45">
                      Saved for Later — {savedItems.length}
                    </span>
                  </div>
                  <div className="divide-y divide-black/6">
                    {savedItems.map((item) => (
                      <div key={item.id} className="py-3 flex items-center gap-3">
                        <div className="overflow-hidden bg-white shrink-0" style={{ width: '56px', height: '70px' }}>
                          <img src={item.image_urls?.[0]} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-light text-black">{item.title}</h3>
                          <p className="text-[10px] text-black/35 mt-0.5">₹{item.price}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <button onClick={() => handleMoveToCart(item)} className="text-[8px] uppercase tracking-[2px] text-black/50 hover:text-black underline underline-offset-2 transition-colors">Move to Bag</button>
                            <button onClick={() => setSavedItems(prev => prev.filter(i => i.id !== item.id))} className="text-[8px] uppercase tracking-[2px] text-black/25 hover:text-red-400 transition-colors">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Summary */}
            <div className="h-fit border border-black/10 bg-white p-5 sm:p-6 md:p-8 lg:sticky lg:top-32">
              <p className="text-[9px] md:text-[10px] uppercase tracking-[5px] text-black/35 mb-2 md:mb-3">Order Summary</p>
              <h2 className="text-[22px] md:text-[28px] font-light leading-tight mb-5 md:mb-8">Atelier Total</h2>

              {/* Coupon */}
              <div className="mb-5">
                <p className="mb-2.5 text-[10px] uppercase tracking-[4px] text-black/40">Coupon Code</p>
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                    placeholder="AILURA10"
                    disabled={!!appliedCoupon}
                    className="h-11 flex-1 border border-black/10 px-4 text-sm outline-none focus:border-[#C9A86A] disabled:opacity-40 disabled:cursor-not-allowed bg-[#F8F5F0]"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={couponLoading || !!appliedCoupon}
                    className="bg-black px-4 text-[10px] uppercase tracking-[3px] text-white transition-all hover:bg-[#C9A86A] hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {couponLoading ? '...' : 'Apply'}
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-3 border border-black/8 bg-[#F8F5F0] px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[3px] text-black/70">{appliedCoupon.code}</p>
                      <p className="mt-0.5 text-[11px] text-green-600">You saved ₹{discount}</p>
                    </div>
                    <button onClick={() => { removeCoupon(); setCouponCode('') }} className="text-[9px] uppercase tracking-[2px] text-black/30 hover:text-red-400 transition-colors">Remove</button>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-[12px] md:text-[13px]">
                <div className="flex justify-between text-black/55"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between text-black/55"><span>Shipping</span><span className="text-black/75">Complimentary</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−₹{discount}</span></div>}
                <div className="flex justify-between text-black/35 text-[11px]"><span>Estimated tax</span><span>Calculated at checkout</span></div>
              </div>

              <div className="my-5 border-t border-black/8" />

              <div className="flex justify-between items-baseline">
                <span className="text-[10px] md:text-[11px] uppercase tracking-[4px] text-black/40">Total</span>
                <span className="text-[24px] md:text-[28px] font-light">₹{total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full flex items-center justify-center gap-2.5 py-4 text-[10px] md:text-[11px] uppercase tracking-[4px] transition-all duration-300 active:scale-[0.98]"
                style={{ background: '#111', color: '#C9A86A' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = '#C9A86A'; (e.target as HTMLElement).style.color = '#111' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = '#111'; (e.target as HTMLElement).style.color = '#C9A86A' }}
              >
                <Lock size={12} />
                Secure Checkout
              </button>

              <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[2px] text-black/25">
                <div className="flex items-center gap-1.5"><Truck size={11} /><span>Insured shipping</span></div>
                <div className="flex items-center gap-1.5"><ShieldCheck size={11} /><span>Encrypted</span></div>
              </div>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </>
  )
}