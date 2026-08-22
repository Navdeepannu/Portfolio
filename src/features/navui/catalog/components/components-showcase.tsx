import type { ComponentDefinition } from '@/registry/types'
import { ComponentGalleryCard } from '@/features/navui/catalog/components/component-gallery-card'
import { ComponentsPageHeader } from '@/features/navui/catalog/components/components-page-header'

export function ComponentsShowcase({ components }: { components: ComponentDefinition[] }) {
  const orderedComponents = [...components].reverse()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <ComponentsPageHeader active="showcase" />

      <section
        aria-label="Live component showcase"
        className="grid grid-flow-dense grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6"
      >
        {orderedComponents.map((component) => (
          <ComponentGalleryCard key={component.slug} component={component} />
        ))}
      </section>
    </div>
  )
}
