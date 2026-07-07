'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
  // Case 1 — Hash se token milta hai (SMTP wala)
  const hash = window.location.hash
  if (hash && hash.includes('access_token')) {
    const params = new URLSearchParams(hash.substring(1))
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token') || ''
    const type = params.get('type')

    if (accessToken && type === 'recovery') {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          setIsValidSession(!error)
          setChecking(false)
        })
      return
    }
  }

  // Case 2 — Event se milta hai (Supabase default)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') {
      setIsValidSession(true)
      setChecking(false)
    }
  })

  return () => subscription.unsubscribe()
}, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || !confirmPassword) { toast.error('Please fill all fields'); return }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }

    try {
      setLoading(true)
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      toast.success('Password updated successfully')
      setTimeout(() => router.push('/login'), 1500)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0]">
        <p className="text-[11px] uppercase tracking-[4px] text-black/40">Verifying link...</p>
      </div>
    )
  }

  if (!isValidSession) return null

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        backgroundImage: 'url(/collections/appointment-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(30,20,8,0.50)' }} />

      <div
        className="relative z-10 w-full max-w-[440px] px-10 py-10"
        style={{
          background: 'rgba(60,42,18,0.72)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,168,106,0.2)',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        }}
      >
        <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#C9A86A]/40" />
        <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#C9A86A]/40" />
        <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C9A86A]/40" />
        <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C9A86A]/40" />

        <div className="mb-8 text-center">
          <p className="text-[18px] tracking-[10px] text-[#C9A86A]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            A I L U R A
          </p>
          <div className="mt-3 h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,106,0.4), transparent)' }} />
          <h1 className="mt-5 text-[28px] font-light text-[#F5EDD8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Set New <em className="italic text-[#C9A86A]">Password</em>
          </h1>
          <p className="mt-2 text-[11px] text-[#C9A86A]/50">
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">

          <div>
            <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
              New Password
            </label>
            <div className="flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
              <Lock size={13} className="shrink-0 text-[#C9A86A]/40" strokeWidth={1.5} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-transparent py-2.5 text-[13px] outline-none placeholder:text-[#C9A86A]/20"
                style={{ color: '#F5EDD8' }}
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="shrink-0 text-[#C9A86A]/40 hover:text-[#C9A86A] transition-colors">
                {showPass ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
              Confirm Password
            </label>
            <div className="flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
              <Lock size={13} className="shrink-0 text-[#C9A86A]/40" strokeWidth={1.5} />
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full bg-transparent py-2.5 text-[13px] outline-none placeholder:text-[#C9A86A]/20"
                style={{ color: '#F5EDD8' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 w-full items-center justify-center text-[10px] uppercase tracking-[4px] transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#C9A86A', color: '#1a1208' }}
          >
            {loading ? 'Updating...' : 'Update Password →'}
          </button>

        </form>
      </div>
    </main>
  )
}