'use client'

import { createElement } from 'react'
import Link from 'next/link'

import type { ComponentBentoSize, ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { getComponentPreview } from '@/registry/component-entries'
import { cn } from '@/lib/utils'

const COLUMNS = 'columns-1 sm:columns-2 lg:columns-3'

const PREVIEW_HEIGHT: Record<ComponentBentoSize, string> = {
  sm: 'h-40',
  md: 'h-56',
  lg: 'h-72',
  xl: 'h-96',
}

function previewHeight(bento?: ComponentDefinition['bento']): string {
  return PREVIEW_HEIGHT[bento?.size ?? 'md']
}

function ComponentPreviewCard({ component }: { component: ComponentDefinition }) {
  const Preview = getComponentPreview(component.slug)

  return (
    <article
      className={cn(
        // `break-inside-avoid` keeps each card whole as it flows between columns.
        'group mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-mist-50 p-1.5 shadow-sm ring-1 ring-foreground/6.5 dark:bg-zinc-900 dark:ring-zinc-400/20',
        'transition-all duration-300 hover:shadow-md hover:ring-foreground/10',
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-xl bg-background p-4 shadow-xs ring-1 ring-foreground/6.5',
          previewHeight(component.bento),
        )}
      >
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
        <p className="mt-0.5 line-clamp-2 max-w-sm text-xs text-muted-foreground group-hover:text-muted-foreground">
          {component.description}
        </p>
      </Link>
    </article>
  )
}

export default function ComponentsBentoGrid({
  category,
  components,
  columnsClassName = COLUMNS,
}: {
  category: { name: string; description?: string }
  components: ComponentDefinition[]
  /** Override responsive column counts, e.g. "columns-1 md:columns-2 xl:columns-4". */
  columnsClassName?: string
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
      <div className={cn('gap-3', columnsClassName)}>
        {components.map((component) => (
          <ComponentPreviewCard key={component.slug} component={component} />
        ))}
      </div>
    </div>
  )
}
