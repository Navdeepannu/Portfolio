import { blockItems, componentDefinitions } from '@/registry/items'
import { LandingTextLink } from '@/features/portfolio/sections/landing-link'
import { landingPageContent } from '@/features/portfolio/content/landing-page.content'
import { PortfolioNavbar } from '@/features/portfolio/sections/portfolio-navbar'
import { ExternalAnalyticsLink } from '@/features/analytics/external-analytics-link'

type LandingNavbarProps = {
  isHome?: boolean
}

export function LandingNavbar({ isHome = false }: LandingNavbarProps) {
  return <PortfolioNavbar isHome={isHome} />
}

export function LandingHeader() {
  const { identity } = landingPageContent
  const componentCount = componentDefinitions
    .filter((item) => item.status === 'published')
    .length.toLocaleString()
  const blockCount = blockItems
    .filter((item) => item.status === 'published')
    .length.toLocaleString()

  return (
    <>
      <LandingNavbar isHome />

      <section className="mx-auto max-w-4xl px-5 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-14 lg:px-10 lg:pt-14 lg:pb-16">
        <div className="max-w-2xl">
          <p className="text-xs text-muted-foreground">Hi, I&apos;m</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
            {identity.name}
          </h1>
          <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
            Frontend Engineer <span aria-hidden="true">·</span> Design Engineer
          </p>

          <p className="mt-5 max-w-[66ch] text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
            I build polished, accessible web interfaces and reusable UI systems with React, Next.js,
            and TypeScript. I&apos;m currently building{' '}
            <ExternalAnalyticsLink
              href="https://ui.navdeepsingh.dev"
              destinationType="project"
              analyticsSource="portfolio_hero"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
            >
              NavUI<span className="sr-only"> (opens in a new tab)</span>
            </ExternalAnalyticsLink>
            , an open-source library of {componentCount} components and {blockCount} reusable
            blocks, while contributing frontend improvements to open-source products.
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
