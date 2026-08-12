import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import type { ComponentDefinition } from '@/data/component-types'
import { getComponentHref } from '@/data/component-helpers'
import { getInstallCommands } from '@/site/block-install-commands'
import { ComponentGalleryPreview } from '@/site/component-gallery-preview'
import { ComponentInstallCopyButton } from '@/site/component-install-copy-button'
import { ComponentsViewNav } from '@/site/components-view-nav'

export function ComponentsShowcase({ components }: { components: ComponentDefinition[] }) {
  const orderedComponents = [...components].reverse()

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
        <ComponentsViewNav active="showcase" />
      </header>

      <section aria-label="Live component showcase" className="columns-1 gap-x-5 lg:columns-2">
        {orderedComponents.map((component) => (
          <article
            key={component.slug}
            aria-label={component.title}
            className="mb-8 min-w-0 break-inside-avoid"
          >
            <ComponentGalleryPreview
              slug={component.slug}
              title={component.title}
              height={component.gallery.height}
              treatment={component.gallery.treatment}
              label={component.gallery.label}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
              <h2 className="text-sm font-medium text-foreground">{component.title}</h2>
              <div className="flex items-center gap-1.5">
                <ComponentInstallCopyButton
                  title={component.title}
                  command={getInstallCommands(component.slug).pnpm}
                />
                <Button asChild variant="ghost" size="sm">
                  <Link href={getComponentHref(component.slug)}>
                    View docs
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
