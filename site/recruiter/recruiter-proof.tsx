'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  Eyebrow,
  Reveal,
  staggerContainer,
  staggerItem,
} from '@/site/recruiter/recruiter-primitives'
import { recruiterProof, type ProofPillar } from '@/site/recruiter/recruiter-content'

export function RecruiterProof() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-8">
        <Reveal>
          <Eyebrow className="mb-4">{recruiterProof.eyebrow}</Eyebrow>
          <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
            <div className="max-w-md text-left text-balance">
              <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
                {recruiterProof.title}
              </h2>
            </div>
            <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
              <p>{recruiterProof.description}</p>
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {recruiterProof.pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} reduceMotion={!!reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PillarCard({ pillar, reduceMotion }: { pillar: ProofPillar; reduceMotion: boolean }) {
  return (
    <motion.div variants={staggerItem}>
      <Link
        href={pillar.href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card ring-1 ring-foreground/5 transition-colors hover:border-border"
      >
        {/* preview */}
        <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border/60 bg-muted/30">
          <Image
            src={pillar.preview}
            alt={pillar.previewAlt}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute top-3 left-3 rounded-full border border-border/60 bg-background/80 px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground backdrop-blur">
            {pillar.label}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-medium text-foreground">{pillar.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{pillar.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {pillar.metrics.map((metric) => (
              <span
                key={metric.label}
                className="inline-flex items-baseline gap-1.5 rounded-lg bg-muted/40 px-2.5 py-1"
              >
                <span className="font-times-heading text-sm text-foreground tabular-nums">
                  {metric.value}
                </span>
                <span className="text-[0.7rem] text-muted-foreground">{metric.label}</span>
              </span>
            ))}
          </div>

          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
            {pillar.cta}
            <ArrowUpRight
              className={
                reduceMotion
                  ? 'size-4'
                  : 'size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }
            />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
