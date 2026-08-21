import type { ComponentProps } from 'react'

import { ComponentsViewNav } from '@/features/navui/catalog/components/components-view-nav'

type ComponentsPageHeaderProps = ComponentProps<typeof ComponentsViewNav>

export function ComponentsPageHeader({ active }: ComponentsPageHeaderProps) {
  return (
    <header className="mb-9 sm:mb-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">Components</h1>
        <ComponentsViewNav active={active} />
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[0.9375rem]">
        Interactive React components built for real interfaces. Preview, inspect, and install.
      </p>
    </header>
  )
}
