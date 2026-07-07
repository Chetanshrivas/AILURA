'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  // ── NEW: Reset password states ──
  const [resetEmail, setResetEmail] = useState('')
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill all fields'); return }
    try {
      setLoading(true)
      const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', authData.user.id).single()
      toast.success('Welcome back to AILURA')
      setTimeout(() => {
        if (profile?.role === 'admin') router.push('/admin')
        else router.push('/')
        router.refresh()
      }, 1000)
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // ── NEW: Reset password handler ──
  const handleResetPassword = async () => {
    if (!resetEmail) { toast.error('Please enter email'); return }
    try {
      setResetLoading(true)
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      toast.success('Password reset email sent')
      setShowResetModal(false)
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email')
    } finally {
      setResetLoading(false)
    }
  }

  // const handleGoogle = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: { redirectTo: `${window.location.origin}/auth/callback` },
  //   })
  // }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        backgroundImage: 'url(/collections/appointment-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(30,20,8,0.45)' }} />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[480px] px-10 py-10"
        style={{
          background: 'rgba(60,42,18,0.72)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(201,168,106,0.2)',
        }}
      >
        {/* Corner brackets */}
        <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#C9A86A]/40" />
        <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#C9A86A]/40" />
        <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C9A86A]/40" />
        <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C9A86A]/40" />

        {/* Brand */}
        <div className="mb-6 text-center">
          <p className="text-[22px] tracking-[10px] text-[#C9A86A]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            A I L U R A
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C9A86A]/40" />
            <span className="text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
              Maison Privée · Est. MMXX
            </span>
            <span className="h-px w-10 bg-[#C9A86A]/40" />
          </div>
          <h1 className="mt-4 text-[30px] font-light text-[#F5EDD8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Welcome back to{' '}
            <em className="italic text-[#C9A86A]">the Maison</em>
          </h1>
        </div>

        {/* Tabs */}
        <div className="mb-7 grid grid-cols-2"
          style={{ border: '1px solid rgba(201,168,106,0.2)' }}>
          <button
            className="py-2.5 text-[10px] uppercase tracking-[4px]"
            style={{ background: '#C9A86A', color: '#1a1208' }}
          >
            Sign In
          </button>
          <Link href="/register"
            className="flex items-center justify-center py-2.5 text-[10px] uppercase tracking-[4px] text-[#C9A86A]/60 hover:text-[#C9A86A] transition-colors">
            Register
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
              Email Address
            </label>
            <div className="flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
              <Mail size={13} className="shrink-0 text-[#C9A86A]/40" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent py-2.5 text-[13px] outline-none placeholder:text-[#C9A86A]/20"
                style={{ color: '#F5EDD8', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
              Password
            </label>
            <div className="flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
              <Lock size={13} className="shrink-0 text-[#C9A86A]/40" strokeWidth={1.5} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent py-2.5 text-[13px] outline-none placeholder:text-[#C9A86A]/20"
                style={{ color: '#F5EDD8', fontFamily: 'Inter, sans-serif' }}
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="shrink-0 text-[#C9A86A]/40 hover:text-[#C9A86A] transition-colors">
                {showPass ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* ── CHANGED: Forgot Password button — opens modal ── */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="text-[8.5px] uppercase tracking-[3px] text-[#C9A86A]/50 hover:text-[#C9A86A] transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 text-[10px] uppercase tracking-[4px] transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#C9A86A', color: '#1a1208', fontFamily: 'Inter, sans-serif' }}
          >
            {loading ? 'Entering...' : 'Enter Maison →'}
          </button>

        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: 'rgba(201,168,106,0.2)' }} />
          <span className="text-[8px] uppercase tracking-[3px] text-[#C9A86A]/40">
            Or Continue With
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(201,168,106,0.2)' }} />
        </div>

        {/* Google — commented out same as original */}
        {/* <button onClick={handleGoogle} ... /> */}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <Link href="/"
            className="text-[8.5px] uppercase tracking-[3px] text-[#C9A86A]/40 hover:text-[#C9A86A] transition-colors">
            ← Return to Site
          </Link>
          <Link href="/admin/login"
            className="flex items-center gap-1.5 text-[8.5px] uppercase tracking-[3px] text-[#C9A86A]/40 hover:text-[#C9A86A] transition-colors">
            <ShieldCheck size={11} strokeWidth={1.5} />
            Admin
          </Link>
        </div>

      </div>

      {/* ── NEW: Reset Password Modal ── */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-md border border-[#C9A86A]/20 bg-[#24180E] p-8"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            {/* Corner brackets */}
            <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#C9A86A]/30" />
            <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#C9A86A]/30" />

            <h2 className="text-3xl font-light text-[#F5EDD8]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Reset Password
            </h2>
            <p className="mt-3 text-[11px] leading-relaxed text-[#C9A86A]/60">
              Enter your email and we'll send you a reset link.
            </p>

            <div className="mt-6 flex items-center gap-3"
              style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
              <Mail size={13} className="shrink-0 text-[#C9A86A]/40" strokeWidth={1.5} />
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
                placeholder="Email Address"
                className="w-full bg-transparent py-2.5 text-[13px] outline-none placeholder:text-[#C9A86A]/20"
                style={{ color: '#F5EDD8' }}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 border border-[#C9A86A]/20 py-3 text-[10px] uppercase tracking-[3px] text-[#C9A86A] transition-all hover:border-[#C9A86A]/50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="flex-1 py-3 text-[10px] uppercase tracking-[3px] transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: '#C9A86A', color: '#1a1208' }}
              >
                {resetLoading ? 'Sending...' : 'Send Link'}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}