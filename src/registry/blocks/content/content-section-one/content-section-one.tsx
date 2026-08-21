'use client'

import type { ComponentType } from 'react'

import { DesignedForFocusIllustration } from '@/components/illustrations/DesignedForFocusIllustration'
import { FastByDefaultIllustration } from '@/components/illustrations/FastByDefaultIllustration'
import { FlexibleAtScaleIllustration } from '@/components/illustrations/FlexibleAtScaleIllustration'

type Principle = {
  title: string
  description: string
  illustration: ComponentType
}

const principles: readonly Principle[] = [
  {
    title: 'Fast by default',
    description: 'Common actions stay immediate, predictable, and close to where work happens.',
    illustration: FastByDefaultIllustration,
  },
  {
    title: 'Designed for focus',
    description: 'Clear hierarchy and restrained interfaces keep attention on the current task.',
    illustration: DesignedForFocusIllustration,
  },
  {
    title: 'Flexible at scale',
    description: 'Start with simple workflows and add structure as your product and team evolve.',
    illustration: FlexibleAtScaleIllustration,
  },
]

export default function ContentSectionOne() {
  return (
    <section className="overflow-hidden py-16 text-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-8 pb-12 md:grid-cols-[1fr_0.7fr] md:items-end md:border-b">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tighter text-balance sm:text-4xl lg:text-5xl">
            Software should remove friction, not create more of it.
          </h2>

          <p className="max-w-md text-base leading-7 text-muted-foreground md:justify-self-end">
            Every interaction is designed to make complex workflows feel direct, calm, and
            understandable.
          </p>
        </div>

        <div className="-mx-5 [scrollbar-width:none] overflow-x-auto px-5 pt-8 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:overflow-visible md:px-0 md:pt-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-4 md:grid md:w-full md:grid-cols-3 md:gap-0 md:border-b">
            {principles.map((principle, index) => {
              const Illustration = principle.illustration

              return (
                <article
                  key={principle.title}
                  className={[
                    'w-[min(82vw,20rem)] shrink-0 rounded-lg border bg-card',
                    'md:w-auto md:rounded-none md:border-0 md:bg-transparent',
                    index > 0 ? 'md:border-l' : '',
                  ].join(' ')}
                >
                  <div className="relative flex min-h-52 items-center justify-center overflow-hidden">
                    <Illustration />

                    <span className="absolute top-5 right-5 font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="p-6 md:px-7 md:py-8">
                    <h3 className="text-lg font-medium tracking-tight">{principle.title}</h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
