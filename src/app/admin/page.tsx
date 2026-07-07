import StatsCards
from '../../components/admin/dashboard/StatsCards'

import RevenueChart
from '../../components/admin/dashboard/RevenueChart'

import RecentOrders
from '../../components/admin/dashboard/RecentOrders'

import QuickActions
from '../../components/admin/dashboard/QuickActions'

export default function AdminPage() {

  return (

    <div className="space-y-8">

      <StatsCards />

      <RevenueChart />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <RecentOrders />

        </div>

        <QuickActions />

      </div>

    </div>

  )

}