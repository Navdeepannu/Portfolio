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

const cards = [
  {
    title: 'Smart Automation',
    description: 'Automate repetitive tasks and help users move faster with fewer manual steps.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    href: '#automation-docs',
    items: [
      {
        title: 'What it does',
        description:
          'Handles repeated actions like updates, reminders, status changes, and simple workflows in the background.',
      },
      {
        title: 'Best for',
        description:
          'Admin dashboards, productivity apps, SaaS tools, internal systems, and customer portals.',
      },
    ],
  },
  {
    title: 'Real-time Insights',
    description:
      'Show important data clearly so users can understand activity, growth, and performance.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    items: [
      {
        title: 'What it solves',
        description:
          'Helps users quickly see trends, compare results, and make decisions without digging through raw data.',
      },
      {
        title: 'Useful for',
        description:
          'Analytics pages, finance tools, CRM dashboards, reporting sections, and product usage screens.',
      },
    ],
  },
  {
    title: 'Custom Interface Design',
    description: 'Create polished, responsive, and reusable interfaces for websites and products.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
    items: [
      {
        title: 'Service focus',
        description:
          'Build clean UI sections that are easy to scan, accessible, responsive, and ready to reuse.',
      },
      {
        title: 'Good for',
        description:
          'Landing pages, portfolio sites, component libraries, product pages, and client websites.',
      },
    ],
  },
]

export default function Page() {
  return (
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
    </section>
  )
}
