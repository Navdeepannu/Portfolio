import type { Metadata } from 'next'

import { ComponentDetailPage } from '@/features/navui/catalog/components/component-detail-page'
import { getAllComponents, getComponentBySlug } from '@/features/navui/catalog'

export function generateStaticParams() {
  return getAllComponents().map((component) => ({ slug: component.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const component = getComponentBySlug(slug)
  if (!component) return {}

  const path = `/components/${component.slug}`
  return {
    title: component.title,
    description: component.description,
    alternates: { canonical: path },
    openGraph: {
      title: component.title,
      description: component.description,
      url: path,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ComponentDetailPage slug={slug} />
}
