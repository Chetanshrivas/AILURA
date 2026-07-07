'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { toast } from 'sonner'

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Sirf ek baar dikhao — agar pehle dismiss kar chuka hai toh mat dikha
    const dismissed = localStorage.getItem('ailura_popup_dismissed')
    if (dismissed) return

    const timer = setTimeout(() => setVisible(true), 3000) // 30 sec
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    localStorage.setItem('ailura_popup_dismissed', '1')
  }

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email')
      return
    }
    try {
      setLoading(true)
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.trim().toLowerCase(), source: 'welcome_popup' }])
      if (error && error.code !== '23505') throw error // 23505 = duplicate
      setDone(true)
      localStorage.setItem('ailura_popup_dismissed', '1')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="relative w-full max-w-[460px] bg-white overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                boxShadow: '0 2px 0 rgba(201,168,106,0.4), 0 4px 0 rgba(201,168,106,0.15), 0 8px 0 rgba(0,0,0,0.15), 0 20px 60px rgba(0,0,0,0.5), 0 60px 100px rgba(0,0,0,0.3)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
                style={{ background: 'linear-gradient(to right, transparent, #C9A86A, transparent)' }} />

              {/* Corner brackets */}
              <div className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#C9A86A]/40 z-10" />
              <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#C9A86A]/40 z-10" />
              <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#C9A86A]/40 z-10" />
              <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#C9A86A]/40 z-10" />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute right-5 top-5 z-20 flex h-7 w-7 items-center justify-center text-black/50 hover:text-black transition-colors"
              >
                <X size={16} strokeWidth={1.5} />
              </button>

              {AnimatePresence && !done ? (
                <div className="px-10 py-12">

                  {/* Top image strip */}
                  <div className="relative -mx-10 -mt-12 mb-8 h-[220px] overflow-hidden">
                    <img
                      src="/collections/welcome.jfif"
                      alt="AILURA"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4">
                      <p className="text-[11px] uppercase tracking-[8px] text-white/80 font-light">AILURA</p>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="h-px w-8 bg-[#C9A86A] opacity-60" />
                      <p className="text-[8px] uppercase tracking-[5px] text-[#C9A86A]">
                        Private Invitation
                      </p>
                      <div className="h-px w-8 bg-[#C9A86A] opacity-60" />
                    </div>
                    <h2
                      className="font-light leading-tight text-[#111] mb-3"
                      style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      Join the Atelier.<br />
                      <em className="italic text-[#C9A86A]">Unlock Exclusive Rewards.</em>
                    </h2>
                    <p className="text-[12px] leading-[1.85] text-black/40 max-w-[300px] mx-auto">
                      Be the first to receive new collection launches, exclusive offers, and private event invitations.
                    </p>
                  </div>

                  {/* Email input */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 border-b border-black/12 pb-3 mb-5 focus-within:border-[#C9A86A] transition-colors">
                      <Mail size={13} className="shrink-0 text-black/25" strokeWidth={1.5} />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        placeholder="Your email address"
                        className="w-full bg-transparent text-[13px] text-[#111] outline-none placeholder:text-black/20"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex h-12 w-full items-center justify-center text-[10px] uppercase tracking-[5px] transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                      style={{
                        background: '#0E0B07',
                        color: '#C9A86A',
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                        boxShadow: '0 2px 0 rgba(201,168,106,0.3), 0 4px 0 rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.15)',
                      }}
                    >
                      {loading ? 'Joining...' : 'Join the Atelier →'}
                    </button>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full text-center text-[8.5px] uppercase tracking-[3px] text-black/60 hover:text-black/80 transition-colors"
                  >
                    No thanks, I'll pay full price
                  </button>

                </div>
              ) : done ? (
                // Success state
                <div className="px-10 py-14 flex flex-col items-center text-center">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#C9A86A]/40">
                    <span className="text-[#C9A86A] text-xl">✦</span>
                  </div>
                  <p className="text-[8px] uppercase tracking-[5px] text-[#C9A86A] mb-3">Welcome</p>
                  <h3
                    className="font-light text-[#111] mb-3"
                    style={{ fontSize: '28px', fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    You're in the Atelier.
                  </h3>
                  <p className="text-[12px] leading-[1.85] text-black/40 max-w-[260px] mb-8">
                    Check your inbox — your exclusive welcome offer is on its way.
                  </p>
                  <button
                    onClick={handleClose}
                    className="flex h-11 items-center justify-center px-8 text-[10px] uppercase tracking-[4px]"
                    style={{
                      background: '#C9A86A',
                      color: '#0E0B07',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    }}
                  >
                    Explore Collection
                  </button>
                </div>
              ) : null}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}