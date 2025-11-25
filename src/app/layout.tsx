import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/theme-context'
import { LanguageProvider } from '@/contexts/language-context'

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
