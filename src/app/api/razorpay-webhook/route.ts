import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '../../../lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Webhook signature verify karo
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const { event: eventType, payload } = event

    // ── Payment Captured ──
    if (eventType === 'payment.captured') {
      const payment = payload.payment.entity
      const razorpayPaymentId = payment.id
      const razorpayOrderId = payment.order_id

      // Order dhundho aur update karo
      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('razorpay_payment_id', razorpayPaymentId)
        .single()

      if (order) {
        await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            order_status: 'processing',
          })
          .eq('id', order.id)
      }
    }

    // ── Payment Failed ──
    if (eventType === 'payment.failed') {
      const payment = payload.payment.entity
      const razorpayPaymentId = payment.id

      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('razorpay_payment_id', razorpayPaymentId)
        .single()

      if (order) {
        await supabase
          .from('orders')
          .update({ payment_status: 'failed' })
          .eq('id', order.id)
      }
    }

    // ── Refund Processed ──
    if (eventType === 'refund.processed') {
      const refund = payload.refund.entity
      const razorpayPaymentId = refund.payment_id

      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('razorpay_payment_id', razorpayPaymentId)
        .single()

      if (order) {
        await supabase
          .from('orders')
          .update({
            payment_status: 'refunded',
            order_status: 'cancelled',
          })
          .eq('id', order.id)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}