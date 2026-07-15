import FooterSection from '@/site/footer-section'
import { Navbar } from '@/site/navbar'
import { PortfolioContact } from '@/site/portfolio/portfolio-contact'
import { PortfolioHero } from '@/site/portfolio/portfolio-hero'
import { PortfolioProjects } from '@/site/portfolio/portfolio-projects'
import { PortfolioSnapshot } from '@/site/portfolio/portfolio-snapshot'
import { PortfolioStrengths } from '@/site/portfolio/portfolio-strengths'

export function PortfolioPage() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col">
        <PortfolioHero />
        <PortfolioSnapshot />
        <PortfolioProjects />
        <PortfolioStrengths />
        <PortfolioContact />
      </main>
      <FooterSection />
    </div>
  )
}
