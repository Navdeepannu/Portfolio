import Link from 'next/link'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { Signature } from './signature'
import { SITE_ORIGINS } from '@/config/site-origins'
import { Logo } from '@/components/ui-library-logo'

const links = [
  { label: 'Work', href: '/projects' },
  { label: 'Writing', href: '/blog' },
  { label: 'NavUI', href: SITE_ORIGINS.ui, external: true },
  { label: 'Resume', href: '/resume/resume.pdf', external: true },
]

const social = [
  { icon: IconBrandGithub, href: 'https://github.com/navdeepannu', label: 'GitHub' },
  {
    icon: IconBrandLinkedin,
    href: 'https://www.linkedin.com/in/navdeepsingh0/',
    label: 'LinkedIn',
  },
]

export function PortfolioFooter() {
  const date = new Date().getFullYear()

  return (
    <footer className="@container border-t border-border/70 bg-background py-9">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4">
            <Logo title="Navdeep Singh" className="h-12 w-auto rounded-xl" />
            <Signature />
          </div>
          <nav
            aria-label="Footer navigation"
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
              >
                {link.label}
                {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex gap-2">
            {social.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                aria-label={`${item.label} (opens in a new tab)`}
              >
                <item.icon aria-hidden="true" className="size-4" />
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            &copy; {date} Navdeep Singh · Toronto, Canada
          </p>
        </div>
      </div>
    </footer>
  )
}
