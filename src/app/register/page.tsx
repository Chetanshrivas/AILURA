'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (
      !fullName ||
      !email ||
      !password
    ) {
      toast.error(
        'Please fill all fields'
      )
      return
    }

    if (
      password.length < 6
    ) {
      toast.error(
        'Password must be at least 6 characters'
      )
      return
    }

    try {
      setLoading(true)

const {
  data: authData,
  error,
} = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name:
        fullName,
    },
  },
})

if (error)
  throw error

if (authData.user) {

  const {
    error: profileError,
  } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        full_name:
          fullName,
        email,
        role: 'user',
      },
    ])

  if (profileError) {
    console.log(profileError)
  }
}

toast.success(
  'Account created successfully'
)

      setTimeout(() => {
        router.push(
          '/login'
        )
      }, 1500)
    } catch (
      error: any
    ) {
      toast.error(
        error.message ||
          'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

return (
  <main
    className="relative flex min-h-screen items-center justify-center px-4 py-12"
    style={{
      backgroundImage: 'url(/collections/appointment-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: 'rgba(30,20,8,0.45)',
      }}
    />

    <div
      className="relative z-10 w-full max-w-[480px] px-10 py-10"
      style={{
        background: 'rgba(60,42,18,0.72)',
        backdropFilter: 'blur(18px)',
        border:
          '1px solid rgba(201,168,106,0.2)',
      }}
    >
      {/* Corners */}
      <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#C9A86A]/40" />
      <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#C9A86A]/40" />
      <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C9A86A]/40" />
      <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C9A86A]/40" />

      {/* Header */}
      <div className="mb-6 text-center">
        <p
          className="text-[22px] tracking-[10px] text-[#C9A86A]"
          style={{
            fontFamily:
              'Cormorant Garamond, serif',
          }}
        >
          A I L U R A
        </p>

        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#C9A86A]/40" />
          <span className="text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
            Maison Privée · Est. MMXX
          </span>
          <span className="h-px w-10 bg-[#C9A86A]/40" />
        </div>

        <h1
          className="mt-4 text-[30px] font-light text-[#F5EDD8]"
          style={{
            fontFamily:
              'Cormorant Garamond, serif',
          }}
        >
          Begin your{' '}
          <em className="italic text-[#C9A86A]">
          couture 
          </em>
          {' '}chapter
        </h1>
      </div>

      {/* Tabs */}
      <div
        className="mb-7 grid grid-cols-2"
        style={{
          border:
            '1px solid rgba(201,168,106,0.2)',
        }}
      >
        <Link
          href="/login"
          className="flex items-center justify-center py-2.5 text-[10px] uppercase tracking-[4px] text-[#C9A86A]/60 hover:text-[#C9A86A]"
        >
          Sign In
        </Link>

        <button
          className="py-2.5 text-[10px] uppercase tracking-[4px]"
          style={{
            background: '#C9A86A',
            color: '#1a1208',
          }}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleRegister}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
            Full Name
          </label>

          <div
            className="flex items-center gap-3"
            style={{
              borderBottom:
                '1px solid rgba(201,168,106,0.3)',
            }}
          >
            <User
              size={13}
              className="text-[#C9A86A]/40"
            />

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full bg-transparent py-2.5 text-[13px] outline-none"
              style={{
                color: '#F5EDD8',
              }}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
            Email Address
          </label>

          <div
            className="flex items-center gap-3"
            style={{
              borderBottom:
                '1px solid rgba(201,168,106,0.3)',
            }}
          >
            <Mail
              size={13}
              className="text-[#C9A86A]/40"
            />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-transparent py-2.5 text-[13px] outline-none"
              style={{
                color: '#F5EDD8',
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-[8px] uppercase tracking-[4px] text-[#C9A86A]/60">
            Password
          </label>

          <div
            className="flex items-center gap-3"
            style={{
              borderBottom:
                '1px solid rgba(201,168,106,0.3)',
            }}
          >
            <Lock
              size={13}
              className="text-[#C9A86A]/40"
            />

            <input
              type={
                showPass
                  ? 'text'
                  : 'password'
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-transparent py-2.5 text-[13px] outline-none"
              style={{
                color: '#F5EDD8',
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPass(!showPass)
              }
              className="text-[#C9A86A]/40 hover:text-[#C9A86A]"
            >
              {showPass ? (
                <EyeOff size={14} />
              ) : (
                <Eye size={14} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 text-[10px] uppercase tracking-[4px] transition-all hover:opacity-90 disabled:opacity-50"
          style={{
            background: '#C9A86A',
            color: '#1a1208',
          }}
        >
          {loading
            ? 'Creating Account...'
            : 'Create Account →'}
        </button>
      </form>

      {/* Features */}
      {/* <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[2px] text-[#C9A86A]/60">
          <ShieldCheck size={12} />
          Secure Authentication
        </div>

        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[2px] text-[#C9A86A]/60">
          ✦ Priority Booking Access
        </div>
      </div> */}

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-[8.5px] uppercase tracking-[3px] text-[#C9A86A]/40 hover:text-[#C9A86A]"
        >
          ← Return to Site
        </Link>

        <Link
          href="/login"
          className="text-[8.5px] uppercase tracking-[3px] text-[#C9A86A]/40 hover:text-[#C9A86A]"
        >
          Already Member?
        </Link>
      </div>
    </div>
  </main>
)
}