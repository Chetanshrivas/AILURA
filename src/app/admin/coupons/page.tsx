'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  toast,
} from 'react-toastify'

import CouponStats
from '../../../components/admin/coupons/CouponStats'

import CouponSearchBar
from '../../../components/admin/coupons/CouponSearchBar'

import CouponsTable
from '../../../components/admin/coupons/CouponsTable'

import CouponModal
from '../../../components/admin/coupons/CouponModal'

import {
  getCoupons,
  deleteCoupon,
} from '../../../service/coupons'

export default function CouponsPage() {

  const [coupons, setCoupons] =
    useState<any[]>([])

  const [search, setSearch] =
    useState('')

  const [modalOpen, setModalOpen] =
    useState(false)

  const [selectedCoupon, setSelectedCoupon] =
    useState<any>(null)

  async function loadCoupons() {

    try {

      const data =
        await getCoupons()

      setCoupons(
        data || []
      )

    } catch (error) {

      console.error(error)

    }

  }

  useEffect(() => {

    loadCoupons()

  }, [])

  async function handleDelete(
    coupon: any
  ) {

    try {

      await deleteCoupon(
        coupon.id
      )

      toast.success(
        'Coupon Deleted'
      )

      await loadCoupons()

    } catch {

      toast.error(
        'Delete Failed'
      )

    }

  }

  return (

    <div className="space-y-8">

      <CouponStats
        coupons={coupons}
      />

      <CouponSearchBar
        search={search}
        setSearch={setSearch}
        onAddCoupon={() => {

          setSelectedCoupon(
            null
          )

          setModalOpen(true)

        }}
      />

      <CouponsTable
        coupons={coupons}
        search={search}
        onEdit={(coupon) => {

          setSelectedCoupon(
            coupon
          )

          setModalOpen(true)

        }}
        onDelete={
          handleDelete
        }
      />

      <CouponModal
        open={modalOpen}
        coupon={selectedCoupon}
        onClose={() =>
          setModalOpen(false)
        }
        onSuccess={
          loadCoupons
        }
      />

    </div>

  )

}