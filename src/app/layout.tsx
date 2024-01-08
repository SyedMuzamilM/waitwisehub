import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WaitWiseHub',
  description: 'Supercharge you launch: Turbo-Boost Early Signups with WaitWiseHub!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://getlaunchlist.com/js/widget.js" defer></script>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
