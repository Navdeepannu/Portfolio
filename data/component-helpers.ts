import { componentDefinitions as components } from '@/registry/component-entries'

import { componentCategories, DEFAULT_COMPONENT_CATEGORY_ID } from './component-categories'
import type { ComponentCategory, ComponentCategoryId } from './component-types'
import type { ComponentDefinition } from './component-types'

export function getAllComponents(): ComponentDefinition[] {
  return components
}

export function getComponentsByCategory(categoryId: ComponentCategoryId): ComponentDefinition[] {
  if (categoryId === DEFAULT_COMPONENT_CATEGORY_ID) return getAllComponents()
  return components.filter((component) => component.category === categoryId)
}

export function getComponentBySlug(slug: string): ComponentDefinition | undefined {
  return components.find((component) => component.slug === slug)
}

export function getComponentCategoryById(categoryId: string): ComponentCategory | undefined {
  return componentCategories.find((category) => category.id === categoryId)
}

export function isValidComponentCategoryId(
  categoryId: string,
): categoryId is ComponentCategoryId {
  return componentCategories.some((category) => category.id === categoryId)
}

export function getDefaultComponentCategory(): ComponentCategory {
  const fallback = getComponentCategoryById(DEFAULT_COMPONENT_CATEGORY_ID)
  if (!fallback) {
    throw new Error(`Default category "${DEFAULT_COMPONENT_CATEGORY_ID}" not found`)
  }
  return fallback
}

export function getComponentCategoryHref(categoryId: ComponentCategoryId): string {
  return categoryId === DEFAULT_COMPONENT_CATEGORY_ID
    ? '/components'
    : `/components/${categoryId}`
}

export function getComponentHref(slug: string): string {
  return `/components/${slug}`
}

export function resolveComponentsRouteParam(param: string):
  | { type: 'category'; category: ComponentCategory }
  | { type: 'component'; component: ComponentDefinition }
  | null {
  const component = getComponentBySlug(param)
  if (component) return { type: 'component', component }

  if (isValidComponentCategoryId(param)) {
    const category = getComponentCategoryById(param)
    if (category && category.id !== DEFAULT_COMPONENT_CATEGORY_ID) {
      return { type: 'category', category }
    }
  }

  return null
}
