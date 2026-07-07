'use client'

import { toast } from 'react-toastify'
import { useState } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { deleteProduct } from '../../../service/products'

interface Props {
  search: string
  products: any[]
  refreshProducts: () => Promise<void>
  onEdit: (product: any) => void
}

export default function ProductTable({ search, products, refreshProducts, onEdit }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  function handleDelete(id: number) {
    toast.info(
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-black">Delete this product?</span>
        <button
          onClick={async () => {
            try {
              await deleteProduct(id)
              await refreshProducts()
              toast.dismiss()
              toast.success('Product Deleted Successfully')
            } catch {
              toast.error('Delete Failed')
            }
          }}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-white text-sm"
        >
          Delete
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-1.5 text-sm text-black"
        >
          Cancel
        </button>
      </div>,
      { autoClose: false, closeButton: false, icon: false, style: { background: '#ffffff', color: '#000000' } }
    )
  }

  const filteredProducts = products.filter((product) => {
    const words = search.toLowerCase().trim().split(' ')
    const title = product.title?.toLowerCase() || ''
    return words.every((w) => title.includes(w))
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginated = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E9E2D9] bg-white">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EEE7DE] px-7 py-5">
        <div>
          <h2 className="text-xl font-semibold text-black">Products</h2>
          <p className="mt-0.5 text-[12px] text-black/40">{filteredProducts.length} total products</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F2EA]">
          <span className="text-[13px] font-semibold text-[#C9A86A]">{filteredProducts.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F0E9E0] bg-[#FCFAF8]">
              {['#', 'Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-[3px] text-black/40 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0EA]">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm text-black/30">
                  No products found
                </td>
              </tr>
            ) : (
              paginated.map((product, index) => (
                <tr key={product.id} className="group transition-colors hover:bg-[#FDFBF8]">

                  {/* # */}
                  <td className="px-5 py-4 text-[12px] text-black/30">
                    {startIndex + index + 1}
                  </td>

                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="overflow-hidden rounded-xl border border-[#EEE7DE]">
                        <img
                          src={product.image_urls?.[0]}
                          alt={product.title}
                          className="h-14 w-14 object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-black leading-tight">{product.title}</p>
                        <p className="mt-0.5 text-[11px] text-black/35">{product.slug}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="rounded-lg border border-[#E8DED3] bg-[#F8F4EE] px-3 py-1.5 text-[11px] uppercase tracking-[2px] text-[#8a6b35]">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <p className="text-[14px] font-semibold text-black">₹{product.price}</p>
                    {product.original_price && (
                      <p className="text-[11px] text-black/30 line-through">₹{product.original_price}</p>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4 text-[13px] font-medium text-black/70">
                    {product.stock}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {product.stock > 10 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-[11px] font-medium text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5 text-[11px] font-medium text-orange-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-[11px] font-medium text-red-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Out of Stock
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7DDD1] bg-[#FAF6F0] transition-all hover:border-[#C9A86A] hover:bg-[#C9A86A]/10"
                      >
                        <Pencil size={14} className="text-[#8a6b35]" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 transition-all hover:bg-red-100"
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

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-[#F0E9E0] px-7 py-4">
        <p className="text-[12px] text-black/40">
          Showing {paginated.length} of {filteredProducts.length} products
        </p>
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7E1D8] disabled:opacity-30 hover:bg-[#F8F2EA] transition-colors"
          >
            <ChevronLeft size={15} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-9 w-9 rounded-xl text-[13px] font-medium transition-colors ${
                currentPage === i + 1
                  ? 'bg-[#C9A86A] text-white'
                  : 'border border-[#E7E1D8] text-black/50 hover:bg-[#F8F2EA]'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7E1D8] disabled:opacity-30 hover:bg-[#F8F2EA] transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

    </div>
  )
}