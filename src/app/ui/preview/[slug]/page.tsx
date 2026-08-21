import type { Metadata } from 'next'

import { blocks } from '@/features/navui/catalog'
import {
  componentDefinitions,
  getComponentEntry,
  getComponentExample,
} from '@/features/navui/catalog/components/component-entries'
import { RegistryPreviewPage } from '@/features/navui/previews/registry-preview-page'

type PreviewSearchParams = Promise<{ example?: string | string[] }>

function getExampleId(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export function generateStaticParams() {
  return [
    ...blocks.map((block) => ({ slug: block.slug })),
    ...componentDefinitions.map((component) => ({ slug: component.slug })),
  ]
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

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: PreviewSearchParams
}) {
  const { slug } = await params
  const exampleId = getExampleId((await searchParams).example)
  return <RegistryPreviewPage slug={slug} exampleId={exampleId} />
}
