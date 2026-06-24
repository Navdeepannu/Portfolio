'use client'

import { ArrowUpRight, BookOpen, Code2, Mail, MessagesSquare } from 'lucide-react'
import Link from 'next/link'

const contactCards = [
  {
    title: 'Sales',
    description: 'Talk with our team about plans, pricing, team rollout, or custom requirements.',
    href: '#',
    linkLabel: 'Contact sales',
  },
  {
    title: 'Support',
    description: 'Get help with product questions, account issues, billing, or technical problems.',
    href: '#',
    linkLabel: 'Get support',
  },
]

const contactLinks = [
  {
    title: 'Community',
    description: 'Connect with builders, ask questions, and share feedback.',
    href: '#',
    linkLabel: 'Join community',
    icon: MessagesSquare,
  },
  {
    title: 'General questions',
    description: 'For partnerships, press, or anything that does not fit elsewhere.',
    href: 'mailto:hello@example.com',
    linkLabel: 'hello@example.com',
    icon: Mail,
  },
  {
    title: 'Documentation',
    description: 'Browse setup guides, feature details, and product tutorials.',
    href: '#',
    linkLabel: 'View docs',
    icon: BookOpen,
  },
  {
    title: 'Developers',
    description: 'Explore API guides, SDKs, webhooks, and integration examples.',
    href: '#',
    linkLabel: 'Developer docs',
    icon: Code2,
  },
]

export default function ContactSectionOne() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left side */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-medium text-primary">Contact</p>

            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              How can we help?
            </h2>

            <p className="mt-5 max-w-md text-lg leading-7 text-balance text-muted-foreground">
              Get in touch with the right team for sales, support, partnerships, product questions,
              or technical help.
            </p>
          </div>

          {/* Right side */}
          <div className="min-w-0">
            <div className="grid gap-4 md:grid-cols-2">
              {contactCards.map((card) => {
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group relative overflow-hidden rounded-md bg-background p-6 shadow-xs ring-1 shadow-black/10 ring-border transition-colors hover:bg-muted/40"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {card.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {card.linkLabel}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                )
              })}
            </div>

            <div className="mt-16 border-t border-border pt-8">
              <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                <p className="text-sm font-medium text-muted-foreground">Get in touch</p>

                <div className="grid">
                  {contactLinks.map((item) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group flex gap-4 border-b border-border py-6 first:pt-0 last:border-b-0"
                      >
                        <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:bg-muted">
                          <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm font-medium text-foreground">{item.title}</h3>

                            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>

                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>

                          <p className="mt-1 text-sm font-medium text-primary">{item.linkLabel}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
