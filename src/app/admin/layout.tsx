'use client'

import { usePathname } from 'next/navigation'
import AdminLayout from '../../../src/components/admin/layout/AdminLayout'
import ProtectedAdmin from '../../components/auth/ProtectedAdmin'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname =
    usePathname()

  if (
    pathname ===
    '/admin/login'
  ) {
    return <>{children}</>
  }

  return (
    <ProtectedAdmin>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedAdmin>
  )
}