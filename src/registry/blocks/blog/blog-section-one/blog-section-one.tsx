import type { ComponentProps } from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export type WritingArchiveItem = {
  title: string
  href: string
  date: string
  dateTime: string
  description?: string
  category?: string
  readingTime?: string
}

export type WritingArchiveGroup = {
  year: string
  items: readonly WritingArchiveItem[]
}

export type BlogSectionSixContent = {
  eyebrow: string
  heading: string
  description: string
}

export type BlogSectionSixProps = Omit<ComponentProps<'section'>, 'children' | 'content'> & {
  content?: BlogSectionSixContent
  groups?: readonly WritingArchiveGroup[]
}

const defaultBlogContent: BlogSectionSixContent = {
  eyebrow: 'Writing archive',
  heading: 'Notes on building clearer products.',
  description:
    'Practical observations from product work, design reviews, releases, and the systems that support them.',
}

const defaultGroups: readonly WritingArchiveGroup[] = [
  {
    year: '2026',
    items: [
      {
        title: 'Designing interfaces with fewer decisions',
        href: '#fewer-decisions',
        date: 'Jul 18',
        dateTime: '2026-07-18',
        description:
          'A practical approach to removing choices that do not help someone move forward.',
        category: 'Design',
        readingTime: '6 min',
      },
      {
        title: 'Release notes are part of the product',
        href: '#release-notes',
        date: 'Jun 04',
        dateTime: '2026-06-04',
        description: 'How a small editorial system keeps customer communication close to the work.',
        category: 'Product',
        readingTime: '5 min',
      },
      {
        title: 'What changed in the workspace navigation',
        href: '#workspace-navigation',
        date: 'Apr 22',
        dateTime: '2026-04-22',
        category: 'Changelog',
        readingTime: '3 min',
      },
    ],
  },
  {
    year: '2025',
    items: [
      {
        title: 'A case for quieter project dashboards',
        href: '#quieter-dashboards',
        date: 'Nov 13',
        dateTime: '2025-11-13',
        description: 'Choosing a smaller set of signals made weekly planning easier to trust.',
        category: 'Case study',
        readingTime: '8 min',
      },
      {
        title: 'Documentation updates for version 2.4',
        href: '#documentation-24',
        date: 'Sep 08',
        dateTime: '2025-09-08',
        category: 'Documentation',
        readingTime: '4 min',
      },
    ],
  },
]

export default function BlogSectionOne({
  className,
  content = defaultBlogContent,
  groups = defaultGroups,
  ...props
}: BlogSectionSixProps) {
  return (
    <section
      data-slot="content-section-six"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-medium text-muted-foreground">{content.eyebrow}</p>
          <h2 className="mt-4 max-w-sm text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
            {content.description}
          </p>
        </header>

        <div className="space-y-12 sm:space-y-16">
          {groups.map((group) => {
            return (
              <section key={group.year} aria-label={`${group.year} archive entries`}>
                <div className="flex items-baseline justify-between gap-4 border-b pb-4">
                  <h3 className="text-lg font-semibold tracking-tight">{group.year}</h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {group.items.length} {group.items.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>

                <ol>
                  {group.items.map((item) => (
                    <li key={`${item.dateTime}-${item.title}`} className="border-b">
                      <article>
                        <a
                          href={item.href}
                          className="writing-row group grid min-h-24 grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-3 rounded-sm py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-start sm:gap-x-6 sm:py-6"
                          aria-label={`${item.title}, ${item.date}`}
                        >
                          <div className="min-w-0">
                            <h4 className="text-base font-medium tracking-tight sm:text-lg">
                              {item.title}
                            </h4>
                            {item.description ? (
                              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                {item.description}
                              </p>
                            ) : null}
                            {item.category || item.readingTime ? (
                              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                {item.category ? <span>{item.category}</span> : null}
                                {item.category && item.readingTime ? (
                                  <span aria-hidden="true">·</span>
                                ) : null}
                                {item.readingTime ? <span>{item.readingTime}</span> : null}
                              </p>
                            ) : null}
                          </div>

                          <time
                            dateTime={item.dateTime}
                            className="font-mono text-xs whitespace-nowrap text-muted-foreground tabular-nums sm:pt-1"
                          >
                            {item.date}
                          </time>

                          <ArrowRight
                            aria-hidden="true"
                            className="writing-arrow col-start-2 row-start-2 size-4 justify-self-end text-muted-foreground transition-transform duration-150 motion-reduce:transition-none sm:col-start-3 sm:row-start-1 sm:mt-0.5"
                          />
                        </a>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      </div>
    </section>
  )
}
