import type { Metadata } from 'next'

import { getAllComponents } from '@/data'
import { ComponentsShowcase } from '@/site/components-showcase'

export const metadata: Metadata = {
  title: 'Component Showcase',
  description: 'See every NavUI component running in a focused live showcase.',
  alternates: { canonical: '/components/showcase' },
  openGraph: { url: '/components/showcase' },
}

export default function Page() {
  return <ComponentsShowcase components={getAllComponents()} />
}
