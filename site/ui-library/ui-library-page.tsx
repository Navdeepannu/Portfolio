import BlocksPreviewSection from '@/site/ui-library/blocks-preview-section'
import { ComponentsPreviewSection } from '@/site/ui-library/components-preview-section'
import { ShowcaseSection } from '@/site/ui-library/showcase-section'
import { UiLibraryHero } from '@/site/ui-library/ui-library-hero'

export function UiLibraryPage() {
  return (
    <main className="flex flex-col">
      <UiLibraryHero />
      <ShowcaseSection />
      <ComponentsPreviewSection />
      <BlocksPreviewSection />
    </main>
  )
}
