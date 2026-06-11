'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TextLoop } from '@/components/ui/text-loop'
import { Tooltip } from '@/components/ui/tooltip-card'
import Container from '@/site/container'
import { ModeSwitcherWithHint } from '@/site/mode-switcher-hint'
import { recruiterHero } from '@/site/recruiter/recruiter-content'

export function RecruiterHero() {
  const hero = recruiterHero

  return (
    <section>
      <Container className="font-schibsted selection:bg-emerald-200/60">
        <ModeSwitcherWithHint />

        <div className="flex max-w-2xl flex-col justify-center gap-3">
          <span className="text-xs font-light">{hero.greeting}</span>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg tracking-tight md:text-2xl">{hero.name}</h1>
            <TextLoop className="pointer-events-none bg-linear-to-b from-emerald-400 to-emerald-600 bg-clip-text font-caveat text-lg text-transparent md:text-2xl">
              {hero.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </TextLoop>
          </div>

          <div className="space-y-2 text-sm md:text-base">
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div>
              See my work on{' '}
              <Link
                href={hero.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative border-b border-dashed border-foreground/40 font-medium italic"
              >
                <Tooltip content={<LinkedinCard />}>LinkedIn</Tooltip>
              </Link>
              , follow on{' '}
              <Link
                href={hero.twitterHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dashed border-foreground/40 font-medium italic"
              >
                <Tooltip content={<TwitterCard />}>X / Twitter</Tooltip>
              </Link>
              .
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              asChild
              className="shadow-xl transition-all duration-300 ease-in-out text-shadow-2xs text-shadow-black/50 dark:text-shadow-white/50"
              variant="default"
            >
              <Link href={hero.primaryCTA.href} target="_blank" rel="noopener noreferrer">
                {hero.primaryCTA.label}
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

const LinkedinCard = () => {
  return (
    <Image
      src="/Linkedin.png"
      alt="LinkedIn Image"
      width={1000}
      height={50}
      className="aspect-video w-full rounded-sm object-cover"
    />
  )
}

const TwitterCard = () => {
  return (
    <Image
      src="/x.png"
      alt="Twitter/X Image"
      width={100}
      height={100}
      className="aspect-video w-full rounded-sm"
    />
  )
}
