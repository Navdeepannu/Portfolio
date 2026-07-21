import type { ComponentProps } from 'react'
import { ArrowUpRight, Quote } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export type BusinessMetric = {
  value: string
  label: string
  detail?: string
}

export type StatsSectionOneProps = ComponentProps<'section'> & {
  eyebrow?: string
  heading?: string
  description?: string
  metrics?: readonly BusinessMetric[]
  quote?: string
  quoteAuthor?: string
  quoteRole?: string
  action?: { label: string; href: string }
}

const defaultMetrics: readonly BusinessMetric[] = [
  { value: '38%', label: 'faster delivery', detail: 'Across the first 90 days' },
  { value: '3.2×', label: 'return on spend', detail: 'Measured over one year' },
  { value: '18 hrs', label: 'saved each week', detail: 'Per operations team' },
  { value: '99.9%', label: 'workflow uptime', detail: 'Across all workspaces' },
]

export function StatsSectionOne({
  className,
  eyebrow = 'Measured impact',
  heading = 'Results that stand up in the next leadership meeting',
  description = 'Connect the work to outcomes with a section built for case studies, service results, and product proof.',
  metrics = defaultMetrics,
  quote = 'We moved from scattered updates to one operating rhythm. The team is faster, and leadership finally has a clear view of progress.',
  quoteAuthor = 'Maya Chen',
  quoteRole = 'VP of Operations, Northstar',
  action = { label: 'Read the case study', href: '#case-study' },
  ...props
}: StatsSectionOneProps) {
  return (
    <section
      data-slot="stats-section-one"
      className={cn('bg-muted/30 py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <Badge variant="outline" className="bg-background">
              {eyebrow}
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {heading}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="justify-between">
            <CardHeader>
              <Quote aria-hidden className="size-8 text-primary" />
              <CardTitle className="mt-5 text-xl leading-8 font-medium sm:text-2xl">
                “{quote}”
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-end justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{quoteAuthor}</p>
                <p className="mt-1 text-sm text-muted-foreground">{quoteRole}</p>
              </div>
              <Button asChild variant="outline" size="icon-lg" aria-label={action.label}>
                <a href={action.href}>
                  <ArrowUpRight aria-hidden />
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="py-0">
            <CardContent className="grid h-full p-0 sm:grid-cols-2">
              {metrics.map((metric, index) => (
                <div
                  key={`${metric.value}-${metric.label}`}
                  className={cn(
                    'p-6 sm:p-8',
                    index % 2 === 0 && 'sm:border-r sm:border-border',
                    index < 2 && 'border-b border-border',
                  )}
                >
                  <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 font-medium">{metric.label}</p>
                  {metric.detail ? (
                    <>
                      <Separator className="my-4 w-10" />
                      <p className="text-sm text-muted-foreground">{metric.detail}</p>
                    </>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default StatsSectionOne
