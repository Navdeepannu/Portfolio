'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import {
  Eyebrow,
  Reveal,
  staggerContainer,
  staggerItem,
} from '@/site/recruiter/recruiter-primitives'
import { recruiterWhy } from '@/site/recruiter/recruiter-content'

const SPAN_BY_ID: Record<string, string> = {
  'product-thinking': 'lg:col-span-2',
}

export function RecruiterWhy() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-8">
        <Reveal>
          <Eyebrow className="mb-4">{recruiterWhy.eyebrow}</Eyebrow>
          <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
            <div className="max-w-md text-left text-balance">
              <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
                {recruiterWhy.title}
              </h2>
            </div>
            <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
              <p>{recruiterWhy.description}</p>
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-8% 0px' }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recruiterWhy.cards.map((card, index) => (
            <motion.article
              key={card.id}
              variants={staggerItem}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={cn(
                'group flex flex-col rounded-2xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5 transition-colors hover:border-border',
                SPAN_BY_ID[card.id],
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg border border-border/60 bg-muted/40 font-mono text-xs text-muted-foreground transition-colors group-hover:border-emerald-500/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-medium text-foreground">{card.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">{card.story}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
