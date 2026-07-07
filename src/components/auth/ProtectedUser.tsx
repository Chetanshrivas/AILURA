'use client'

import {
  useEffect,
} from 'react'

import {
  useRouter,
} from 'next/navigation'

import {
  useAuth,
} from '../../context/AuthContext'

export default function ProtectedUser({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    user,
    loading,
  } = useAuth()

  const router =
    useRouter()

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.push(
        '/login'
      )
    }
  }, [
    user,
    loading,
    router,
  ])

  if (
    loading
  ) {
    return (
      <div
        className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#F8F5F0]
      "
      >
        <div
          className="
          h-10
          w-10
          animate-spin
          rounded-full
          border-2
          border-[#C9A86A]
          border-t-transparent
        "
        />
      </div>
    )
  }

  if (
    !user
  )
    return null

  return (
    <>
      {children}
    </>
  )
}