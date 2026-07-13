import { blocks } from './blocks'
import { getBlockCategoryImages } from './block-category-images'
import { blockCategories, DEFAULT_CATEGORY_ID } from './categories'
import type { BlockCategory, BlockCategoryId } from './types'
import type { BlockDefinition } from '@/registry/types'

export type BlockCategoryCard = {
  slug: BlockCategoryId
  title: string
  description: string | undefined
  count: number
  href: string
  previewImageLight: string
  previewImageDark: string
  previewWidth: number
  previewHeight: number
}

/** Blocks shown on `/blocks` when no dedicated `featured` folder exists. */
function getFeaturedBlocks(): BlockDefinition[] {
  const explicit = blocks.filter((block) => block.category === 'featured')
  if (explicit.length > 0) return explicit

  const seen = new Set<BlockCategoryId>()
  const curated: BlockDefinition[] = []

  for (const block of blocks) {
    if (block.category === 'featured' || seen.has(block.category)) continue
    seen.add(block.category)
    curated.push(block)
  }

  return curated
}

export function getBlocksByCategory(categoryId: BlockCategoryId): BlockDefinition[] {
  if (categoryId === DEFAULT_CATEGORY_ID) return getFeaturedBlocks()
  return blocks.filter((block) => block.category === categoryId)
}

export function getCategoryById(categoryId: string): BlockCategory | undefined {
  return blockCategories.find((category) => category.id === categoryId)
}

export function isValidCategoryId(categoryId: string): categoryId is BlockCategoryId {
  return blockCategories.some((category) => category.id === categoryId)
}

export function getDefaultCategory(): BlockCategory {
  const fallback = getCategoryById(DEFAULT_CATEGORY_ID)
  if (!fallback) throw new Error(`Default category "${DEFAULT_CATEGORY_ID}" not found`)
  return fallback
}

export function getCategoryHref(categoryId: BlockCategoryId): string {
  return categoryId === DEFAULT_CATEGORY_ID ? '/blocks' : `/blocks/${categoryId}`
}

export function getBlockCategories(): BlockCategoryCard[] {
  return blockCategories
    .filter((category) => category.id !== DEFAULT_CATEGORY_ID)
    .map((category) => {
      const categoryBlocks = getBlocksByCategory(category.id)
      if (categoryBlocks.length === 0) return null

      const previewBlock = categoryBlocks[0]
      const previewImages = getBlockCategoryImages(category.id)

      return {
        slug: category.id,
        title: category.name,
        description: category.description,
        count: categoryBlocks.length,
        href: getCategoryHref(category.id),
        previewImageLight: previewImages.light || `/preview/${previewBlock.slug}`,
        previewImageDark: previewImages.dark || `/preview/${previewBlock.slug}`,
        previewWidth: previewImages.width,
        previewHeight: previewImages.height,
      }
    })
    .filter((category): category is BlockCategoryCard => category !== null)
}
