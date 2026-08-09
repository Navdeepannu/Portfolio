import { landingPageContent } from './landing-page-content'

export function AboutSectionContent() {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-8 text-foreground/85 sm:text-lg">
      {landingPageContent.about.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}
