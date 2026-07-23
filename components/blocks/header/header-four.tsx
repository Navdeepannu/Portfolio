'use client'

import Link from 'next/link'
import { Hexagon, Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState, type MouseEvent, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

type NavigationLink = {
  name: string
  href: string
}

type NavigationGroup = {
  title: string
  items: NavigationLink[]
}

type NavigationItem =
  | {
      name: string
      href: string
      groups?: never
    }
  | {
      name: string
      href?: never
      groups: NavigationGroup[]
    }

const navigationItems: NavigationItem[] = [
  {
    name: 'Products',
    groups: [
      {
        title: 'Platform',
        items: [
          {
            name: 'Cloud Hosting',
            href: '#',
          },
          {
            name: 'Edge Network',
            href: '#',
          },
          {
            name: 'Data Storage',
            href: '#',
          },
          {
            name: 'Monitoring',
            href: '#',
          },
        ],
      },
      {
        title: 'Developer Tools',
        items: [
          {
            name: 'Automation',
            href: '#',
          },
          {
            name: 'Preview Environments',
            href: '#',
          },
          {
            name: 'Analytics',
            href: '#',
          },
          {
            name: 'Integrations',
            href: '#',
          },
        ],
      },
    ],
  },
  {
    name: 'Resources',
    groups: [
      {
        title: 'Learn',
        items: [
          {
            name: 'Guides',
            href: '#',
          },
          {
            name: 'Articles',
            href: '#',
          },
          {
            name: 'Examples',
            href: '#',
          },
          {
            name: 'Courses',
            href: '#',
          },
        ],
      },
      {
        title: 'Connect',
        items: [
          {
            name: 'Community',
            href: '#',
          },
          {
            name: 'Customer Stories',
            href: '#',
          },
          {
            name: 'Events',
            href: '#',
          },
          {
            name: 'Support',
            href: '#',
          },
        ],
      },
    ],
  },
  {
    name: 'Pricing',
    href: '#',
  },
  {
    name: 'Docs',
    href: '#',
  },
]

type PlaceholderLinkProps = {
  href: string
  children: ReactNode
  className?: string
  onSelect?: () => void
}

function PlaceholderLink({ href, children, className, onSelect }: PlaceholderLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href === '#') {
      event.preventDefault()
    }

    onSelect?.()
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

export default function HeaderFour() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <PlaceholderLink href="#" className="flex items-center font-semibold">
          <span className="flex size-8 items-center justify-center">
            <Hexagon className="size-6" aria-hidden="true" />
          </span>

          <span>Nav UI</span>
        </PlaceholderLink>

        <NavigationMenu
          delayDuration={0}
          skipDelayDuration={0}
          className="hidden lg:flex **:data-[slot=navigation-menu-viewport]:animate-none! **:data-[slot=navigation-menu-viewport]:transition-none!"
        >
          <NavigationMenuList className="gap-1" onMouseLeave={() => setHoveredItem(null)}>
            {navigationItems.map((item) => (
              <NavigationMenuItem
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
              >
                {hoveredItem === item.name && (
                  <motion.span
                    layoutId="navigation-hover"
                    className="pointer-events-none absolute inset-0 rounded-md bg-muted"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                {item.groups ? (
                  <>
                    <NavigationMenuTrigger className="relative z-10 h-9 bg-transparent px-3 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground">
                      {item.name}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="data-[motion=from-end]:animate-none! data-[motion=from-start]:animate-none! data-[motion=to-end]:animate-none! data-[motion=to-start]:animate-none!">
                      <motion.div
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                filter: 'blur(3px)',
                              }
                        }
                        animate={{
                          filter: 'blur(0px)',
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.12,
                          ease: 'easeOut',
                        }}
                        className="grid w-120 grid-cols-2 gap-5 p-4"
                      >
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-1.5 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                              {group.title}
                            </p>

                            <ul className="space-y-0.5">
                              {group.items.map((child) => (
                                <li key={child.name}>
                                  <NavigationMenuLink asChild>
                                    <PlaceholderLink
                                      href={child.href}
                                      className="block rounded-md px-2 py-1.5 text-base font-medium transition-colors outline-none hover:bg-muted focus-visible:bg-muted"
                                    >
                                      {child.name}
                                    </PlaceholderLink>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <PlaceholderLink
                      href={item.href}
                      className="relative z-10 block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground"
                    >
                      {item.name}
                    </PlaceholderLink>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <PlaceholderLink href="#">Sign in</PlaceholderLink>
          </Button>

          <Button size="sm" asChild>
            <PlaceholderLink href="#">Get started</PlaceholderLink>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          {mobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </Button>
      </nav>

      <div
        id="mobile-navigation"
        className={cn('border-t lg:hidden', mobileMenuOpen ? 'block' : 'hidden')}
      >
        <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                {item.groups ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden">
                      {item.name}

                      <span
                        aria-hidden="true"
                        className="text-muted-foreground transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>

                    <div className="grid gap-4 px-3 pt-2 pb-3 sm:grid-cols-2">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-1.5 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {group.title}
                          </p>

                          <ul className="space-y-0.5">
                            {group.items.map((child) => (
                              <li key={child.name}>
                                <PlaceholderLink
                                  href={child.href}
                                  onSelect={closeMobileMenu}
                                  className="block rounded-md px-2 py-2 text-base font-medium transition-colors hover:bg-muted"
                                >
                                  {child.name}
                                </PlaceholderLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <PlaceholderLink
                    href={item.href}
                    onSelect={closeMobileMenu}
                    className="block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {item.name}
                  </PlaceholderLink>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t pt-4">
            <Button variant="outline" asChild>
              <PlaceholderLink href="#" onSelect={closeMobileMenu}>
                Sign in
              </PlaceholderLink>
            </Button>

            <Button asChild>
              <PlaceholderLink href="#" onSelect={closeMobileMenu}>
                Get started
              </PlaceholderLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
