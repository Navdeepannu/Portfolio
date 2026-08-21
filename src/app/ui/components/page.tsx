import { getAllComponents } from '@/features/navui/catalog'
import ComponentsExplorer from '@/features/navui/catalog/components/components-explorer'

export default function ComponentsPage() {
  return <ComponentsExplorer components={getAllComponents()} />
}
