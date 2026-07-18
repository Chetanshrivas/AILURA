import { supabase } from './supabase'
import { Product } from '../types/product'

export async function createProduct(
  product: Omit<Product, 'id'>
) {
  const { data, error } =
    await supabase
      .from('products')
      .insert([product])
      .select()

  if (error) throw error

  return data
}


// (admin panel) 
export async function getProducts() {
  const { data, error } =
    await supabase
      .from('products')
      .select('*')
      .order('id', {
        ascending: false,
      })

  if (error) throw error

  return data
}

export async function deleteProduct(
  id: number
) {
  const { error } =
    await supabase
      .from('products')
      .delete()
      .eq('id', id)

  if (error) throw error
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
) {

  const { data, error } =
    await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()

  if (error) throw error

  return data
}

export async function getProductBySlug(
  slug: string
) {
  const { data, error } =
    await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

  if (error) throw error

  return data
}

export async function getFeaturedProducts() {
  const { data, error } =
    await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(8)

  if (error) throw error

  return data
}

// ─────────────────────────────────────────────────────────
// NAYA FUNCTION — sirf products listing page ke liye.
// Yeh Supabase se sirf utne hi rows mangata hai jitne
// current page pe dikhane hain (12 by default),
// ─────────────────────────────────────────────────────────

export interface GetPaginatedProductsParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: 'FEATURED' | 'PRICE_LOW' | 'PRICE_HIGH'
}

export interface GetPaginatedProductsResult {
  data: Product[]
  count: number
  totalPages: number
}

export async function getPaginatedProducts({
  page = 1,
  limit = 12,
  category,
  search,
  sort = 'FEATURED',
}: GetPaginatedProductsParams): Promise<GetPaginatedProductsResult> {
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })

  if (category && category !== 'ALL') {
    query = query.ilike('category', category)
  }

  if (search && search.trim()) {
    query = query.ilike('title', `%${search.trim()}%`)
  }

  if (sort === 'PRICE_LOW') {
    query = query.order('price', { ascending: true })
  } else if (sort === 'PRICE_HIGH') {
    query = query.order('price', { ascending: false })
  } else {
    query = query
      .order('featured', { ascending: false })
      .order('id', { ascending: false })
  }

  const from = (page - 1) * limit
  const to = from + limit - 1
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) throw error

  const total = count ?? 0

  return {
    data: (data as Product[]) ?? [],
    count: total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  }
}

// Categories chhoti list hoti hai (10-20 max), poora fetch
// karna yahan safe hai — filter buttons ke liye chahiye.
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category')

  if (error) {
    console.error('getCategories error:', error)
    return []
  }

  const unique = Array.from(
    new Set((data ?? []).map((d: any) => d.category).filter(Boolean))
  )
  return ['ALL', ...unique]
}