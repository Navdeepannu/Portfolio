import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { ComponentDefinition, ComponentGallerySize } from '@/registry/types'
import { getComponentHref } from '@/features/navui/catalog/components/component-helpers'
import { cn } from '@/lib/utils'
import { getInstallCommands } from '@/features/navui/catalog/install-commands-display'
import { ComponentGalleryPreview } from '@/features/navui/catalog/components/component-gallery-preview'
import { ComponentInstallCopyButton } from '@/features/navui/catalog/components/component-install-copy-button'

const sizeClassNames: Record<ComponentGallerySize, string> = {
  compact: 'md:col-span-1 lg:col-span-2',
  standard: 'md:col-span-1 lg:col-span-3',
  wide: 'md:col-span-2 lg:col-span-4',
  feature: 'md:col-span-2 lg:col-span-6',
}

export function ComponentGalleryCard({ component }: { component: ComponentDefinition }) {
  const href = getComponentHref(component.slug)
  const installCommand = getInstallCommands(component.slug).pnpm
  const headingId = `${component.slug}-gallery-heading`

  return (
    <article
      aria-labelledby={headingId}
      data-gallery-card={component.slug}
      data-gallery-size={component.gallery.size}
      className={cn(
        'group/card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card',
        'transition-[background-color,border-color,box-shadow] duration-200',
        'focus-within:border-foreground/25 focus-within:ring-2 focus-within:ring-ring/40 hover:border-foreground/20 hover:shadow-sm',
        sizeClassNames[component.gallery.size],
        component.gallery.tabletSpan === 2 && 'md:col-span-2',
      )}
    >
      <div className="min-w-0 flex-1">
        <ComponentGalleryPreview
          slug={component.slug}
          title={component.title}
          height={component.gallery.height}
          treatment={component.gallery.treatment}
          label={component.gallery.label}
          embedded
        />
      </div>

      <footer className="flex min-h-14 items-center justify-between gap-3 border-t border-border/80 bg-muted/50 px-3 py-2.5 sm:px-4">
        <h2 id={headingId} className="min-w-0 text-sm font-medium text-foreground">
          <Link
            href={href}
            className="block truncate rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {component.title}
          </Link>
        </h2>

        <div className="flex shrink-0 items-center gap-0.5 text-muted-foreground opacity-80 transition-opacity duration-150 group-focus-within/card:opacity-100 group-hover/card:opacity-100">
          <ComponentInstallCopyButton title={component.title} command={installCommand} />

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href={href}>
              Docs
              <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  )
}
