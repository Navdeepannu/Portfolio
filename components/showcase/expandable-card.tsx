import { ExpandableCard } from '@/components/ui/components/expandable-card'

const cards = [
  {
    title: 'Smart Automation',
    description: 'Automate repetitive tasks and help users move faster with fewer manual steps.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    learnMore: { label: 'View docs', href: '#' },
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
        <ExpandableCard
          key={card.title}
          title={card.title}
          description={card.description}
          image={card.image}
          items={card.items}
          learnMore={'learnMore' in card ? card.learnMore : undefined}
          footer={
            <span className="text-xs font-medium text-muted-foreground">Updated weekly</span>
          }
        />
      ))}
    </section>
  )
}
