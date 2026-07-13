import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export type LandigBentoGridProps = {
  imageLight: string
  imageDark: string
  imageWidth: number
  imageHeight: number
  title: string
  count: number
  countLabel?: string
  id: string
  className?: string
  href?: string
}

export function LandingBentoGrid({
  imageLight,
  imageDark,
  imageWidth,
  imageHeight,
  id,
  title,
  count,
  countLabel = 'blocks',
  className,
  href,
}: LandigBentoGridProps) {
  const content = (
    <>
      <div className="relative w-full overflow-hidden rounded-lg bg-card ring-1 ring-foreground/6.5">
        <Image
          src={imageLight}
          alt={`${title} category preview`}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-full object-cover dark:hidden"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <Image
          src={imageDark}
          alt={`${title} category preview`}
          width={imageWidth}
          height={imageHeight}
          className="hidden h-auto w-full object-cover dark:block"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="px-1 pt-2">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">
          {count} {countLabel}
        </p>
      </div>
    </>
  )

  const baseClass = cn(
    'mb-4 block break-inside-avoid',
    'rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5',
    'transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none',
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
