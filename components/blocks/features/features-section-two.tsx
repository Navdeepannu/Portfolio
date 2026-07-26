import { Lifeline } from '@/components/lifeline'
import { defineLifeline, type LifelineMilestones } from '@/lib/lifeline-data'

const milestones = {
  2020: {
    id: 'capture',
    age: 'Capture',
    events: [
      'Work began with a fast, focused issue inbox.',
      'Ideas could become actionable work without leaving the keyboard.',
    ],
    photos: [
      {
        src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlAuYWmkpKQGnmhpoFHtl8C3qOXrgevszwxZPM',
        alt: 'The original issue inbox',
        x: 0.42,
        y: 72,
        rotate: -4,
        width: 250,
      },
    ],
  },

  2021: {
    id: 'prioritize',
    age: 'Prioritize',
    events: [
      {
        text: 'Priorities made it clear what deserved attention next.',
        image: {
          src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh4cfuGJ0RlaETPbLcZQjyfg2StNvuB13w8rI',
          alt: 'Issue priorities and status controls',
        },
      },
      'Teams stopped treating every request as equally urgent.',
    ],
  },

  2022: {
    id: 'projects',
    age: 'Projects',
    events: [
      'Related issues became projects with owners, milestones, and outcomes.',
      'Daily work finally connected to a larger product direction.',
    ],
    photos: [
      {
        src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlBE1JQ6bM0rCoZtdKDAVO8yw7eSuvUb1LhYIJ',
        alt: 'Projects overview',
        x: 0.52,
        y: 104,
        rotate: 3,
        width: 290,
      },
    ],
  },

  2023: {
    id: 'cycles',
    age: 'Cycles',
    events: [
      {
        text: 'Cycles gave teams a predictable rhythm without rigid planning.',
        image: {
          src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl2qccwOLmnCKEMaPSHlkN9mY0IgJTt8dwQzFb',
          alt: 'Product development cycles',
        },
      },
      'Scope became visible before work became overwhelming.',
    ],
  },

  2024: {
    id: 'roadmaps',
    age: 'Direction',
    events: [
      'Roadmaps connected current execution to what the company was building next.',
      'Progress could be understood without another status meeting.',
    ],
    photos: [
      {
        src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl2qccwOLmnCKEMaPSHlkN9mY0IgJTt8dwQzFb',
        alt: 'Product roadmap view',
        x: 0.38,
        y: 54,
        rotate: -2,
        width: 300,
      },
    ],
  },

  2025: {
    id: 'automate',
    age: 'Automate',
    events: [
      {
        text: 'Repeated coordination became workflows the product could handle itself.',
        image: {
          src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlp3ArUvDLM0p8g2PxJVvac3HKDEiQUlum9GC6',
          alt: 'Workflow automation settings',
        },
      },
      'Assignments, updates, and handoffs began moving automatically.',
    ],
  },

  2026: {
    id: 'understand',
    age: 'Understand',
    events: [
      'The product moved beyond recording work and began explaining it.',
      {
        text: 'Progress, risks, and next steps became visible in one place.',
        image: {
          src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN',
          alt: 'Product progress and insights',
        },
      },
    ],
    photos: [
      {
        src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl4fvCk1IN3cIQE6ze9DMW8R4jKntfT7uHXoqh',
        alt: 'Product intelligence summary',
        x: 0.48,
        y: 88,
        rotate: 4,
        width: 280,
      },
    ],
  },
} satisfies LifelineMilestones

const product = defineLifeline({
  slug: 'orbit',
  name: 'Orbit',
  birthYear: 2020,
  endYear: 2026,
  description: 'How a focused issue tracker became a complete product system.',
  milestones,
})

export default function FeaturesSectionTwo() {
  return (
    <section className="border-y bg-background py-20 text-foreground md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-muted-foreground">Product evolution</p>

            <h2 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
              Built by removing the next bottleneck.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Orbit started as a focused issue tracker. Each new stage solved the limitation created
            by the one before it.
          </p>
        </header>

        <div className="mt-12 md:h-[620px]">
          <Lifeline
            markers={product.markers}
            birthYear={product.birthYear}
            title={product.name}
            className="h-full"
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>Hover details and drag screenshots</span>
          <span className="hidden md:inline">Scroll to move through the product</span>
        </div>
      </div>
    </section>
  )
}
