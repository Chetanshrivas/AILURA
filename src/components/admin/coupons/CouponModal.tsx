'use client'

import { useEffect, useState } from 'react'
import { X, Ticket } from 'lucide-react'
import { toast } from 'react-toastify'
import { createCoupon, updateCoupon } from '../../../service/coupons'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  coupon?: any
}

export default function CouponModal({ open, onClose, onSuccess, coupon }: Props) {

  const [code, setCode] = useState('')
  const [discountType, setDiscountType] = useState('PERCENTAGE')
  const [discountValue, setDiscountValue] = useState('')
  const [minimumOrder, setMinimumOrder] = useState('')
  const [usageLimit, setUsageLimit] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [active, setActive] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!coupon) {
      setCode('')
      setDiscountType('PERCENTAGE')
      setDiscountValue('')
      setMinimumOrder('')
      setUsageLimit('')
      setExpiresAt('')
      setActive(true)
      return
    }

    setCode(coupon.code || '')
    setDiscountType(coupon.discount_type || 'PERCENTAGE')
    setDiscountValue(String(coupon.discount_value || ''))
    setMinimumOrder(String(coupon.minimum_order || ''))
    setUsageLimit(String(coupon.usage_limit || ''))
    setExpiresAt(coupon.expires_at?.split('T')[0] || '')
    setActive(coupon.active)
  }, [coupon])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (saving) return
    setSaving(true)

    try {
      const couponData = {
        code: code.toUpperCase(),
        discount_type: discountType,
        discount_value: Number(discountValue),
        minimum_order: Number(minimumOrder || 0),
        usage_limit: Number(usageLimit || 0),
        expires_at: expiresAt,
        active,
      }

      if (coupon?.id) {
        await updateCoupon(coupon.id, couponData)
        toast.success('Coupon Updated')
      } else {
        await createCoupon(couponData)
        toast.success('Coupon Created')
      }

      await onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-[#E7DDD1] bg-[#FDFCF9] px-4 py-3 text-[13px] outline-none focus:border-[#C9A86A] transition-colors"
  const labelClass = "mb-2 block text-[10px] uppercase tracking-[3px] text-black/40"

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EEE7DE] px-7 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F2EA]">
              <Ticket size={15} className="text-[#C9A86A]" />
            </div>
            <h2 className="text-[16px] font-semibold text-black">
              {coupon ? 'Edit Coupon' : 'Create Coupon'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] bg-[#FAF6F0] hover:border-[#C9A86A] transition-colors"
          >
            <X size={14} className="text-[#8a6b35]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-7">

          <div>
            <label className={labelClass}>Coupon Code</label>
            <input
              placeholder="e.g. FESTIVE20"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`${inputClass} uppercase`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Discount Type</label>
              <select value={discountType} onChange={(e) => setDiscountType(e.target.value)} className={inputClass}>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FLAT">Flat Amount</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Discount Value</label>
              <input
                placeholder={discountType === 'PERCENTAGE' ? 'e.g. 20' : 'e.g. 200'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Minimum Order</label>
              <input
                placeholder="₹0"
                value={minimumOrder}
                onChange={(e) => setMinimumOrder(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Usage Limit</label>
              <input
                placeholder="Unlimited"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Expires On</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className={inputClass}
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-[#ECE3D8] bg-[#FCFAF8] px-4 py-3">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 accent-[#C9A86A]"
            />
            <span className="text-[13px] text-black/70">Active Coupon</span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className={`w-full rounded-xl py-3.5 text-[13px] font-medium text-white transition-opacity ${
              saving ? 'cursor-not-allowed bg-black/20' : 'bg-[#C9A86A] hover:opacity-90'
            }`}
          >
            {saving ? 'Saving...' : coupon?.id ? 'Update Coupon' : 'Create Coupon'}
          </button>

        </form>

      </div>
    </div>
  )
}