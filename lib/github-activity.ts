import 'server-only'

import {
  landingPageContent,
  type GithubActivityPreview,
} from '@/site/portfolio/landing-page-content'

const GITHUB_ACTIVITY_QUERY = `
  query GitHubActivity($searchQuery: String!) {
    search(query: $searchQuery, type: ISSUE, first: 6) {
      nodes {
        __typename

        ... on PullRequest {
          title
          url
          additions
          deletions
          mergedAt

          repository {
            nameWithOwner
            url
          }

          comments(first: 1) {
            totalCount
          }
        }
      }
    }
  }
`

type PullRequestNode = {
  __typename: 'PullRequest'
  title: string
  url: string
  additions: number
  deletions: number
  mergedAt: string | null
  repository: {
    nameWithOwner: string
    url: string
  }
  comments: {
    totalCount: number
  }
}

type GithubResponse = {
  data?: {
    search: {
      nodes: Array<PullRequestNode | null>
    }
  }
  errors?: Array<{
    message: string
  }>
}

function isMergedPullRequest(
  node: PullRequestNode | null,
): node is PullRequestNode & { mergedAt: string } {
  return node?.__typename === 'PullRequest' && typeof node.mergedAt === 'string'
}

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

export async function getGithubActivity(): Promise<GithubActivityPreview> {
  const fallback = landingPageContent.githubActivity
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME ?? 'navdeepannu'

  if (!token) {
    return fallback
  }

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
        query: GITHUB_ACTIVITY_QUERY,
        variables: {
          searchQuery: `author:${username} is:pr is:merged sort:updated-desc`,
        },
      }),
      next: {
        revalidate: 60,
        tags: ['github-activity'],
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`)
    }

    const payload = (await response.json()) as GithubResponse

    if (payload.errors?.length || !payload.data) {
      throw new Error(payload.errors?.[0]?.message ?? 'GitHub returned no activity data')
    }

    const items = payload.data.search.nodes
      .filter(isMergedPullRequest)
      .slice(0, 3)
      .map((pullRequest) => ({
        repository: pullRequest.repository.nameWithOwner,
        repositoryHref: pullRequest.repository.url,
        title: pullRequest.title,
        href: pullRequest.url,
        date: dateFormatter.format(new Date(pullRequest.mergedAt)),
        dateTime: pullRequest.mergedAt,
        status: 'Merged' as const,
        additions: pullRequest.additions,
        deletions: pullRequest.deletions,
        comments: pullRequest.comments.totalCount,
      }))

    if (items.length === 0) {
      return fallback
    }

    return {
      ...fallback,
      description: 'Recent merged pull requests across open-source and portfolio code.',
      items,
    }
  } catch (error) {
    console.error(
      '[github-activity]',
      error instanceof Error ? error.message : 'Unable to load GitHub activity',
    )

    return fallback
  } finally {
    clearTimeout(timeoutId)
  }
}
