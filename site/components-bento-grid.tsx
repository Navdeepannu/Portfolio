'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

const COLUMNS = 'columns-1 sm:columns-2 lg:columns-3'

function ComponentPreviewCard({ component }: { component: ComponentDefinition }) {
  return (
    <Card
      className={cn(
        'group mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-card p-1',
        'shadow-md ring-1 shadow-black/5 ring-border transition-all',
        'hover:shadow-lg hover:ring-foreground/10',
      )}
    >
      <Link href={getComponentHref(component.slug)} className="block">
        <div className="overflow-hidden rounded-xl bg-muted/30">
          <div className="flex items-center justify-center p-2">
            <Image
              src={component.image}
              alt={component.title}
              width={1080}
              height={1920}
              loading="lazy"
              className={cn(
                'pointer-events-none h-auto w-full rounded-lg',
                'border-4 border-background object-cover',
                'ring-1 ring-foreground/5 transition-transform duration-300',
                'group-hover:scale-[1.015]',
              )}
            />
          </div>
        </div>

        <div className="space-y-0.5 px-3 pt-2 pb-3">
          <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {component.title}
          </p>

          <p className="line-clamp-2 max-w-sm text-xs text-muted-foreground">
            {component.description}
          </p>
        </div>
      </Link>
    </Card>
  )
}

export default function ComponentsBentoGrid({
  category,
  components,
  columnsClassName = COLUMNS,
}: {
  category: { name: string; description?: string }
  components: ComponentDefinition[]
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
    <div className="mx-auto w-full max-w-365 px-4 md:px-8">
      <header className="mb-8">
        {category.name === 'All' ? (
          <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
        ) : (
          ''
        )}
        <h1 className="text-2xl font-semibold tracking-tight">
          {category.name === 'All' ? '' : <span>{category.name}</span>}
        </h1>

        {category.description ? (
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">{category.description}</p>
        ) : null}
      </header>

      <div className={cn('gap-x-4', columnsClassName)}>
        {components.map((component) => (
          <ComponentPreviewCard key={component.slug} component={component} />
        ))}
      </div>
    </div>
  )
}
