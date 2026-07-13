'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Hexagon, PanelRight, X } from 'lucide-react'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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

export const DesktopNavbar = () => {
  return (
    <header>
      <nav className="sticky top-0 z-20 w-full border-b bg-background/50 backdrop-blur-3xl dark:bg-neutral-900">
        <div className="mx-auto hidden max-w-6xl items-center justify-between gap-6 px-4 py-3 md:flex">
          <div className="flex items-center gap-2">
            <Hexagon className="size-8 stroke-neutral-200 stroke-2" />
            <span className="font-semibold">HEX UI</span>
          </div>

          <div className="flex items-center justify-center gap-8">
            {navLinks.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="text-sm font-medium text-muted-foreground transition duration-200 hover:text-black dark:text-neutral-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="border ring-1 ring-muted" variant="default">
              Login
            </Button>
            <Button className="" variant="outline">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative flex justify-between px-4 py-3 md:hidden">
      <div className="flex items-center gap-2">
        <Hexagon className="size-8 stroke-neutral-200 stroke-2" />
        <span className="font-semibold">HEX UI</span>
      </div>

      <button
        onClick={() => {
          setOpen(!open)
        }}
      >
        <PanelRight className="size-5 open:hidden" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: 'blur(15px)' }}
            exit={{
              opacity: 0,
              backdropFilter: 'blue(0px)',
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute inset-0 z-50 h-full w-full px-4 py-2"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Hexagon className="size-8" />
                <span className="font-semibold">HEX UI</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="absolute top-4 right-4 size-6" />
              </button>
            </div>

            <div className="my-10 flex flex-col justify-center gap-6">
              {navLinks.map((item, index) => (
                <motion.div
                  key={index + item.name}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    key={index}
                    className="text-2xl font-medium text-muted-foreground transition duration-200 hover:text-black dark:text-neutral-400"
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
