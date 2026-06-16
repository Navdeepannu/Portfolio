'use client'

import type { ReactNode } from 'react'

import Blocks from '@/site/blocks'
import FooterSection from '@/site/footer-section'
import { HeroSection } from '@/site/hero-section'
import { LandingProjects } from '@/site/landing-design'
import ProjectsSection from '@/site/landing-project'
import { Navbar } from '@/site/navbar'
import type { LandingSectionId } from '@/site/portfolio-config'
import { getPortfolioLayout } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/context/portfolio-mode-provider'
import { ComponentsPreviewSection } from '@/site/sections/components-preview-section'
import { ContactSection } from '@/site/sections/contact-section'
import { ResumeSection } from '@/site/sections/resume-section'
import { SkillsSection } from '@/site/sections/skills-section'
import { RecruiterHero } from './recruiter/recruiter-hero'
import { RecruiterSnapshot } from './recruiter/recruiter-snapshot'
import { RecruiterProjects } from './recruiter/recruiter-projects'
import { RecruiterStrengths } from './recruiter/recruiter-strengths'

const SECTION_RENDERERS: Record<LandingSectionId, () => ReactNode> = {
  hero: () => <HeroSection />,
  showcase: () => <LandingProjects />,
  components: () => <ComponentsPreviewSection />,
  blocks: () => <Blocks />,
  projects: () => <ProjectsSection />,
  resume: () => <ResumeSection />,
  skills: () => <SkillsSection />,
  contact: () => <ContactSection />,
  footer: () => <FooterSection />,
  'recruiter-hero': () => <RecruiterHero />,
  'recruiter-snapshot': () => <RecruiterSnapshot />,
  'recruiter-projects': () => <RecruiterProjects />,
  'recruiter-strengths': () => <RecruiterStrengths />,
}
export function LandingPage() {
  const { mode } = usePortfolioMode()
  const layout = getPortfolioLayout(mode)

  return (
    <div>
      <Navbar />

      <main className="flex flex-col">
        {layout.map((sectionId) => {
          const Section = SECTION_RENDERERS[sectionId]

          return <section key={sectionId}>{Section()}</section>
        })}
      </main>
    </div>
  )
}
