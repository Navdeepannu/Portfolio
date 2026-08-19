import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { ComponentIcon } from '@/site/component-icon'
import { ComponentsPageHeader } from '@/site/components-page-header'

function ComponentList({
  components,
  label,
  isNew = false,
}: {
  components: ComponentDefinition[]
  label: string
  isNew?: boolean
}) {
  return (
    <section aria-labelledby={`${label.toLowerCase().replaceAll(' ', '-')}-heading`}>
      <div className="mb-3 flex items-center justify-between px-1">
        <h2
          id={`${label.toLowerCase().replaceAll(' ', '-')}-heading`}
          className="text-sm font-semibold tracking-[-0.01em] text-foreground"
        >
          {label}
        </h2>
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <Link
            key={component.slug}
            href={getComponentHref(component.slug)}
            className="group flex min-h-18 items-center gap-3 rounded-xl bg-background px-4 ring-1 ring-foreground/10 transition-all duration-200 hover:bg-muted/80 hover:shadow-sm"
          >
            <span className="rounded-lg border border-border bg-background p-px">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-border bg-muted/60 text-muted-foreground shadow-xs transition-[background-color,color,border-color] duration-200 group-hover:border-border group-hover:text-foreground">
                <ComponentIcon slug={component.slug} className="size-4.5" aria-hidden="true" />
              </span>
            </span>

            <span className="flex min-w-0 flex-1 items-center gap-2">
              <span className="truncate text-sm font-medium text-foreground">
                {component.title}
              </span>
              {isNew ? (
                <span className="rounded-md border border-border/70 bg-muted/40 px-1.5 py-0.5 text-[0.625rem] font-medium text-muted-foreground">
                  New
                </span>
              ) : null}
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground/70 transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transform-none"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ComponentsExplorer({ components }: { components: ComponentDefinition[] }) {
  const orderedComponents = [...components].reverse()
  const newComponents = orderedComponents.slice(0, 3)
  const libraryComponents = orderedComponents.slice(3)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <ComponentsPageHeader active="list" />

      <div className="flex flex-col gap-10">
        <ComponentList components={newComponents} label="New components" isNew />
        <ComponentList components={libraryComponents} label="Library" />
      </div>
    </div>
  )
}
