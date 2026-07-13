'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import HeaderThree from '../header/header-three'
import LogoCloudFive from '../logo-cloud/logo-cloud-five'
import { Label } from '@/components/ui/label'
import { SpendWorkflowIllustration } from './hero-section-four-illustration'

const stats = [
  {
    label: 'TOTAL AI ACTIONS',
    value: '2,109,875',
  },
  {
    label: 'RECEIPTS MATCHED',
    value: '1,326,672',
  },
  {
    label: 'FIELDS CODED',
    value: '805,266',
  },
  {
    label: 'APPROVALS ROUTED',
    value: '58,419',
  },
  {
    label: 'EXPENSES REVIEWED',
    value: '137,486',
  },
  {
    label: 'SPEND ALLOCATED',
    value: '$18.6M',
  },
  {
    label: 'POLICIES CHECKED',
    value: '294,706',
  },
]

function StatItem({ item }: { item: { label: string; value: string } }) {
  return (
    <div className="group flex shrink-0 items-center gap-2.5 border-r border-border/60 px-6 py-2.5">
      <span className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase select-none">
        {item.label}:
      </span>

      <span className="rounded bg-muted px-2 py-1 font-mono text-[11px] font-semibold text-foreground tabular-nums transition-colors select-none group-hover:bg-muted/80">
        {item.value}
      </span>
    </div>
  )
}

function MarqueeTrack() {
  const x = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()

  const firstGroupRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null)

  const [groupWidth, setGroupWidth] = useState(0)

  useEffect(() => {
    const group = firstGroupRef.current
    if (!group) return

    const updateWidth = () => {
      setGroupWidth(group.scrollWidth)
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(group)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!groupWidth || shouldReduceMotion) return

    controlsRef.current?.stop()
    x.set(0)

    controlsRef.current = animate(x, -groupWidth, {
      duration: 32,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })

    return () => controlsRef.current?.stop()
  }, [groupWidth, shouldReduceMotion, x])

  return (
    <div
      className="relative min-w-0 flex-1 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={() => controlsRef.current?.pause()}
      onMouseLeave={() => controlsRef.current?.play()}
    >
      <motion.div style={{ x }} className="flex w-max items-center">
        <div ref={firstGroupRef} className="flex shrink-0 items-center">
          {stats.map((item) => (
            <StatItem key={item.label} item={item} />
          ))}
        </div>

        <div aria-hidden="true" className="flex shrink-0 items-center">
          {stats.map((item) => (
            <StatItem key={`${item.label}-duplicate-1`} item={item} />
          ))}
        </div>

        <div aria-hidden="true" className="flex shrink-0 items-center">
          {stats.map((item) => (
            <StatItem key={`${item.label}-duplicate-2`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function StatsDock() {
  const slotRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const [isDocked, setIsDocked] = useState(true)
  const [barHeight, setBarHeight] = useState(48)

  useEffect(() => {
    const updateHeight = () => {
      if (!barRef.current) return
      setBarHeight(barRef.current.offsetHeight)
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)

    if (barRef.current) {
      observer.observe(barRef.current)
    }

    window.addEventListener('resize', updateHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  useEffect(() => {
    let previousY = window.scrollY
    let ticking = false

    const updateDockState = () => {
      const slot = slotRef.current
      if (!slot) return

      const rect = slot.getBoundingClientRect()
      const currentY = window.scrollY
      const scrollingUp = currentY < previousY

      const bottomDockPoint = window.innerHeight - barHeight

      const slotIsBelowViewport = rect.top > bottomDockPoint
      const slotIsAboveViewport = rect.bottom < 0

      const shouldDock = slotIsBelowViewport || (scrollingUp && slotIsAboveViewport)

      setIsDocked(shouldDock)

      previousY = currentY
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(updateDockState)
    }

    updateDockState()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateDockState)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateDockState)
    }
  }, [barHeight])

  return (
    <div
      ref={slotRef}
      className="mt-6"
      style={{
        height: isDocked ? barHeight : undefined,
      }}
    >
      <div
        ref={barRef}
        className={cn(
          'z-50 border-y border-border/70 bg-background/95 backdrop-blur-md',
          isDocked
            ? 'fixed right-0 bottom-0 left-0 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]'
            : 'relative w-full',
        )}
      >
        <div className="mx-auto flex max-w-360 items-center px-6 sm:px-8 lg:px-12">
          <div className="relative z-20 flex shrink-0 items-center gap-2 border-r border-border/70 bg-background py-3 pr-5 text-[10px] font-medium tracking-[0.14em] text-foreground uppercase">
            <span className="absolute inset-x-0 size-2 animate-ping place-items-center rounded-full bg-green-500/90" />
            <span className="grid size-2 place-items-center rounded-full bg-green-400/90" />

            <span className="hidden sm:inline">Live:</span>

            <span className="font-mono font-semibold">356</span>
          </div>

          <MarqueeTrack />
        </div>
      </div>
    </div>
  )
}

export default function HeroSectionFour() {
  return (
    <section className="relative overflow-x-hidden bg-background text-foreground">
      <div className="relative z-10">
        <HeaderThree />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-32 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1fr)] lg:gap-4 lg:px-12 lg:pt-48">
          <div>
            <div className="max-w-4xl">
              <h1 className="max-w-2xl font-geist text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Spend smarter. <br />
                <span className="text-muted-foreground">Close faster.</span>
              </h1>

              <p className="font-inter mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Automate receipts, approvals, cards, and bill payments in one clean workflow built
                for teams that move fast.
              </p>

              <form className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
                <Label className="flex min-h-12 flex-1 items-center rounded-md border border-border/50 bg-background px-1 pl-2 shadow-xs ring-border in-focus-within:ring-1">
                  <span className="sr-only">Work email</span>

                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />

                  <Button type="submit" variant="default" className="h-10">
                    Start free
                  </Button>
                </Label>
              </form>

              <p className="mt-3 text-xs text-muted-foreground">
                No credit card required. Get your workspace ready in minutes.
              </p>
            </div>
          </div>

          <div className="relative min-w-0 lg:-mr-10">
            <SpendWorkflowIllustration />
          </div>
        </div>

        <StatsDock />
      </div>

      <div>
        <LogoCloudFive />
      </div>
    </section>
  )
}
