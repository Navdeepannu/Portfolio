import Blocks from '@/site/blocks'
import FooterSection from '@/site/footer-section'
import { HeroSection } from '@/site/hero-section'
import { LandingProjects } from '@/site/landing-design'
import ProjectsSection from '@/site/landing-project'
import { Navbar } from '@/site/navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LandingProjects />
      <ProjectsSection />
      <Blocks />
      <FooterSection />
    </div>
  )
}
