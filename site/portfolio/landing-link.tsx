import Link from 'next/link'
import { IconBrandGithub, IconBrandLinkedin, IconFileText, IconMail } from '@tabler/icons-react'
import { ArrowUpRight } from 'lucide-react'

import type { LandingLink } from '@/site/portfolio/landing-page-content'

const linkIcons = {
  resume: IconFileText,
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
  message: IconMail,
}

type LandingTextLinkProps = LandingLink & {
  className?: string
  showArrow?: boolean
}

export function LandingTextLink({
  label,
  href,
  external = false,
  icon,
  className = '',
  showArrow = external,
}: LandingTextLinkProps) {
  const Icon = icon ? linkIcons[icon] : null

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`group/link inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground active:scale-[0.98] motion-reduce:transition-none ${className}`}
    >
      {Icon ? <Icon aria-hidden="true" className="size-3.5" /> : null}
      <span className="border-b border-dotted border-current/55 pb-px transition-colors group-hover/link:border-foreground">
        {label}
      </span>
      {showArrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </Link>
  )
}
