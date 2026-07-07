'use client'

import { useEffect, useState } from 'react'
import { X, User, Truck, CreditCard, Package } from 'lucide-react'
import { toast } from 'react-toastify'
import { updateOrderStatus, updatePaymentStatus, updateTrackingId } from '../../../service/orders'

interface Props {
  open: boolean
  onClose: () => void
  order: any
  refreshOrders: () => Promise<void>
}

export default function OrderDetailsModal({ open, onClose, order, refreshOrders }: Props) {
  const [trackingId, setTrackingId] = useState('')
  const [orderStatus, setOrderStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!order) return
    setTrackingId(order.tracking_id || '')
    setOrderStatus(order.order_status || 'Pending')
    setPaymentStatus(order.payment_status || 'Pending')
  }, [order])

  const hasChanges =
    trackingId !== (order?.tracking_id || '') ||
    orderStatus !== (order?.order_status || '') ||
    paymentStatus !== (order?.payment_status || '')

  async function handleSave() {
    if (saving) return
    setSaving(true)
    try {
      await updateTrackingId(order.id, trackingId)
      await updateOrderStatus(order.id, orderStatus)
      await updatePaymentStatus(order.id, paymentStatus)

      if (orderStatus !== order.order_status) {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'order_updated',
            order: { id: order.id, order_status: orderStatus, tracking_id: trackingId },
            customerEmail: order.customer_email,
            customerName: order.customer_name,
          }),
        })
      }

      await refreshOrders()
      toast.success('Order Updated Successfully')
      onClose()
    } catch {
      toast.error('Failed To Update Order')
    } finally {
      setSaving(false)
    }
  }

  if (!open || !order) return null

  const inputClass = "w-full rounded-xl border border-[#E7DDD1] bg-[#FDFCF9] px-4 py-3 text-[13px] outline-none focus:border-[#C9A86A] transition-colors"
  const labelClass = "mb-2 block text-[10px] uppercase tracking-[3px] text-black/40"

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECE3D8] px-8 py-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[22px] font-semibold text-black">Order #{order.id}</h2>
              <span className="rounded-lg bg-[#C9A86A]/15 px-3 py-1 text-[11px] uppercase tracking-[2px] text-[#8a6b35]">
                {order.order_status}
              </span>
            </div>
            <p className="mt-1 text-[12px] text-black/35">
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                : '—'}
            </p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] hover:bg-[#F8F2EA] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="grid gap-5 p-7 lg:grid-cols-2">

          {/* Customer */}
          <div className="rounded-[20px] border border-[#ECE3D8] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F2EA]">
                <User size={17} className="text-[#C9A86A]" />
              </div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[2px] text-black/60">Customer</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Name', value: order.customer_name },
                { label: 'Email', value: order.customer_email },
                { label: 'Phone', value: order.customer_phone },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className={labelClass}>{label}</p>
                  <p className="text-[13px] font-medium text-black">{value || '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-[20px] border border-[#ECE3D8] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F2EA]">
                <Truck size={17} className="text-[#C9A86A]" />
              </div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[2px] text-black/60">Shipping</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Tracking ID</label>
                <input value={trackingId} onChange={e => setTrackingId(e.target.value)} placeholder="Enter tracking ID" className={inputClass} />
              </div>
              <div>
                <p className={labelClass}>Address</p>
                <p className="text-[13px] leading-[1.8] text-black/60">{order.shipping_address}</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-[20px] border border-[#ECE3D8] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F2EA]">
                <CreditCard size={17} className="text-[#C9A86A]" />
              </div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[2px] text-black/60">Payment</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Payment Status</label>
                <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className={inputClass}>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="flex items-center justify-between border-t border-black/6 pt-4">
                <p className={labelClass}>Total</p>
                <p className="text-[26px] font-light text-black">₹{order.total_amount}</p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="rounded-[20px] border border-[#ECE3D8] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F2EA]">
                <Package size={17} className="text-[#C9A86A]" />
              </div>
              <h3 className="text-[13px] font-semibold uppercase tracking-[2px] text-black/60">Order Status</h3>
            </div>
            <div>
              <label className={labelClass}>Update Status</label>
              <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)} className={inputClass}>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {orderStatus !== order?.order_status && (
                <p className="mt-3 text-[11px] text-[#C9A86A]">
                  ✦ Customer will receive an email notification.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#ECE3D8] px-7 py-5">
          <button onClick={onClose} className="text-[12px] uppercase tracking-[3px] text-black/35 hover:text-black transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`rounded-xl px-8 py-3 text-[12px] uppercase tracking-[3px] font-medium text-white transition-all ${
              hasChanges && !saving
                ? 'bg-[#C9A86A] hover:bg-[#b8923a] hover:shadow-lg hover:shadow-[#C9A86A]/25'
                : 'cursor-not-allowed bg-black/10 text-black/25'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  )
}