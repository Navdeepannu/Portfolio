'use client'

import { Bot, Gauge, Sparkles } from 'lucide-react'

import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsViewport,
} from '@/components/ui/components/animated-tabs'

const tabs = [
  {
    value: 'discover',
    label: 'Discover',
    icon: Sparkles,
    title: 'Find the useful signal.',
    description: 'Turn scattered input into a focused plan before work begins.',
    metric: '12 insights',
  },
  {
    value: 'automate',
    label: 'Automate',
    icon: Bot,
    title: 'Move routine work forward.',
    description: 'Build repeatable flows without hiding what the system is doing.',
    metric: '8 workflows',
  },
  {
    value: 'measure',
    label: 'Measure',
    icon: Gauge,
    title: 'See what improved.',
    description: 'Compare outcomes with a small, decision-ready performance view.',
    metric: '+24% velocity',
  },
] as const

export default function AnimatedTabsGalleryPreview() {
  return (
    <AnimatedTabs defaultValue="discover" className="w-full max-w-xl px-4 sm:px-6">
      <AnimatedTabsList className="grid grid-cols-3">
        {tabs.map((tab) => (
          <AnimatedTabsTrigger
            key={tab.value}
            value={tab.value}
            className="px-2 text-xs sm:text-sm"
          >
            {tab.label}
          </AnimatedTabsTrigger>
        ))}
      </AnimatedTabsList>

      <AnimatedTabsViewport className="pt-3">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <AnimatedTabsContent key={tab.value} value={tab.value}>
              <div className="grid min-h-56 content-between rounded-xl border bg-background p-5 shadow-xs sm:min-h-64 sm:p-6">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
                    {tab.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    {tab.description}
                  </p>
                </div>
                <p className="mt-6 font-mono text-xs text-muted-foreground">{tab.metric}</p>
              </div>
            </AnimatedTabsContent>
          )
        })}
      </AnimatedTabsViewport>
    </AnimatedTabs>
  )
}
