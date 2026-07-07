'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import { ShieldCheck, KeyRound, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error(
        'Please fill all fields'
      )
      return
    }

    try {
      setLoading(true)

      const {
        data: authData,
        error,
      } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (error)
        throw error

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from('profiles')
        .select('role')
        .eq(
          'id',
          authData.user.id
        )
        .maybeSingle()  

      if (
        profileError ||
        !profile
      ) {
        await supabase.auth.signOut()

        toast.error(
          'Profile not found'
        )

        return
      }

      if (
        profile.role !==
        'admin'
      ) {
        await supabase.auth.signOut()

        toast.error(
          'Unauthorized Access'
        )

        return
      }

      toast.success(
        'Admin Access Granted :)'
      )

      setTimeout(() => {
        router.push('/admin')
        router.refresh()
      }, 800)
    } catch (
      error: any
    ) {
      toast.error(
        error.message ||
          'Login failed'
      )
    } finally {
      setLoading(false)
    }
  }

    return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-12 pb-10 px-4"
      style={{
        background: '#2a1f0f',
        backgroundImage:
          'linear-gradient(rgba(201,168,106,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,106,0.06) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >

      {/* ── Shield icon – outside card ── */}
      <div
        className="flex h-[72px] w-[72px] items-center justify-center rounded-full"
        style={{ border: '1px solid rgba(201,168,106,0.35)' }}
      >
        <ShieldCheck size={28} color="#C9A86A" strokeWidth={1.5} />
      </div>

      {/* ── Brand – outside card ── */}
      <div className="mt-5 text-center">
        <p
          className="flex items-center justify-center gap-2 text-[22px] font-light tracking-[10px] text-[#C9A86A]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {/* diamond glyph */}
          <span style={{ fontSize: 13 }}></span>
          A I L U R A
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-14" style={{ background: 'rgba(201,168,106,0.45)' }} />
          <span className="text-[8.5px] tracking-[5px] uppercase text-[#C9A86A]/70">
            Atelier Administration
          </span>
          <span className="h-px w-14" style={{ background: 'rgba(201,168,106,0.45)' }} />
        </div>

        <h1
          className="mt-4 text-[34px] font-light leading-tight text-[#e8dcc8]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Restricted{' '}
          <em className="italic text-[#C9A86A]">Maison</em>{' '}
          Access
        </h1>
      </div>

      {/* ── Form card ── */}
      <div
        className="mt-8 w-full max-w-[430px] px-10 py-9"
        style={{ border: '1px solid rgba(201,168,106,0.22)', background: 'rgba(15,10,4,0.35)' }}
      >

        {/* Email */}
        <div className="mb-6">
          <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
            Administrator Email
          </label>
          <div className="relative flex items-center" style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
            <KeyRound size={13} className="mr-3 shrink-0 text-[#C9A86A]/45" strokeWidth={1.5} />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-transparent py-2.5 text-[13px] text-[#e8dcc8] outline-none placeholder:text-[#C9A86A]/25"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-7">
          <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
            Master Passphrase
          </label>
          <div className="relative flex items-center" style={{ borderBottom: '1px solid rgba(201,168,106,0.3)' }}>
            <Lock size={13} className="mr-3 shrink-0 text-[#C9A86A]/45" strokeWidth={1.5} />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-transparent py-2.5 text-[13px] text-[#e8dcc8] outline-none placeholder:text-[#C9A86A]/25"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <button
              type="button"
              onClick={() => setShowPass(p => !p)}
              className="ml-2 shrink-0 text-[#C9A86A]/45 hover:text-[#C9A86A] transition-colors"
            >
              {showPass ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex h-[50px] w-full items-center justify-center gap-2.5 text-[10px] uppercase tracking-[4px] text-black transition-all hover:brightness-110 disabled:opacity-50"
          style={{ background: '#C9A86A', fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowRight size={14} strokeWidth={2} />
          {loading ? 'Verifying...' : 'Enter Admin Panel →'}
        </button>

        {/* Security row */}
        <div
          className="mt-7 flex items-center justify-center gap-2 pt-6 text-[8px] uppercase tracking-[3px] text-[#C9A86A]/45"
          style={{ borderTop: '1px solid rgba(201,168,106,0.15)', fontFamily: 'Inter, sans-serif' }}
        >
          <ShieldCheck size={12} strokeWidth={1.5} />
          Encrypted · Audited · Logged
        </div>
      </div>

      {/* ── Return link – outside card ── */}
      <Link
        href="/login"
        className="mt-7 text-[8.5px] uppercase tracking-[4px] text-[#C9A86A]/50 transition-colors hover:text-[#C9A86A]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        ← Return to Customer Sign In
      </Link>

    </main>
  )

}