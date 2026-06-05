import type { Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono, Inter, Schibsted_Grotesk, Caveat } from 'next/font/google'

import { GlobalBottomBlur } from '@/components/global-bottom-blur'
import { SiteJsonLd } from '@/components/site-json-ld'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { PortfolioModeProvider } from '@/site/portfolio-mode-provider'
import { rootMetadata } from '@/lib/site'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const caveat = Caveat({
  variable: '--font-caveat',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const schibsted = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
})

export const metadata = rootMetadata

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${schibsted.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <SiteJsonLd />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <PortfolioModeProvider>
            <TooltipProvider>
              <Toaster />
              {children}
              <GlobalBottomBlur />
            </TooltipProvider>
          </PortfolioModeProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
