'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import EditProfileModal from '../../components/account/EditProfileModal'
import Link from 'next/link'
import { User, Calendar, ShoppingBag, LogOut, ShieldCheck, Pencil, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'

export default function AccountPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({ orders: 0, appointments: 0 })
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }

      setUser(session.user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('phone, address')
        .eq('id', session.user.id)
        .single()
      setProfile(profileData)

      const { count: orderCount } = await supabase
        .from('orders').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id)

      const { count: appointmentCount } = await supabase
        .from('appointments').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id)

      setStats({ orders: orderCount || 0, appointments: appointmentCount || 0 })
      setLoading(false)
    }
    loadUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: 'global' }) // ← sirf ye change
    toast.success('Logged out successfully')
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0]">
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
          {['A','I','L','U','R','A'].map((letter, i) => (
            <span key={i}
              className={`leading-none opacity-0 ${[1,3,5].includes(i) ? 'text-[#C9A86A]' : 'text-[#1a1208]'}`}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(56px, 12vw, 140px)',
                fontWeight: 400,
                animation: `letterDrop 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s forwards`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F8F5F0] px-4 pt-28 pb-20 md:px-8 lg:px-20">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[5px] text-[#C9A86A]">My Account</p>
            <h1 className="mt-4 text-[42px] font-light tracking-[-2px] md:text-[70px]">Welcome Back.</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

            {/* ── Profile Card ── */}
            <div className="border border-black/10 bg-white p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A86A]/10">
                <User size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-light">
                {user?.user_metadata?.full_name || 'AILURA Client'}
              </h2>
              <p className="mt-2 text-sm text-black/50">{user?.email}</p>

              {profile?.phone && (
                <div className="mt-1.5 flex items-center gap-2 text-sm text-black/45">
                  <Phone size={12} className="text-[#C9A86A] shrink-0" strokeWidth={1.5} />
                  {profile.phone}
                </div>
              )}

              <div className="mt-8 border-t border-black/10 pt-8">
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <ShieldCheck size={16} />
                  Verified Account
                </div>
              </div>

              <button
                onClick={() => setEditOpen(true)}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 border border-[#C9A86A] text-[11px] uppercase tracking-[4px] text-[#C9A86A] transition-all hover:bg-[#C9A86A] hover:text-white"
              >
                <Pencil size={14} />
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 border border-black/10 bg-transparent text-[11px] uppercase tracking-[4px] text-black transition-all hover:border-red-500 hover:text-red-700"
              >
                <LogOut size={15} />
                Logout
              </button>

              <Link
                href="/"
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 border border-black/10 text-[11px] uppercase tracking-[4px] text-black/50 transition-all hover:border-[#C9A86A] hover:text-[#C9A86A]"
              >
                ← Return to Website
              </Link>
            </div>

            {/* ── Right Column ── */}
            <div>

              {/* Orders + Appointments */}
              <div className="grid gap-6 md:grid-cols-2">
                <Link href="/account/orders"
                  className="block border border-black/10 bg-white p-8 transition-all hover:border-[#C9A86A] hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={22} />
                    <span className="text-[11px] uppercase tracking-[4px] text-black/40">My Orders</span>
                  </div>
                  <h3 className="mt-5 text-5xl font-light">{stats.orders}</h3>
                  <p className="mt-4 text-[11px] uppercase tracking-[3px] text-[#C9A86A]">View Orders →</p>
                </Link>

                <Link href="/account/appointments"
                  className="block border border-black/10 bg-white p-8 transition-all hover:border-[#C9A86A] hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <Calendar size={22} />
                    <span className="text-[11px] uppercase tracking-[4px] text-black/40">My Appointments</span>
                  </div>
                  <h3 className="mt-5 text-5xl font-light">{stats.appointments}</h3>
                  <p className="mt-4 text-[11px] uppercase tracking-[3px] text-[#C9A86A]">View Appointments →</p>
                </Link>
              </div>

              {/* ── Address Box — only if address exists ── */}
              {(profile?.address || profile?.phone) && (
                <div className="mt-6 border border-black/10 bg-white p-8">
                  <p className="text-[9px] uppercase tracking-[5px] text-[#C9A86A] mb-5">
                    Contact & Address
                  </p>
                  <div className="flex flex-col gap-4">
                    {profile?.phone && (
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#C9A86A]/30">
                          <Phone size={13} className="text-[#C9A86A]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[3px] text-black/30 mb-0.5">Phone</p>
                          <p className="text-[13px] text-black/70">{profile.phone}</p>
                        </div>
                      </div>
                    )}
                    {profile?.address && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#C9A86A]/30">
                          <MapPin size={13} className="text-[#C9A86A]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[3px] text-black/30 mb-0.5">Address</p>
                          <p className="text-[13px] leading-relaxed text-black/70">{profile.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Member Status */}
              <div className="mt-6 border border-[#C9A86A]/20 bg-gradient-to-r from-[#faf7f2] to-white p-8">
                <p className="text-[10px] uppercase tracking-[4px] text-[#C9A86A]">Member Status</p>
                <h3 className="mt-4 text-4xl font-light">AILURA Privé</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-black/55">
                  Enjoy priority appointments, order tracking, exclusive launches and a personalized luxury experience.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      <EditProfileModal
        open={editOpen}
        userId={user?.id}
        onClose={() => setEditOpen(false)}
        onUpdated={async () => {
          const { data: { session } } = await supabase.auth.getSession()
          setUser(session?.user || null)
          if (session?.user) {
            const { data: profileData } = await supabase
              .from('profiles').select('phone, address').eq('id', session.user.id).single()
            setProfile(profileData)
          }
        }}
      />

      <Footer />
    </>
  )
}