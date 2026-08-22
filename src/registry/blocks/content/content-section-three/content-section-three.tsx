'use client'

import type { ComponentProps } from 'react'
import { ArrowUpRight } from 'lucide-react'

import {
  defaultReleaseWorkflow,
  ReleaseWorkflowIllustration,
  type ContentSectionThreeWorkflow,
} from '@/components/illustrations/ReleaseWorkflowIllustration'
import { cn } from '@/lib/utils'

export type {
  ContentSectionThreeRelease,
  ContentSectionThreeWorkflow,
} from '@/components/illustrations/ReleaseWorkflowIllustration'

export type ContentSectionThreeContent = {
  eyebrow: string
  heading: string
  description: string
  link?: {
    label: string
    href: string
  }
}

export type ContentSectionThreeProps = Omit<ComponentProps<'section'>, 'children' | 'content'> & {
  content?: ContentSectionThreeContent
  workflow?: ContentSectionThreeWorkflow
  autoPlay?: boolean
  interval?: number
}

const defaultContent: ContentSectionThreeContent = {
  eyebrow: 'Release tracking',
  heading: 'Show exactly what shipped and where it landed.',
  description: 'Track every release with its status, environment, commit, and notes in one place.',
  link: {
    label: 'Browse release history',
    href: '#release-workflow',
  },
}

export function ContentSectionThree({
  className,
  content = defaultContent,
  workflow = defaultReleaseWorkflow,
  autoPlay = true,
  interval = 4000,
  ...props
}: ContentSectionThreeProps) {
  return (
    <section
      data-slot="content-section-three"
      className={cn(
        'relative overflow-hidden border-y bg-background py-20 text-foreground sm:py-28',
        className,
      )}
      {...props}
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] lg:gap-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">{content.eyebrow}</p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            {content.heading}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-balance text-muted-foreground">
            {content.description}
          </p>

          {content.link ? (
            <a
              href={content.link.href}
              className={cn(
                'mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-medium',
                'underline-offset-4 hover:underline',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
              )}
            >
              {content.link.label}

              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          ) : null}
        </div>

        <div className="w-full lg:justify-self-end">
          <ReleaseWorkflowIllustration
            workflow={workflow}
            autoPlay={autoPlay}
            interval={interval}
          />
        </div>
      </div>
    </section>
  )
}

export default ContentSectionThree
