import "server-only"

type GithubRepositoryResponse = {
  stargazers_count: number
}

export async function getGithubStars(owner: string, repository: string): Promise<number | null> {
  const token = process.env.GITHUB_TOKEN
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5_000)

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
        'User-Agent': 'navdeepsingh.dev',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      next: {
        revalidate: 900,
        tags: [`github-stars:${owner}/${repository}`],
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`)
    }

    const repositoryData = (await response.json()) as GithubRepositoryResponse

    return repositoryData.stargazers_count
  } catch (error) {
    console.error(
      `[github-stars:${owner}/${repository}]`,
      error instanceof Error ? error.message : 'Unable to load GitHub stars',
    )

    return null
  } finally {
    clearTimeout(timeoutId)
  }
}
