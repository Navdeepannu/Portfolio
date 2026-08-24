'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ANALYTICS_EVENTS } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'
import { GitHubStars } from './github-stars'

export function UiLibraryHeroActions({ stargazersCount }: { stargazersCount: number | null }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-4">
      <Button asChild variant="default" size="lg" className="rounded-md">
        <Link
          href="/blocks"
          className="ph-no-capture"
          onClick={() =>
            trackAnalyticsEvent(ANALYTICS_EVENTS.LANDING_CTA_CLICKED, {
              cta: 'explore_blocks',
              destination: '/blocks',
              location: 'hero',
            })
          }
        >
          Explore Blocks
        </Link>
      </Button>

      <GitHubStars
        repo="navdeepannu/portfolio"
        stargazersCount={stargazersCount}
        label="View on GitHub"
        variant="outline"
        size="lg"
        className="rounded-md"
        showTooltip={false}
        onClick={() =>
          trackAnalyticsEvent(ANALYTICS_EVENTS.LANDING_CTA_CLICKED, {
            cta: 'view_github',
            destination: 'https://github.com/navdeepannu/portfolio',
            location: 'hero',
          })
        }
      />
    </div>
  )
}
