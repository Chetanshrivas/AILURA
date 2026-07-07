'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../../components/layout/Navbar'
import Footer from '../../../../components/layout/Footer'
import { ArrowLeft, Package, Truck, CreditCard, MapPin, Check, Clock } from 'lucide-react'
import { getOrderById, getOrderItems } from '../../../../service/orders'
import { motion } from 'framer-motion'

const STATUS_STEPS = [
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Check },
]

export default function OrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const loadOrder = async () => {
      const orderData = await getOrderById(Number(params.id))
      const itemsData = await getOrderItems(Number(params.id))
      setOrder(orderData)
      setItems(itemsData)
    }
    loadOrder()
  }, [params.id])

  if (!order) return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0]">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3 sm:gap-5">
          {['A','I','L','U','R','A'].map((letter, i) => (
            <span key={i}
              className={`leading-none opacity-0 ${[1,3,5].includes(i) ? 'text-[#C9A86A]' : 'text-[#1a1208]'}`}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(56px, 12vw, 140px)',
                fontWeight: 400,
                animation: `letterDrop 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s forwards`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="h-[1px] bg-[#C9A86A]" style={{ animation: 'expandLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both' }} />
        <p className="text-[8px] uppercase tracking-[8px] text-[#C9A86A]/60" style={{ animation: 'fadeIn 0.6s ease 1.2s both' }}>
          Luxury Nail Atelier
        </p>
      </div>
    </div>
  )

  const currentStep = STATUS_STEPS.findIndex(s => s.key === order.order_status?.toLowerCase())

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] px-4 pt-28 pb-20 md:px-8 lg:px-20">
        <div className="mx-auto max-w-7xl">

          {/* ── Header ── */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-px w-4 md:w-8 bg-[#C9A86A]" />
                <p className="text-[9px] md:text-[10px] uppercase tracking-[5px] text-[#C9A86A]">Order Details</p>
              </div>
              <Link href="/account/orders"
                className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[3px] text-black/35 hover:text-[#C9A86A] transition-colors">
                <ArrowLeft size={11} />
                <span className="hidden sm:inline">Back to Orders</span>
                <span className="sm:hidden">Orders</span>
              </Link>
            </div>
            <h1 className="text-[36px] font-light tracking-[-1.5px] md:text-[72px] md:tracking-[-3px]">
              Order <span className="text-[#C9A86A]">#{order.id}</span>
            </h1>
            <p className="mt-2 text-[11px] text-black/40">
              Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>

          {/* ── Progress Tracker ── */}
          <div className="mb-10 border border-black/8 bg-white p-6 md:p-10">
            <p className="mb-8 text-[9px] uppercase tracking-[5px] text-[#C9A86A]">Delivery Progress</p>
            <div className="flex items-start">
              {STATUS_STEPS.map((step, i) => {
                const Icon = step.icon
                const done = i <= currentStep
                const active = i === currentStep
                return (
                  <div key={step.key} className="flex flex-1 items-start">
                    <div className="flex flex-col items-center gap-3 w-full">

                      {/* Circle */}
                      <div className="relative flex flex-col items-center w-full">
                        <div
                          className="flex h-10 w-10 items-center justify-center transition-all duration-500 z-10"
                          style={{
                            background: done ? '#C9A86A' : '#fff',
                            border: done ? '1px solid #C9A86A' : '1px solid rgba(0,0,0,0.12)',
                            boxShadow: active ? '0 0 0 4px rgba(201,168,106,0.15)' : 'none',
                          }}
                        >
                          <Icon
                            size={14}
                            style={{ color: done ? '#fff' : 'rgba(0,0,0,0.25)' }}
                            strokeWidth={1.8}
                          />
                        </div>

                        {/* Line connector */}
                        {i < STATUS_STEPS.length - 1 && (
                          <div
                            className="absolute top-5 left-[calc(50%+20px)] h-px transition-all duration-700"
                            style={{
                              width: 'calc(100% - 40px)',
                              background: i < currentStep
                                ? 'linear-gradient(to right, #C9A86A, #C9A86A)'
                                : 'rgba(0,0,0,0.08)',
                            }}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <span
                        className="text-[8px] uppercase tracking-[2px] text-center whitespace-nowrap"
                        style={{
                          color: active ? '#C9A86A' : done ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.2)',
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

            {/* ── Left ── */}
            <div className="space-y-4">

              {/* Items */}
              <div className="border border-black/8 bg-white">
                <div className="flex items-center gap-3 border-b border-black/8 px-6 py-5 md:px-8">
                  <Package size={14} className="text-[#C9A86A]" />
                  <h2 className="text-[11px] uppercase tracking-[4px] text-black/60">Order Items</h2>
                  <span className="ml-auto text-[10px] uppercase tracking-[3px] text-[#C9A86A]">
                    {items.length} {items.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>

                <div className="divide-y divide-black/5">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-[80px_1fr_auto] gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6 items-center">
                      
                      {/* Image */}
                      <div className="overflow-hidden bg-[#F8F5F0]">
                        <img
                          src={item.product_image}
                          alt={item.product_title}
                          className="h-24 w-20 object-cover"
                        />
                      </div>

                      {/* Info — center */}
                      <div>
                        <p className="text-[9px] uppercase tracking-[3px] text-[#C9A86A] mb-1">Atelier Piece</p>
                        <h3 className="text-[15px] md:text-[17px] font-light leading-tight">{item.product_title}</h3>
                        <p className="mt-1.5 text-[10px] uppercase tracking-[3px] text-black/30">
                          Qty · {item.quantity}
                        </p>
                      </div>

                      {/* Price — right */}
                      <div className="text-right">
                        <p className="text-[18px] md:text-[20px] font-light">₹{item.price}</p>
                        {item.quantity > 1 && (
                          <p className="mt-0.5 text-[10px] text-black/30">₹{item.price / item.quantity} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div className="border border-black/8 bg-white px-6 py-6 md:px-8">
                <div className="flex items-center gap-3 mb-5">
                  <MapPin size={14} className="text-[#C9A86A]" />
                  <h2 className="text-[11px] uppercase tracking-[4px] text-black/60">Shipping Details</h2>
                </div>
                <div className="grid gap-3 text-[13px] text-black/55">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] uppercase tracking-[3px] text-black/30 w-16 shrink-0">Name</span>
                    <span className="font-medium text-black/75">{order.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] uppercase tracking-[3px] text-black/30 w-16 shrink-0">Email</span>
                    <span>{order.customer_email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] uppercase tracking-[3px] text-black/30 w-16 shrink-0">Phone</span>
                    <span>{order.customer_phone}</span>
                  </div>
                  <div className="flex items-start gap-3 border-t border-black/6 pt-3 mt-1">
                    <span className="text-[8px] uppercase tracking-[3px] text-black/30 w-16 shrink-0 mt-0.5">Address</span>
                    <span className="leading-[1.8]">{order.shipping_address}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Right ── */}
            <div className="space-y-4">

              {/* Status */}
              <div className="border border-black/8 bg-white px-7 py-6">
                <p className="mb-5 text-[9px] uppercase tracking-[5px] text-[#C9A86A]">Status</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[3px] text-black/40">Order</span>
                    <span className="border border-[#C9A86A]/30 bg-[#C9A86A]/8 px-3 py-1 text-[9px] uppercase tracking-[3px] text-[#C9A86A]">
                      {order.order_status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[3px] text-black/40">Payment</span>
                    <span className="border border-black/10 bg-black/5 px-3 py-1 text-[9px] uppercase tracking-[3px] text-black/60">
                      {order.payment_status}
                    </span>
                  </div>
                  {order.tracking_id && (
                    <div className="flex items-center justify-between border-t border-black/6 pt-4">
                      <span className="text-[11px] uppercase tracking-[3px] text-black/40">Tracking</span>
                      <span className="text-[11px] text-black/70">{order.tracking_id}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment summary */}
              <div className="border border-black/8 bg-white px-7 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <CreditCard size={14} className="text-[#C9A86A]" />
                  <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A]">Payment Summary</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[12px] text-black/50">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[12px] text-black/50">
                    <span>Discount</span>
                    <span className="text-green-600">− ₹{order.discount_amount}</span>
                  </div>
                  <div className="flex justify-between text-[12px] text-black/50">
                    <span>Shipping</span>
                    <span>{order.shipping_charge === 0 ? 'Complimentary' : `₹${order.shipping_charge}`}</span>
                  </div>
                  <div className="border-t border-black/8 pt-4 flex justify-between">
                    <span className="text-[11px] uppercase tracking-[3px] text-black/50">Total</span>
                    <span className="text-[22px] font-light">₹{order.total_amount}</span>
                  </div>
                </div>
              </div>

              {/* Delivery note */}
              <div className="border border-[#C9A86A]/20 bg-gradient-to-br from-[#faf7f0] to-white px-7 py-6">
                <div className="flex items-start gap-3">
                  <Truck size={14} className="mt-0.5 shrink-0 text-[#C9A86A]" />
                  <div>
                    <p className="text-[9px] uppercase tracking-[4px] text-[#C9A86A] mb-2">Delivery Note</p>
                    <p className="text-[12px] leading-[1.85] text-black/50">
                      Your order is being carefully prepared by our atelier team. You'll receive a tracking update soon.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}