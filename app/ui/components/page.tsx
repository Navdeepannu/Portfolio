import { getAllComponents } from '@/data'
import ComponentsExplorer from '@/site/components-explorer'

export default function ComponentsPage() {
  return <ComponentsExplorer components={getAllComponents()} />
}
