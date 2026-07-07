'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  getOrders,
} from '../../../service/orders'

import OrderDetailsModal
from '../../../components/admin/orders/OrderDetailsModal'

import OrderStats
  from '../../../components/admin/orders/OrderStats'

import OrderTable
  from '../../../components/admin/orders/OrdersTable'

import OrderSearchBar
  from '../../../components/admin/orders/OrderSearchBar'

export default function OrdersPage() {

  const [selectedOrder, setSelectedOrder] =
  useState<any>(null)

const [modalOpen, setModalOpen] =
  useState(false)

  const [orders, setOrders] =
    useState<any[]>([])

  const [search, setSearch] =
    useState('')

    const [orderStatusFilter, setOrderStatusFilter] =
  useState('All')

const [paymentStatusFilter, setPaymentStatusFilter] =
  useState('All')

async function loadOrders() {

  try {

    const data =
      await getOrders()

    setOrders(data || [])

  } catch (error) {

    console.error(
      'ORDERS ERROR =>',
      error
    )

  }

}

  useEffect(() => {

    loadOrders()

  }, [])

  return (

    <div className="space-y-8">

      <OrderStats
        orders={orders}
      />

          <OrderSearchBar
            search={search}
            setSearch={setSearch}
            orderStatusFilter={orderStatusFilter}
            setOrderStatusFilter={setOrderStatusFilter}
            paymentStatusFilter={paymentStatusFilter}
            setPaymentStatusFilter={setPaymentStatusFilter}
          />      

            <OrderTable
              orders={orders}
              search={search}
              refreshOrders={loadOrders}
              orderStatusFilter={orderStatusFilter}
              paymentStatusFilter={paymentStatusFilter}
              onView={(order) => {

                setSelectedOrder(order)

                setModalOpen(true)

              }}
            />        

          <OrderDetailsModal
          open={modalOpen}
          order={selectedOrder}
          refreshOrders={loadOrders}
          onClose={() => {
            setModalOpen(false)
            setSelectedOrder(null)
          }}
        />

    </div>

  )
}