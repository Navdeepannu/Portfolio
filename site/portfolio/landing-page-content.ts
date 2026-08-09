import { asset } from '@/lib/assets'
import { portfolioSiteConfig } from '@/lib/site'
import { SITE_ORIGINS } from '@/lib/sites'

export type LandingLink = {
  label: string
  href: string
  external?: boolean
  icon?: 'resume' | 'linkedin' | 'github'
}

export type LandingProject = {
  category: string
  title: string
  problem: string
  contribution: string
  outcome: string
  stack: string[]
  images: {
    src: string
    darkSrc?: string
    alt: string
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
  highlights?: readonly string[]
}

export type CapabilityGroup = {
  icon: 'interface' | 'systems' | 'foundations'
  title: string
  description: string
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
  about: [
    'I’m a frontend-focused software engineer interested in the intersection of interface design, component architecture, accessibility, and product engineering.',
    'I currently build NavUI, work on independent product applications, and contribute frontend improvements to open-source projects such as Kaneo.',
    'I’m especially interested in frontend, design-engineering, UI systems, and product-engineering roles where implementation quality matters.',
  ],
  // Fallback content used when GitHub is unavailable or its token is not configured.
  githubActivity: {
    title: 'Contribution activity',
    description: 'A snapshot of recent pull-request work across open-source.',
    profileHref: portfolioSiteConfig.links.github,
    items: [
      {
        repository: 'usekaneo/kaneo',
        repositoryHref: 'https://github.com/usekaneo/kaneo',
        title: 'feat: add Saturday week-start option',
        date: 'Jul 28',
        dateTime: '2026-07-28T22:21:32Z',
        status: 'Merged',
        href: 'https://github.com/usekaneo/kaneo/pull/1416',
        additions: 67,
        deletions: 28,
      },
      {
        repository: 'usekaneo/kaneo',
        repositoryHref: 'https://github.com/usekaneo/kaneo',
        title: 'fix: prevent oversized workflow column drag preview (#1394)',
        date: 'Jul 15',
        dateTime: '2026-07-15T15:26:12Z',
        status: 'Merged',
        href: 'https://github.com/usekaneo/kaneo/pull/1397',
        additions: 52,
        deletions: 3,
        comments: 8,
      },
      {
        repository: 'Navdeepannu/Portfolio',
        repositoryHref: 'https://github.com/Navdeepannu/Portfolio',
        title: 'Refine portfolio navigation and GitHub activity',
        date: 'Aug 2',
        dateTime: '2026-08-02T01:36:23Z',
        status: 'Merged',
        href: 'https://github.com/Navdeepannu/Portfolio/pull/29',
        additions: 0,
        deletions: 1,
      },
      {
        repository: 'Navdeepannu/Portfolio',
        repositoryHref: 'https://github.com/Navdeepannu/Portfolio',
        title: 'Add navigation assets for light and dark themes',
        date: 'Aug 2',
        dateTime: '2026-08-02T00:56:01Z',
        status: 'Merged',
        href: 'https://github.com/Navdeepannu/Portfolio/pull/28',
        additions: 138,
        deletions: 88,
      },
    ],
  } satisfies GithubActivityPreview,
  projects: [
    {
      category: 'Open source · UI systems',
      title: 'NavUI — Component Library and Registry',
      problem: 'Teams repeatedly rebuild the same responsive sections and interaction patterns.',
      contribution:
        'Design direction, component APIs, registry architecture, previews, documentation, and accessibility.',
      outcome:
        'A shadcn-compatible registry with 40+ reusable blocks, components, and illustrations.',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
      images: [
        {
          src: asset('hero-light.png'),
          darkSrc: asset('hero-dark.png'),
          alt: 'Healthcare landing-page block with a focused nutrition app mockup',
          position: 'top',
        },
        {
          src: asset('logo-cloud-light.png'),
          darkSrc: asset('logo-cloud-dark.png'),
          alt: 'Product landing-page block with an AI workspace dashboard preview',
          position: 'top',
        },
        {
          src: asset('teams-light.png'),
          darkSrc: asset('teams-dark.png'),
          alt: 'Interface preview used as a temporary Nav UI project detail image',
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
      category: 'Client work · Production',
      title: 'CableLink Solutions',
      problem:
        'The business needed clearer service information and a stronger path from search to enquiry.',
      contribution:
        'Requirements, information architecture, responsive UI, service pages, SEO, and deployment.',
      outcome:
        'A bilingual production site with focused service journeys and a direct assessment-request flow.',
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Responsive UI', 'SEO'],
      images: [
        {
          src: asset('cable-one.png'),
          alt: 'CableLink Solutions website with service navigation and a network cabling hero',
          position: 'top',
        },
        {
          src: asset('cable-two.png'),
          alt: 'Interface preview used as a temporary CableLink Solutions project detail image',
          placeholder: true,
        },
        {
          src: asset('cable-three.png'),
          alt: 'Interface preview used as a temporary CableLink Solutions project detail image',
          placeholder: true,
        },
      ],
      links: [
        { label: 'Visit live site', href: 'https://www.cablelinksolutions.ca', external: true },
      ],
    },
    {
      category: 'Independent product · Product engineering',
      title: 'Invora Invoice Builder',
      problem: 'Invoice editing, calculations, templates, and exports needed to stay consistent.',
      contribution:
        'Synchronized form state, live totals, reusable client data, templates, and document export.',
      outcome: 'One invoice model drives editing, preview, calculations, and exported documents.',
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Data handling'],
      images: [
        {
          src: asset('invora-one.png'),
          alt: 'Invora invoice builder showing editable form fields beside a live invoice preview',
          position: 'top',
        },
        {
          src: asset('invora-two.png'),
          alt: 'Interface preview used as a temporary Invora project detail image',
          placeholder: true,
        },
        {
          src: asset('invora-three.png'),
          alt: 'Interface preview used as a temporary Invora project detail image',
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
      title: 'Frontend Engineer / Design Engineer',
      organization: 'Freelance & client work',
      location: 'Toronto, Canada',
      description:
        'Independent work spanning client delivery, reusable UI systems, and practical product interfaces.',
      highlights: [
        'Designed and shipped responsive client websites from requirements through production deployment.',
        'Built and documented 40+ reusable components, blocks, and interaction patterns.',
        'Delivered responsive layouts, forms, content architecture, SEO foundations, and deployment workflows with Next.js and TypeScript.',
      ],
    },
  ] satisfies ResumeEntry[],
  capabilities: [
    {
      icon: 'interface',
      title: 'Interface Engineering',
      description:
        'Responsive, accessible React interfaces with clear state, resilient layouts, and careful browser behavior.',
    },
    {
      icon: 'systems',
      title: 'Design Systems & UI',
      description:
        'Reusable primitives and patterns shaped by typography, spacing, hierarchy, interaction states, and documentation.',
      preview: {
        src: '/sections/design3.png',
        alt: 'Preview of a Nav UI component layout',
        href: `${SITE_ORIGINS.ui}/components`,
        label: 'Browse Nav UI components',
      },
    },
    {
      icon: 'foundations',
      title: 'Product Foundations',
      description:
        'Practical full-stack delivery with attention to performance, search visibility, deployment, and maintainability.',
    },
  ] satisfies CapabilityGroup[],
  skillGroups: [
    {
      title: 'Core frontend',
      items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      title: 'UI engineering',
      items: [
        'shadcn/ui',
        'Motion',
        'Responsive design',
        'Accessibility',
        'Component architecture',
        'Design systems',
      ],
    },
    {
      title: 'Full-stack',
      items: ['Node.js', 'REST APIs', 'PostgreSQL', 'SQL', 'Prisma'],
    },
    {
      title: 'Product and delivery',
      items: ['Figma', 'Git', 'GitHub', 'Vercel'],
    },
  ],
  closing: {
    title: 'Let’s build something thoughtful.',
    description:
      'I’m open to frontend and design-engineering opportunities, open-source collaboration, and selected client projects.',
    links: [
      { label: 'Email me', href: 'mailto:navdeepannu0@gmail.com' },
      { label: 'LinkedIn', href: portfolioSiteConfig.links.linkedin, external: true },
    ] satisfies LandingLink[],
  },
} as const
