import { portfolioSiteConfig } from '@/lib/site'
import { SITE_ORIGINS } from '@/lib/sites'

export type LandingLink = {
  label: string
  href: string
  external?: boolean
  icon?: 'resume' | 'linkedin' | 'github'
}

export type LandingProject = {
  title: string
  description: string
  contribution: string
  stack: string[]
  breakout?: boolean
  images: {
    src: string
    alt: string
    aspect: 'wide' | 'standard'
    position?: 'center' | 'top'
    placeholder?: boolean
  }[]
  links: LandingLink[]
}

export type ResumeEntry = {
  period: string
  title: string
  organization: string
  location?: string
  description: string
}

export type CapabilityGroup = {
  icon: 'interface' | 'systems' | 'foundations'
  title: string
  description: string
  tools: string
  preview?: {
    src: string
    alt: string
    href: string
    label: string
  }
}

export type GithubActivityItem = {
  repository: string
  repositoryHref: string
  title: string
  date: string
  dateTime: string
  status: 'Pull request' | 'Merged'
  href?: string
  additions?: number
  deletions?: number
  comments?: number
}

export type GithubActivityPreview = {
  title: string
  description: string
  profileHref: string
  items: readonly GithubActivityItem[]
}

export const landingPageContent = {
  identity: {
    name: 'Navdeep Singh',
    introduction:
      'Currently building Navdeep UI, an open-source React component library and registry that helps developers ship polished, accessible interfaces without rebuilding the same foundations. I am passionate about design, contribute to open source, and bring practical full-stack experience to turning product ideas into reusable, maintainable software.',
    links: [
      { label: 'Resume', href: '/resume/resume.pdf', external: true, icon: 'resume' },
      {
        label: 'LinkedIn',
        href: portfolioSiteConfig.links.linkedin,
        external: true,
        icon: 'linkedin',
      },
      { label: 'GitHub', href: portfolioSiteConfig.links.github, external: true, icon: 'github' },
    ] satisfies LandingLink[],
  },
  about:
    'I enjoy turning product ideas into polished React and Next.js interfaces, with particular attention to reusable components, thoughtful motion, accessibility, and interaction details. I’m looking to grow within a product team that values both strong design and clean engineering.',
  // Fallback content used when GitHub is unavailable or its token is not configured.
  githubActivity: {
    title: 'Contribution activity',
    description: 'A snapshot of recent pull-request work across open-source.',
    profileHref: portfolioSiteConfig.links.github,
    items: [
      {
        repository: 'usekaneo/kaneo',
        repositoryHref: 'https://github.com/usekaneo/kaneo',
        title: 'fix: prevent oversized workflow column drag preview (#1394)',
        date: 'Jul 14',
        dateTime: '2026-07-14',
        status: 'Pull request',
        href: 'https://github.com/usekaneo/kaneo/pull/1394',
        additions: 52,
        deletions: 3,
        comments: 8,
      },
      {
        repository: 'Navdeepannu/Portfolio',
        repositoryHref: 'https://github.com/Navdeepannu/Portfolio',
        title: 'Refactor/split portfolio UI',
        date: 'Jul 15',
        dateTime: '2026-07-15',
        status: 'Merged',
      },
      {
        repository: 'Navdeepannu/Portfolio',
        repositoryHref: 'https://github.com/Navdeepannu/Portfolio',
        title: 'Add animation improvement skills and standards documentation',
        date: 'Jul 15',
        dateTime: '2026-07-15',
        status: 'Merged',
      },
    ],
  } satisfies GithubActivityPreview,
  projects: [
    {
      title: 'Personal Portfolio & UI Registry',
      description:
        'An open-source React registry for reusable components, blocks, and illustrations.',
      contribution: 'Design direction, frontend architecture, registry tooling, and documentation',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      breakout: true,
      images: [
        {
          src: '/sections/design1.png',
          alt: 'Dark healthcare landing-page block with a focused nutrition app mockup',
          aspect: 'wide',
          position: 'top',
        },
        {
          src: '/sections/design3.png',
          alt: 'Light product landing-page block with an AI workspace dashboard preview',
          aspect: 'wide',
          position: 'top',
        },
        {
          src: '/sections/design2.png',
          alt: 'Interface preview used as a temporary Navdeep UI project detail image',
          aspect: 'wide',
          position: 'top',
          placeholder: true,
        },
      ],
      links: [
        { label: 'Explore UI', href: `${SITE_ORIGINS.ui}/components`, external: true },
        { label: 'Browse blocks', href: `${SITE_ORIGINS.ui}/blocks`, external: true },
      ],
    },
    {
      title: 'CableLink Solutions',
      description: 'A responsive client website for a telecommunications services business.',
      contribution:
        'Requirements, interface design, Next.js development, content polish, and deployment',
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Responsive UI', 'SEO'],
      images: [
        {
          src: '/projects/project-1.png',
          alt: 'CableLink Solutions website with service navigation and a network cabling hero',
          aspect: 'wide',
          position: 'top',
        },
        {
          src: '/sections/design4.png',
          alt: 'Interface preview used as a temporary CableLink Solutions project detail image',
          aspect: 'wide',
          placeholder: true,
        },
        {
          src: '/sections/design5.png',
          alt: 'Interface preview used as a temporary CableLink Solutions project detail image',
          aspect: 'wide',
          placeholder: true,
        },
      ],
      links: [
        { label: 'Visit live site', href: 'https://www.cablelinksolutions.ca', external: true },
      ],
    },
    {
      title: 'Invora Invoice Builder',
      description: 'An invoice builder with dynamic forms, live totals, and a print-ready preview.',
      contribution:
        'Product UI, form state, invoice calculations, reusable components, and document layout',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Data handling'],
      images: [
        {
          src: '/projects/project-2.png',
          alt: 'Invora invoice builder showing editable form fields beside a live invoice preview',
          aspect: 'standard',
          position: 'top',
        },
        {
          src: '/sections/design6.png',
          alt: 'Interface preview used as a temporary Invora project detail image',
          aspect: 'wide',
          placeholder: true,
        },
        {
          src: '/sections/design7.png',
          alt: 'Interface preview used as a temporary Invora project detail image',
          aspect: 'wide',
          placeholder: true,
        },
      ],
      links: [
        {
          label: 'Open invoice builder',
          href: 'https://invoicely-two.vercel.app/',
          external: true,
        },
      ],
    },
  ] satisfies LandingProject[],
  experience: [
    {
      period: '2024—Present',
      title: 'Frontend Developer / Design Engineer',
      organization: 'Freelance & client work',
      location: 'Toronto, Canada',
      description:
        'Designing and developing responsive client websites, landing pages, portfolio work, and practical product interfaces from requirements through production deployment.',
    },
  ] satisfies ResumeEntry[],
  capabilities: [
    {
      icon: 'interface',
      title: 'Interface Engineering',
      description:
        'Responsive, accessible React interfaces with clear state, resilient layouts, and careful browser behavior.',
      tools: 'React · Next.js App Router · TypeScript · JavaScript · Tailwind CSS · Motion',
    },
    {
      icon: 'systems',
      title: 'Design Systems & UI',
      description:
        'Reusable primitives and patterns shaped by typography, spacing, hierarchy, interaction states, and documentation.',
      tools: 'shadcn/ui · Component architecture · Design tokens · Figma · Accessibility',
      preview: {
        src: '/sections/design3.png',
        alt: 'Preview of a Navdeep UI component layout',
        href: `${SITE_ORIGINS.ui}/components`,
        label: 'Browse Navdeep UI components',
      },
    },
    {
      icon: 'foundations',
      title: 'Product Foundations',
      description:
        'Practical full-stack delivery with attention to performance, search visibility, deployment, and maintainability.',
      tools: 'Node.js · REST APIs · SQL · Git · Vercel · Frontend performance · SEO',
    },
  ] satisfies CapabilityGroup[],
  education: [
    {
      period: 'Jan 2024—Sept 2025',
      title: 'Computer Programming',
      organization: 'Humber College Institute of Technology & Advanced Learning',
      location: 'Toronto, Canada',
      description:
        'Coursework included web development, programming fundamentals, databases, SQL, software testing, systems analysis, and technical documentation.',
    },
  ] satisfies ResumeEntry[],
  closing: {
    title: 'Interested in building thoughtful, production-quality interfaces together?',
    links: [
      { label: 'Email', href: 'mailto:navdeepannu0@gmail.com' },
      { label: 'LinkedIn', href: portfolioSiteConfig.links.linkedin, external: true },
      { label: 'GitHub', href: portfolioSiteConfig.links.github, external: true },
      { label: 'Resume', href: '/resume/resume.pdf', external: true },
    ] satisfies LandingLink[],
  },
} as const
