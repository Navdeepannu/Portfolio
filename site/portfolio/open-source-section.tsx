import { ArrowUpRight } from 'lucide-react'

import { ContributionGraph } from '@/components/ui/components/contribution-graph'
import { getGithubActivity } from '@/lib/github/github-activity'
import { getGithubContributions } from '@/lib/github/contributions'
import { GithubActivityPreview } from '@/site/portfolio/github-activity-preview'
import { LandingSection } from '@/site/portfolio/landing-section'

export async function OpenSourceSection() {
  const [activity, contributions] = await Promise.all([
    getGithubActivity(),
    getGithubContributions(),
  ])
  const currentYear = new Date().getUTCFullYear()

  return (
    <LandingSection id="open-source" label="Open source">
      <GithubActivityPreview activity={activity} />

      <div className="mt-6 max-w-3xl">
        {contributions ? (
          <ContributionGraph aria-label="GitHub contribution activity" data={contributions} />
        ) : (
          <ContributionGraph
            aria-label="GitHub contribution activity"
            data={{
              days: [],
              total: 0,
              from: `${currentYear}-01-01`,
              to: `${currentYear}-12-31`,
            }}
            emptyMessage="Contribution data is temporarily unavailable. Recent merged pull requests remain available above."
          />
        )}
      </div>

      <a
        href={activity.profileHref}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
      >
        <span className="border-b border-dotted border-current/55 pb-px">
          View full GitHub profile
        </span>
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </LandingSection>
  )
}
