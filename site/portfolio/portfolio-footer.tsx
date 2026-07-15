import Link from 'next/link'
import { IconBrandGithub, IconBrandX, IconBrandLinkedin } from '@tabler/icons-react'
import { Logo } from '@/site/logo'
import Character from '@/site/character'
import { SITE_ORIGINS } from '@/lib/sites'

const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Strengths', href: '/#technical-strengths' },
  { label: 'Resume', href: '/resume/resume.pdf' },
  { label: 'Contact', href: '/#contact' },
  { label: 'UI Library', href: SITE_ORIGINS.ui },
]

const social = [
  { icon: IconBrandX, href: 'https://x.com/navdeepannu0', label: 'Twitter' },
  { icon: IconBrandGithub, href: 'https://github.com/Navdeepannu/Portfolio', label: 'GitHub' },
  {
    icon: IconBrandLinkedin,
    href: 'https://www.linkedin.com/in/navdeepsingh0/',
    label: 'LinkedIn',
  },
]

export function PortfolioFooter() {
  const date = new Date().getFullYear()

  return (
    <footer className="@container bg-background py-12">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4">
            <Character className="size-14" />
            <Logo />
          </div>
          <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex gap-4">
            {social.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="size-8 rounded-full text-muted-foreground transition-colors hover:text-foreground"
                aria-label={item.label}
              >
                <item.icon className="size-4" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">&copy; {date} Navdeep Singh.</p>
        </div>
      </div>
    </footer>
  )
}
