import type { Metadata } from 'next'

import { getAllComponents } from '@/features/navui/catalog'
import { ComponentsShowcase } from '@/features/navui/catalog/components/components-showcase'

export const metadata: Metadata = {
  title: 'Component Showcase',
  description: 'See every NavUI component running in a focused live showcase.',
  alternates: { canonical: '/components/showcase' },
  openGraph: { url: '/components/showcase' },
}

export default function Page() {
  return <ComponentsShowcase components={getAllComponents()} />
}
