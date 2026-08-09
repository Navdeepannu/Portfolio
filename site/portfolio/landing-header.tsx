import Link from 'next/link'
import { LandingTextLink } from '@/site/portfolio/landing-link'
import { landingPageContent } from '@/site/portfolio/landing-page-content'
import { PortfolioNavbar } from '@/site/portfolio/portfolio-navbar'

type LandingNavbarProps = {
  isHome?: boolean
}

export function LandingNavbar({ isHome = false }: LandingNavbarProps) {
  return <PortfolioNavbar isHome={isHome} />
}

export function LandingHeader() {
  const { identity } = landingPageContent

  return (
    <>
      <LandingNavbar isHome />

      <section className="mx-auto max-w-4xl px-5 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-14 lg:px-10 lg:pt-14 lg:pb-16">
        <div className="max-w-2xl">
          <p className="text-xs text-muted-foreground">Hi, I&apos;m</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
            {identity.name}
          </h1>
          <p className="mt-2 text-sm font-medium text-emerald-700 sm:text-base dark:text-emerald-500">
            Frontend Engineer <span aria-hidden="true">·</span> Design Engineer
          </p>

          <p className="mt-5 max-w-[66ch] text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
            I build polished, accessible web interfaces and reusable UI systems with React, Next.js,
            and TypeScript. Currently building{' '}
            <Link
              href="https://ui.navdeepsingh.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
            >
              NavUI<span className="sr-only"> (opens in a new tab)</span>
            </Link>{' '}
            and contributing improvements to open-source products.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
            <div className="flex flex-wrap gap-x-4 gap-y-0.5" aria-label="Profile links">
              {identity.links.map((link) => (
                <LandingTextLink key={link.label} {...link} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
