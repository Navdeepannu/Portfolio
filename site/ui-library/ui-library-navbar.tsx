'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import { SITE_ORIGINS } from '@/lib/sites'
import { useCommandMenu } from '@/hooks/use-command-menu'
import { CommandMenu } from '@/site/command/command-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { GitHubStars } from './github-star'
import LogoMark from './ui-library-logo'

const menuItems = [
  { name: 'Components', href: '/components' },
  { name: 'Blocks', href: '/blocks' },
  { name: 'Illustrations', href: '/illustrations' },
  { name: 'Pages', href: '/pages' },
  { name: 'Portfolio', href: SITE_ORIGINS.portfolio, external: true },
] as const

function isNavItemActive(pathname: string, href: string) {
  if (href.startsWith('http')) return false
  if (href.includes('#')) return false
  if (href === '/') return pathname === '/'

  const publicPathname = pathname.replace(/^\/ui(?=\/|$)/, '') || '/'

  return publicPathname === href || publicPathname.startsWith(`${href}/`)
}

export function UiLibraryNavbar({
  fullWidth = false,
  className,
}: {
  className?: string
  fullWidth?: boolean
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { open: commandOpen, setOpen: setCommandOpen } = useCommandMenu()

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return
      if (event.key.toLowerCase() !== 'd') return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target

      if (target instanceof HTMLElement) {
        if (target.isContentEditable) return

        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return
        }
      }

      event.preventDefault()
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [theme, setTheme])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background">
        <div
          className={cn(
            `relative flex h-14 w-full items-center font-geist ${className} ${
              fullWidth ? 'px-2 md:px-4 lg:px-6' : 'mx-auto max-w-6xl px-4'
            }`,
          )}
        >
          <Link
            href={SITE_ORIGINS.ui}
            aria-label="Nav UI home"
          >
            <LogoMark className="h-8 w-auto" />
          </Link>

          <div className="flex-1" />

          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="hover:bg-muted/40"
              onClick={() => setCommandOpen(true)}
              aria-label="Open command menu"
            >
              <Search className="size-4" />
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </Button>

            <ul className="hidden items-center gap-6 md:flex">
              {menuItems.map((item) => {
                const isActive = isNavItemActive(pathname, item.href)

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      target={'external' in item && item.external ? '_blank' : undefined}
                      rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'text-sm transition-colors hover:text-foreground',
                        isActive ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <span className="hidden h-4 w-px bg-border md:block" />

            <GitHubStars repo="navdeepannu/portfolio" stargazersCount={2} />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
              </TooltipTrigger>

              <TooltipContent side="bottom" align="center">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <span>Toggle theme</span>
                  <kbd className="rounded bg-muted-foreground px-1.5">D</kbd>
                </div>
              </TooltipContent>
            </Tooltip>

            <Button
              variant="ghost"
              size="icon-sm"
              className={cn('md:hidden', mobileMenuOpen && 'pointer-events-none invisible')}
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </Button>
          </div>
        </div>
      </nav>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed top-2 right-2.5 bottom-2 z-50 flex w-[min(17.5rem,calc(100vw-1.25rem))] flex-col overflow-hidden rounded-2xl border border-black/5 bg-background p-4 shadow-2xl ring-1 ring-black/5 md:hidden dark:border-white/10 dark:ring-white/10"
              initial={{ x: 'calc(100% + 0.75rem)', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 'calc(100% + 0.75rem)', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <LogoMark />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-1.5">
                {menuItems.map((item) => {
                  const isActive = isNavItemActive(pathname, item.href)

                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={cn(
                        'font-geist-sans h-11 w-full justify-start rounded-lg px-3 text-base font-normal',
                        isActive ? 'text-foreground' : 'text-muted-foreground',
                      )}
                      asChild
                    >
                      <Link
                        href={item.href}
                        target={'external' in item && item.external ? '_blank' : undefined}
                        rel={
                          'external' in item && item.external ? 'noopener noreferrer' : undefined
                        }
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </Button>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
