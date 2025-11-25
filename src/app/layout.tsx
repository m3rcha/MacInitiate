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
  title: {
    default: 'MacInitiate - Ultimate macOS Setup Tool',
    template: '%s | MacInitiate'
  },
  description: 'The ultimate "Day 1" onboarding web tool for macOS users. Select apps and system preferences, get a single Terminal command to set up your entire machine automatically. Lightning fast, system safe, developer ready.',
  keywords: ['macOS', 'setup', 'automation', 'Homebrew', 'development', 'tools', 'developer', 'productivity', 'configuration', 'script'],
  authors: [{ name: 'MacInitiate Team' }],
  creator: 'MacInitiate',
  publisher: 'MacInitiate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://macinitiate.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://macinitiate.com',
    title: 'MacInitiate - Ultimate macOS Setup Tool',
    description: 'The ultimate "Day 1" onboarding web tool for macOS users. Select apps and system preferences, get a single Terminal command to set up your entire machine automatically.',
    siteName: 'MacInitiate',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MacInitiate - Ultimate macOS Setup Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacInitiate - Ultimate macOS Setup Tool',
    description: 'The ultimate "Day 1" onboarding web tool for macOS users. Select apps and system preferences, get a single Terminal command to set up your entire machine automatically.',
    images: ['/og-image.png'],
    creator: '@macinitiate',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
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
