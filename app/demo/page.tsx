'use client'

import HeaderFour from '@/components/blocks/header/header-four'
import { Button } from '@/components/ui/button'
import { IconCaretRightFilled } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

export default function Page() {
  return (
    <div className="">
      <HeaderFour />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroSection() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col border-x border-border bg-background text-foreground selection:bg-zinc-700 selection:text-white">
      <div className="flex flex-col gap-4 px-6 py-16 md:px-8">
        <h1 className="text-2xl font-medium tracking-tight md:text-4xl">
          Create professional invoices
          <br /> <span className="text-neutral-500"> in seconds</span>
        </h1>
        <p className="max-w-lg font-medium text-neutral-500">
          Invora helps freelancers and small businesses generate clean, branded invoices instantly —
          no signup, no setup, no friction.
        </p>

        <div className="mt-4 flex items-center gap-4">
          <Button variant="default" size="sm" className="rounded-lg bg-[#183A37]">
            Create first invoice
            <IconCaretRightFilled />
          </Button>

          <Button className="rounded-lg" size="sm" variant="outline">
            Explore Features
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Image
          src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlAuYWmkpKQGnmhpoFHtl8C3qOXrgevszwxZPM"
          alt="hero background"
          fill
          priority
          className="mask-t-from-85% object-cover object-bottom"
        />

        <div className="relative z-20 flex items-center justify-center p-6 md:p-10">
          <Image
            src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTldNH7DNybZUFOGf0SCscjVKaAkwt5BLWyY1JQ"
            alt="hero preview"
            width={1200}
            height={800}
            className="w-full max-w-5xl rounded-xl shadow-2xl shadow-zinc-900"
          />
        </div>
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FeyStyleMiniNav() {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const items = [
    { label: 'Projects', href: '#projects' },
    { label: 'UI Library', href: '#ui-library' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <div
      className="fixed top-8 left-8 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false)
        setActiveIndex(null)
      }}
    >
      <div className="relative min-h-40 w-56">
        {/* collapsed lines */}
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setOpen((prev) => !prev)}
          className={[
            'absolute top-0 left-0 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full',
            'transition-all duration-500 ease-out',
            open ? 'pointer-events-none scale-75 opacity-0 blur-sm' : 'blur-0 opacity-100',
          ].join(' ')}
        >
          {[0, 1, 2, 3].map((line) => (
            <span
              key={line}
              className="block h-px w-4 bg-neutral-500 transition-all duration-500"
              style={{
                transform: open
                  ? `translateY(${(line - 1.5) * 10}px) scaleX(1.5)`
                  : 'translateY(0) scaleX(1)',
              }}
            />
          ))}
        </button>

        {/* expanded text menu */}
        <nav
          className={[
            'absolute top-0 left-0 flex flex-col gap-3',
            'transition-all duration-500 ease-out',
            open
              ? 'blur-0 translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0 blur-md',
          ].join(' ')}
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index
            const isDimmed = activeIndex !== null && activeIndex !== index

            return (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setActiveIndex(index)}
                className={[
                  'w-fit text-sm leading-none tracking-tight transition-all duration-300 ease-out',
                  'origin-left',
                  isActive ? 'translate-x-1 scale-[1.03] text-neutral-950' : 'text-neutral-500',
                  isDimmed ? 'opacity-35 blur-[1.5px]' : 'blur-0 opacity-100',
                ].join(' ')}
                style={{
                  transitionDelay: open ? `${index * 45}ms` : '0ms',
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

const items = [
  {
    title: 'Dashboard',
    label: 'A clean overview of activity, progress, key metrics, and recent updates.',
    href: '#dashboard',
    icon: '⌘',
  },
  {
    title: 'Automations',
    label: 'Trigger useful actions, reduce repeated work, and keep workflows moving.',
    href: '#automations',
    icon: '✦',
  },
  {
    title: 'Analytics',
    label: 'Understand usage, performance, trends, and what needs attention.',
    href: '#analytics',
    icon: '◌',
  },
  {
    title: 'Integrations',
    label: 'Connect with the tools your product already depends on.',
    href: '#integrations',
    icon: '↗',
  },
  {
    title: 'Security',
    label: 'Role-based access, protected data, and safer product experiences.',
    href: '#security',
    icon: '◆',
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductFeaturesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#f4f2ee] px-4 py-24 text-[#282524] md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <p className="mb-4 text-sm font-medium tracking-[0.25em] text-neutral-500 uppercase">
            Product features
          </p>

          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
            Everything needed to build a polished digital product
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="mx-auto flex w-full max-w-250 flex-col items-center"
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <motion.a
                key={item.title}
                href={item.href}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 24,
                    filter: 'blur(10px)',
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  },
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative grid min-h-20 w-full grid-cols-1 items-center overflow-hidden rounded-[1.75rem] px-5 outline-none md:min-h-30 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:px-8"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-feature-row"
                    className="absolute inset-0 rounded-[1.75rem] bg-white shadow-[0_24px_90px_rgba(0,0,0,0.09)]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 38,
                    }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`${item.title}-icon`}
                      initial={{
                        opacity: 0,
                        x: -24,
                        scale: 0.9,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        x: -16,
                        scale: 0.95,
                        filter: 'blur(8px)',
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 hidden h-16 w-16 items-center justify-center justify-self-start rounded-2xl border border-neutral-200 bg-white text-2xl shadow-sm md:col-start-1 md:row-start-1 md:mr-16 md:flex"
                    >
                      {item.icon}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.h3
                  animate={{
                    scale: isActive ? 0.94 : 1,
                    opacity: isActive ? 1 : 0.92,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 justify-self-center text-center font-serif text-[clamp(3.4rem,7vw,6rem)] leading-[0.88] tracking-[-0.07em] whitespace-nowrap text-[#282524] md:col-start-2 md:row-start-1"
                >
                  {item.title}
                </motion.h3>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`${item.title}-content`}
                      initial={{
                        opacity: 0,
                        x: 24,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        x: 16,
                        filter: 'blur(8px)',
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 hidden max-w-40 justify-self-end text-left md:col-start-3 md:row-start-1 md:ml-16 md:block"
                    >
                      <p className="text-sm leading-5 text-neutral-700">{item.label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
