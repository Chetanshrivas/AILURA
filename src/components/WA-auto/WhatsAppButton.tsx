'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '917827097159' // AILURA ka number daal yahan
const MESSAGE = 'Hi AILURA! I would like to know more about your nail services.'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const promptTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Button visible hone ke 10 sec baad "Need help?" prompt dikhao
  useEffect(() => {
    if (visible && !dismissed && !promptTimer.current) {
      promptTimer.current = setTimeout(() => {
        setShowPrompt(true)
      }, 10000)
    }
    if (!visible && promptTimer.current) {
      clearTimeout(promptTimer.current)
      promptTimer.current = null
    }
    return () => {
      if (promptTimer.current) {
        clearTimeout(promptTimer.current)
        promptTimer.current = null
      }
    }
  }, [visible, dismissed])

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`

  const closePrompt = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPrompt(false)
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

          {/* "Need help?" prompt — appears 10s after button shows, styled like a real WhatsApp message */}
          <AnimatePresence>
            {showPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative mr-1 w-[240px] rounded-lg rounded-br-none bg-[#DCF8C6] px-3 py-2"
                style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
              >
                <button
                  onClick={closePrompt}
                  aria-label="Close"
                  className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-black/30 hover:bg-black/5 hover:text-black/60"
                >
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>

                <p
                  className="pr-4 text-[13.5px] font-semibold leading-snug text-[#111]"
                  style={{ fontFamily: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" }}
                >
                  Need help choosing ?
                </p>
                <p
                  className="mt-0.5 text-[10px] font-normal leading-snug text-black/55"
                  style={{ fontFamily: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" }}
                >
                  We're online, chat with us!
                </p>

                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-black/40">now</span>
                  <svg width="14" height="10" viewBox="0 0 16 11" fill="none">
                    <path d="M1 5.5L4.5 9L11 1.5" stroke="#53BDEB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 5.5L9 9L15.5 1.5" stroke="#53BDEB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Tail — bottom-right, like a real chat bubble */}
                <svg
                  className="absolute -bottom-0 -right-[7px]"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path d="M0 0C4 1 10 5 14 14C10 12 3 12 0 8V0Z" fill="#DCF8C6" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => setShowPrompt(false)}
            className="relative flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full shadow-lg"
            style={{ background: '#25D366' }}
            aria-label="Chat on WhatsApp"
          >
            {/* WhatsApp SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-6 w-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>

            {/* Pulse ring */}
            <span className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping" style={{ background: '#25D366' }} />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  )
}