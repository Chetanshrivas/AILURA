'use client'

import Link from 'next/link'

import {
  useEffect,
  useState,
} from 'react'

import {
  Menu,
  ShoppingBag,
  User,
} from 'lucide-react'

import MobileMenu from './MobileMenu'

import {
  useCartStore,
} from '../../store/cartStore'

import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Navbar() {

  const [open, setOpen] =
    useState(false)

  const [scrolled, setScrolled] =
    useState(false)

  const items = useCartStore(
    (state) => state.items
  )

  const { user } = useAuth()

const router = useRouter()

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/')
  router.refresh()
}

  const totalItems =
    items.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    )

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 40
      )

    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )

  }, [])

  const navLinks = [
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
    title: 'SERVICES',
    href: '#services',
  },
  {
    title: 'CONTACT',
    href: '#contact',
  },
  {
    title: 'PRODUCTS',
    href: '/products',
  },
  
]

  return (

    <>

      <nav
        className={`
          fixed
          top-0
          left-0
          z-50
          w-full
          transition-all
          duration-500

          ${
            scrolled
              ? `
                border-b
                border-[#E8DED3]
                bg-[#F8F5F0]/90
                backdrop-blur-xl
              `
              : `
                bg-transparent
              `
          }
        `}
      >

        <div
          className="
  mx-auto
  flex
  h-[70px]
  lg:h-[80px]
  max-w-[1440px]
  items-center
  justify-between
  px-4
  lg:px-12
"
        >

          <Link href="/">

            <img
              src="/logo/logo.png"
              alt="AILURA"
              className="h-14 w-auto"
            />

          </Link>

          <div
            className="
            hidden
            items-center
            gap-10
            lg:flex
          "
          >

            {navLinks.map(
              (item) => (

                <a
                  key={item.title}
                  href={item.href}
                  className="
                  group
                  relative
                  text-[12px]
                  uppercase
                  tracking-[4px]
                  text-[#1F1F1F]
                  transition-all
                  duration-300
                  hover:text-[#B89A63]
                "
                >

                  {item.title}

                  <span
                    className="
                    absolute
                    -bottom-2
                    left-0
                    h-[1px]
                    w-0
                    bg-[#B89A63]
                    transition-all
                    duration-500
                    ease-out
                    group-hover:w-full
                  "
                  />

                </a>

              )
            )}

          </div>

          <div
            className="
            hidden
            items-center
            gap-4
            lg:flex
          "
          >

            <Link
              href="/cart"
              className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#E8DED3]
              bg-white
              transition
              hover:scale-105
            "
            >

              <ShoppingBag
                size={18}
              />

              {totalItems > 0 && (

                <span
                  className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B89A63]
                  text-[10px]
                  text-white
                "
                >
                  {totalItems}
                </span>

              )}

            </Link>

           {!user ? (

  <Link
    href="/login"
    className="rounded-full border border-[#B89A63] px-6 py-3 text-[12px] uppercase tracking-[3px] transition-all duration-300 hover:bg-[#B89A63] hover:text-white"
  >
    <div className="flex items-center gap-2">
      <User size={15} />
      LOGIN
    </div>
  </Link>

) : (

  <div className="flex items-center gap-3">

    <Link
  href="/account"
  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B89A63] transition-all duration-300 hover:bg-[#B89A63] hover:text-white"
>
  <User size={18} />
</Link>

    <button
  onClick={handleLogout}
  className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:bg-[#B89A63]"
>
  <LogOut size={18} />
</button>

  </div>

)}

          </div>

<div className="flex items-center gap-1 lg:hidden">

  <Link
    href="/cart"
    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-tranparent"
  >
    <ShoppingBag size={17} />

    {totalItems > 0 && (
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B89A63] text-[9px] text-white">
        {totalItems}
      </span>
    )}
  </Link>

  <button
    onClick={() => setOpen(true)}
    className="flex h-12 w-12 items-center justify-center  bg-tranparent"
  >
    <Menu size={21} />
  </button>

</div>

        </div>

      </nav>

      <MobileMenu
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />

    </>

  )

}