'use client'

import { createElement } from 'react'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { getComponentPreview } from '@/registry/component-entries'
import { cn } from '@/lib/utils'

function spanClassName(bento?: ComponentDefinition['bento']) {
  const colSpan = bento?.colSpan ?? 1
  const rowSpan = bento?.rowSpan ?? 1

  return cn(colSpan === 2 && 'md:col-span-2', rowSpan === 2 && 'md:row-span-2')
}

function ComponentPreviewCard({ component }: { component: ComponentDefinition }) {
  const Preview = getComponentPreview(component.slug)

  return (
    <article
      className={cn(
        'group flex min-h-44 flex-col overflow-hidden rounded-xl bg-card p-1 shadow-sm ring-1 ring-foreground/5',
        'group transition-[box-shadow,border-color] duration-300 hover:shadow-md hover:ring-foreground/10',
        spanClassName(component.bento),
      )}
    >
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted/80 p-4 shadow-sm ring-1 ring-foreground/6.5">
        {Preview ? (
          createElement(Preview)
        ) : (
          <span className="text-sm text-muted-foreground">Preview unavailable</span>
        )}
      </div>

      <Link
        href={getComponentHref(component.slug)}
        className={cn(
          'block px-4 py-3',
          'transition-translate duration-300 ease-in-out hover:translate-x-1',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
      >
        <p className="text-sm font-medium text-foreground group-hover:text-primary">
          {component.title}
        </p>
        <p className="mt-0.5 line-clamp-2 max-w-sm  text-xs text-muted-foreground group-hover:text-muted-foreground">
          {component.description}
        </p>
      </Link>
    </article>
  )
}

export default function ComponentsBentoGrid({
  category,
  components,
}: {
  category: { name: string; description?: string }
  components: ComponentDefinition[]
}) {
  if (components.length === 0) {
    return (
      <div className="mx-auto w-full px-4 py-8 md:px-6">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-xl font-semibold text-foreground">{category.name}</h1>
          {category.description ? (
            <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
          ) : null}
        </header>
        <p className="text-sm text-muted-foreground">No components in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full px-4 py-8 md:px-6">
      <div className="grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {components.map((component) => (
          <ComponentPreviewCard key={component.slug} component={component} />
        ))}
      </div>
    </div>
  )
}
