'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  ChevronDown,
  LayoutDashboard,
  Menu,
  NfcIcon,
  PlugZap,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import React from 'react'

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

const menuItems = [
  {
    name: 'Features',
    href: '#features',
    children: [
      {
        name: 'Dashboard',
        description: 'Track payments and revenue',
        href: '#dashboard',
        icon: LayoutDashboard,
      },
      {
        name: 'Integrations',
        description: 'Connect your payment stack',
        href: '#integrations',
        icon: PlugZap,
      },
      {
        name: 'Security',
        description: 'Built-in fraud protection',
        href: '#security',
        icon: ShieldCheck,
      },
    ],
  },
  {
    name: 'Solutions',
    href: '#solutions',
    children: [
      {
        name: 'Startups',
        description: 'Launch payments faster',
        href: '#startups',
        icon: Building2,
      },
      {
        name: 'Teams',
        description: 'Manage payment operations',
        href: '#teams',
        icon: Users,
      },
      {
        name: 'Analytics',
        description: 'Understand your growth',
        href: '#analytics',
        icon: BarChart3,
      },
    ],
  },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Docs', href: '#docs', icon: BookOpen },
]

export default function HeaderThree() {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState('')
  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdown((current) => (current === name ? null : name))
  }

  const toggleMobileMenu = () => {
    const nextMenuState = !menuState

    setMenuState(nextMenuState)

    if (!nextMenuState) {
      setMobileDropdown(null)
    }
  }

  const closeMobileMenu = () => {
    setMenuState(false)
    setMobileDropdown(null)
  }

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed inset-x-0 top-0 z-50 w-full px-4 sm:px-6 lg:px-8"
      >
        <div
          className={cn(
            'mx-auto mt-3 w-full max-w-7xl rounded-xl border border-transparent bg-transparent px-0 transition-all duration-500 ease-out',
            isScrolled &&
              'max-w-6xl border-border/60 bg-background/70 px-3 shadow-sm shadow-black/5 backdrop-blur-xl dark:bg-background/55 dark:shadow-none',
          )}
        >
          <div
            className={cn(
              'relative flex flex-wrap items-center justify-between gap-6 transition-all duration-500 ease-out lg:gap-0',
              isScrolled ? 'py-2 lg:py-2.5' : 'py-4 lg:py-5',
            )}
          >
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link href="#" aria-label="home" className="flex items-center gap-2">
                <NfcIcon
                  className={cn(
                    'transition-all duration-500 ease-out',
                    isScrolled ? 'size-5' : 'size-6',
                  )}
                />
                <span
                  className={cn(
                    'font-medium transition-all duration-500 ease-out',
                    isScrolled ? 'text-sm' : 'text-base',
                  )}
                >
                  Payflow
                </span>
              </Link>

              <button
                onClick={toggleMobileMenu}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-2 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            {/* Desktop center nav */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <NavigationMenu
                value={openDropdown}
                onValueChange={setOpenDropdown}
                delayDuration={0}
                skipDelayDuration={0}
                className={cn(
                  'text-sm transition-all duration-500 ease-out',
                  isScrolled && 'scale-[0.98]',
                )}
              >
                <NavigationMenuList className="gap-2">
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.name} value={item.name}>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger className="h-auto gap-1 rounded-lg bg-transparent px-3 py-2 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground [&>svg:last-child]:hidden">
                            {item.name}
                            <ChevronDown
                              className={cn(
                                'size-3.5 transition-transform duration-200',
                                openDropdown === item.name && 'rotate-180',
                              )}
                            />
                          </NavigationMenuTrigger>

                          <NavigationMenuContent className="w-72 p-2 md:w-72">
                            {item.children.map((child) => {
                              const Icon = child.icon

                              return (
                                <NavigationMenuLink key={child.name} asChild>
                                  <Link
                                    href={child.href}
                                    className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors outline-none hover:bg-accent focus:bg-accent"
                                  >
                                    <span className="mt-0.5 rounded-md border bg-background p-1.5">
                                      <Icon className="size-4" />
                                    </span>

                                    <span className="space-y-1">
                                      <span className="block text-sm font-medium">
                                        {child.name}
                                      </span>
                                      <span className="block text-xs leading-5 text-muted-foreground">
                                        {child.description}
                                      </span>
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              )
                            })}
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile menu + CTA */}
            <div className="mx-auto mb-6 hidden w-full max-w-md flex-wrap items-center justify-center space-y-6 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:max-w-none lg:justify-end lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
              <div className="w-full lg:hidden">
                <ul className="space-y-2 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      {item.children ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                          >
                            <span>{item.name}</span>

                            <ChevronDown
                              className={cn(
                                'size-4 transition-transform duration-200',
                                mobileDropdown === item.name && 'rotate-180',
                              )}
                            />
                          </button>

                          <div
                            className={cn(
                              'grid overflow-hidden transition-all duration-300 ease-in-out',
                              mobileDropdown === item.name
                                ? 'grid-rows-[1fr] opacity-100'
                                : 'grid-rows-[0fr] opacity-0',
                            )}
                          >
                            <div className="min-h-0">
                              <div className="space-y-1 px-3 pt-1 pb-2">
                                {item.children.map((child) => {
                                  const Icon = child.icon

                                  return (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      onClick={closeMobileMenu}
                                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                                    >
                                      <Icon className="size-4" />
                                      <span>{child.name}</span>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block rounded-xl px-3 py-3 font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col sm:w-auto">
                <Button
                  asChild
                  size="sm"
                  className={cn(
                    'h-9 rounded-full px-4 transition-all duration-500 ease-out sm:w-auto',
                    isScrolled && 'lg:h-8 lg:px-3 lg:text-xs',
                  )}
                >
                  <Link href="#get-started" onClick={closeMobileMenu}>
                    <span>Get Started</span>
                    <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
