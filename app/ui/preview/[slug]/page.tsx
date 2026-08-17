import type { Metadata } from 'next'
import { createElement } from 'react'
import { notFound } from 'next/navigation'

import { blocks } from '@/data'
import { getBlockComponent } from '@/registry/index'
import {
  componentDefinitions,
  getComponentEntry,
  getComponentExample,
} from '@/registry/component-entries'
import BlockPreviewBoundary from '@/site/block-preview-boundary'
import { ComponentPreview } from '@/site/component-tabs'
import PreviewShell from '@/site/preview-navbar'

export function generateStaticParams() {
  return [
    ...blocks.map((block) => ({ slug: block.slug })),
    ...componentDefinitions.map((component) => ({ slug: component.slug })),
  ]
}

type PreviewSearchParams = Promise<{ example?: string | string[] }>

function getExampleId(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: PreviewSearchParams
}): Promise<Metadata> {
  const { slug } = await params
  const exampleId = getExampleId((await searchParams).example)
  const block = blocks.find((item) => item.slug === slug)
  const component = getComponentEntry(slug)?.definition
  const example = component && exampleId ? getComponentExample(slug, exampleId) : undefined
  const title =
    block?.title ??
    (component ? (example ? `${component.title}: ${example.title}` : component.title) : undefined)
  const canonical = example
    ? `/preview/${slug}?example=${encodeURIComponent(example.id)}`
    : `/preview/${slug}`

  return {
    title: `${title ?? 'UI'} Preview`,
    alternates: { canonical },
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  }
}

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: PreviewSearchParams
}) {
  const { slug } = await params
  const exampleId = getExampleId((await searchParams).example)

  const block = blocks.find((b) => b.slug === slug)
  if (block) {
    const blockComponent = getBlockComponent(block.slug)
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
