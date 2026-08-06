import { getGithubStars } from '@/lib/github/repo-stats'
import BlocksPreviewSection from '@/site/ui-library/blocks-preview-section'
import { ComponentsPreviewSection } from '@/site/ui-library/components-preview-section'
import { ShowcaseSection } from '@/site/ui-library/showcase-section'
import { UiLibraryFooter } from '@/site/ui-library/ui-library-footer'
import { UiLibraryHero } from '@/site/ui-library/ui-library-hero'

const FALLBACK_STARGAZERS_COUNT = 3

export async function UiLibraryPage() {
  const stargazersCount =
    (await getGithubStars('navdeepannu', 'portfolio')) ?? FALLBACK_STARGAZERS_COUNT

  return (
    <main className="flex flex-col">
      <UiLibraryHero stargazersCount={stargazersCount} />
      <ShowcaseSection />
      <ComponentsPreviewSection />
      <BlocksPreviewSection />
      <UiLibraryFooter />
    </main>
  )
}
