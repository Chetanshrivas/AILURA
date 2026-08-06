'use client'

import Link from 'next/link'
import Image from 'next/image'

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

  const [bump, setBump] = useState(false)

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

  // ── Cart bump listener: FeaturedProducts se custom event aata hai
  // jab flying animation cart tak pahunchti hai, tab icon halka "bump" karega ──
  useEffect(() => {
    const handleBump = () => {
      setBump(true)
      setTimeout(() => setBump(false), 400)
    }
    window.addEventListener('cart-bump', handleBump)
    return () => window.removeEventListener('cart-bump', handleBump)
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

<Link href="/" aria-label="AILURA home" className="relative block h-10 w-[100px] lg:h-12 lg:w-[120px]">
  <Image
    src="/logo/logo.png"
    alt="AILURA"
    fill
    priority
    sizes="120px"
    className="object-contain object-left"
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
              id="nav-cart-icon-desktop"
              data-cart-icon="true"
              aria-label={`View cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
              className={`
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
              ${bump ? 'scale-110' : 'scale-100'}
            `}
              style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
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
  aria-label="My account"
  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B89A63] transition-all duration-300 hover:bg-[#B89A63] hover:text-white"
>
  <User size={18} />
</Link>

    <button
  onClick={handleLogout}
  aria-label="Log out"
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
    id="nav-cart-icon-mobile"
    data-cart-icon="true"
    aria-label={`View cart${totalItems > 0 ? `, ${totalItems} items` : ''}`}
    className="relative flex h-12 w-12 items-center justify-center rounded-full bg-transparent"
    style={{
      transform: bump ? 'scale(1.15)' : 'scale(1)',
      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }}
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
    aria-label="Open menu"
    className="flex h-12 w-12 items-center justify-center bg-transparent"
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