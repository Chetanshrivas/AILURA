export interface Product {
  id?: number

  title: string

  slug: string

  description: string

  price: number

  original_price: number

  discount_percent: number

  category: string

  stock: number

  featured: boolean

  image_urls: string[]
}