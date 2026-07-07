'use client'

import {
useEffect,
useState,
} from 'react'

import {
getProducts,
} from '../../../service/products'

export default function TopProducts() {

const [products, setProducts] =
useState<any[]>([])

useEffect(() => {

async function load() {

  const data =
    await getProducts()

  setProducts(
    data?.slice(0, 5) || []
  )

}

load()


}, [])

return (


<div
  className="
  rounded-[28px]
  border
  border-[#ECE3D8]
  bg-white
  p-6
"
>

  <h2 className="mb-6 text-2xl font-semibold">
    Top Products
  </h2>

  <div className="space-y-4">

    {products.map((product) => (

      <div
        key={product.id}
        className="
        flex
        items-center
        gap-4
      "
      >

        <img
          src={
            product.image_urls?.[0]
          }
          alt=""
          className="
          h-14
          w-14
          rounded-2xl
          object-cover
        "
        />

        <div className="flex-1">

          <p className="font-medium">
            {product.title}
          </p>

          <p className="text-sm text-black/50">
            {product.category}
          </p>

        </div>

        <p className="font-semibold">
          ₹{product.price}
        </p>

      </div>

    ))}

  </div>

</div>


)

}
