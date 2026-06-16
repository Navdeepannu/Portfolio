import { componentDefinitions } from '@/registry/component-entries'

import type { ComponentCategory, ComponentCategoryId } from './component-types'

export const DEFAULT_COMPONENT_CATEGORY_ID: ComponentCategoryId = 'featured'

const CATEGORY_ORDER: ComponentCategoryId[] = ['featured', 'interactive']

const CATEGORY_META: Record<string, { name: string; description?: string }> = {
  featured: {
    name: 'All',
    description: 'Every component in one bento grid.',
  },
  interactive: {
    name: 'Interactive',
    description: 'Hover, focus, and motion-driven UI patterns.',
  },
}

function humanizeCategoryId(id: string): string {
  return id
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function categoryFromId(id: ComponentCategoryId): ComponentCategory {
  const meta = CATEGORY_META[id]
  return {
    id,
    name: meta?.name ?? humanizeCategoryId(id),
    description: meta?.description,
  }
}

export function buildComponentCategories(
  definitions: typeof componentDefinitions,
): ComponentCategory[] {
  const ids = new Set<ComponentCategoryId>(CATEGORY_ORDER)
  for (const def of definitions) ids.add(def.category)

  const ordered: ComponentCategory[] = []

  for (const id of CATEGORY_ORDER) {
    if (!ids.has(id)) continue
    ordered.push(categoryFromId(id))
    ids.delete(id)
  }

  for (const id of [...ids].sort((a, b) => a.localeCompare(b))) {
    ordered.push(categoryFromId(id))
  }

  return ordered
}

export const componentCategories = buildComponentCategories(componentDefinitions)
