import { AnimatedTabs } from '@/components/ui/components/animated-tabs'

const tabs = [
  {
    value: 'workspace',
    label: 'Workspace',
    content: (
      <TabContent
        title="Create a focused workspace."
        description="A clean layout for showing how your product helps people stay organized and productive."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
        imageAlt="Modern workspace with desks and large windows"
      />
    ),
  },
  {
    value: 'analytics',
    label: 'Analytics',
    content: (
      <TabContent
        title="Understand your product data."
        description="Use this tab to show dashboards, reports, or important product insights."
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
        imageAlt="Analytics dashboard on a laptop screen"
      />
    ),
  },
  {
    value: 'team',
    label: 'Team',
    content: (
      <TabContent
        title="Work better with your team."
        description="Show collaboration features, team workflows, or role-based product experiences."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
        imageAlt="Team collaborating around a table"
      />
    ),
  },
  {
    value: 'automation',
    label: 'Automation',
    content: (
      <TabContent
        title="Automate repeated tasks."
        description="A simple way to present workflows, integrations, or time-saving features."
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
        imageAlt="Circuit board close up representing automation"
      />
    ),
  },
]

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
        <img src={image} alt={imageAlt} className="aspect-16/10 w-full object-cover" />
      </div>
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <AnimatedTabs items={tabs} defaultValue="workspace" />
    </section>
  )
}
