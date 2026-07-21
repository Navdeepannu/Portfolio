'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsViewport,
} from '@/components/ui/components/animated-tabs'
import { cn } from '@/lib/utils'

const IMAGES = {
  discovery: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN',
  automation: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl2qccwOLmnCKEMaPSHlkN9mY0IgJTt8dwQzFb',
  optimization: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlBE1JQ6bM0rCoZtdKDAVO8yw7eSuvUb1LhYIJ',
}

type AgentFlowPanelProps = {
  title: string
  description: string
  image: string
  imageAlt: string
}

function AgentFlowPanel({ title, description, image, imageAlt }: AgentFlowPanelProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        'min-h-95 rounded-md bg-muted/30 p-6 font-geist',
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 opacity-50',
          'bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]',
          'bg-size-[90px_90px]',
        )}
      />

      <div className="relative z-10 grid min-h-80 items-center gap-8 md:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-xl">
          <h3 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h3>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{description}</p>

          <Button
            variant="default"
            size="lg"
            className="mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm"
          >
            Explore workflow
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>

        <div className="relative min-h-65">
          <div
            className={cn(
              'absolute top-1/2 right-[-28%] w-[105%] -translate-y-1/2',
              'rounded-2xl bg-background/70 p-2 shadow-2xl backdrop-blur-md',
              'sm:right-[-18%] md:right-[-22%]',
            )}
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={image}
                alt={imageAlt}
                className="h-61.25 w-full object-cover object-left md:h-78.75"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  {
    value: 'discover',
    label: 'Discover',
    title: 'Understand the goal before work starts.',
    description:
      'The agent reads the request, studies the context, and turns scattered ideas into a clear direction your team can actually execute.',
    image: IMAGES.discovery,
    imageAlt: 'AI discovery workflow interface',
  },
  {
    value: 'automate',
    label: 'Automate',
    title: 'Automate the repetitive parts of the flow.',
    description:
      'Let the system handle the repeatable tasks, generate useful outputs, and keep the process moving without needing constant manual work.',
    image: IMAGES.automation,
    imageAlt: 'AI automation dashboard preview',
  },
  {
    value: 'optimize',
    label: 'Optimize',
    title: 'Refine everything until it is ready to ship.',
    description:
      'The agent reviews the output, improves weak areas, and helps turn the final result into something polished and production ready.',
    image: IMAGES.optimization,
    imageAlt: 'AI optimization interface preview',
  },
]

export default function AnimatedTabsShowcase() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <AnimatedTabs defaultValue="discover">
        <AnimatedTabsList className="grid min-w-max grid-cols-3 sm:min-w-0">
          {TABS.map((tab) => (
            <AnimatedTabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </AnimatedTabsTrigger>
          ))}
        </AnimatedTabsList>

        <AnimatedTabsViewport className="py-4">
          {TABS.map((tab) => (
            <AnimatedTabsContent key={tab.value} value={tab.value}>
              <AgentFlowPanel
                title={tab.title}
                description={tab.description}
                image={tab.image}
                imageAlt={tab.imageAlt}
              />
            </AnimatedTabsContent>
          ))}
        </AnimatedTabsViewport>
      </AnimatedTabs>
    </div>
  )
}
