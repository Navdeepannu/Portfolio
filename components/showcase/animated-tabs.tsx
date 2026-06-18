'use client'

import { AnimatedTabs, type AnimatedTabItem } from '@/components/ui/components/animated-tabs'

function TabContent({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string
  description: string
  image: string
  imageAlt: string
}) {
  return (
    <div className="grid min-h-65 gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {description}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-muted shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} className="aspect-16/10 w-full object-cover" />
      </div>
    </div>
  )
}

const TABS: AnimatedTabItem[] = [
  {
    value: 'workspace',
    label: 'Workspace',
    content: (
      <TabContent
        title="One workspace for everything"
        description="Bring docs, tasks, and discussions together so your team always has a single source of truth."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
        imageAlt="A bright, organized office workspace"
      />
    ),
  },
  {
    value: 'analytics',
    label: 'Analytics',
    content: (
      <TabContent
        title="Insights that drive decisions"
        description="Track the metrics that matter with real-time dashboards and clear, actionable reporting."
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
        imageAlt="An analytics dashboard on a screen"
      />
    ),
  },
  {
    value: 'team',
    label: 'Team',
    content: (
      <TabContent
        title="Built for collaboration"
        description="Invite teammates, assign roles, and keep everyone aligned with shared context and updates."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
        imageAlt="A team collaborating around a laptop"
      />
    ),
  },
  {
    value: 'automation',
    label: 'Automation',
    content: (
      <TabContent
        title="Automate the busywork"
        description="Set up rules and workflows that handle repetitive tasks so your team can focus on what counts."
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Close-up of a circuit board"
      />
    ),
  },
]

export default function AnimatedTabsShowcase() {
  return <AnimatedTabs items={TABS} defaultValue="workspace" />
}
