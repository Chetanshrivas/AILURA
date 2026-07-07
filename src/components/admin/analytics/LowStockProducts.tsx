'use client'

import { PackageX } from 'lucide-react'

interface Props {
  products: any[]
}

export default function LowStockProducts({ products }: Props) {

  const lowStockProducts = products.filter(p => p.stock <= 10).slice(0, 5)

  return (
    <div className="rounded-[24px] border border-[#E9E2D9] bg-white p-7">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-black">Low Stock Products</h2>
        <span className="rounded-lg bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600">
          {lowStockProducts.length} items
        </span>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <PackageX size={22} className="mb-2 text-black/20" />
          <p className="text-[12px] text-black/30">All products well stocked</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-[#F0E9E0] bg-[#FCFAF8] px-5 py-3.5"
            >
              <div>
                <p className="text-[13px] font-medium text-black">{product.title}</p>
                <p className="text-[11px] text-black/35">{product.category}</p>
              </div>
              <span className="rounded-lg bg-red-50 px-3 py-1.5 text-[12px] font-semibold text-red-600">
                {product.stock} left
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}