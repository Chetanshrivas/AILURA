import { supabase } from './supabase'

export async function getCoupons() {

  const { data, error } =
    await supabase
      .from('coupons')
      .select('*')
      .order('id', {
        ascending: false,
      })

  if (error)
    throw error

  return data

}

export async function createCoupon(
  coupon: any
) {

  const { error } =
    await supabase
      .from('coupons')
      .insert([coupon])

  if (error)
    throw error

}

export async function updateCoupon(
  id: number,
  coupon: any
) {

  const { error } =
    await supabase
      .from('coupons')
      .update(coupon)
      .eq('id', id)

  if (error)
    throw error

}

export async function deleteCoupon(
  id: number
) {

  const { error } =
    await supabase
      .from('coupons')
      .delete()
      .eq('id', id)

  if (error)
    throw error

}