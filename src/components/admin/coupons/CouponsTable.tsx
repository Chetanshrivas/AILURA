'use client'

import { Pencil, Trash2 } from 'lucide-react'

interface Props {
  coupons: any[]
  search: string
  onEdit: (coupon: any) => void
  onDelete: (coupon: any) => void
}

export default function CouponsTable({ coupons, search, onEdit, onDelete }: Props) {

  const query = search.toLowerCase()
  const filtered = coupons.filter((c) => c.code?.toLowerCase().includes(query))

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E9E2D9] bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EEE7DE] px-7 py-5">
        <div>
          <h2 className="text-[16px] font-semibold text-black">Coupons</h2>
          <p className="mt-0.5 text-[12px] text-black/35">{filtered.length} total coupons</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F2EA]">
          <span className="text-[13px] font-semibold text-[#C9A86A]">{filtered.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0E9E0] bg-[#FCFAF8]">
              {['Code', 'Type', 'Value', 'Min Order', 'Usage', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-[3px] text-black/35 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F5F0EA]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm text-black/25">No coupons found</td>
              </tr>
            ) : (
              filtered.map((coupon) => (
                <tr key={coupon.id} className="group transition-colors hover:bg-[#FDFBF8]">

                  <td className="px-5 py-4">
                    <span className="rounded-lg border border-[#E8DED3] bg-[#F8F4EE] px-3 py-1.5 text-[12px] font-semibold tracking-[1px] text-[#8a6b35]">
                      {coupon.code}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[12px] text-black/50">
                      {coupon.discount_type === 'PERCENTAGE' ? 'Percentage' : 'Flat Amount'}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[14px] font-semibold text-black">
                      {coupon.discount_type === 'PERCENTAGE' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[13px] text-black/60">₹{coupon.minimum_order}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[13px] text-black/60">{coupon.used_count} / {coupon.usage_limit}</span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium ${
                      coupon.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(coupon)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] bg-[#FAF6F0] transition-all hover:border-[#C9A86A] hover:bg-[#C9A86A]/10"
                      >
                        <Pencil size={14} className="text-[#8a6b35]" />
                      </button>
                      <button
                        onClick={() => onDelete(coupon)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 transition-all hover:border-red-300 hover:bg-red-100"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}