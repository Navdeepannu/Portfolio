import { PortfolioJsonLd } from '@/components/shared/site-json-ld'
import { PortfolioPage } from '@/features/portfolio/sections/portfolio-page'

export default function Home() {
  return (
    <>
      <PortfolioJsonLd />
      <PortfolioPage />
    </>
  )
}
