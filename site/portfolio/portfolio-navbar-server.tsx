import { getGithubStars } from '@/lib/github/repo-stats'

import {
  PortfolioNavbar as PortfolioNavbarClient,
  type PortfolioNavbarProps,
} from './portfolio-navbar'

const FALLBACK_STARGAZERS_COUNT = 3

type PortfolioNavbarServerProps = Omit<PortfolioNavbarProps, 'stargazersCount'>

export async function PortfolioNavbar(props: PortfolioNavbarServerProps) {
  const stargazersCount =
    (await getGithubStars('navdeepannu', 'portfolio')) ?? FALLBACK_STARGAZERS_COUNT

  return <PortfolioNavbarClient {...props} stargazersCount={stargazersCount} />
}
