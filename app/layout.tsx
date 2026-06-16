import type { Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono, Inter, Schibsted_Grotesk, Caveat } from 'next/font/google'

import { GlobalBottomBlur } from '@/components/global-bottom-blur'
import { SiteJsonLd } from '@/components/site-json-ld'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { rootMetadata } from '@/lib/site'
import { cookies } from 'next/headers'

import type { PortfolioMode } from '@/site/portfolio-config'
import { PORTFOLIO_MODES } from '@/site/portfolio-config'
import { PortfolioModeProvider } from '@/site/context/portfolio-mode-provider'

const STORAGE_KEY = 'portfolio-mode'
const DEFAULT_MODE: PortfolioMode = 'developer'

function isPortfolioMode(value: string | undefined): value is PortfolioMode {
  return !!value && (PORTFOLIO_MODES as readonly string[]).includes(value)
}
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const storedMode = cookieStore.get(STORAGE_KEY)?.value

  const initialMode = isPortfolioMode(storedMode) ? storedMode : DEFAULT_MODE
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${schibsted.variable} ${inter.variable} ${caveat.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <SiteJsonLd />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <PortfolioModeProvider initialMode={initialMode}>
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
