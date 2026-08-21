'use client'

import { useId, type ComponentProps } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { BookOpen, Check, FileText, GitBranch, Megaphone } from 'lucide-react'

import { RevisionCyclesIllustration } from '@/components/illustrations/RevisionCyclesIllustration'
import { cn } from '@/lib/utils'

export type ContentSectionFourContent = {
  eyebrow: string
  heading: string
  description: string
}

export type ContentSectionFourMetric = {
  value: string
  label: string
}

export type ContentSectionFourProps = Omit<ComponentProps<'section'>, 'children' | 'content'> & {
  content?: ContentSectionFourContent
  metric?: ContentSectionFourMetric
  outputs?: readonly string[]
}

const defaultContent: ContentSectionFourContent = {
  eyebrow: 'Connected publishing',
  heading: 'Turn one approved decision into every update.',
  description: 'Keep every audience update synced to the same approved source.',
}

const defaultMetric: ContentSectionFourMetric = {
  value: '42%',
  label: 'fewer revision rounds',
}

const defaultOutputs = ['Internal brief', 'Customer update', 'Documentation'] as const

const outputIcons = [FileText, Megaphone, BookOpen] as const

const trendMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May'] as const

function RevisionMetricCard({ value, label }: ContentSectionFourMetric) {
  const shouldReduceMotion = useReducedMotion()
  const clipPathId = useId().replace(/:/g, '')

  const trendPath =
    'M-12 18 C38 18 54 34 100 33 C150 32 165 55 210 51 C258 47 278 74 322 70 C370 66 392 94 452 97'

  const areaPath = `${trendPath} L452 112 L-12 112 Z`

  return (
    <article className="flex min-h-64 flex-col overflow-hidden border-b lg:col-start-1 lg:row-start-1 lg:border-r">
      <div className="p-6 pb-2 sm:p-7 sm:pb-2">
        <dl>
          <dd className="text-5xl font-semibold tracking-tighter sm:text-6xl">{value}</dd>

          <dt className="mt-2 max-w-40 text-sm leading-6 text-muted-foreground">{label}</dt>
        </dl>
      </div>

      <div className="relative mt-auto px-6 pt-3 pb-6 sm:px-7">
        <div className="w-full">
          <svg
            aria-hidden="true"
            viewBox="0 0 440 112"
            preserveAspectRatio="xMidYMid meet"
            className="aspect-55/14 w-full overflow-visible"
          >
            <defs>
              <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
                <motion.rect
                  x="-20"
                  y="0"
                  height="112"
                  initial={{
                    width: shouldReduceMotion ? 480 : 0,
                  }}
                  whileInView={{
                    width: 480,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.6,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 2.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </clipPath>
            </defs>

            <path
              d="M0 20 H440"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border/60"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M0 58 H440"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border/40"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M0 97 H440"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border/60"
              vectorEffect="non-scaling-stroke"
            />

            <g clipPath={`url(#${clipPathId})`}>
              <path d={areaPath} fill="rgb(239 68 68)" fillOpacity="0.08" />

              <path
                d={trendPath}
                fill="none"
                stroke="rgb(239 68 68)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              <circle cx="452" cy="97" r="3.5" fill="rgb(239 68 68)" />
            </g>
          </svg>

          <div
            aria-hidden="true"
            className="mt-2 grid grid-cols-5 font-mono text-[9px] text-muted-foreground"
          >
            {trendMonths.map((month, index) => (
              <span
                key={month}
                className={cn(
                  index === 0 && 'text-left',
                  index > 0 && index < trendMonths.length - 1 && 'text-center',
                  index === trendMonths.length - 1 && 'text-right',
                )}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function PublishingOutputsCard({ outputs }: { outputs: readonly string[] }) {
  const normalizedOutputs = defaultOutputs.map(
    (fallbackOutput, index) => outputs[index] ?? fallbackOutput,
  )

  return (
    <article className="flex min-h-64 flex-col lg:col-start-1 lg:row-start-2 lg:border-r">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <GitBranch aria-hidden="true" className="size-3.5 text-muted-foreground" />

          <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Publish once
          </span>
        </div>

        <span className="text-[10px] text-muted-foreground">3 outputs</span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="max-w-xs text-sm leading-6 text-muted-foreground">
          Keep every audience-facing update connected to the same approved source.
        </p>

        <div className="mt-5 divide-y border-y">
          {normalizedOutputs.map((output, index) => {
            const Icon = outputIcons[index]

            return (
              <div key={output} className="group flex items-center gap-3 py-3">
                <Icon
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                />

                <span className="text-xs font-medium">{output}</span>

                <Check
                  aria-hidden="true"
                  className="ml-auto size-3 text-muted-foreground transition-colors group-hover:text-foreground"
                />
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}

export default function ContentSectionFour({
  className,
  content = defaultContent,
  metric = defaultMetric,
  outputs = defaultOutputs,
  ...props
}: ContentSectionFourProps) {
  return (
    <section
      data-slot="content-section-four"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(18rem,0.55fr)] lg:items-end">
          <header>
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
              {content.eyebrow}
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {content.heading}
            </h2>
          </header>

          <p className="max-w-lg text-left text-base leading-7 text-muted-foreground lg:justify-self-end">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid rounded-lg border lg:grid-cols-[42fr_58fr] lg:grid-rows-2">
          <RevisionCyclesIllustration />

          <RevisionMetricCard value={metric.value} label={metric.label} />

          <PublishingOutputsCard outputs={outputs} />
        </div>
      </div>
    </section>
  )
}
