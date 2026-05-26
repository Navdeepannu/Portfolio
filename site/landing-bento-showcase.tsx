import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export type LandigBentoGridProps = {
  image?: string
  title: string
  id: string
  description?: string
  count?: number
  countLabel?: string
  className?: string
  href?: string
}

export function LandingBentoGrid({
  image,
  id,
  title,
  description,
  count,
  countLabel = 'blocks',
  className,
  href,
}: LandigBentoGridProps) {
  const showCount = count != null && count >= 0

  const content = (
    <>
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
    </>
  )

  const baseClass = cn(
    'mb-4 block break-inside-avoid',
    'rounded-xl border bg-neutral-50 p-2 shadow-md ring-1 ring-gray-200 dark:border-neutral-700 dark:bg-neutral-800/60 dark:ring-neutral-600',
    'transition-shadow hover:shadow-lg hover:ring-gray-300 motion-reduce:transition-none dark:hover:ring-neutral-500',
    className,
  )

  if (href) {
    return (
      <Link
        href={href}
        data-category={id}
        aria-label={title}
        className={cn(baseClass, 'focus-visible:outline-2 focus-visible:outline-ring')}
      >
        {content}
      </Link>
    )
  }

  return (
    <article data-category={id} className={baseClass}>
      {content}
    </article>
  )
}
