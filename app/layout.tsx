import { DM_Serif_Display, Syne } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wavebox.id'),
  title: 'WAVEBOX — Komunitas Musik Indie Indonesia',
  description:
    'Satu tempat. Semua musisi indie Indonesia. Jelajahi musisi, baca artikel, temukan gig, dan diskusi scene lokal.',
  keywords: ['musik indie', 'musisi indonesia', 'gig', 'komunitas musik', 'wavebox'],
  openGraph: {
    title: 'WAVEBOX — Komunitas Musik Indie Indonesia',
    description: 'Satu tempat. Semua musisi indie Indonesia.',
    url: 'https://wavebox.id',
    siteName: 'WAVEBOX',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAVEBOX — Komunitas Musik Indie Indonesia',
    description: 'Satu tempat. Semua musisi indie Indonesia.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${dmSerifDisplay.variable} ${syne.variable}`}>
      <body className="bg-bg font-sans text-primary antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
