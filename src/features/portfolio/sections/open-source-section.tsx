import { ContributionGraph } from '@/components/contribution-graph'
import { getGithubActivity } from '@/features/portfolio/github/server/github-activity'
import { getGithubContributions } from '@/features/portfolio/github/server/contributions'
import { GithubActivityPreview } from '@/features/portfolio/sections/github-activity-preview'
import { LandingSection } from '@/features/portfolio/sections/landing-section'

export async function OpenSourceSection() {
  const [activity, contributions] = await Promise.all([
    getGithubActivity(),
    getGithubContributions(),
  ])
  const currentYear = new Date().getUTCFullYear()

  return (
    <LandingSection id="open-source" label="Open-source activity">
      <p className="mb-5 max-w-xl text-sm leading-6 text-muted-foreground">
        See my latest contribution activity on{' '}
        <a
          href={activity.profileHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border-b border-dotted border-current/55 pb-px font-medium text-foreground transition-colors hover:border-current focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
        >
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
      <GithubActivityPreview activity={activity} />

      <div className="mt-10 max-w-3xl">
        {contributions ? (
          <ContributionGraph
            aria-label="GitHub contribution activity"
            className="border-0 bg-transparent p-0"
            data={contributions}
            showHeader={false}
          />
        ) : (
          <ContributionGraph
            aria-label="GitHub contribution activity"
            className="border-0 bg-transparent p-0"
            data={{
              days: [],
              total: 0,
              from: `${currentYear}-01-01`,
              to: `${currentYear}-12-31`,
            }}
            showHeader={false}
            emptyMessage="Contribution data is temporarily unavailable. Recent merged pull requests remain available above."
          />
        )}
      </div>
    </LandingSection>
  )
}
