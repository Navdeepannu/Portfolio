import { blockDefinitions } from '@/registry/index'
import type { BlockDefinition } from '@/registry/types'

import type { BlockCategory, BlockCategoryId } from './types'

export const DEFAULT_CATEGORY_ID: BlockCategoryId = 'featured'

const CATEGORY_ORDER: BlockCategoryId[] = [
  'featured',
  'hero',
  'header',
  'auth',
  'logo-cloud',
  'teams',
  'footer',
]

const CATEGORY_META: Record<string, { name: string; description?: string }> = {
  featured: {
    name: 'Featured',
    description: 'Hand-picked blocks to showcase first.',
  },
  hero: {
    name: 'Hero',
    description: 'Top-of-page headline and conversion layouts.',
  },
  header: {
    name: 'Header',
    description: 'Navigation and top-bar patterns.',
  },
  auth: {
    name: 'Auth',
    description: 'Sign-up, sign-in, and password recovery layouts.',
  },
  'logo-cloud': {
    name: 'Logo Cloud',
    description: 'Logo clouds and brand strips.',
  },
  teams: {
    name: 'Teams',
    description: 'Team sections, testimonials, and social proof layouts.',
  },
  footer: {
    name: 'Footer',
    description: 'Site footers with links, newsletter, and brand rows.',
  },
}

function humanizeCategoryId(id: string): string {
  return id
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function categoryFromId(id: BlockCategoryId): BlockCategory {
  const meta = CATEGORY_META[id]
  return {
    id,
    name: meta?.name ?? humanizeCategoryId(id),
    description: meta?.description,
  }
}

export function buildBlockCategories(definitions: BlockDefinition[]): BlockCategory[] {
  const ids = new Set<BlockCategoryId>(CATEGORY_ORDER)
  for (const def of definitions) ids.add(def.category)

  const ordered: BlockCategory[] = []

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

export const blockCategories = buildBlockCategories(blockDefinitions)
