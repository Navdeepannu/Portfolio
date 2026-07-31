import type { ComponentProps } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ContentSectionTwoContent = {
  eyebrow: string
  heading: string
  supportingHeading: string
  paragraphs: readonly string[]
  link?: {
    label: string
    href: string
  }
}

export type ContentSectionTwoMedia = {
  src: string
  alt: string
  caption?: string
  metadata?: string
}

export type ContentSectionTwoProps = Omit<ComponentProps<'section'>, 'children' | 'content'> & {
  content?: ContentSectionTwoContent
  media?: ContentSectionTwoMedia
}

const defaultContent: ContentSectionTwoContent = {
  eyebrow: 'Designed for focus',
  heading: 'The best tools stay out of your way.',
  supportingHeading:
    'Great software makes complex work feel clear without hiding the details that matter.',
  paragraphs: [
    'Every screen should have a clear purpose. Actions appear where people need them, navigation remains predictable, and important information stays easy to scan.',
    'Instead of adding more controls, we remove unnecessary decisions so people spend less time figuring out the interface.',
  ],
  link: {
    label: 'Read our design principles',
    href: '#principles',
  },
}

const defaultMedia: ContentSectionTwoMedia = {
  src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlHGWyumqHjv3VPCtBSMksEJOn7pmfxyc9IoU5',
  alt: 'A focused product workspace with navigation, project metrics, and activity insights',
  caption: 'One workspace keeps the important context visible without competing for attention.',
  metadata: 'Product system · 2026',
}

export function ContentSectionTwo({
  className,
  content = defaultContent,
  media = defaultMedia,
  ...props
}: ContentSectionTwoProps) {
  return (
    <section
      data-slot="content-section-two"
      className={cn('bg-background py-20 text-foreground selection:bg-muted sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <header>
            <p className="text-xs font-medium text-muted-foreground">{content.eyebrow}</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
              {content.heading}
            </h2>
          </header>

          <div className="max-w-2xl">
            <p className="text-xl leading-8 font-medium tracking-tight text-pretty sm:text-2xl sm:leading-9">
              {content.supportingHeading}
            </p>

            <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {content.link ? (
              <a
                href={content.link.href}
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {content.link.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <figure className="mt-12 sm:mt-16">
          <div className="aspect-4/3 rounded-xl bg-muted p-1 shadow-sm ring-1 shadow-black/5 ring-black/5 sm:aspect-video dark:shadow-black/20 dark:ring-white/10">
            <div className="relative size-full overflow-hidden rounded-lg">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                className="object-cover"
                sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 64px), 1152px"
              />
            </div>
          </div>

          {media.caption || media.metadata ? (
            <figcaption className="mt-3 flex flex-col gap-1 text-sm leading-6 text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              {media.caption ? <span className="max-w-2xl">{media.caption}</span> : <span />}
              {media.metadata ? (
                <span className="shrink-0 font-mono text-xs tracking-tight">{media.metadata}</span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  )
}

export default ContentSectionTwo
