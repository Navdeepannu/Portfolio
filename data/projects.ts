export type ProjectStatus = 'shipped' | 'in-progress' | 'archived'

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

export type CaseStudySection = {
  points: string[]
}

export type CaseStudy = {
  problem: CaseStudySection
  solution: CaseStudySection
  outcome: CaseStudySection
}

export type Project = {
  slug: string
  reference: string
  filename: string
  title: string
  summary: string
  description: string
  role: string
  stack: string[]
  year: number
  status: ProjectStatus
  featured?: boolean
  image: string
  imageAlt: string
  links: ProjectLink[]
  caseStudy: CaseStudy
}

export const projectsPageMeta = {
  statement:
    'Documented work across product interfaces, design systems, and shipped applications — from problem framing through production delivery.',
  expertise: [
    'Design Engineering',
    'Frontend Architecture',
    'UI Systems',
    'Product Development',
  ],
  productFocus: [
    'SaaS & billing tools',
    'Marketing & brand sites',
    'Internal operations dashboards',
    'Component registries',
  ],
  systemsBuilt: [
    'Design-to-code workflows',
    'Reusable component libraries',
    'Auth & data-driven UIs',
    'Accessible interface patterns',
  ],
  capabilities: [
    'Interface design in code',
    'Design system architecture',
    'React & Next.js delivery',
    'Motion & interaction craft',
  ],
} as const

export const projects: Project[] = [
  {
    slug: 'invora',
    reference: 'INV-001',
    filename: 'invora.tsx',
    title: 'Invora',
    summary: 'Invoicing SaaS for freelancers and small businesses',
    description:
      'End-to-end product for generating branded invoices, tracking payments, and managing client billing workflows.',
    role: 'Design Engineer · Full Stack',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Express'],
    year: 2024,
    status: 'shipped',
    featured: true,
    image: '/projects/project-2.png',
    imageAlt: 'Invora invoicing application dashboard preview',
    links: [
      { label: 'Live site', href: 'https://invora-rust.vercel.app/', external: true },
      { label: 'GitHub', href: 'https://github.com/navdeepannu', external: true },
    ],
    caseStudy: {
      problem: {
        points: [
          'Manual invoicing ate into billable time for freelancers',
          'Spreadsheets produced inconsistent, unprofessional output',
          'No single view for payment and client status',
        ],
      },
      solution: {
        points: [
          'Guided flows for fast invoice creation',
          'Branded PDF export with reusable templates',
          'Dashboard surfacing payment status at a glance',
        ],
      },
      outcome: {
        points: [
          'Invoice creation reduced to under 30 seconds',
          'Shipped auth, PDF export, and client management',
          'Reusable component system for rapid iteration',
        ],
      },
    },
  },
  {
    slug: 'cablelink-solutions',
    reference: 'WEB-001',
    filename: 'cablelink-solutions.tsx',
    title: 'CableLink Solutions',
    summary: 'Marketing site for a telecommunications services company',
    description:
      'Full website design and frontend build — positioning, service pages, and conversion-focused contact flows.',
    role: 'Frontend · Design',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    year: 2023,
    status: 'shipped',
    featured: true,
    image: '/projects/project-1.png',
    imageAlt: 'CableLink Solutions marketing website preview',
    links: [
      { label: 'Live site', href: 'https://www.cablelinksolutions.ca', external: true },
    ],
    caseStudy: {
      problem: {
        points: [
          'Complex telecom services were hard to explain online',
          'No credible site to generate qualified inbound leads',
          'Prospects lacked clear paths to contact sales',
        ],
      },
      solution: {
        points: [
          'Service-specific landing patterns with clear hierarchy',
          'Trust signals and coverage-area content structure',
          'Streamlined contact flows for lead capture',
        ],
      },
      outcome: {
        points: [
          'Responsive site with sub-2s LCP on mobile',
          'Maintainable page system the client can extend',
          'Improved discoverability and inquiry conversion',
        ],
      },
    },
  },
  {
    slug: 'ui-kit-registry',
    reference: 'SYS-001',
    filename: 'ui-kit-registry.ts',
    title: 'UI Kit & Registry',
    summary: 'Copy-paste component library for React and Next.js',
    description:
      'Open component and block registry with shadcn-compatible entries, live previews, and production-ready patterns.',
    role: 'Design Engineer · Systems',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'shadcn/ui'],
    year: 2025,
    status: 'in-progress',
    image: '/sections/design1.png',
    imageAlt: 'UI component registry preview grid',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Blocks', href: '/blocks' },
    ],
    caseStudy: {
      problem: {
        points: [
          'UI patterns scattered across projects with no single source',
          'No consistent preview or documentation workflow',
          'Hard to distribute reusable components to new work',
        ],
      },
      solution: {
        points: [
          'Registry-driven library with categorized entries',
          'Live previews with copy-paste install paths',
          'Unified blocks and components pipeline',
        ],
      },
      outcome: {
        points: [
          'Documented JSON registry entries for each pattern',
          'Recruiter- and developer-friendly browse surfaces',
          'Growing artifact demonstrating systems thinking',
        ],
      },
    },
  },
  {
    slug: 'client-dashboard',
    reference: 'APP-001',
    filename: 'app-dashboard.tsx',
    title: 'Client Operations Dashboard',
    summary: 'Internal dashboard for tracking jobs, crews, and scheduling',
    description:
      'Role-based dashboard with data tables, status workflows, and mobile-friendly field views for operations teams.',
    role: 'Frontend · Product',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    year: 2023,
    status: 'shipped',
    featured: true,
    image: '/sections/design5.png',
    imageAlt: 'Operations dashboard interface preview',
    links: [],
    caseStudy: {
      problem: {
        points: [
          'Job coordination spread across spreadsheets and calls',
          'Duplicate data entry caused delays and errors',
          'Field teams lacked real-time task visibility',
        ],
      },
      solution: {
        points: [
          'Filterable job views with status-driven workflows',
          'Role-based permissions for crew assignment',
          'Mobile layouts for on-site updates',
        ],
      },
      outcome: {
        points: [
          'Three legacy spreadsheets consolidated into one system',
          'Managers gained real-time job status visibility',
          'Reduced coordination overhead across teams',
        ],
      },
    },
  },
]
