import { LandingTextLink } from '@/site/portfolio/landing-link'
import { landingPageContent } from '@/site/portfolio/landing-page-content'

export function LandingClosing() {
  const { closing } = landingPageContent

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border/70 py-14 md:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <p className="text-sm font-medium text-foreground">Contact</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground sm:text-xl">
          {closing.title}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1" aria-label="Contact links">
          {closing.links.map((link) => (
            <LandingTextLink key={link.label} {...link} />
          ))}
        </div>
        <p className="mt-12 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Navdeep Singh · Toronto, Canada
        </p>
      </div>
    </footer>
  )
}
