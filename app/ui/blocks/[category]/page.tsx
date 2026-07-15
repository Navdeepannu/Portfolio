import { notFound } from 'next/navigation'

import {
  blockCategories,
  DEFAULT_CATEGORY_ID,
  getBlocksByCategory,
  getCategoryById,
  isValidCategoryId,
} from '@/data'
import BlocksList from '@/site/blocks-list'

export function generateStaticParams() {
  return blockCategories
    .filter((category) => category.id !== DEFAULT_CATEGORY_ID)
    .map((category) => ({ category: category.id }))
}

export default async function BlocksCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categoryParam } = await params

  if (!isValidCategoryId(categoryParam)) notFound()

  const category = getCategoryById(categoryParam)
  if (!category) notFound()

  const blocks = getBlocksByCategory(category.id)

  return <BlocksList category={category} blocks={blocks} />
}
