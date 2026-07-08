'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import LogoCloudFive from '../logo-cloud/logo-cloud-five'
import HeaderThree from '../header/header-three'

const dashboardImage =
  'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlwoufloT0Ebck1dTslf49q5rag7XIHeMz6Sj3'

export default function HeroSectionFour() {
  return (
    <section className="relative overflow-hidden bg-background px-6 text-foreground">
      <div className="relative z-10">
        <HeaderThree />

        <div className="mx-auto flex max-w-7xl flex-col items-start pt-24 md:pt-32">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md">
              Developer-first payment infrastructure
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-balance text-foreground md:text-7xl">
              Plug in payments.{' '}
              <span className="bg-linear-to-br from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                Launch Faster
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 font-medium text-muted-foreground md:text-base">
              Accept, route, and track payments with a developer-friendly platform built for modern
              startups.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="group cursor-pointer">
                Start Now
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>

              <Button variant="outline" size="lg" className="cursor-pointer bg-background/60">
                View API docs
                <BookOpen className="size-4" />
              </Button>
            </div>
          </div>

          <div className="relative mt-16 w-full overflow-hidden rounded-[2rem] md:mt-20">
            <div className="relative rounded-[2rem] bg-[linear-gradient(135deg,rgba(148,163,184,0.42),rgba(255,255,255,0.9),rgba(148,163,184,0.24))] p-px shadow-[0_34px_100px_rgba(15,23,42,0.16),0_14px_34px_rgba(15,23,42,0.08)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(148,163,184,0.08),rgba(255,255,255,0.16))] dark:shadow-[0_40px_140px_rgba(0,0,0,0.78)]">
              <div className="rounded-[2rem] border border-white/80 bg-background/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-background shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_26px_100px_rgba(0,0,0,0.7)]">
                  <div className="relative">
                    <img
                      src={dashboardImage}
                      alt="Payment dashboard preview"
                      draggable={false}
                      className="w-full object-cover select-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-x-16 bottom-0 z-20 h-56 bg-linear-to-b from-transparent via-background/85 to-background dark:via-background/90" />
            </div>
          </div>

          {/* Logo cloud */}
          <div className="relative z-20 w-full pt-8 pb-20">
            <LogoCloudFive />
          </div>
        </div>
      </div>
    </section>
  )
}
