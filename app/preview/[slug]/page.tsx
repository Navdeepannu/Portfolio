import { notFound } from 'next/navigation'

import { blocks } from '@/data'
import { getBlockComponent } from '@/registry'
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

  const Component = getBlockComponent(block.slug)
  if (!Component) notFound()

  return (
    <BlockPreviewBoundary slug={slug}>
      <Component />
    </BlockPreviewBoundary>
  )
}
