import Link from 'next/link'
import { IconBrandGithub } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { TextLoop } from '@/components/ui/text-loop'
import Container from '@/site/container'

const hero = {
  roles: ['components.', 'blocks.', 'illustrations.', 'templates.'],
  description:
    'A shadcn-compatible collection of React interfaces built with TypeScript, Tailwind CSS, and thoughtful motion. Preview the source and add only what your project needs.',
  primaryCTA: {
    label: 'Explore Blocks',
    href: '/blocks',
  },
  secondaryCTA: {
    label: 'View on GitHub',
    href: 'https://github.com/navdeepannu/portfolio',
  },
}

export function UiLibraryHero() {
  return (
    <section>
      <Container className="font-geist selection:bg-emerald-200/60 dark:selection:bg-emerald-500 dark:selection:text-white">
        <div className="flex max-w-xl flex-col gap-4 py-14">
          <h1 className="leading-tighter max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Build polished interfaces with{' '}
            <TextLoop className="inline-block bg-linear-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              {hero.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </TextLoop>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {hero.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button asChild variant="default" size="lg" className="rounded-md">
              <Link href={hero.primaryCTA.href}>{hero.primaryCTA.label}</Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-md">
              <a href={hero.secondaryCTA.href} target="_blank" rel="noopener noreferrer">
                <IconBrandGithub aria-hidden="true" className="size-4" />
                {hero.secondaryCTA.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
