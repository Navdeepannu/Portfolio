import { getGithubStars } from '@/lib/github/repo-stats'

import {
  UiLibraryNavbar as UiLibraryNavbarClient,
  type UiLibraryNavbarProps,
} from './ui-library-navbar'

const FALLBACK_STARGAZERS_COUNT = 3

type UiLibraryNavbarServerProps = Omit<UiLibraryNavbarProps, 'stargazersCount'>

export async function UiLibraryNavbar(props: UiLibraryNavbarServerProps) {
  const stargazersCount =
    (await getGithubStars('navdeepannu', 'portfolio')) ?? FALLBACK_STARGAZERS_COUNT

  return <UiLibraryNavbarClient {...props} stargazersCount={stargazersCount} />
}
