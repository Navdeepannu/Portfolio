import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { ComponentIcon } from '@/site/component-icon'
import { ComponentsViewNav } from '@/site/components-view-nav'

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
      <h2
        id={`${label.toLowerCase().replaceAll(' ', '-')}-heading`}
        className="border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground md:px-5"
      >
        {label}
      </h2>
      <div className="relative grid sm:grid-cols-2 sm:before:pointer-events-none sm:before:absolute sm:before:inset-y-0 sm:before:left-1/2 sm:before:z-10 sm:before:w-px sm:before:bg-border lg:grid-cols-3 lg:before:left-1/3 lg:after:pointer-events-none lg:after:absolute lg:after:inset-y-0 lg:after:left-2/3 lg:after:z-10 lg:after:w-px lg:after:bg-border">
        {components.map((component) => (
          <Link
            key={component.slug}
            href={getComponentHref(component.slug)}
            className="group flex min-h-16 items-center gap-3 border-b border-border px-4 transition-colors duration-150 outline-none hover:bg-muted/45 focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:px-5"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
              <ComponentIcon slug={component.slug} className="size-4" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <span className="truncate text-sm font-medium text-foreground">
                {component.title}
              </span>
              {isNew ? (
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.625rem] font-medium text-muted-foreground">
                  New
                </span>
              ) : null}
            </span>
            <span className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              <ChevronRight
                className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </span>
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
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
      <header className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Components</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Browse {components.length} focused components. Open one to try the live preview, inspect
            its API, and copy the install command.
          </p>
        </div>
        <ComponentsViewNav active="list" />
      </header>

      <div className="overflow-hidden rounded-xl border border-border">
        <ComponentList components={newComponents} label="New components" isNew />
        <ComponentList components={libraryComponents} label="Library" />
      </div>
    </div>
  )
}
