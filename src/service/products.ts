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