import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image_urls: string[]
  slug: string
  description: string
  category: string
  original_price: number
  discount_percent: number
  stock: number
  featured: boolean
}

interface CouponData {
  code: string
  discount_type: 'percentage' | 'flat'
  discount_value: number
  minimum_order: number
  active: boolean
  expires_at: string | null
  usage_limit: number
  used_count: number
}

interface CartStore {
  items: CartItem[]
  coupon: CouponData | null

  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  setCoupon: (coupon: CouponData) => void
  removeCoupon: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,

      addToCart: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [], coupon: null }),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),

      setCoupon: (coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),
    }),
    {
      name: 'ailura-cart',
    }
  )
)