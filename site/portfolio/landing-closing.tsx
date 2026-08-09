import { LandingTextLink } from '@/site/portfolio/landing-link'
import { landingPageContent } from '@/site/portfolio/landing-page-content'

export function LandingClosing() {
  const { closing } = landingPageContent

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-border/70 py-14 md:py-16"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <p className="text-sm font-medium text-foreground">Contact</p>
        <h2
          id="contact-heading"
          className="mt-3 max-w-2xl text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl"
        >
          {closing.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {closing.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1" aria-label="Contact links">
          {closing.links.map((link) => (
            <LandingTextLink key={link.label} {...link} />
          ))}
        </div>
      </div>
    </section>
  )
}
