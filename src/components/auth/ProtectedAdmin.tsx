'use client'

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  supabase,
} from '../../lib/supabase'

export default function ProtectedAdmin({
  children,
}: {
  children: React.ReactNode
}) {
  const router =
    useRouter()

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const checkAdmin =
      async () => {

        const {
          data: { session },
        } =
          await supabase.auth.getSession()

        if (!session) {
          router.push(
            '/admin/login'
          )
          return
        }

        const {
          data: profile,
          error,
        } = await supabase
          .from('profiles')
          .select('role')
          .eq(
            'id',
            session.user.id
          )
          .single()

        if (
          error ||
          !profile ||
          profile.role !==
            'admin'
        ) {

          router.push('/')

          return
        }

        setLoading(false)
      }

    checkAdmin()

  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-white">
        Loading Admin Panel...
      </div>
    )
  }

  return <>{children}</>
}