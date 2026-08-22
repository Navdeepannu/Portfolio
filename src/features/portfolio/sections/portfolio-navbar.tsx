'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Command, Menu, X } from 'lucide-react'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { SITE_ORIGINS } from '@/config/site-origins'
import { LandingThemeToggle } from '@/features/portfolio/sections/landing-theme-toggle'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui-library-logo'
import { portfolioSiteConfig } from '@/config/sites'
import { portfolioSearchGroups } from '@/features/portfolio/navigation/search-data'
import { useCommandMenu } from '@/lib/hooks/use-command-menu'
import { CommandMenu } from '@/components/shared/command-menu'
import { Kbd } from '@/components/ui/kbd'

export type PortfolioNavbarProps = {
  fullWidth?: boolean
  className?: string
  isHome?: boolean
}

function isActive(pathname: string, href: string) {
  if (href.includes('#') || href.startsWith('http')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function PortfolioNavbar({
  fullWidth = false,
  className,
  isHome = false,
}: PortfolioNavbarProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion() ?? false
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { open: commandOpen, setOpen: setCommandOpen } = useCommandMenu()
  const navigation = [
    { label: 'Work', href: isHome ? '#work' : '/projects', external: false },
    { label: 'About', href: isHome ? '#about' : '/#about', external: false },
    { label: 'Writing', href: '/blog', external: false },
    { label: 'NavUI', href: SITE_ORIGINS.ui, external: true },
    { label: 'Resume', href: '/resume/resume.pdf', external: true },
  ] as const

  const socialLinks = [
    { label: 'GitHub', href: portfolioSiteConfig.links.github, Icon: IconBrandGithub },
    { label: 'LinkedIn', href: portfolioSiteConfig.links.linkedin, Icon: IconBrandLinkedin },
  ] as const

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 48rem)')
    const closeMobileMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false)
    }

    desktopMediaQuery.addEventListener('change', closeMobileMenuOnDesktop)
    return () => desktopMediaQuery.removeEventListener('change', closeMobileMenuOnDesktop)
  }, [])

  return (
    <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <header
        className={cn(
          'sticky top-0 z-40 border-b border-border/70 bg-background/90 font-schibsted backdrop-blur-md',
          className,
        )}
      >
        <div
          className={cn(
            'flex min-h-16 w-full items-center gap-2',
            fullWidth ? 'px-5 sm:px-8' : 'mx-auto max-w-4xl px-5 sm:px-8 lg:px-10',
          )}
        >
          <Link
            href="/"
            aria-label="Navdeep Singh — Home"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground active:scale-[0.97]"
          >
            <Logo className="h-8 w-auto" />
          </Link>

          <nav aria-label="Primary navigation" className="ml-auto hidden items-center md:flex">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center gap-0.5 px-2 text-sm transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  <span>{item.label}</span>
                  {item.external ? <ArrowUpRight aria-hidden="true" className="size-2.5" /> : null}
                  {item.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 md:ml-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="hidden size-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:inline-flex"
              >
                <Icon aria-hidden="true" className="size-4" />
              </Link>
            ))}

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setCommandOpen(true)}
              aria-label="Open command menu (Command K)"
              className="gap-1 px-6 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            >
              <Command aria-hidden="true" className="size-3.5" />
              <Kbd>K</Kbd>
            </Button>

            <LandingThemeToggle />

            <DialogPrimitive.Trigger asChild>
              <Button
                type="button"
                aria-label="Open navigation menu"
                className={cn(
                  'bg-background text-foreground transition-[background-color,transform] duration-150 hover:bg-muted/80 md:hidden',
                  mobileMenuOpen && 'pointer-events-none invisible',
                )}
              >
                <Menu aria-hidden="true" className="size-4.5" />
              </Button>
            </DialogPrimitive.Trigger>
          </div>
        </div>
      </header>

      <CommandMenu
        site="portfolio"
        groups={portfolioSearchGroups}
        open={commandOpen}
        onOpenChange={setCommandOpen}
      />

      <DialogPrimitive.Portal forceMount>
        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div key="mobile-navigation">
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[3px] md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.12 : 0.2, ease: 'easeOut' }}
                />
              </DialogPrimitive.Overlay>

              <DialogPrimitive.Content asChild forceMount>
                <motion.aside
                  aria-describedby="mobile-navigation-description"
                  className="fixed top-3 right-3 bottom-3 z-60 flex w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-border bg-background/96 p-5 text-foreground shadow-2xl backdrop-blur-xl outline-none md:hidden"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0.96, transform: 'translateX(calc(100% + 1rem))' }
                  }
                  animate={{ opacity: 1, transform: 'translateX(0)' }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0.96, transform: 'translateX(calc(100% + 1rem))' }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.12, ease: 'easeOut' }
                      : { type: 'spring', duration: 0.32, bounce: 0 }
                  }
                >
                  <DialogPrimitive.Title className="sr-only">
                    Portfolio navigation
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description
                    id="mobile-navigation-description"
                    className="sr-only"
                  >
                    Navigate to portfolio sections and Nav UI resources.
                  </DialogPrimitive.Description>

                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      aria-label="Navdeep Singh — Home"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground active:scale-[0.97]"
                    >
                      <Logo className="h-9 w-auto" />
                    </Link>

                    <DialogPrimitive.Close asChild>
                      <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-[background-color,transform] duration-150 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.97]"
                      >
                        <X aria-hidden="true" className="size-5" />
                      </button>
                    </DialogPrimitive.Close>
                  </div>

                  <nav aria-label="Mobile navigation" className="mt-12 flex flex-col">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group/link flex min-h-14 items-center justify-between rounded-xl px-3 text-lg font-medium tracking-[-0.01em] text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                      >
                        <span>{item.label}</span>
                        {item.external ? (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 text-muted-foreground transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none"
                          />
                        ) : null}
                        {item.external ? (
                          <span className="sr-only"> (opens in a new tab)</span>
                        ) : null}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto flex items-center gap-1 border-t border-border/70 pt-5">
                    {socialLinks.map(({ label, href, Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                      >
                        <Icon aria-hidden="true" className="size-4.5" />
                      </Link>
                    ))}
                  </div>
                </motion.aside>
              </DialogPrimitive.Content>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
