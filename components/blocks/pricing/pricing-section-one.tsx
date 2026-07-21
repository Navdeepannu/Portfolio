'use client'

import type { ComponentProps } from 'react'
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export type PricingInterval = 'monthly' | 'yearly'

export type PricingPlan = {
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

export type PricingSectionOneProps = ComponentProps<'section'> & {
  eyebrow?: string
  heading?: string
  description?: string
  plans?: readonly PricingPlan[]
  defaultInterval?: PricingInterval
  monthlyLabel?: string
  yearlyLabel?: string
  yearlyNote?: string
}

const defaultPlans: readonly PricingPlan[] = [
  {
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

function PricingCard({ interval, plan }: { interval: PricingInterval; plan: PricingPlan }) {
  const price = interval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice

  return (
    <Card
      className={cn('relative h-full gap-0 py-0', plan.featured && 'shadow-lg ring-2 ring-primary')}
    >
      <CardHeader className="gap-4 px-6 pt-6 pb-5">
        <div className="flex min-h-5 items-center justify-between gap-3">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          {plan.badge ? (
            <Badge variant={plan.featured ? 'default' : 'secondary'}>
              <Sparkles aria-hidden data-icon="inline-start" />
              {plan.badge}
            </Badge>
          ) : null}
        </div>
        <CardDescription className="min-h-12 leading-6">{plan.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col border-t border-border px-6 py-6">
        <div className="flex min-h-14 items-end gap-1">
          <span className="text-4xl font-semibold tracking-tight text-foreground">{price}</span>
          {price !== 'Custom' ? (
            <span className="pb-1 text-sm text-muted-foreground">{plan.priceSuffix}</span>
          ) : null}
        </div>

        <ul className="mt-7 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Check aria-hidden className="size-3" />
              </span>
              <span className="leading-5">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="border-t-0 bg-transparent px-6 py-6">
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
          <Badge variant="outline">{eyebrow}</Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
        </div>

        <Tabs
          value={interval}
          onValueChange={(value) => setInterval(value as PricingInterval)}
          className="mt-8 items-center sm:mt-10"
        >
          <TabsList aria-label="Billing interval" className="p-1">
            <TabsTrigger value="monthly">{monthlyLabel}</TabsTrigger>
            <TabsTrigger value="yearly" className="gap-2">
              {yearlyLabel}
              <span className="text-xs text-primary">{yearlyNote}</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 grid w-full gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} interval={interval} />
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export default PricingSectionOne
