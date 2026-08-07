'use client'

import { useState } from 'react'

import { ProximityNav, type ProximityNavItem } from '@/components/ui/components/proximity-nav'

const sidebarItems: ProximityNavItem[] = [
  { title: 'Introduction', href: '/docs/introduction' },
  { title: 'Installation', href: '/docs/installation' },
  { title: 'Button', href: '/docs/components/button' },
  { title: 'Dialog', href: '/docs/components/dialog' },
  { title: 'Accordion', href: '/docs/components/accordion' },
]

export default function ProximityNavShowcase() {
  const [activeHref, setActiveHref] = useState(sidebarItems[0].href)

  return (
    <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-6 p-4 sm:flex-row sm:items-start">
      <ProximityNav
        items={sidebarItems}
        activeHref={activeHref}
        preventNavigation
        onActiveHrefChange={setActiveHref}
        label="Component documentation"
        className="static w-60"
      />
    </div>
  )
}
