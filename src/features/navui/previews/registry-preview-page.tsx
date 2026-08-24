import { createElement } from 'react'
import { notFound } from 'next/navigation'

import { blocks } from '@/features/navui/catalog'
import { getBlockComponent } from '@/features/navui/catalog/blocks/block-entries'
import {
  getComponentEntry,
  getComponentExample,
} from '@/features/navui/catalog/components/component-entries'
import BlockPreviewBoundary from '@/features/navui/previews/block-preview-boundary'
import { ComponentPreview } from '@/features/navui/catalog/components/component-tabs'
import PreviewShell from '@/features/navui/previews/preview-navbar'
import { getNavUIPrimitivePreference } from '@/features/navui/primitives/primitive-preference'

export async function RegistryPreviewPage({
  slug,
  exampleId,
}: {
  slug: string
  exampleId?: string
}) {
  const primitive = await getNavUIPrimitivePreference()
  const block = blocks.find((b) => b.slug === slug)
  if (block) {
    const blockComponent = getBlockComponent(block.slug, primitive)
    if (!blockComponent) notFound()

    return (
      <PreviewShell name={block.title} fallbackHref={`/blocks/${block.category}`}>
        <BlockPreviewBoundary slug={slug}>{createElement(blockComponent)}</BlockPreviewBoundary>
      </PreviewShell>
    )
  }

  const componentEntry = getComponentEntry(slug)
  if (componentEntry) {
    const example = exampleId ? getComponentExample(slug, exampleId) : undefined
    if (exampleId && !example) notFound()

    const previewName = example
      ? `${componentEntry.definition.title}: ${example.title}`
      : componentEntry.definition.title

    return (
      <PreviewShell name={previewName} fallbackHref={`/components/${slug}`}>
        <div className="flex min-h-dvh w-full min-w-0 overflow-x-hidden px-4 py-28 sm:px-8">
          <div className="m-auto flex w-full min-w-0 justify-center">
            <BlockPreviewBoundary slug={slug}>
              <ComponentPreview slug={slug} exampleId={exampleId} />
            </BlockPreviewBoundary>
          </div>
        </div>
      </PreviewShell>
    )
  }

  notFound()
}
