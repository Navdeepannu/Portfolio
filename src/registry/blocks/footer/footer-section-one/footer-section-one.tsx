import Link from 'next/link'

import { Button } from '@/components/ui/button'
import LogoMark from '@/components/ui-library-logo'
import { ArrowRight, Send } from 'lucide-react'

const products = [
  { title: 'Overview', href: '#' },
  { title: 'Features', href: '#' },
  { title: 'Integrations', href: '#' },
  { title: 'Use cases', href: '#' },
  { title: 'Pricing', href: '#' },
  { title: 'Demo', href: '#' },
]

const company = [
  { title: 'About us', href: '#' },
  { title: 'Careers', href: '#' },
  { title: 'Blog', href: '#' },
  { title: 'Customers', href: '#' },
  { title: 'Contact', href: '#' },
  { title: 'Legal & Privacy', href: '#' },
]

export default function FooterSectionOne() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-start gap-1">
              <LogoMark aria-hidden="true" className="size-6" />
              <span className="text-lg font-semibold text-foreground">Nav UI</span>
            </div>

            <p className="max-w-2xs pl-1 text-sm font-normal text-muted-foreground">
              Modern UI components for fast and accessible web apps.
            </p>

            <Button asChild variant="secondary" className="mt-2 w-fit">
              <Link href="#">
                Start Free Trial
                <ArrowRight aria-hidden="true" data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Products
            </h4>

            <ul className="list-none space-y-2">
              {products.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Company
            </h4>

            <ul className="list-none space-y-2">
              {company.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Newsletter
            </h4>

            <form className="flex overflow-hidden rounded-lg border border-input bg-muted/40 transition-shadow focus-within:ring-2 focus-within:ring-ring/50">
              <input
                type="email"
                aria-label="Email address for newsletter"
                name="email"
                required
                autoComplete="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="shrink-0 rounded-none bg-primary px-4 py-3 text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Send aria-hidden="true" className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-8">
        <span className="block text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nav UI. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
