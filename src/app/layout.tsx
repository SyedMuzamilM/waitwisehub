import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://waitwisehub.vercel.app'),
  title: 'WaitWiseHub',
  description: 'Supercharge you launch: Turbo-Boost Early Signups with WaitWiseHub!',
  twitter: {
    creator: 'Syed Muzamil',
    creatorId: 'syedmuzamilm',
    card: 'summary_large_image'
  },
  openGraph: {
    images: ['/og.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
