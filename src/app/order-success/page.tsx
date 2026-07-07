'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {

  return (

    <main className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">

      <div className="max-w-[600px] text-center">

        <CheckCircle
          size={70}
          className="mx-auto text-[#C9A86A]"
        />

        <p className="mt-8 text-[10px] uppercase tracking-[5px] text-[#C9A86A]">
          ORDER CONFIRMED
        </p>

        <h1 className="mt-4 text-[50px] font-light">
          Thank You.
        </h1>

        <p className="mt-4 text-black/50">
          Your order has been placed successfully.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/account/orders"
            className="bg-[#C9A86A] px-8 py-4 text-white"
          >
            View Orders
          </Link>

          <Link
            href="/products"
            className="border border-black/10 px-8 py-4"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>

  )
}