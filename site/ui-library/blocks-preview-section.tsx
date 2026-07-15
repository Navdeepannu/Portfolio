'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getBlockCategories } from '@/data'
import Link from 'next/link'
import { LandingBentoGrid } from '@/site/landing-bento-showcase'

const copy = {
  eyebrow: 'Blocks',
  title: 'Production-ready sections for real products',
  description: 'Reusable page sections with live previews, source drawers, and registry installs.',
  cta: { label: 'Explore blocks', href: '/blocks' },
}

export default function BlocksPreviewSection() {
  const categories = getBlockCategories()

  return (
    <section
      id="blocks"
      className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8 md:px-12">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {copy.eyebrow}
        </span>
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left text-balance">
            <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
              {copy.title}
            </h2>
          </div>

          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>{copy.description}</p>

            <Button
              className="mt-4 border-none shadow-sm ring-1 ring-border"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={copy.cta.href}>{copy.cta.label}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 z-10 border-y border-border mask-x-from-75% dark:border-neutral-800" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x border-border mask-y-from-90% dark:border-neutral-800" />
          <div className="overflow-hidden">
            <div
              className={cn(
                'masonry-grid bg-muted/50 p-2 dark:bg-neutral-800/30',
                'masonry-cols-1 sm:masonry-cols-2 xl:masonry-cols-3',
              )}
            >
              {categories.map((category) => (
                <LandingBentoGrid
                  imageLight={category.previewImageLight}
                  imageDark={category.previewImageDark}
                  imageWidth={category.previewWidth}
                  imageHeight={category.previewHeight}
                  id={category.slug}
                  key={category.slug}
                  title={category.title}
                  count={category.count}
                  countLabel={category.count === 1 ? 'block' : 'blocks'}
                  href={category.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
