'use client'

import {
  useEffect,
  useState,
} from 'react'

import AnalyticsStats
from '../../../components/admin/analytics/AnalyticsStats'

import RevenueInsights
from '../../../components/admin/analytics/RevenueInsights'

import LowStockProducts
from '../../../components/admin/analytics/LowStockProducts'

import CouponAnalytics
from '../../../components/admin/analytics/CouponAnalytics'

import {
  getProducts,
} from '../../../service/products'

import {
  getOrders,
} from '../../../service/orders'

import {
  getAppointments,
} from '../../../service/appointments'

import {
  getCoupons,
} from '../../../service/coupons'

export default function AnalyticsPage() {

  const [products, setProducts] =
    useState<any[]>([])

  const [orders, setOrders] =
    useState<any[]>([])

  const [appointments, setAppointments] =
    useState<any[]>([])

  const [coupons, setCoupons] =
    useState<any[]>([])

  const [revenue, setRevenue] =
    useState(0)

  async function loadAnalytics() {

    try {

      const [

        productsData,
        ordersData,
        appointmentsData,
        couponsData,

      ] = await Promise.all([

        getProducts(),
        getOrders(),
        getAppointments(),
        getCoupons(),

      ])

      setProducts(
        productsData || []
      )

      setOrders(
        ordersData || []
      )

      setAppointments(
        appointmentsData || []
      )

      setCoupons(
        couponsData || []
      )

      const totalRevenue =
        (ordersData || []).reduce(

          (
            acc: number,
            order: any
          ) =>

            acc +
            Number(
              order.total_amount || 0
            ),

          0

        )

      setRevenue(
        totalRevenue
      )

    } catch (error) {

      console.error(
        'Analytics Error =>',
        error
      )

    }

  }

  useEffect(() => {

    loadAnalytics()

  }, [])

  return (

    <div className="space-y-8">

      <AnalyticsStats
        revenue={revenue}
        orders={orders.length}
        appointments={appointments.length}
        coupons={coupons.length}
      />

      <RevenueInsights
        revenue={revenue}
        orders={orders.length}
        orderList={orders}
      />

      <div className="grid gap-8 xl:grid-cols-2">

        <LowStockProducts products={products} />

        <CouponAnalytics coupons={coupons} />

      </div>

    </div>

  )

}