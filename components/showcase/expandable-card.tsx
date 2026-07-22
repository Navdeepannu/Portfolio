import {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableCardMedia,
  ExpandableCardTitle,
  ExpandableCardTrigger,
} from '@/components/ui/components/expandable-card'

const features = [
  {
<<<<<<< Updated upstream
    title: 'Smart Automation',
    description: 'Automate repetitive tasks and help users move faster with fewer manual steps.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    href: '#automation-docs',
=======
    title: 'Workflow Automation',
    description: 'Automate repetitive work so your team can focus on higher-value tasks.',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlBE1JQ6bM0rCoZtdKDAVO8yw7eSuvUb1LhYIJ',
>>>>>>> Stashed changes
    items: [
      {
        title: 'Automated updates',
        description: 'Keep tasks, statuses, and notifications updated without manual work.',
      },
      {
        title: 'Reusable workflows',
        description: 'Create repeatable processes for onboarding, approvals, and reporting.',
      },
    ],
    action: {
      label: 'Explore automation',
      href: '#',
    },
  },
  {
    title: 'Real-time Analytics',
    description: 'Understand product activity and performance using clear, current data.',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh4cfuGJ0RlaETPbLcZQjyfg2StNvuB13w8rI',
    items: [
      {
        title: 'Live metrics',
        description: 'Monitor important product and business metrics as they change.',
      },
      {
        title: 'Clear reporting',
        description: 'Turn complex information into reports your team can understand.',
      },
    ],
    action: {
      label: 'View analytics',
      href: '#',
    },
  },
  {
    title: 'Team Collaboration',
    description:
      'Keep projects, conversations, and responsibilities organized in one shared workspace.',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlp3ArUvDLM0p8g2PxJVvac3HKDEiQUlum9GC6',
    items: [
      {
        title: 'Shared workspace',
        description: 'Give everyone a clear view of current tasks, updates, and project progress.',
      },
      {
        title: 'Clear ownership',
        description:
          'Assign responsibilities and deadlines so every team member knows what comes next.',
      },
    ],
    action: {
      label: 'Explore collaboration',
      href: '#',
    },
  },
]

export default function Page() {
  return (
<<<<<<< Updated upstream
    <section className="mx-auto grid max-w-5xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <ExpandableCard key={card.title}>
          <ExpandableCardTrigger>
            <ExpandableCardMedia className="aspect-4/3 p-1">
              <img src={card.image} alt="" className="h-full w-full rounded-xl object-cover" />
            </ExpandableCardMedia>

            <span className="block p-4">
              <span className="block truncate text-base font-semibold tracking-tight text-foreground">
                {card.title}
              </span>
              <span className="mt-2 line-clamp-2 block text-sm leading-6 text-muted-foreground">
                {card.description}
              </span>
              <span className="mt-4 flex justify-end">
                <span className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors group-hover/expandable-card:bg-muted">
                  View details
                </span>
              </span>
            </span>
          </ExpandableCardTrigger>

          <ExpandableCardContent>
            <ExpandableCardMedia className="aspect-video">
              <img src={card.image} alt="" className="h-full w-full object-cover" />
            </ExpandableCardMedia>

            <ExpandableCardHeader>
              <ExpandableCardTitle>{card.title}</ExpandableCardTitle>
              <ExpandableCardDescription>{card.description}</ExpandableCardDescription>
            </ExpandableCardHeader>

            <ExpandableCardBody className="grid gap-4 sm:grid-cols-2">
              {card.items.map((item) => (
                <div key={item.title} className="rounded-2xl border bg-muted/30 p-4">
                  <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </ExpandableCardBody>

            <ExpandableCardFooter>
              <span className="text-xs font-medium text-muted-foreground">Updated weekly</span>
              {'href' in card ? (
                <a
                  href={card.href}
                  className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  View docs
                </a>
              ) : null}
            </ExpandableCardFooter>
          </ExpandableCardContent>
        </ExpandableCard>
      ))}
=======
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8 max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Built to help your team move faster
        </h1>

        <p className="mt-3 text-muted-foreground">
          Explore the core features available across the platform.
        </p>
      </div>

      <div className="flex items-center gap-4">
        {features.map((feature, index) => (
          <ExpandableCard
            key={index}
            {...feature}
            footer={
              <span className="text-xs font-medium text-muted-foreground">
                Included in every plan
              </span>
            }
          />
        ))}
      </div>
>>>>>>> Stashed changes
    </section>
  )
}
