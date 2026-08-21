'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Command, Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import { SITE_ORIGINS } from '@/config/site-origins'
import { useCommandMenu } from '@/lib/hooks/use-command-menu'
import { CommandMenu } from '@/components/shared/command-menu'
import { getSearchGroups } from '@/features/navui/search/search-data'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { GitHubStars } from './github-stars'
import LogoMark from '@/components/ui-library-logo'

const primaryMenuItems = [
  { name: 'Components', href: '/components' },
  { name: 'Blocks', href: '/blocks' },
  { name: 'Illustrations', href: '/illustrations' },
] as const

const portfolioItem = { name: 'Portfolio', href: SITE_ORIGINS.portfolio } as const

const commandGroups = getSearchGroups()

function isNavItemActive(pathname: string, href: string) {
  if (href.startsWith('http')) return false
  if (href.includes('#')) return false
  if (href === '/') return pathname === '/'

  const publicPathname = pathname.replace(/^\/ui(?=\/|$)/, '') || '/'

  return publicPathname === href || publicPathname.startsWith(`${href}/`)
}

export type UiLibraryNavbarProps = {
  className?: string
  fullWidth?: boolean
  stargazersCount: number | null
}

export function UiLibraryNavbar({
  fullWidth = false,
  className,
  stargazersCount,
}: UiLibraryNavbarProps) {
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
      <nav
        aria-label="Primary navigation"
        className="sticky top-0 z-50 border-b border-border bg-background"
      >
        <div
          className={cn(
            `relative flex h-14 w-full items-center font-geist ${className} ${
              fullWidth ? 'px-2 md:px-4 lg:px-6' : 'mx-auto max-w-6xl px-4'
            }`,
          )}
        >
          <Link href="/" aria-label="Nav UI home">
            <LogoMark className="h-8 w-auto" />
          </Link>

          <div className="flex-1" />

          <div className="hidden items-center md:flex">
            <ul className="flex items-center gap-0.5">
              {primaryMenuItems.map((item) => {
                const isActive = isNavItemActive(pathname, item.href)

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'inline-flex h-8 items-center rounded-lg px-2.5 text-sm transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                        isActive
                          ? 'bg-muted/70 font-medium text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <span className="mx-3 h-4 w-px bg-border" />
          </div>

          <div className="ml-2 flex items-center gap-1 sm:ml-3">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/45 hover:text-foreground"
              onClick={() => setCommandOpen(true)}
              aria-label="Open command menu (Command K)"
            >
              <Command aria-hidden="true" className="size-4" />
              <Kbd className="hidden sm:inline-flex">K</Kbd>
            </Button>

            <GitHubStars repo="navdeepannu/portfolio" stargazersCount={stargazersCount} />

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
                <span>Toggle theme</span>
                <kbd>D</kbd>
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

      <CommandMenu
        site="ui"
        groups={commandGroups}
        open={commandOpen}
        onOpenChange={setCommandOpen}
      />

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

              <nav aria-label="Mobile navigation links" className="flex flex-1 flex-col gap-1.5">
                {primaryMenuItems.map((item) => {
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
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </Button>
                  )
                })}

                <div className="mt-auto border-t border-border pt-4">
                  <Button
                    variant="ghost"
                    className="font-geist-sans h-11 w-full justify-between rounded-lg px-3 text-base font-normal text-muted-foreground"
                    asChild
                  >
                    <Link
                      href={portfolioItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Portfolio
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
