import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

import { DeliveryPipelineIllustration } from '@/components/illustrations/delivery-pipeline'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type ProcessStep = {
  title: string
  description: string
}

export type ProcessSectionOneProps = ComponentProps<'section'> & {
  eyebrow?: string
  heading?: string
  description?: string
  steps?: readonly ProcessStep[]
  action?: { label: string; href: string }
  illustration?: ReactNode
}

const defaultSteps: readonly ProcessStep[] = [
  {
    title: 'Align on the outcome',
    description: 'We turn goals, constraints, and customer context into a focused delivery plan.',
  },
  {
    title: 'Build in visible sprints',
    description:
      'You see working progress every week and can shape decisions before they become costly.',
  },
  {
    title: 'Launch with confidence',
    description:
      'Quality checks, documentation, and handoff are part of delivery rather than an afterthought.',
  },
]

export function ProcessSectionOne({
  className,
  eyebrow = 'How we work',
  heading = 'A clear path from the first conversation to a confident launch',
  description = 'A practical delivery model for service teams, studios, and product partners that keeps clients close to the work.',
  steps = defaultSteps,
  action = { label: 'Plan a project', href: '#contact' },
  illustration = <DeliveryPipelineIllustration />,
  ...props
}: ProcessSectionOneProps) {
  return (
    <section
      data-slot="process-section-one"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Badge variant="outline">{eyebrow}</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href={action.href}>
                {action.label}
                <ArrowRight aria-hidden data-icon="inline-end" />
              </a>
            </Button>
          </div>

          <div className="space-y-5">
            <Card className="py-0">
              <CardContent className="p-4 sm:p-8">{illustration}</CardContent>
            </Card>

            <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-4 bg-card p-5 sm:grid-cols-[auto_1fr] sm:p-6"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSectionOne
