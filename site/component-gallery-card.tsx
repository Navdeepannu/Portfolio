import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { cn } from '@/lib/utils'
import { getInstallCommands } from '@/site/block-install-commands'
import { ComponentGalleryPreview } from '@/site/component-gallery-preview'
import { ComponentInstallCopyButton } from '@/site/component-install-copy-button'

export function ComponentGalleryCard({ component }: { component: ComponentDefinition }) {
  const href = getComponentHref(component.slug)
  const installCommand = getInstallCommands(component.slug).pnpm
  const headingId = `${component.slug}-gallery-heading`
  const descriptionId = `${component.slug}-gallery-description`

  return (
    <article
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className={cn(
        'group relative flex min-w-0 flex-col rounded-2xl border border-border bg-card p-2 shadow-xs',
        'transition-[border-color,box-shadow,transform] duration-200 ease-out',
        'focus-within:border-foreground/20 focus-within:shadow-md',
      )}
    >
      <Link
        href={href}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        className="absolute inset-0 z-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2"
      />

      <div className="relative z-10">
        <ComponentGalleryPreview
          slug={component.slug}
          title={component.title}
          height="lg"
          treatment={component.gallery.treatment}
          label={component.gallery.label}
        />
      </div>

      <div className="pointer-events-none relative flex flex-1 flex-col px-2 pt-4 pb-2 sm:px-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id={headingId} className="text-base font-semibold tracking-tight text-foreground">
              {component.title}
            </h2>
            <p
              id={descriptionId}
              className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground"
            >
              {component.description}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="pointer-events-auto relative z-10 flex items-center gap-2">
            <ComponentInstallCopyButton title={component.title} command={installCommand} />

            <Button asChild variant="ghost" size="sm">
              <Link href={href}>
                View component
                <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
