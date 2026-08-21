'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Hexagon, PanelRight, X } from 'lucide-react'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import LogoMark from '@/components/ui-library-logo'

const navLinks = [
  { name: 'About', href: '#link' },
  { name: 'Features', href: '#link' },
  { name: 'Blog', href: '#link' },
  { name: 'Contact Us', href: '#link' },
]

export default function HeaderOne() {
  return (
    <header className="relative w-full">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  )
}

function DesktopNavbar() {
  return (
    <nav className="sticky top-0 z-20 w-full border-b bg-background/50 backdrop-blur-3xl">
      <div className="mx-auto hidden max-w-6xl items-center justify-between gap-6 px-4 py-3 md:flex">
        <div className="flex items-center gap-2">
          <LogoMark aria-hidden="true" />
          <span className="font-semibold">Nav UI</span>
        </div>

        <div className="flex items-center justify-center gap-8">
          {navLinks.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-black dark:text-neutral-400"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button className="border ring-1 ring-muted" variant="default" asChild>
            <Link href="#login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
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
    <nav className="relative flex justify-between px-4 py-3 md:hidden">
      <div className="flex items-center gap-2">
        <Hexagon aria-hidden="true" className="size-8 stroke-neutral-200 stroke-2" />
        <span className="font-semibold">Nav UI</span>
      </div>

      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="header-one-mobile-menu"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <PanelRight aria-hidden="true" className="size-5 open:hidden" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="header-one-mobile-menu"
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
                <Hexagon aria-hidden="true" className="size-8" />
                <span className="font-semibold">Nav UI</span>
              </div>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" className="absolute top-4 right-4 size-6" />
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
                    className="text-2xl font-medium text-muted-foreground transition-colors duration-200 hover:text-black dark:text-neutral-400"
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
