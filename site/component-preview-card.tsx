'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { getComponentPreviewImages } from '@/data/component-preview-images'
import { cn } from '@/lib/utils'

export function ComponentPreviewCard({
  component,
  showDescription = true,
  className,
}: {
  component: ComponentDefinition
  showDescription?: boolean
  className?: string
}) {
  const preview = getComponentPreviewImages(component)

  return (
    <Link
      href={getComponentHref(component.slug)}
      className={cn(
        'group block overflow-hidden rounded-xl bg-card p-2 shadow-md ring-1 ring-foreground/6.5 transition-all',
        'hover:shadow-lg hover:ring-foreground/10',
        className,
      )}
    >
      <div className="overflow-hidden rounded-lg bg-muted/20 shadow-2xs ring-1 ring-foreground/4.5">
        <Image
          src={preview.light}
          alt={component.title}
          width={preview.width}
          height={preview.height}
          loading="lazy"
          className={cn(
            'h-auto w-full object-cover dark:hidden',
            'ring-1 ring-foreground/5 transition-transform duration-300 group-hover:scale-[1.015]',
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <Image
          src={preview.dark}
          alt={component.title}
          width={preview.width}
          height={preview.height}
          loading="lazy"
          className={cn(
            'hidden h-auto w-full object-cover dark:block',
            'ring-1 ring-foreground/5 transition-transform duration-300 group-hover:scale-[1.015]',
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-0.5 px-1 py-2">
        <p className="text-sm font-medium text-primary transition-colors group-hover:text-primary">
          {component.title}
        </p>
        {showDescription ? (
          <p className="line-clamp-2 max-w-xs truncate font-geist text-xs text-muted-foreground">
            {component.description}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
