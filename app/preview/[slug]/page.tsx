import { createElement } from 'react'
import { notFound } from 'next/navigation'

import { blocks } from '@/data'
import { getBlockComponent } from '@/registry/index'
import { componentDefinitions, getComponentEntry } from '@/registry/component-entries'
import BlockPreviewBoundary from '@/site/block-preview-boundary'
import { ComponentPreview } from '@/site/component-tabs'
import PreviewShell from '@/site/preview-navbar'

export function generateStaticParams() {
  return [
    ...blocks.map((block) => ({ slug: block.slug })),
    ...componentDefinitions.map((component) => ({ slug: component.slug })),
  ]
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const block = blocks.find((b) => b.slug === slug)
  if (block) {
    const blockComponent = getBlockComponent(block.slug)
    if (!blockComponent) notFound()

    return (
      <PreviewShell name={block.title} fallbackHref={`/blocks/${block.category}`}>
        <BlockPreviewBoundary slug={slug}>
          {createElement(blockComponent)}
        </BlockPreviewBoundary>
      </PreviewShell>
    )
  }

  const componentEntry = getComponentEntry(slug)
  if (componentEntry) {
    return (
      <PreviewShell name={componentEntry.definition.title} fallbackHref={`/components/${slug}`}>
        <BlockPreviewBoundary slug={slug}>
          <ComponentPreview slug={slug} />
        </BlockPreviewBoundary>
      </PreviewShell>
    )
  }

  notFound()
}
