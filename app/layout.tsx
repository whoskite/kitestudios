import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KITESTUDIOS",
  description: "A creative platform exploring the intersection of design, technology, and community.",
  metadataBase: new URL('https://kitestudios.vercel.app'),
  openGraph: {
    title: "KITESTUDIOS",
    description: "A creative platform exploring the intersection of design, technology, and community.",
    url: 'https://kitestudios.vercel.app',
    siteName: 'KITESTUDIOS',
    images: [
      {
        url: '/KITESTUDIOS_1x1.png',
        width: 1200,
        height: 1200,
        alt: 'KITESTUDIOS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KITESTUDIOS',
    description: 'A creative platform exploring the intersection of design, technology, and community.',
    images: ['/KITESTUDIOS_1x1.png'],
    creator: '@tomykite',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

