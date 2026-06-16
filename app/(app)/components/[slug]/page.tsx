import { notFound } from 'next/navigation'

import {
  componentCategories,
  DEFAULT_COMPONENT_CATEGORY_ID,
  getAllComponents,
  getComponentsByCategory,
  resolveComponentsRouteParam,
} from '@/data'
import ComponentRenderer from '@/site/component-renderer'
import ComponentDocSidebar from '@/site/component-doc-sidebar'
import ComponentsBentoGrid from '@/site/components-bento-grid'
import { SidebarProvider } from '@/components/ui/sidebar'

export function generateStaticParams() {
  const categoryParams = componentCategories
    .filter((category) => category.id !== DEFAULT_COMPONENT_CATEGORY_ID)
    .map((category) => ({ slug: category.id }))

  const componentParams = getComponentsByCategory(DEFAULT_COMPONENT_CATEGORY_ID).map(
    (component) => ({ slug: component.slug }),
  )

  return [...categoryParams, ...componentParams]
}

export default async function ComponentsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const resolved = resolveComponentsRouteParam(slug)

  if (!resolved) notFound()

  if (resolved.type === 'category') {
    const components = getComponentsByCategory(resolved.category.id)
    return <ComponentsBentoGrid category={resolved.category} components={components} />
  }

  const sidebarItems = getAllComponents().map((component) => ({
    slug: component.slug,
    title: component.title,
  }))

  return (
    <div className="mx-auto flex w-full gap-8 px-4 py-8 md:px-6 lg:gap-16">
      <aside className="hidden shrink-0 lg:block">
        <SidebarProvider>
          <ComponentDocSidebar items={sidebarItems} activeSlug={resolved.component.slug} />
        </SidebarProvider>
      </aside>
      <main className="w-full max-w-5xl min-w-0">
        <ComponentRenderer component={resolved.component} />
      </main>
    </div>
  )
}
