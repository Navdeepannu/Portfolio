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
    description: 'Turn scattered input into a focused plan.',
    metric: '12 insights',
  },
  {
    value: 'automate',
    label: 'Automate',
    icon: Bot,
    title: 'Move routine work forward.',
    description: 'Build repeatable flows with visible progress.',
    metric: '8 workflows',
  },
  {
    value: 'measure',
    label: 'Measure',
    icon: Gauge,
    title: 'See what improved.',
    description: 'Compare outcomes in one focused view.',
    metric: '+24% velocity',
  },
] as const

export default function AnimatedTabsGalleryPreview() {
  return (
    <AnimatedTabs defaultValue="discover" className="w-full max-w-xl px-1 sm:px-3">
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

      <AnimatedTabsViewport className="pt-2.5">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <AnimatedTabsContent key={tab.value} value={tab.value}>
              <div className="grid min-h-40 content-between rounded-xl border bg-background p-4 shadow-xs sm:min-h-44">
                <div>
                  <span className="grid size-8 place-items-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight sm:text-lg">
                    {tab.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-xs leading-5 text-muted-foreground sm:text-sm">
                    {tab.description}
                  </p>
                </div>
                <p className="mt-4 font-mono text-[11px] text-muted-foreground">{tab.metric}</p>
              </div>
            </AnimatedTabsContent>
          )
        })}
      </AnimatedTabsViewport>
    </AnimatedTabs>
  )
}
