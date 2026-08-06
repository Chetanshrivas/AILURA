import './globals.css'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from 'sonner'
import { AuthProvider } from '../context/AuthContext'
import MotionProvider from '../../src/lib/motion-config'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'AILURA',
  description: 'Luxury Unisex Salon & Studio',
  icons: {
    icon: '/favicon_io/favicon.ico',
    apple: '/favicon_io/apple-touch-icon.png',
    shortcut: '/favicon_io/favicon.ico',
  },
  manifest: '/favicon_io/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <MotionProvider>
            {children}
          </MotionProvider>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="light"
            newestOnTop
            pauseOnHover
          />
          <Toaster
            theme="dark"
            position="top-right"
            duration={3000}
            closeButton
            toastOptions={{
              style: {
                background: '#0a0a0a',
                border: '1px solid rgba(201,168,106,0.25)',
                color: '#F8F5F0',
                fontFamily: 'inherit',
                fontSize: '11px',
                letterSpacing: '0.05em',
                borderRadius: '0px',
                padding: '14px 18px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}