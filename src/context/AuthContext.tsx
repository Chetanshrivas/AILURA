'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: any
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
  })

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const getSession = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    setUser(session?.user ?? null)
  } catch (error) {
    console.log(error)

    await supabase.auth.signOut()

    setUser(null)
  } finally {
    setLoading(false)
  }
}
    getSession()

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(
            session?.user ?? null
          )
        }
      )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>
  useContext(AuthContext)