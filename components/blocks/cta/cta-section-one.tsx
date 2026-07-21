import type { ComponentProps } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ctaSectionOneData = {
  heading: 'Build your next product with confidence.',
  description:
    'Start building today or talk with our team to find the right plan for your business.',
  primaryAction: {
    label: 'Get started',
    href: '/get-started',
  },
  secondaryAction: {
    label: 'Contact sales',
    href: '/contact',
  },
}

type CtaSectionOneProps = ComponentProps<'section'>

export function CtaSectionOne({ className, ...props }: CtaSectionOneProps) {
  return (
    <section
      data-slot="cta-section-one"
      className={cn('bg-background px-4 py-20 sm:px-6 sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl border bg-card px-6 py-16 text-center shadow-xl shadow-foreground/5 sm:px-12 sm:py-20">
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              {ctaSectionOneData.heading}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-balance text-muted-foreground sm:text-lg">
              {ctaSectionOneData.description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={ctaSectionOneData.primaryAction.href}>
                  {ctaSectionOneData.primaryAction.label}
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full bg-background/70 shadow-sm backdrop-blur-sm sm:w-auto"
              >
                <Link href={ctaSectionOneData.secondaryAction.href}>
                  {ctaSectionOneData.secondaryAction.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSectionOne
