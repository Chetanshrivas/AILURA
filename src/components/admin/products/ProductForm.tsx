'use client'

import { useEffect, useState } from 'react'
import { createProduct, updateProduct } from '../../../service/products'
import { toast } from 'react-toastify'

interface Props {
  onSuccess: () => void
  product?: any
}

export default function ProductForm({ onSuccess, product }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('PARTY')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')

  useEffect(() => {
    if (!product) return
    setTitle(product.title || '')
    setDescription(product.description || '')
    setPrice(String(product.price || ''))
    setOriginalPrice(String(product.original_price || ''))
    setStock(String(product.stock || ''))
    setCategory(product.category || 'PARTY')
    setImage1(product.image_urls?.[0] || '')
    setImage2(product.image_urls?.[1] || '')
    setImage3(product.image_urls?.[2] || '')
    setImage4(product.image_urls?.[3] || '')
  }, [product])

  const isFormValid =
    title.trim() !== '' &&
    description.trim() !== '' &&
    price.trim() !== '' &&
    originalPrice.trim() !== '' &&
    stock.trim() !== '' &&
    Number(price) > 0 &&
    Number(originalPrice) > 0 &&
    Number(stock) >= 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid) { toast.error('Please fill all required fields'); return }
    try {
      const discount = Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)
      const productData = {
        title,
        slug: title.toLowerCase().replaceAll(' ', '-'),
        description,
        price: Number(price),
        original_price: Number(originalPrice),
        discount_percent: discount || 0,
        category,
        stock: Number(stock),
        featured: true,
        image_urls: [image1, image2, image3, image4].filter(Boolean),
      }
      if (product?.id) {
        await updateProduct(product.id, productData)
        toast.success('Product Updated Successfully')
      } else {
        await createProduct(productData)
        toast.success('Product Created Successfully')
      }
      setTimeout(() => onSuccess(), 1500)
    } catch {
      toast.error('Something went wrong')
    }
  }

  const inputClass = "w-full rounded-xl border border-[#E8DED3] bg-[#FDFCF9] px-4 py-3 text-[13px] outline-none transition-colors focus:border-[#C9A86A] focus:bg-white"
  const labelClass = "mb-2 block text-[10px] uppercase tracking-[3px] text-black/40"

  return (
    <form onSubmit={handleSubmit} className="space-y-7">

      {/* Title + Category */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className={labelClass}>Product Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className={inputClass} placeholder="e.g. Bridal Luxury Set" />
        </div>
        <div>
          <label className={labelClass}>Category *</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
            <option>PARTY</option>
            <option>WEDDING</option>
            <option>HOLIDAY</option>
            <option>WORK</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description *</label>
        <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className={inputClass + ' resize-none'} placeholder="Product description..." />
      </div>

      {/* Price + Stock */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <label className={labelClass}>Sale Price (₹) *</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>Original Price (₹) *</label>
          <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>Stock *</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} className={inputClass} placeholder="0" />
        </div>
      </div>

      {/* Discount preview */}
      {price && originalPrice && Number(originalPrice) > Number(price) && (
        <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
          <span className="text-[12px] text-green-700">
            ✦ {Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100)}% discount will be applied
          </span>
        </div>
      )}

      {/* Images */}
      <div>
        <label className={labelClass}>Product Images</label>
        <div className="grid gap-3 lg:grid-cols-2">
          {[
            { val: image1, set: setImage1, label: 'Image 1 (Main)' },
            { val: image2, set: setImage2, label: 'Image 2' },
            { val: image3, set: setImage3, label: 'Image 3' },
            { val: image4, set: setImage4, label: 'Image 4' },
          ].map(({ val, set, label }) => (
            <div key={label} className="relative">
              <input
                placeholder={label}
                value={val}
                onChange={e => set(e.target.value)}
                className={inputClass}
              />
              {val && (
                <img src={val} alt="" className="mt-2 h-16 w-16 rounded-lg object-cover border border-[#E8DED3]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full rounded-xl py-4 text-[12px] uppercase tracking-[4px] font-medium transition-all ${
          isFormValid
            ? 'bg-[#C9A86A] text-white hover:bg-[#b8923a] hover:shadow-lg hover:shadow-[#C9A86A]/20 active:scale-[0.99]'
            : 'cursor-not-allowed bg-black/8 text-black/25'
        }`}
      >
        {product?.id ? 'Update Product' : 'Create Product'}
      </button>

    </form>
  )
}