import 'server-only'

import { cache } from 'react'

type GithubRepositoryResponse = {
  stargazers_count?: unknown
}

async function fetchGithubStars(owner: string, repository: string): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`, {
      signal: AbortSignal.timeout(5_000),
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'navdeepsingh.dev',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: {
        revalidate: 3_600,
        tags: [`github-stars:${owner}/${repository}`],
      },
    })

    if (!response.ok) throw new Error(`GitHub returned ${response.status}`)

    const repositoryData = (await response.json()) as GithubRepositoryResponse
    const stars = repositoryData.stargazers_count

    if (typeof stars !== 'number' || !Number.isFinite(stars) || stars < 0) {
      throw new Error('GitHub returned an invalid stargazer count')
    }

    return stars
  } catch (error) {
    console.error(
      `[github-stars:${owner}/${repository}]`,
      error instanceof Error ? error.message : 'Unable to load GitHub stars',
    )

    return null
  }
}

export const getGithubStars = cache(fetchGithubStars)
