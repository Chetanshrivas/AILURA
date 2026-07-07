import { supabase } from './supabase'

export async function getOrders() {

  const { data, error } =
    await supabase
      .from('orders')
      .select('*')
      .order('id', { ascending: false })  // ← ye add karo

  if (error) {
    console.log(error)
    throw error
  }

  return data
}

export async function updateOrderStatus(
  id: number,
  status: string
) {

  const { error } =
    await supabase
      .from('orders')
      .update({
        order_status: status,
      })
      .eq('id', id)

  if (error)
    throw error
}

export async function updatePaymentStatus(
  id: number,
  status: string
) {

  const { error } =
    await supabase
      .from('orders')
      .update({
        payment_status: status,
      })
      .eq('id', id)

  if (error)
    throw error
}

export async function updateTrackingId(
  id: number,
  trackingId: string
) {

  const { error } =
    await supabase
      .from('orders')
      .update({
        tracking_id: trackingId,
      })
      .eq('id', id)

  if (error)
    throw error
}

export async function getMyOrders(
  userId: string
) {

  const { data, error } =
    await supabase
      .from('orders')
      .select('*')
      .eq(
        'user_id',
        userId
      )
      .order(
        'id',
        {
          ascending: false,
        }
      )

  if (error)
    throw error

  return data
}

export async function getOrderById(
  orderId: number
) {

  const { data, error } =
    await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .maybeSingle()

  if (error)
    throw error

  return data
}

export async function getOrderItems(
  orderId: number
) {

  const { data, error } =
    await supabase
      .from('order_items')
      .select('*')
      .eq(
        'order_id',
        orderId
      )

  if (error)
    throw error

  return data
}