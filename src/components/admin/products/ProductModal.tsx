'use client'

import { X, Package } from 'lucide-react'
import ProductForm from './ProductForm'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  product?: any
}

export default function ProductModal({ open, onClose, onSuccess, product }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECE3D8] px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F2EA]">
              <Package size={20} className="text-[#C9A86A]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{product ? 'Edit Product' : 'Add Product'}</h2>
              <p className="text-[12px] text-black/40">Manage your product details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#ECE3D8] hover:bg-[#F8F2EA] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto p-8">
          <ProductForm product={product} onSuccess={onSuccess} />
        </div>

      </div>
    </div>
  )
}