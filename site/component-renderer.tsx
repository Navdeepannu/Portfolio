import { createElement } from 'react'

import type { ComponentDefinition } from '@/data/component-types'
import { loadBlockCodeFiles } from '@/lib/block-source'
import { getComponentComponent } from '@/registry/component-entries'
import BlockCode from '@/site/block-code'
import ComponentTabs, { ComponentPreview } from '@/site/component-tabs'

export default async function ComponentRenderer({ component }: { component: ComponentDefinition }) {
  const ShowcaseComponent = getComponentComponent(component.slug)

  if (!ShowcaseComponent) {
    return (
      <article className="rounded-xl bg-card p-6 text-sm text-muted-foreground">
        Component for <code className="text-foreground">{component.slug}</code> is not registered.
      </article>
    )
  }

  const files = await loadBlockCodeFiles(component)

  return (
    <article className="flex scroll-mt-24 flex-col gap-4">
      <header className="border-b pb-4">
        <h1 className="text-xl font-semibold text-foreground">{component.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
      </header>
      <ComponentTabs
        slug={component.slug}
        title={component.title}
        preview={<ComponentPreview slug={component.slug} />}
        code={<BlockCode files={files} />}
      />
    </article>
  )
}
