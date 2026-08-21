import { LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const views = [
  { id: 'list', label: 'List', href: '/components', Icon: List },
  { id: 'showcase', label: 'Showcase', href: '/components/showcase', Icon: LayoutGrid },
] as const

export function ComponentsViewNav({ active }: { active: (typeof views)[number]['id'] }) {
  return (
    <nav
      aria-label="Component views"
      className="flex shrink-0 items-center gap-0.5 rounded-lg bg-muted p-0.5 ring-1 ring-foreground/20"
    >
      {views.map(({ id, label, href, Icon }) => (
        <Link
          key={id}
          href={href}
          aria-label={label}
          aria-current={active === id ? 'page' : undefined}
          title={label}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-[background-color,color,box-shadow,transform] duration-150 outline-none focus-visible:ring-1 focus-visible:ring-foreground/40 active:scale-[0.98] motion-reduce:transform-none',
            active === id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
        </Link>
      ))}
    </nav>
  )
}
