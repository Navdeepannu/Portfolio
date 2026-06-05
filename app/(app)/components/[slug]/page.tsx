import { notFound } from 'next/navigation'

import {
  componentCategories,
  DEFAULT_COMPONENT_CATEGORY_ID,
  getComponentsByCategory,
  resolveComponentsRouteParam,
} from '@/data'
import ComponentRenderer from '@/site/component-renderer'
import ComponentsBentoGrid from '@/site/components-bento-grid'

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

  return (
    <div className="mx-auto w-full px-4 py-8 md:px-6">
      <ComponentRenderer component={resolved.component} />
    </div>
  )
}
