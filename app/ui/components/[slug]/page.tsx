import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import {
  DEFAULT_COMPONENT_CATEGORY_ID,
  getAllComponents,
  getComponentBySlug,
  isValidComponentCategoryId,
} from '@/data'
import ComponentRenderer from '@/site/component-renderer'
import ComponentDocSidebar from '@/site/component-doc-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

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
    // Old category routes (e.g. /components/interactive) are now in-page filters.
    if (isValidComponentCategoryId(slug) && slug !== DEFAULT_COMPONENT_CATEGORY_ID) {
      redirect('/components')
    }
    notFound()
  }

  const sidebarItems = getAllComponents().map((item) => ({
    slug: item.slug,
    title: item.title,
  }))

  return (
    <>
      {/* pattern */}
      <div className="inset-x-0 mt-1.5 h-12 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />

      <div className="mx-auto flex w-full gap-8 px-4 py-8 md:px-6 lg:gap-16">
        <aside className="hidden shrink-0 lg:block">
          <SidebarProvider>
            <ComponentDocSidebar items={sidebarItems} activeSlug={component.slug} />
          </SidebarProvider>
        </aside>
        <main className="w-full max-w-5xl min-w-0">
          <ComponentRenderer component={component} />
        </main>
      </div>
    </>
  )
}
