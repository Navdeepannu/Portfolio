import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import {
  DEFAULT_COMPONENT_CATEGORY_ID,
  getAllComponents,
  getComponentBySlug,
  getComponentHref,
  isValidComponentCategoryId,
} from '@/data'
import ComponentRenderer from '@/site/component-renderer'
import ComponentDocSidebar from '@/site/component-doc-sidebar'

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

export default async function ComponentsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const component = getComponentBySlug(slug)

  if (!component) {
    if (isValidComponentCategoryId(slug) && slug !== DEFAULT_COMPONENT_CATEGORY_ID) {
      redirect('/components')
    }
    notFound()
  }

  const components = getAllComponents()
  const componentIndex = components.findIndex((item) => item.slug === component.slug)
  const previousComponent = componentIndex > 0 ? components[componentIndex - 1] : undefined
  const nextComponent =
    componentIndex >= 0 && componentIndex < components.length - 1
      ? components[componentIndex + 1]
      : undefined

  const sidebarItems = components.map((item) => ({
    slug: item.slug,
    title: item.title,
  }))

  const previous = previousComponent
    ? {
        title: previousComponent.title,
        href: getComponentHref(previousComponent.slug),
      }
    : undefined
  const next = nextComponent
    ? {
        title: nextComponent.title,
        href: getComponentHref(nextComponent.slug),
      }
    : undefined

  return (
    <>
      <div className="mx-auto flex w-full gap-8 px-4 py-8 md:px-6 lg:gap-16">
        <aside className="sticky top-20 hidden h-fit shrink-0 self-start lg:block">
          <ComponentDocSidebar
            items={sidebarItems}
            activeSlug={component.slug}
            className="static"
          />
        </aside>
        <main className="w-full max-w-5xl min-w-0">
          <ComponentRenderer component={component} previous={previous} next={next} />
        </main>
      </div>
    </>
  )
}
