import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Blocks, Code2, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { LandingSection } from '@/site/portfolio/landing-section'
import { landingPageContent } from '@/site/portfolio/landing-page-content'

const capabilityIcons: Record<
  (typeof landingPageContent.capabilities)[number]['icon'],
  LucideIcon
> = {
  interface: Code2,
  systems: Blocks,
  foundations: Rocket,
}

export function CapabilitiesSection() {
  return (
    <LandingSection id="capabilities" label="Capabilities">
      <dl className="grid max-w-4xl gap-x-10 gap-y-12 md:grid-cols-3 md:gap-y-10">
        {landingPageContent.capabilities.map((capability) => {
          const Icon = capabilityIcons[capability.icon]

          return (
            <div key={capability.title} className="min-w-0">
              <dt className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground shadow-xs ring-1 ring-border dark:ring-ring">
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                </span>
                {capability.title}
              </dt>

              <dd className="mt-4 text-sm leading-6 text-muted-foreground">
                <p>{capability.description}</p>

                {capability.preview ? (
                  <Link
                    href={capability.preview.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${capability.preview.label} (opens in a new tab)`}
                    className="group mt-5 inline-flex max-w-full items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground active:scale-[0.98]"
                  >
                    <span className="relative aspect-4/3 w-20 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/80">
                      <Image
                        src={capability.preview.src}
                        alt={capability.preview.alt}
                        fill
                        sizes="80px"
                        className="object-cover object-top transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </span>
                    <span className="min-w-0 text-xs font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                      <span className="border-b border-dotted border-current/55 pb-px">
                        {capability.preview.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-0.5 inline size-3 align-[-0.1em]"
                      />
                    </span>
                  </Link>
                ) : null}

                <p className="mt-4 text-foreground/75">{capability.tools}</p>
              </dd>
            </div>
          )
        })}
      </dl>
    </LandingSection>
  )
}
