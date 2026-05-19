import { getBlocksByCategory, getDefaultCategory } from '@/data'
import BlocksList from '@/site/blocks-list'

export default function BlocksDefaultPage() {
  const category = getDefaultCategory()
  const blocks = getBlocksByCategory(category.id)

  return <BlocksList category={category} blocks={blocks} />
}
