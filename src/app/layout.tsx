import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'MacInitiate - Ultimate macOS Setup Tool',
  description: 'The ultimate "Day 1" onboarding web tool for macOS users. Select apps and system preferences, get a single Terminal command to set up your entire machine automatically.',
  keywords: ['macOS', 'setup', 'automation', 'Homebrew', 'development', 'tools'],
  authors: [{ name: 'MacInitiate Team' }],
  openGraph: {
    title: 'MacInitiate - Ultimate macOS Setup Tool',
    description: 'Zero-config macOS setup in minutes, not hours.',
    type: 'website',
    url: 'https://macinitiate.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
