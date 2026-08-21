import { getBlocksByCategory, getDefaultCategory } from '@/features/navui/catalog'
import BlocksList from '@/features/navui/catalog/blocks/blocks-list'

export default function BlocksDefaultPage() {
  const category = getDefaultCategory()
  const blocks = getBlocksByCategory(category.id)

  return <BlocksList category={category} blocks={blocks} />
}
