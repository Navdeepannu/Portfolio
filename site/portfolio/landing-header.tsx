'use client'

import Link from 'next/link'
import type { Variants } from 'motion/react'

import { AnimatedGroup } from '@/components/ui/components/animated-group'
import { LandingTextLink } from '@/site/portfolio/landing-link'
import { landingPageContent } from '@/site/portfolio/landing-page-content'
import { LandingRoleLoop } from '@/site/portfolio/landing-role-loop'
import { PortfolioNavbar } from '@/site/portfolio/portfolio-navbar'

export function LandingNavbar({ isHome = false }: { isHome?: boolean }) {
  return <PortfolioNavbar isHome={isHome} />
}

const transitionVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.08,
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 2,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
} satisfies {
  container: Variants
  item: Variants
}

export function LandingHeader() {
  const { identity } = landingPageContent

  return (
    <>
      <LandingNavbar isHome />

      <section className="mx-auto max-w-4xl px-5 pt-10 pb-10 sm:px-8 sm:pt-12 sm:pb-12 lg:px-10 lg:pt-14 lg:pb-14">
        <div className="max-w-2xl">
          <AnimatedGroup variants={transitionVariants}>
            <p className="text-xs text-muted-foreground">Hi, I&apos;m</p>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h1 className="text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
                {identity.name}
              </h1>

              <span aria-hidden="true" className="text-muted-foreground/50">
                ·
              </span>

              <LandingRoleLoop />
            </div>

            <p className="max-w-[68ch mt-4 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
              Currently building{' '}
              <Link
                href="https://ui.navdeepsingh.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              >
                NavUI
              </Link>
              , an{' '}
              <span className="font-medium text-foreground">
                open-source React component library and registry
              </span>{' '}
              that helps developers ship polished, accessible interfaces without rebuilding the same
              foundations. I contribute to open-source projects and bring practical full-stack
              experience to turning product ideas into{' '}
              <span className="font-medium text-foreground">reusable, maintainable software</span>.
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-0.5" aria-label="Profile links">
              {identity.links.map((link) => (
                <LandingTextLink key={link.label} {...link} />
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </>
  )
}
