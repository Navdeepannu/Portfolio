import { portfolioSiteConfig, uiSiteConfig } from '@/lib/site'

function JsonLd({ value }: { value: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export function PortfolioJsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolioSiteConfig.name,
    url: portfolioSiteConfig.url,
    image: `${portfolioSiteConfig.url}/char.jpg`,
    jobTitle: 'Design Engineer and Frontend Developer',
    sameAs: [
      portfolioSiteConfig.links.github,
      portfolioSiteConfig.links.linkedin,
      portfolioSiteConfig.links.twitter,
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: portfolioSiteConfig.name,
    url: portfolioSiteConfig.url,
    description: portfolioSiteConfig.description,
    inLanguage: 'en-US',
  }

  return (
    <>
      <JsonLd value={person} />
      <JsonLd value={website} />
    </>
  )
}

export function UiLibraryJsonLd() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: uiSiteConfig.name,
    url: uiSiteConfig.url,
    description: uiSiteConfig.description,
    inLanguage: 'en-US',
    creator: {
      '@type': 'Person',
      name: uiSiteConfig.author.name,
      url: uiSiteConfig.links.portfolio,
    },
  }

  return <JsonLd value={website} />
}
