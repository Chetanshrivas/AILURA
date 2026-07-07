'use client'

import { useCartStore } from '../../store/cartStore'

interface Props {
  product: any
}

export default function AddToCartButton({
  product,
}: Props) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  )

  return (
    <button
      onClick={() =>
        addToCart({
          ...product,
          quantity: 1,
        })
      }
      className="rounded-full bg-black px-10 py-4 text-white"
    >
      Add To Cart
    </button>
  )
}