import Link from 'next/link'

import { FlowDeskContainer } from '../components'
import { Button } from '@/components/ui/button'
import { FlowDeskLogo } from '../components/flowdesk-logo'

const navItems = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function FlowDeskNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <FlowDeskContainer className="flex h-14 items-center justify-between">
        <Link href="/flowdesk" className="flex items-center gap-2">
          <FlowDeskLogo className="h-6 w-auto" />
          <span className="text-xl font-semibold tracking-tight">Flowdesk</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="#pricing">
          <Button size="sm" className="">
            Book free audit
          </Button>
        </Link>
      </FlowDeskContainer>
    </header>
  )
}
