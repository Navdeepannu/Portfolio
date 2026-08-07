import { MousePointer2 } from 'lucide-react'

import type { ComponentDefinition } from '@/data/component-types'
import ComponentsBentoGrid from '@/site/components-bento-grid'

export default function ComponentsExplorer({ components }: { components: ComponentDefinition[] }) {
  return (
    <>
      <header>
        <div className="inset-x-0 h-12 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />
        <div className="mx-auto flex w-full max-w-365 flex-col gap-5 px-4 py-8 md:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
              Component Showcase
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Try the Components, before you install them.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Production-ready interactions built for React, Motion, and shadcn/ui.
            </p>
          </div>
        </div>
      </header>
      <ComponentsBentoGrid components={components} />
    </>
  )
}
