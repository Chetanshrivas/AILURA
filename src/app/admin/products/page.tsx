'use client'

import { useEffect, useState } from 'react'

import ProductStats from '../../../components/admin/products/ProductStats'
import SearchBar from '../../../components/admin/products/SearchBar'
import ProductTable from '../../../components/admin/products/ProductTable'
import ProductModal from '../../../components/admin/products/ProductModal'

import { getProducts } from '../../../service/products'

export default function ProductsPage() {

  const [open, setOpen] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const [products, setProducts] =
    useState<any[]>([])

  const [selectedProduct, setSelectedProduct] =
    useState<any>(null)

  async function loadProducts() {

    try {

      const data =
        await getProducts()

      setProducts(data || [])

    } catch (error) {

      console.error(error)

    }

  }

  useEffect(() => {

    loadProducts()

  }, [])

  return (

    <div className="space-y-8">

      <ProductStats
        products={products}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
        onAddProduct={() => {

          setSelectedProduct(null)

          setOpen(true)

        }}
      />

      <ProductTable
        search={search}
        products={products}
        refreshProducts={loadProducts}
        onEdit={(product) => {

          setSelectedProduct(product)

          setOpen(true)

        }}
      />

      <ProductModal
        open={open}
        product={selectedProduct}
        onClose={() => {

          setSelectedProduct(null)

          setOpen(false)

        }}
        onSuccess={async () => {

          await loadProducts()

          setSelectedProduct(null)

          setOpen(false)

        }}
      />

    </div>

  )
}