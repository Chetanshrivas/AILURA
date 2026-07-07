export interface Coupon {

  id?: number

  code: string

  discount_type: string

  discount_value: number

  minimum_order: number

  usage_limit: number

  used_count: number

  expires_at: string

  active: boolean

  created_at?: string

}