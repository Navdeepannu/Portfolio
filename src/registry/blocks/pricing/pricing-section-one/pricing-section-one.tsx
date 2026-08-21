'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'
import { Check } from 'lucide-react'

import { AnimatedNumber } from '@/components/animated-numbers'
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

export type PricingValue = number | string

// Defines the content and configuration for each pricing plan.
export type PricingPlan = {
  id: string
  name: string
  description: string
  monthlyPrice: PricingValue
  yearlyPrice: PricingValue
  features: readonly string[]
  ctaLabel: string
  ctaHref: string
  prefix?: string
  priceSuffix?: string
  featured?: boolean
  badge?: string
}

// Controls the section heading content.
export type PricingSectionCopy = {
  eyebrow?: string
  heading: string
  description: string
}

// Controls the billing toggle labels.
export type PricingBillingCopy = {
  ariaLabel: string
  monthlyLabel: string
  yearlyLabel: string
  yearlyNote: string
}

export type PricingSectionOneProps = ComponentPropsWithoutRef<'section'> & {
  plans?: readonly PricingPlan[]
  defaultInterval?: PricingInterval
  copy?: Partial<PricingSectionCopy>
  billing?: Partial<PricingBillingCopy>
}

// Default section content.
const defaultCopy: PricingSectionCopy = {
  heading: 'Simple pricing for every stage',
  description:
    'Start for free, upgrade when you need more, or contact us for a plan tailored to your organization.',
}

// Default billing toggle content.
const defaultBilling: PricingBillingCopy = {
  ariaLabel: 'Choose billing interval',
  monthlyLabel: 'Monthly',
  yearlyLabel: 'Yearly',
  yearlyNote: 'Save 20%',
}

// Default pricing plans used when no custom plans are provided.
const defaultPlans: readonly PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals getting started with the essential tools.',
    prefix: '$',
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceSuffix: '/ month',
    features: ['1 workspace', 'Up to 3 projects', 'Basic analytics', 'Community support'],
    ctaLabel: 'Start free',
    ctaHref: '#get-started',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and growing teams that need more power and flexibility.',
    prefix: '$',
    monthlyPrice: 29,
    yearlyPrice: 23,
    priceSuffix: '/ month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Automations and integrations',
      'Custom branding',
      'Priority support',
    ],
    ctaLabel: 'Start 7-day free trial',
    ctaHref: '#get-started',
    featured: true,
    badge: 'Most popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations that need advanced security, support, and customization.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    features: [
      'Everything in Pro',
      'Unlimited workspaces',
      'Advanced permissions',
      'Single sign-on',
      'Dedicated support',
      'Custom contracts',
    ],
    ctaLabel: 'Talk to sales',
    ctaHref: '#contact-sales',
  },
]

type PricingCardProps = {
  interval: PricingInterval
  plan: PricingPlan
}

// Renders a single pricing plan.
function PricingCard({ interval, plan }: PricingCardProps) {
  // Select the price based on the active billing interval.
  const price = interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
  const isNumericPrice = typeof price === 'number'

  return (
    <Card
      className={cn(
        'relative flex h-full flex-col gap-0 overflow-visible py-0',
        plan.featured && 'border-primary/40 shadow-lg ring-1 shadow-primary/5 ring-primary/20',
      )}
    >
      {/* Optional plan badge. */}
      {plan.badge ? (
        <Badge
          variant={plan.featured ? 'default' : 'secondary'}
          className="absolute inset-x-0 -top-3 left-1/2 shrink-0 -translate-x-1/2 gap-1.5"
        >
          {plan.badge}
        </Badge>
      ) : null}

      {/* Plan name and description. */}
      <CardHeader className="gap-4 px-6 pt-6 pb-5">
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <CardDescription className="leading-6 text-balance">{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col border-t border-dashed px-6 py-6">
        <div aria-live="polite" aria-atomic="true" className="flex min-h-12 items-end gap-1.5">
          {isNumericPrice ? (
            <AnimatedNumber
              value={price}
              prefix={plan.prefix}
              className="text-4xl font-semibold tracking-tight text-foreground"
            />
          ) : (
            <span className="text-4xl font-semibold tracking-tight text-foreground">{price}</span>
          )}

          {isNumericPrice && plan.priceSuffix ? (
            <span className="pb-1 text-sm text-muted-foreground">{plan.priceSuffix}</span>
          ) : null}
        </div>

        {/* Included plan features. */}
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

      {/* Plan call to action. */}
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
  plans = defaultPlans,
  defaultInterval = 'monthly',
  copy,
  billing,
  ...props
}: PricingSectionOneProps) {
  // Tracks the active billing interval.
  const [interval, setInterval] = useState<PricingInterval>(defaultInterval)

  // Merge custom copy with the defaults.
  const resolvedCopy: PricingSectionCopy = {
    ...defaultCopy,
    ...copy,
  }

  // Merge custom billing labels with the defaults.
  const resolvedBilling: PricingBillingCopy = {
    ...defaultBilling,
    ...billing,
  }

  return (
    <section
      data-slot="pricing-section-one"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Section introduction. */}
        <div className="mx-auto max-w-2xl text-center">
          {resolvedCopy.eyebrow ? <Badge variant="outline">{resolvedCopy.eyebrow}</Badge> : null}

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {resolvedCopy.heading}
          </h2>

          {resolvedCopy.description ? (
            <p className="mt-4 text-base leading-7 text-balance text-muted-foreground sm:text-lg">
              {resolvedCopy.description}
            </p>
          ) : null}
        </div>

        {/* Monthly and yearly billing toggle. */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <div
            role="group"
            aria-label={resolvedBilling.ariaLabel}
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
              {resolvedBilling.monthlyLabel}
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
              <span>{resolvedBilling.yearlyLabel}</span>

              {resolvedBilling.yearlyNote ? (
                <span
                  className={cn(
                    'text-xs',
                    interval === 'yearly' ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {resolvedBilling.yearlyNote}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {/* Pricing plan grid. */}
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
