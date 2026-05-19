import Image from 'next/image'

import { cn } from '@/lib/utils'

export type LandigBentoGridProps = {
  image?: string
  title: string
  id: string
  description?: string
  /** When filtering by category, pass count to show a line like "5 hero-sections". */
  count?: number
  /**
   * Plural fragment after the number when `count` is set.
   * Example: `count={5}` and `countLabel="hero-sections"` → "5 hero-sections".
   */
  countLabel?: string
  className?: string
}

export function LandingBentoGrid({
  image,
  id,
  title,
  description,
  count,
  countLabel = 'blocks',
  className,
}: LandigBentoGridProps) {
  const showCount = count != null && count >= 0

  return (
    <article
      data-category={id}
      className={cn(
        'mb-4 break-inside-avoid',
        'rounded-xl border bg-neutral-50 p-2 shadow-md ring-1 ring-gray-200 dark:border-neutral-700 dark:bg-neutral-800/60 dark:ring-neutral-600',
        'transition-shadow motion-reduce:transition-none hover:shadow-lg hover:ring-gray-300 dark:hover:ring-neutral-500',
        className,
      )}
    >
      <h2 className="text-base font-medium text-muted-foreground">{title}</h2>
      {showCount ? (
        <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
          {count} <span>{countLabel}</span>
        </p>
      ) : null}
      {description ? (
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      ) : null}
      {image ? (
        <div className="relative mt-4 w-full overflow-hidden rounded-lg bg-muted/20 shadow-sm ring-1 ring-ring/5">
          <Image
            src={image}
            alt={`${title}-image`}
            width={1200}
            height={800}
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      ) : null}
    </article>
  )
}
