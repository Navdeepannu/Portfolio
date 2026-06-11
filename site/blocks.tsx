'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { blocks, getCategoryHref } from '@/data'
import Link from 'next/link'
import { LandingBentoGrid } from '@/site/landing-bento-showcase'
import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'

const PREVIEW_IMAGES = [
  '/sections/design1.png',
  '/sections/design2.png',
  '/sections/design3.png',
  '/sections/design4.png',
  '/sections/design5.png',
  '/sections/design6.png',
  '/sections/design7.png',
]

export default function Blocks() {
  const { mode } = usePortfolioMode()
  const { blocks: copy } = getPortfolioContent(mode)

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
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 border-y border-border mask-x-from-75% dark:border-neutral-800" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x border-border mask-y-from-90% dark:border-neutral-800" />
          <div className="overflow-hidden">
            <div
              className={cn(
                'masonry-grid bg-foreground/4 p-2 dark:bg-neutral-800/30',
                'masonry-cols-1 sm:masonry-cols-2 xl:masonry-cols-3',
              )}
            >
              {blocks.slice(0, 3).map((item, index) => (
                <LandingBentoGrid
                  image={PREVIEW_IMAGES[index % PREVIEW_IMAGES.length]}
                  id={item.slug}
                  key={item.slug}
                  title={item.title}
                  description={item.description}
                  countLabel={item.category}
                  href={`${getCategoryHref(item.category)}#${item.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
