import { getComponentsByCategory, getDefaultComponentCategory } from '@/data'
import ComponentsBentoGrid from '@/site/components-bento-grid'

export default function ComponentsPage() {
  const category = getDefaultComponentCategory()
  const components = getComponentsByCategory(category.id)

  return <ComponentsBentoGrid category={category} components={components} />
}
