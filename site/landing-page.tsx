'use client'

import type { ReactNode } from 'react'
import { LayoutGroup, motion } from 'motion/react'

import Blocks from '@/site/blocks'
import FooterSection from '@/site/footer-section'
import { HeroSection } from '@/site/hero-section'
import { LandingProjects } from '@/site/landing-design'
import ProjectsSection from '@/site/landing-project'
import { Navbar } from '@/site/navbar'
import type { LandingSectionId } from '@/site/portfolio-config'
import { getPortfolioLayout } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'
import { ComponentsPreviewSection } from '@/site/sections/components-preview-section'
import { ContactSection } from '@/site/sections/contact-section'
import { ExperienceSection } from '@/site/sections/experience-section'
import { ResumeSection } from '@/site/sections/resume-section'
import { SkillsSection } from '@/site/sections/skills-section'

const SECTION_RENDERERS: Record<LandingSectionId, () => ReactNode> = {
  hero: () => <HeroSection />,
  showcase: () => <LandingProjects />,
  components: () => <ComponentsPreviewSection />,
  blocks: () => <Blocks />,
  projects: () => <ProjectsSection />,
  resume: () => <ResumeSection />,
  skills: () => <SkillsSection />,
  experience: () => <ExperienceSection />,
  contact: () => <ContactSection />,
  footer: () => <FooterSection />,
}

export function LandingPage() {
  const { mode } = usePortfolioMode()
  const layout = getPortfolioLayout(mode)

  return (
    <div>
      <Navbar />
      <LayoutGroup id="portfolio-landing">
        <motion.div layout className="flex flex-col">
          {layout.map((sectionId) => (
            <motion.div
              key={sectionId}
              layout="position"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{
                layout: {
                  type: 'spring',
                  stiffness: 320,
                  damping: 36,
                },
              }}
            >
              {SECTION_RENDERERS[sectionId]()}
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>
    </div>
  )
}
