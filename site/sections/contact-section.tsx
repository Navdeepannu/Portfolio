'use client'

import Link from 'next/link'
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconMapPin } from '@tabler/icons-react'

import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'
import { SectionShell } from '@/site/sections/section-shell'

export function ContactSection() {
  const { mode } = usePortfolioMode()
  const { contact } = getPortfolioContent(mode)

  const links = [
    { ...contact.email, icon: IconMail },
    { ...contact.linkedin, icon: IconBrandLinkedin },
    { ...contact.github, icon: IconBrandGithub },
    { ...contact.location, icon: IconMapPin },
  ]

  return (
    <SectionShell
      id="contact"
      eyebrow={contact.eyebrow}
      title={contact.title}
      description={contact.description}
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4 ring-1 ring-foreground/5 transition-colors hover:bg-muted/40"
              {...(item.href.startsWith('http') || item.href.startsWith('mailto')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <item.icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium text-foreground">{item.value ?? item.label}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
