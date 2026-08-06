import { getGithubStars } from '@/lib/github/repo-stats'

import {
  LandingHeader as LandingHeaderClient,
  LandingNavbar as LandingNavbarClient,
} from './landing-header'

const FALLBACK_STARGAZERS_COUNT = 3

async function getStargazersCount() {
  return (await getGithubStars('navdeepannu', 'portfolio')) ?? FALLBACK_STARGAZERS_COUNT
}

export async function LandingHeader() {
  const stargazersCount = await getStargazersCount()

  return <LandingHeaderClient stargazersCount={stargazersCount} />
}

export async function LandingNavbar() {
  const stargazersCount = await getStargazersCount()

  return <LandingNavbarClient stargazersCount={stargazersCount} />
}
