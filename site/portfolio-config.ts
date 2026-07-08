import { siteConfig } from '@/lib/site'

export const PORTFOLIO_MODES = ['developer', 'recruiter'] as const

export type PortfolioMode = (typeof PORTFOLIO_MODES)[number]

export type LandingSectionId =
  | 'hero'
  | 'showcase'
  | 'components'
  | 'blocks'
  | 'projects'
  | 'resume'
  | 'skills'
  | 'contact'
  | 'footer'
  | 'recruiter-hero'
  | 'recruiter-snapshot'
  | 'recruiter-projects'
  | 'recruiter-strengths'

export type CtaLink = {
  label: string
  href: string
}

export type HeroContent = {
  badge?: string
  greeting: string
  name: string
  roles: string[]
  paragraphs: string[]
  linkedinHref: string
  twitterHref: string
  primaryCTA: CtaLink
  secondaryCTA: CtaLink
}

export type ResumeContent = {
  eyebrow: string
  title: string
  description: string
  yearsOfExperience: string
  specialization: string
  availability: string
  downloadLabel: string
  resumeHref: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type SkillsContent = {
  eyebrow: string
  title: string
  description: string
  groups: SkillGroup[]
}

export type BuildJourneyContent = {
  eyebrow: string
  title: string
  description: string
}

export type ContactLink = {
  label: string
  href: string
  value?: string
}

export type ContactContent = {
  eyebrow: string
  title: string
  description: string
  email: ContactLink
  phone?: ContactLink
  linkedin: ContactLink
  github: ContactLink
  location: ContactLink
}

export type SectionCopy = {
  eyebrow: string
  title: string
  description: string
  cta: CtaLink
}

export type PortfolioModeContent = {
  layout: LandingSectionId[]
  hero: HeroContent
  resume: ResumeContent
  skills: SkillsContent
  buildJourney: BuildJourneyContent
  contact: ContactContent
  projects: SectionCopy
  blocks: SectionCopy
  components: SectionCopy
  showcase: SectionCopy
}

const sharedContact: ContactContent = {
  eyebrow: 'Contact',
  title: 'Get in Touch',
  description:
    'Open to full-time frontend and design-engineering roles. Reach out directly — I typically reply within one business day.',
  email: {
    label: 'Email',
    href: 'mailto:navdeepannu0@gmail.com',
    value: 'navdeepannu0@gmail.com',
  },
  linkedin: {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    value: 'navdeepsingh0',
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/navdeepannu',
    value: 'navdeepannu',
  },
  location: {
    label: 'Location',
    href: '#',
    value: 'Canada · Remote-friendly',
  },
}

const sharedBuildJourney: BuildJourneyContent = {
  eyebrow: 'Build Journey',
  title: 'How I build',
  description: 'Learn → Build → Ship → Systemize → Scale',
}

export const portfolioContent = {
  developer: {
    layout: ['hero', 'showcase', 'components', 'blocks', 'projects', 'contact', 'footer'],
    hero: {
      greeting: "Hi, I'm",
      name: 'Navdeep Singh',
      roles: ['Frontend Developer', 'Design Engineer', 'UI Systems Builder', 'Freelancer'],
      paragraphs: [
        'I design and build scalable interfaces with React, Next.js, and TypeScript. From reusable UI systems and motion to full-stack applications',
        'I focus on creating products that are fast, maintainable, and built for real-world use.',
      ],
      linkedinHref: siteConfig.links.linkedin,
      twitterHref: siteConfig.links.twitter,
      primaryCTA: { label: 'Explore UI kits', href: '/blocks' },
      secondaryCTA: { label: 'View Projects', href: '/projects' },
    },
    resume: {
      eyebrow: 'Resume',
      title: 'Technical background',
      description: 'Download a PDF summary of experience, stack, and selected work.',
      yearsOfExperience: '4+ years',
      specialization: 'Frontend & UI systems',
      availability: 'Open to select opportunities',
      downloadLabel: 'Download resume',
      resumeHref: '/resume/resume.pdf',
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Tools I use to ship',
      description: 'From design systems to deployment.',
      groups: [
        { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
        { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
        { category: 'Database', items: ['PostgreSQL', 'Prisma'] },
        { category: 'Deployment', items: ['Vercel', 'Docker'] },
        { category: 'Design', items: ['Figma', 'Design systems', 'Motion'] },
      ],
    },
    buildJourney: sharedBuildJourney,
    contact: {
      ...sharedContact,
      title: 'Say hello',
      description: 'For collaborations, UI kit licensing, or freelance projects.',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Full stack projects I have worked on',
      description:
        'Production apps spanning invoicing, marketing sites, and internal tools — built with modern React stacks.',
      cta: { label: 'View Projects', href: '/projects' },
    },
    blocks: {
      eyebrow: 'Blocks',
      title: 'Production-ready UI blocks for real-world use cases',
      description:
        'Reusable, production-grade UI blocks you can drop directly into real applications.',
      cta: { label: 'Explore Blocks', href: '/blocks' },
    },
    components: {
      eyebrow: 'Components',
      title: 'Reusable UI components for React & Tailwind',
      description:
        'Copy-paste components with Motion, accessible patterns, and shadcn-compatible registry entries.',
      cta: { label: 'Browse Components', href: '/components' },
    },
    showcase: {
      eyebrow: 'Showcase',
      title: 'Interface experiments & UI previews',
      description: 'Visual explorations from blocks and product work.',
      cta: { label: 'View Blocks', href: '/blocks' },
    },
  },
  recruiter: {
    layout: [
      'recruiter-hero',
      'recruiter-snapshot',
      'recruiter-projects',
      'recruiter-strengths',
      'contact',
      'footer',
    ],
    hero: {
      greeting: "Hi, I'm",
      name: 'Navdeep Singh',
      roles: [
        'Frontend-Focused Full Stack Developer',
        'Design Engineer',
        'Product-minded Engineer',
      ],
      paragraphs: [
        'I help startups and businesses turn ideas into modern websites, SaaS products, and digital experiences. From product thinking and interface design to frontend development and launch, I build software that&apos;s fast, scalable, and crafted with attention to detail.',
        'Available for freelance projects and frontend opportunities.',
      ],
      linkedinHref: siteConfig.links.linkedin,
      twitterHref: siteConfig.links.twitter,
      primaryCTA: { label: 'Download resume', href: '/resume/resume.pdf' },
      secondaryCTA: { label: 'Contact me', href: '#contact' },
    },
    resume: {
      eyebrow: 'Resume',
      title: 'Quick Qualification',
      description:
        'Quick overview for recruiters — specialization, availability, and a one-click resume download.',
      yearsOfExperience: '4+ years',
      specialization: 'Frontend · React · Next.js · UI systems',
      availability: 'Open to full-time & contract (remote)',
      downloadLabel: 'Download PDF resume',
      resumeHref: '/resume/resume.pdf',
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Core technical strengths',
      description: 'Depth on the frontend with full-stack delivery when the product needs it.',
      groups: [
        {
          category: 'Frontend',
          items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Accessibility'],
        },
        {
          category: 'Backend',
          items: ['Node.js', 'Express', 'API design', 'Auth flows'],
        },
        { category: 'Database', items: ['PostgreSQL', 'Schema design', 'Prisma'] },
        { category: 'Deployment', items: ['Vercel', 'CI/CD', 'Performance'] },
        { category: 'Design', items: ['Figma', 'Design systems', 'Prototyping'] },
      ],
    },
    buildJourney: {
      ...sharedBuildJourney,
      title: 'Builder path',
      description: 'A compact map of how I grow as a design engineer.',
    },
    contact: sharedContact,
    projects: {
      eyebrow: 'Projects',
      title: 'Selected production work',
      description:
        'Case-ready examples with live links — invoicing SaaS, marketing sites, and shipped UI systems.',
      cta: { label: 'See all projects', href: '#projects' },
    },
    blocks: {
      eyebrow: 'UI library',
      title: 'Blocks & patterns (supporting work)',
      description:
        'Additional proof of UI systems thinking — available after reviewing core project work above.',
      cta: { label: 'View blocks', href: '/blocks' },
    },
    components: {
      eyebrow: 'Components',
      title: 'Component library (supporting work)',
      description:
        'Reusable primitives and motion patterns from the same design-engineering practice.',
      cta: { label: 'View components', href: '/components' },
    },
    showcase: {
      eyebrow: 'Visual showcase',
      title: 'UI experiments (secondary)',
      description: 'Supplementary gallery of layouts and block previews.',
      cta: { label: 'Explore showcase', href: '/blocks' },
    },
  },
} as const satisfies Record<PortfolioMode, PortfolioModeContent>

export function getPortfolioContent(mode: PortfolioMode): PortfolioModeContent {
  return portfolioContent[mode]
}

export function getPortfolioLayout(mode: PortfolioMode): LandingSectionId[] {
  return portfolioContent[mode].layout
}
