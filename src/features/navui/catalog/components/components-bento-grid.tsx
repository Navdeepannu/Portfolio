import type { ComponentDefinition } from '@/registry/types'
import { ComponentGalleryCard } from '@/features/navui/catalog/components/component-gallery-card'

export default function ComponentsBentoGrid({ components }: { components: ComponentDefinition[] }) {
  const orderedComponents = [...components].reverse()

  return (
    <section
      aria-label="Interactive component gallery"
      className="mx-auto w-full max-w-365 px-4 py-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:[&>article:last-child:nth-child(odd)]:col-span-2">
        {orderedComponents.map((component) => (
          <ComponentGalleryCard key={component.slug} component={component} />
        ))}
      </div>
    </section>
  )
}
