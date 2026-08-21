import { getGithubStars } from '@/features/portfolio/github/server/repo-stats'

import {
  UiLibraryNavbar as UiLibraryNavbarClient,
  type UiLibraryNavbarProps,
} from './ui-library-navbar'

type UiLibraryNavbarServerProps = Omit<UiLibraryNavbarProps, 'stargazersCount'>

export async function UiLibraryNavbar(props: UiLibraryNavbarServerProps) {
  const stargazersCount = await getGithubStars('navdeepannu', 'portfolio')

  return <UiLibraryNavbarClient {...props} stargazersCount={stargazersCount} />
}
