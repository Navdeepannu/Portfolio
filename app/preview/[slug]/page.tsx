import { createElement } from 'react'
import { notFound } from 'next/navigation'

import { blocks } from '@/data'
import { getBlockComponent } from '@/registry/index'
import BlockPreviewBoundary from '@/site/block-preview-boundary'

export function generateStaticParams() {
  return blocks.map((block) => ({ slug: block.slug }))
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const block = blocks.find((b) => b.slug === slug)
  if (!block) notFound()

  const blockComponent = getBlockComponent(block.slug)
  if (!blockComponent) notFound()

  return (
    <BlockPreviewBoundary slug={slug}>
      {createElement(blockComponent)}
    </BlockPreviewBoundary>
  )
}
