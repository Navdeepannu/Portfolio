import Link from 'next/link'
import { IconBrandGithub } from '@tabler/icons-react'

import Character from '@/site/character'

const links = [
  { label: 'Components', href: '/components' },
  { label: 'Blocks', href: '/blocks' },
  { label: 'Illustrations', href: '/illustrations' },
  { label: 'Pages', href: '/pages' },
  { label: 'Portfolio', href: 'https://navdeepsingh.dev', external: true },
] as const

export function UiLibraryFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <div className="flex items-center gap-3">
          <Character className="size-12" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Navdeep UI</p>
            <p className="text-xs text-muted-foreground">Components, blocks, and templates</p>
          </div>
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

        <Link
          href="https://github.com/navdeepannu/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the UI library source on GitHub"
          className="mt-8 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconBrandGithub className="size-4" />
        </Link>

        <p className="mt-5 text-xs text-muted-foreground">&copy; {year} Navdeep Singh.</p>
      </div>
    </footer>
  )
}
