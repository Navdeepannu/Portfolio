import Link from 'next/link'
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react'

import { SITE_ORIGINS } from '@/lib/sites'
import { LogoType } from '@/site/ui-library/ui-library-logo'

const links = [
  { label: 'Components', href: '/components' },
  { label: 'Blocks', href: '/blocks' },
  { label: 'Illustrations', href: '/illustrations' },
  { label: 'Pages', href: '/pages' },
  { label: 'Portfolio', href: SITE_ORIGINS.portfolio, external: true },
] as const

export function UiLibraryFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background py-12 font-geist">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <div className="flex items-center gap-3">
          <Link
            href={SITE_ORIGINS.ui}
            aria-label="Nav UI home"
            className="inline-flex rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
          >
            <LogoType className="h-12 w-auto" />
          </Link>
        </div>

        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={'external' in item && item.external ? '_blank' : undefined}
              rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Link
            href="https://github.com/navdeepannu/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the UI library source on GitHub"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/navdeepsingh0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandLinkedin className="size-4" />
          </Link>
          <Link
            href="https://x.com/navdeepannu0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View X profile"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandX className="size-4" />
          </Link>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">&copy; {year} Nav UI</p>
      </div>
    </footer>
  )
}
