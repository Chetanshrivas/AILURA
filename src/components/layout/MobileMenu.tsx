'use client'

import Link from 'next/link'

import {
  X,
  ShoppingBag,
  LogOut,
  User,
} from 'lucide-react'

import {
  AnimatePresence,
  motion,
} from 'framer-motion'


import {
  useAuth,
} from '../../context/AuthContext'

import {
  useRouter,
} from 'next/navigation'

import {
  supabase,
} from '../../lib/supabase'

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({
  open,
  onClose,
}: Props) {

const { user } = useAuth()

const router =
  useRouter()

const handleLogout =
  async () => {
    await supabase.auth.signOut()
    onClose()
    router.push('/')
    router.refresh()
  }

  return (

    <AnimatePresence>

      {open && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
          fixed
          inset-0
          z-[100]
          bg-[#F8F5F0]
        "
        >

          <div
            className="
            flex
            items-center
            justify-between
            border-b
            border-[#E8DED3]
            px-6
            py-6
          "
          >

            <img
              src="/logo/logo.png"
              alt="AILURA"
              className="h-12"
            />

            <button
              onClick={onClose}
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#E8DED3]
              bg-white
            "
            >
              <X size={18} />
            </button>

          </div>

          <div
            className="
            flex
            h-[80vh]
            w-full
            flex-col
            items-center
            justify-center
            divide-y
            divide-[#E8DED3]
            
          "
          >

            {[
              {
                title: 'HOME',
                href: '/',
              },
              {
                title: 'COLLECTIONS',
                href: '#collections',
              },
              {
                title: 'ABOUT',
                href: '#about',
              },
              {
                title: 'PRODUCTS',
                href: '/products',
              },
              {
                title: 'SERVICES',
                href: '#services',
              },
              // {
              //   title: 'APPOINTMENTS',
              //   href: '/appointments',
              // },
              {
                title: 'CONTACT',
                href: '#contact',
              },
            ].map((item) => (

              <a
                key={item.title}
                href={item.href}
                onClick={onClose}
                  className="
                  group
                  relative
                  overflow-hidden

                  w-full

                  py-6

                  flex
                  items-center
                  justify-center

                  text-center

                  text-[28px]
                  font-light
                  uppercase
                  tracking-[8px]
                  "
              >

                <span
                  className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-[#B89A63]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:translate-x-0
                "
                />

                <span
                  className="
                  relative
                  z-10
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  transition-colors
                  duration-500
                  group-hover:text-white
                "
                >
                  {item.title}
                </span>

              </a>

            ))}

<div className="mt-8 flex items-center gap-4">

 

  {!user ? (

    <Link
      href="/login"
      onClick={onClose}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B89A63] text-white"
    >
      <User size={18} />
    </Link>

  ) : (

    <>
      <Link
        href="/account"
        onClick={onClose}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B89A63] text-white"
      >
        <User size={18} />
      </Link>

      <button
        onClick={handleLogout}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white"
      >
        <LogOut size={18} />
      </button>
    </>

  )}

</div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>

  )

}