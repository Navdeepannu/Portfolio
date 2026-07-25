'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type PricingInterval = 'monthly' | 'yearly'

export type PricingPlan = {
  id: string
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  priceSuffix?: string
  features: readonly string[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  badge?: string
}

export type PricingSectionOneProps = ComponentPropsWithoutRef<'section'> & {
  eyebrow?: string
  heading?: string
  description?: string
  plans?: readonly PricingPlan[]
  defaultInterval?: PricingInterval
  billingIntervalLabel?: string
  monthlyLabel?: string
  yearlyLabel?: string
  yearlyNote?: string
}

const defaultPlans: readonly PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small teams organizing their first repeatable workflow.',
    monthlyPrice: '$19',
    yearlyPrice: '$15',
    priceSuffix: '/ seat',
    features: ['3 active projects', 'Core automations', 'Email support', 'Unlimited guests'],
    ctaLabel: 'Start free',
    ctaHref: '#get-started',
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For growing teams that need control, reporting, and faster execution.',
    monthlyPrice: '$49',
    yearlyPrice: '$39',
    priceSuffix: '/ seat',
    features: [
      'Unlimited projects',
      'Advanced automations',
      'Custom reporting',
      'Priority support',
      'Role-based access',
    ],
    ctaLabel: 'Start 14-day trial',
    ctaHref: '#get-started',
    featured: true,
    badge: 'Most popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with security, procurement, and support requirements.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    features: [
      'Everything in Scale',
      'SAML and SCIM',
      'Audit logs',
      'Dedicated success manager',
      'Custom legal terms',
    ],
    ctaLabel: 'Talk to sales',
    ctaHref: '#contact-sales',
  },
]

type PricingCardProps = {
  interval: PricingInterval
  plan: PricingPlan
}

function PricingCard({ interval, plan }: PricingCardProps) {
  const price = interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice

  const hasNumericPrice = price !== 'Custom'

  return (
    <Card
      className={cn(
        'relative flex h-full flex-col gap-0 overflow-hidden py-0',
        plan.featured && 'border-primary/40 shadow-lg ring-1 shadow-primary/5 ring-primary/20',
      )}
    >
      <CardHeader className="gap-4 px-6 pt-6 pb-5">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{plan.name}</CardTitle>

          {plan.badge ? (
            <Badge variant={plan.featured ? 'default' : 'secondary'} className="shrink-0 gap-1.5">
              <Sparkles aria-hidden="true" className="size-3" />
              {plan.badge}
            </Badge>
          ) : null}
        </div>

        <CardDescription className="leading-6">{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col border-t px-6 py-6">
        <div aria-live="polite" aria-atomic="true" className="flex min-h-12 items-end gap-1.5">
          <span className="text-4xl font-semibold tracking-tight text-foreground">{price}</span>

          {hasNumericPrice && plan.priceSuffix ? (
            <span className="pb-1 text-sm text-muted-foreground">{plan.priceSuffix}</span>
          ) : null}
        </div>

        <ul className="mt-7 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
              >
                <Check className="size-3" />
              </span>

              <span className="leading-5">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto px-6 py-6">
        <Button
          asChild
          variant={plan.featured ? 'default' : 'outline'}
          size="lg"
          className="w-full"
        >
          <a href={plan.ctaHref}>{plan.ctaLabel}</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function PricingSectionOne({
  className,
  eyebrow = 'Simple pricing',
  heading = 'Choose the plan that fits how your team works',
  description = 'Start small, upgrade when you need to, and keep every core workflow included.',
  plans = defaultPlans,
  defaultInterval = 'monthly',
  billingIntervalLabel = 'Choose billing interval',
  monthlyLabel = 'Monthly',
  yearlyLabel = 'Yearly',
  yearlyNote = 'Save 20%',
  ...props
}: PricingSectionOneProps) {
  const [interval, setInterval] = useState<PricingInterval>(defaultInterval)

  return (
    <section
      data-slot="pricing-section-one"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow ? <Badge variant="outline">{eyebrow}</Badge> : null}

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {heading}
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <div
            role="group"
            aria-label={billingIntervalLabel}
            className="inline-flex rounded-lg bg-muted p-1"
          >
            <button
              type="button"
              aria-pressed={interval === 'monthly'}
              onClick={() => setInterval('monthly')}
              className={cn(
                'inline-flex min-h-9 items-center justify-center rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground',
                'transition-[background-color,color,box-shadow] duration-150',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                interval === 'monthly' && 'bg-background text-foreground shadow-sm',
              )}
            >
              {monthlyLabel}
            </button>

            <button
              type="button"
              aria-pressed={interval === 'yearly'}
              onClick={() => setInterval('yearly')}
              className={cn(
                'inline-flex min-h-9 items-center justify-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground',
                'transition-[background-color,color,box-shadow] duration-150',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
                interval === 'yearly' && 'bg-background text-foreground shadow-sm',
              )}
            >
              <span>{yearlyLabel}</span>

              {yearlyNote ? (
                <span
                  className={cn(
                    'text-xs',
                    interval === 'yearly' ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {yearlyNote}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="mt-8 grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} interval={interval} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSectionOne
