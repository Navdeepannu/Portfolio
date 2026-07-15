'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SITE_ORIGINS } from '@/lib/sites'
import Character from '@/site/character'

const navigation = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Strengths', href: '/#technical-strengths' },
  { label: 'Resume', href: '/resume/resume.pdf', external: true },
] as const

const externalLinks = [
  { label: 'GitHub', href: 'https://github.com/navdeepannu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/navdeepsingh0/' },
  { label: 'UI Library', href: SITE_ORIGINS.ui },
] as const

function isActive(pathname: string, href: string) {
  if (href.includes('#') || href.startsWith('http')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function PortfolioNavbar({
  fullWidth = false,
  className,
}: {
  fullWidth?: boolean
  className?: string
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const isDark = theme === 'dark'

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div
          className={cn(
            'font-geist-sans relative flex h-14 w-full items-center gap-4',
            fullWidth ? 'px-2 md:px-4 lg:px-6' : 'mx-auto max-w-6xl px-2',
            className,
          )}
        >
          <Character />
          <div className="flex-1" />

          <ul className="hidden items-center gap-5 lg:flex">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href)

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={'external' in item && item.external ? '_blank' : undefined}
                    rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-sm transition-colors hover:text-foreground',
                      active ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            {externalLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button
            variant="default"
            size="sm"
            className="hidden rounded-full sm:inline-flex"
            asChild
          >
            <Link href="/#contact">Contact</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className={cn('lg:hidden', mobileMenuOpen && 'pointer-events-none invisible')}
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio navigation"
              className="fixed top-2 right-2 bottom-2 z-50 flex w-[min(18rem,calc(100vw-1.25rem))] flex-col rounded-2xl border bg-background p-4 shadow-2xl lg:hidden"
              initial={{ transform: 'translateX(calc(100% + 0.75rem))', opacity: 0.8 }}
              animate={{ transform: 'translateX(0)', opacity: 1 }}
              exit={{ transform: 'translateX(calc(100% + 0.75rem))', opacity: 0.8 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <Character />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                {[...navigation, ...externalLinks].map((item) => {
                  const external = item.href.startsWith('http') || item.href.endsWith('.pdf')

                  return (
                    <Button key={item.label} variant="ghost" className="justify-start" asChild>
                      <Link
                        href={item.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </Button>
                  )
                })}
              </div>

              <Button className="w-full rounded-full" asChild>
                <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </Button>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
