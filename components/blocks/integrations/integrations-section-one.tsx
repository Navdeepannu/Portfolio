import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { IntegrationOrbitIllustration } from '@/components/illustrations/integration-orbit'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type IntegrationsSectionOneProps = ComponentProps<'section'> & {
  eyebrow?: string
  heading?: string
  description?: string
  benefits?: readonly string[]
  integrations?: readonly string[]
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  illustration?: ReactNode
}

const defaultBenefits = [
  'Connect tools without changing your workflow',
  'Keep customer and operational data in sync',
  'Use webhooks and an API for custom systems',
] as const

const defaultIntegrations = ['Messaging', 'CRM', 'Billing', 'Analytics', 'Email', 'Data warehouse']

export function IntegrationsSectionOne({
  className,
  eyebrow = 'Connected by design',
  heading = 'Bring every tool your team relies on into one workflow',
  description = 'Launch with the integrations you already use, then extend the platform as your stack evolves.',
  benefits = defaultBenefits,
  integrations = defaultIntegrations,
  primaryAction = { label: 'Explore integrations', href: '#integrations' },
  secondaryAction = { label: 'Read API docs', href: '#api' },
  illustration = <IntegrationOrbitIllustration />,
  ...props
}: IntegrationsSectionOneProps) {
  return (
    <section
      data-slot="integrations-section-one"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18">
        <div>
          <Badge variant="outline">{eyebrow}</Badge>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight aria-hidden data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={secondaryAction.href}>{secondaryAction.label}</a>
            </Button>
          </div>
        </div>

        <Card className="relative py-0">
          <CardContent className="p-5 sm:p-8">
            {illustration}
            <div className="mt-3 flex flex-wrap justify-center gap-2 border-t border-border pt-5">
              {integrations.map((integration) => (
                <Badge key={integration} variant="secondary">
                  {integration}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default IntegrationsSectionOne
