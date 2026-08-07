import { ProximityNav, ProximityNavItem } from '@/components/ui/components/proximity-nav'
import ComponentDocSidebar from '@/site/component-doc-sidebar'

const sidebarItems: ProximityNavItem[] = [
  {
    title: 'Introduction',
    href: '/playground', // Replace with your page route.
  },
  {
    title: 'Installation',
    href: '#two',
  },
  {
    title: 'Button',
    href: '#three',
  },
  {
    title: 'Dialog',
    href: '/docs/components/dialog',
  },
  {
    title: 'Accordion',
    href: '/docs/components/accordion',
  },
]
export default function Page() {
  return (
    <main className="max-w-6xl px-12">
      <h1 className="py-20 font-geist text-9xl font-bold tracking-tight text-shadow-accent text-shadow-xs">
        Playground
      </h1>
      <div>
        <ProximityNav
          items={sidebarItems}
          // The active link is detected automatically from the current URL.
          // activeHref="/docs/components/button"
          // className="top-24 w-72"
          // label="Component documentation"
        />
      </div>
    </main>
  )
}
