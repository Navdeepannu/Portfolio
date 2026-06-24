'use client'

import { useMemo, useState } from 'react'

import { DEFAULT_COMPONENT_CATEGORY_ID } from '@/data/component-categories'
import type {
  ComponentCategory,
  ComponentCategoryId,
  ComponentDefinition,
} from '@/data/component-types'
import ComponentsBentoGrid from '@/site/components-bento-grid'
import ComponentsCategoryNav from '@/site/components-category-nav'

export default function ComponentsExplorer({
  categories,
  components,
}: {
  categories: ComponentCategory[]
  components: ComponentDefinition[]
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<ComponentCategoryId>(
    DEFAULT_COMPONENT_CATEGORY_ID,
  )

  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0]

  const filteredComponents = useMemo(() => {
    if (selectedCategoryId === DEFAULT_COMPONENT_CATEGORY_ID) return components
    return components.filter((component) => component.category === selectedCategoryId)
  }, [components, selectedCategoryId])

  return (
    <>
      <ComponentsCategoryNav
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
      />

      {/* pattern */}
      <div className="inset-x-0 h-14 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />

      <ComponentsBentoGrid category={selectedCategory} components={filteredComponents} />
    </>
  )
}
