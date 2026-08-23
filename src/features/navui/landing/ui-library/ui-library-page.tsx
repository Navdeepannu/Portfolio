import BlocksPreviewSection from '@/features/navui/landing/ui-library/blocks-preview-section'
import { ComponentsPreviewSection } from '@/features/navui/landing/ui-library/components-preview-section'
import { ShowcaseSection } from '@/features/navui/landing/ui-library/showcase-section'
import { UiLibraryFooter } from '@/features/navui/landing/ui-library/ui-library-footer'
import { UiLibraryHero } from '@/features/navui/landing/ui-library/ui-library-hero'

export function UiLibraryPage() {
  return (
    <main className="flex flex-col">
      <UiLibraryHero />
      <ShowcaseSection />
      <BlocksPreviewSection />
      <ComponentsPreviewSection />
      <UiLibraryFooter />
    </main>
  )
}
