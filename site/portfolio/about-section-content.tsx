import Link from 'next/link'

import { portfolioSiteConfig } from '@/lib/site'
import { SITE_ORIGINS } from '@/lib/sites'

const inlineLinkClassName =
  'rounded-sm border-b border-dotted border-current/55 pb-px font-medium text-foreground transition-colors hover:border-current focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring'

export function AboutSectionContent() {
  return (
    <div className="max-w-3xl space-y-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
      <p>
        I&apos;m a frontend-focused software engineer who enjoys designing and developing the small
        interface details that make products feel considered.
      </p>
      <p>
        I built and continue to maintain{' '}
        <Link href={SITE_ORIGINS.ui} className={inlineLinkClassName}>
          NavUI
        </Link>
        , an open-source component library and registry. I care about clear component APIs,
        accessibility, responsive behavior, thoughtful motion, and making every component easy to
        reuse in a real product.
      </p>
      <p>
        I also enjoy contributing to open source. See my work on{' '}
        <Link
          href={portfolioSiteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLinkClassName}
        >
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </Link>{' '}
        or browse the{' '}
        <Link href="#open-source" className={inlineLinkClassName}>
          open-source activity below
        </Link>
        .
      </p>
    </div>
  )
}
