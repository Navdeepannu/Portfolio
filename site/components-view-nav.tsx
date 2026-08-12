import { Grid2X2, List } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const views = [
  { id: 'list', label: 'List', href: '/components', Icon: List },
  { id: 'showcase', label: 'Showcase', href: '/components/showcase', Icon: Grid2X2 },
] as const

export function ComponentsViewNav({ active }: { active: (typeof views)[number]['id'] }) {
  return (
    <nav
      aria-label="Component views"
      className="flex items-center gap-1 rounded-lg bg-muted/60 p-1"
    >
      {views.map(({ id, label, href, Icon }) => (
        <Link
          key={id}
          href={href}
          aria-current={active === id ? 'page' : undefined}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-[background-color,color,box-shadow,transform] duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]',
            active === id
              ? 'bg-background text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </nav>
  )
}
