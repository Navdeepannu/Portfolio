import 'server-only'

import type {
  ContributionDay,
  ContributionGraphData,
} from '@/components/ui/components/contribution-graph'

const GITHUB_CONTRIBUTIONS_QUERY = `
  query GitHubContributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`

type GithubContributionLevel =
  'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'

type GithubContributionsResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              date: string
              contributionCount: number
              contributionLevel: GithubContributionLevel
            }>
          }>
        }
      }
    } | null
  }
  errors?: Array<{ message: string }>
}

const levelMap: Record<GithubContributionLevel, ContributionDay['level']> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export async function getGithubContributions(): Promise<ContributionGraphData | null> {
  const token = process.env.GITHUB_TOKEN
  const login = process.env.GITHUB_USERNAME ?? 'navdeepannu'

  if (!token) return null

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5_000)

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'navdeepsingh.dev',
      },
      body: JSON.stringify({
        query: GITHUB_CONTRIBUTIONS_QUERY,
        variables: { login },
      }),
      next: {
        revalidate: 21_600,
        tags: ['github-contributions'],
      },
    })

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`)

    const payload = (await response.json()) as GithubContributionsResponse
    const calendar = payload.data?.user?.contributionsCollection.contributionCalendar

    if (payload.errors?.length || !calendar) {
      throw new Error(payload.errors?.[0]?.message ?? 'GitHub returned no contribution data')
    }

    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel],
      })),
    )

    if (days.length === 0) return null

    return {
      days,
      total: calendar.totalContributions,
      from: days[0].date,
      to: days.at(-1)?.date ?? days[0].date,
    }
  } catch (error) {
    console.error(
      '[github-contributions]',
      error instanceof Error ? error.message : 'Unable to load GitHub contributions',
    )
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}
