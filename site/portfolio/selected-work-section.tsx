'use client'
import { LandingTextLink } from '@/site/portfolio/landing-link'
import { LandingSection } from '@/site/portfolio/landing-section'
import { landingPageContent } from '@/site/portfolio/landing-page-content'
import { ProjectGallery } from '@/site/portfolio/project-gallery'
import { AnimatedGroup } from '@/components/ui/components/animated-group'
import { Variants } from 'motion/react'

const transitionVariants = {
  container: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.08,
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 2,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        duration: 1.85,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.23,
      },
    },
  },
} satisfies {
  container: Variants
  item: Variants
}
export function SelectedWorkSection() {
  return (
    <AnimatedGroup variants={transitionVariants}>
      <LandingSection id="work" label="Selected work" showDivider={false} compactTop>
        <ProjectGallery projects={landingPageContent.projects} />
        <div className="mt-8">
          <LandingTextLink label="View the project archive" href="/projects" showArrow={false} />
        </div>
      </LandingSection>
    </AnimatedGroup>
  )
}
