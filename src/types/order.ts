export interface Order {

  id: number

  customer_name: string

  customer_email: string

  customer_phone: string

  shipping_address: string

  billing_address?: string

  payment_method?: string

  total_amount: number

  payment_status: string

  order_status: string

  tracking_id?: string

  created_at: string

}