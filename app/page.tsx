import { PortfolioJsonLd } from '@/components/site-json-ld'
import { PortfolioPage } from '@/site/portfolio/portfolio-page'

export default function Home() {
  return (
    <>
      <PortfolioJsonLd />
      <PortfolioPage />
    </>
  )
}
