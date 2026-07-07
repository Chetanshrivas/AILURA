import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '../../../lib/razorpay'
import { supabase } from '../../../lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Amount Razorpay ko paisa mein chahiye (1 rupee = 100 paisa)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error: any) {
    console.error('Razorpay create order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}