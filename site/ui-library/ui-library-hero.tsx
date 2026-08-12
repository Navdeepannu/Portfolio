import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { TextLoop } from '@/components/ui/text-loop'
import { getGithubStars } from '@/lib/github/repo-stats'
import Container from '@/site/container'
import { GitHubStars } from './github-stars'

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
  },
}

export async function UiLibraryHero() {
  const stargazersCount = await getGithubStars('navdeepannu', 'portfolio')

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

            <GitHubStars
              repo="navdeepannu/portfolio"
              stargazersCount={stargazersCount}
              label={hero.secondaryCTA.label}
              variant="outline"
              size="lg"
              className="rounded-md"
              showTooltip={false}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
