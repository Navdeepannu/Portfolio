'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Hexagon, PanelRight, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import LogoMark from '@/site/ui-library/ui-library-logo'

const navLinks = [
  { name: 'About', href: '#link' },
  { name: 'Features', href: '#link' },
  { name: 'Blog', href: '#link' },
  { name: 'Contact Us', href: '#link' },
]

export default function HeaderTwo() {
  return (
    <header className="relative w-full">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  )
}

function DesktopNavbar() {
  return (
    <nav className="sticky top-0 w-full bg-background">
      <div className="mx-auto hidden max-w-6xl items-center justify-between gap-6 px-4 py-3 md:flex">
        <div className="flex items-center gap-2">
          <LogoMark aria-hidden="true" />
          <span className="font-semibold text-foreground">Nav UI</span>
        </div>

        <div className="flex items-center justify-center gap-8">
          {navLinks.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="border-b border-neutral-300 shadow-sm ring-1 ring-neutral-400"
            variant="default"
            asChild
          >
            <Link href="#login">Login</Link>
          </Button>
          <Button
            className="border-b-2 border-neutral-600 ring-1 ring-neutral-500"
            variant="outline"
            asChild
          >
            <Link href="#sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

function MobileNavbar() {
  const [open, setOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <nav className="relative z-50 flex justify-between bg-neutral-900 px-4 py-3 md:hidden">
      <div className="flex items-center gap-2">
        <Hexagon aria-hidden="true" className="size-6 fill-muted stroke-neutral-300 stroke-2" />
        <span className="font-semibold text-muted">Nav UI</span>
      </div>

      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="header-two-mobile-menu"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <PanelRight aria-hidden="true" className="size-5 text-background open:hidden" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="header-two-mobile-menu"
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, backdropFilter: 'blur(0px)' }
            }
            animate={{ opacity: 1, backdropFilter: 'blur(15px)' }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                  }
            }
            transition={{
              duration: 0.2,
            }}
            className="absolute inset-0 z-50 h-full w-full px-4 py-2"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Hexagon
                  aria-hidden="true"
                  className="size-6 fill-muted stroke-neutral-300 stroke-2"
                />
                <span className="font-semibold text-background">Nav UI</span>
              </div>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" className="absolute top-4 right-4 size-6 text-muted" />
              </button>
            </div>

            <div className="my-10 flex flex-col justify-center gap-6">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : index * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-medium text-neutral-400 transition-colors duration-200 hover:text-white dark:text-neutral-400"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
