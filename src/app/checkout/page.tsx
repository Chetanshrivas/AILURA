'use client'

import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { useCartStore } from '../../store/cartStore'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import { Lock, Truck, ShieldCheck, CheckCircle, RotateCcw, CreditCard, Banknote, Smartphone } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()

  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE')

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [stateName, setStateName] = useState('')
  const [pincode, setPincode] = useState('')

  const items = useCartStore((state) => state.items)
  const coupon = useCartStore((state) => state.coupon)
  const clearCart = useCartStore((state) => state.clearCart)
  const removeCoupon = useCartStore((state) => state.removeCoupon)

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = items.reduce((c, item) => c + item.quantity, 0)

  const discount = coupon
    ? coupon.discount_type === 'percentage'
      ? Math.min((subtotal * Number(coupon.discount_value)) / 100, subtotal)
      : Math.min(Number(coupon.discount_value), subtotal)
    : 0

  const total = subtotal - discount

  // ── Load Razorpay Script ──
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  // ── Save Order to Database (COD + Online dono ke liye) ──
  const saveOrder = async (
    session: any,
    paymentStatus: 'pending' | 'paid',
    razorpayPaymentId?: string
  ) => {
    const fullName = `${firstName} ${lastName}`
    const shippingAddress = `${address}${apartment ? ', ' + apartment : ''}, ${city}, ${stateName}, ${pincode}`

    // 1. Order create karo — Capitalized status values save karo, taaki admin panel ke selects se match ho
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: session.user.id,
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        shipping_address: shippingAddress,
        subtotal,
        discount_amount: discount,
        shipping_charge: 0,
        total_amount: total,
        coupon_code: coupon?.code || null,
        total_items: itemCount,
        payment_method: paymentMethod,
        payment_status: paymentStatus === 'paid' ? 'Paid' : 'Pending',
        order_status: paymentStatus === 'paid' ? 'Processing' : 'Pending',
        razorpay_payment_id: razorpayPaymentId || null,
      }])
      .select()
      .single()

    if (orderError || !order) throw orderError

    // 2. Order items save karo
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
      product_title: item.title,
      product_image: item.image_urls?.[0] || '',
    }))

    const { error: orderItemsError } = await supabase.from('order_items').insert(orderItems)
    if (orderItemsError) throw orderItemsError

    // 3. Stock reduce karo
    for (const item of items) {
      const { data: product } = await supabase
        .from('products').select('stock').eq('id', item.id).single()
      await supabase
        .from('products')
        .update({ stock: Number(product?.stock || 0) - item.quantity })
        .eq('id', item.id)
    }

    // 4. Coupon usage update karo
    if (coupon) {
      await supabase.rpc('increment_coupon_usage', { coupon_code: coupon.code })
    }

    // 5. Email bhejo
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'order_placed',
        order: {
          id: order.id,
          order_status: order.order_status,
          subtotal,
          discount_amount: discount,
          total_amount: total,
          shipping_address: shippingAddress,
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          tracking_id: null,
        },
        customerEmail: email,
        customerName: firstName,
      }),
    })

    return order
  }

  // ── COD Flow ──
  const handleCOD = async () => {
    try {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { toast.error('Please login first'); router.push('/login'); return }

      const order = await saveOrder(session, 'pending')
      clearCart()
      removeCoupon()
      toast.success('Order placed successfully!')
      router.push(`/order-success?id=${order.id}`)
    } catch (error) {
      console.log(error)
      toast.error('Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  // ── Razorpay Online Flow ──
  const handleOnlinePayment = async () => {
    try {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { toast.error('Please login first'); router.push('/login'); return }

      const loaded = await loadRazorpayScript()
      if (!loaded) { toast.error('Payment gateway failed to load'); return }

      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
      const { orderId, error } = await res.json()
      if (error || !orderId) { toast.error('Failed to initiate payment'); return }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: total * 100,
        currency: 'INR',
        name: 'AILURA',
        description: 'Luxury Nail Studio',
        order_id: orderId,
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phone,
        },
        theme: { color: '#C9A86A' },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyRes.json()
            if (!verifyData.success) { toast.error('Payment verification failed'); return }

            const order = await saveOrder(session, 'paid', response.razorpay_payment_id)
            clearCart()
            removeCoupon()
            toast.success('Payment successful! Order placed.')
            router.push(`/order-success?id=${order.id}`)
          } catch (err) {
            console.error(err)
            toast.error('Order saving failed after payment. Please contact support.')
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            toast.error('Payment cancelled')
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.error(error)
      toast.error('Payment failed')
      setLoading(false)
    }
  }

  // ── Main Handler ──
  const handlePlaceOrder = () => {
    if (!email || !firstName || !lastName || !phone || !address || !city || !stateName || !pincode) {
      toast.error('Please fill all fields')
      return
    }
    if (paymentMethod === 'COD') {
      handleCOD()
    } else {
      handleOnlinePayment()
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] px-4 pt-24 pb-20 sm:px-6 md:px-8 md:pt-28 lg:px-20 lg:pt-32">

        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#C9A86A]" />
            <p className="text-[10px] uppercase tracking-[5px] text-[#C9A86A]">Secure Checkout</p>
          </div>
          <h1 className="font-light leading-none tracking-[-2px] text-[42px] md:text-[72px] lg:text-[100px]">
            Complete Your Order.
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px] items-start">

          <div className="space-y-8">

            <div className="border border-black/10 bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A86A] text-[11px] text-white">1</span>
                <h2 className="text-xl font-light">Contact Information</h2>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]"
              />
            </div>

            <div className="border border-black/10 bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A86A] text-[11px] text-white">2</span>
                <h2 className="text-xl font-light">Shipping Address</h2>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input type="text" placeholder="First Name" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                  <input type="text" placeholder="Last Name" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                </div>
                <input type="text" placeholder="Phone Number" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                <input type="text" placeholder="Address" value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                <input type="text" placeholder="Apartment, Suite, etc." value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                <div className="grid gap-4 md:grid-cols-3">
                  <input type="text" placeholder="City" value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                  <input type="text" placeholder="State" value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                  <input type="text" placeholder="Pincode" value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="h-12 border border-black/10 px-4 outline-none transition-colors focus:border-[#C9A86A]" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[11px] text-black/45">
                <Lock size={13} className="text-[#C9A86A]" />
                Your details are encrypted and never shared with third parties.
              </div>
            </div>

            <div className="border border-black/10 bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C9A86A] text-[11px] text-white">3</span>
                <h2 className="text-xl font-light">Payment Method</h2>
              </div>

              <div className="space-y-3">

                <div
                  className="w-full flex items-start gap-4 p-4 border border-black/10 opacity-50 cursor-not-allowed"
                >
                  <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-black/25 flex items-center justify-center" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote size={16} className="text-black/50" />
                      <p className="text-[13px] font-light">Cash on Delivery</p>
                      <span className="text-[8px] uppercase tracking-[2px] bg-black/15 text-black/50 px-2 py-0.5">
                        Coming Soon
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-black/40">Pay when your order arrives at your door.</p>
                  </div>
                </div>

                <button
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={`w-full flex items-start gap-4 p-4 border transition-all duration-200 text-left ${
                    paymentMethod === 'ONLINE'
                      ? 'border-[#C9A86A] bg-[#C9A86A]/5'
                      : 'border-black/10 hover:border-black/25'
                  }`}
                >
                  <div className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'ONLINE' ? 'border-[#C9A86A]' : 'border-black/25'
                  }`}>
                    {paymentMethod === 'ONLINE' && (
                      <div className="h-2 w-2 rounded-full bg-[#C9A86A]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} className="text-black/50" />
                      <p className="text-[13px] font-light">Online Payment</p>
                      <span className="text-[8px] uppercase tracking-[2px] bg-[#C9A86A] text-white px-2 py-0.5">
                        Recommended
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-black/40">UPI · Google Pay · PhonePe · Cards · Net Banking</p>
                    <p className="mt-1 text-[10px] text-[#C9A86A]">Fast & Secure • Instant Confirmation</p>
                  </div>
                </button>

              </div>
            </div>

          </div>

          <div className="h-fit border border-black/10 bg-white p-6 lg:sticky lg:top-32">
            <p className="mb-2 text-[10px] uppercase tracking-[4px] text-black/35">Order Summary</p>
            <h2 className="mb-1 text-2xl font-light">Atelier Total</h2>
            <p className="mb-8 text-[11px] text-black/40">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your order
            </p>

            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-black/40">Your cart is currently empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image_urls?.[0]} alt={item.title} className="h-16 w-14 object-cover" />
                    <div className="flex-1">
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-black/40">Qty: {item.quantity}</p>
                    </div>
                    <p>₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="my-6 border-t border-black/10" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span><span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {coupon?.code && `(${coupon.code})`}</span>
                  <span>− ₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#8a6b35]">Complimentary</span>
              </div>
            </div>

            <div className="my-6 border-t border-black/10" />

            <div className="flex justify-between text-xl">
              <span>Total</span><span>₹{total}</span>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 accent-[#C9A86A]" />
                <span className="text-[11px] leading-[1.8] text-black/55">
                  I agree to the <span className="mx-1 underline">Terms & Conditions</span>
                  and <span className="ml-1 underline">Privacy Policy</span>
                </span>
              </label>
            </div>

            <div className="mt-5 border border-[#C9A86A]/20 bg-[#C9A86A]/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle size={14} className="text-[#C9A86A]" />
                <span className="text-[11px] uppercase tracking-[3px] text-[#8a6b35]">
                  Authentic Atelier Promise
                </span>
              </div>
              <p className="text-[11px] leading-[1.8] text-black/60">
                Every AILURA order is handcrafted and quality checked before dispatch.
                Payments are processed through secure encrypted gateways.
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!agreed || items.length === 0 || loading}
              className={`mt-8 flex w-full items-center justify-center gap-2 py-4 text-[11px] uppercase tracking-[4px] transition-all
                ${agreed && items.length > 0 && !loading
                  ? 'bg-[#C9A86A] text-white hover:bg-[#b28e4d] active:scale-[0.98]'
                  : 'cursor-not-allowed bg-black/10 text-black/30'
                }`}
            >
              <Lock size={14} />
              {loading
                ? paymentMethod === 'COD' ? 'Placing Order...' : 'Opening Payment...'
                : paymentMethod === 'COD' ? 'Place Order' : 'Pay ₹' + total
              }
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[2px] text-black/35">
              <CreditCard size={13} />
              <span>Visa · Mastercard · UPI · GPay</span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-[10px] uppercase tracking-[2px] text-black/35">
              <div className="flex items-center gap-1"><Truck size={12} />Insured</div>
              <div className="flex items-center gap-1"><ShieldCheck size={12} />Encrypted</div>
              <div className="flex items-center gap-1"><RotateCcw size={12} />Returns</div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}