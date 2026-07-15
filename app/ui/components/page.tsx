import { componentCategories, getAllComponents } from '@/data'
import ComponentsExplorer from '@/site/components-explorer'

export default function ComponentsPage() {
  return <ComponentsExplorer categories={componentCategories} components={getAllComponents()} />
}
