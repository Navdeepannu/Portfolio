import { getSiteUrl, siteConfig } from '@/lib/site'

export function SiteJsonLd() {
  const url = getSiteUrl()

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url,
    image: `${url}/avatar.jpg`,
    jobTitle: 'Frontend Developer',
    sameAs: [siteConfig.links.linkedin, siteConfig.links.twitter],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url,
    description: siteConfig.description,
    inLanguage: 'en-US',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
