import { siteConfig } from '@/lib/site'

/* -------------------------------------------------------------------------- */
/* Recruiter-only content. Kept separate from the shared portfolio-config so   */
/* developer mode is never affected by recruiter copy or shape changes.        */
/* -------------------------------------------------------------------------- */

export const RESUME_HREF = '/resume.pdf'
export const RESUME_UPDATED = 'June 2026'

export const recruiterHero = {
  greeting: "Hi, I'm",
  name: 'Navdeep Singh',
  roles: ['Frontend Engineer', 'Design Engineer', 'Frontend-focused Full Stack'],
  paragraphs: [
    'Frontend-focused full stack engineer building production interfaces with strong UI craft, accessibility, and maintainable architecture.',
    'I partner closely with product and design — from discovery through launch — and communicate clearly about tradeoffs and timelines.',
  ],
  linkedinHref: siteConfig.links.linkedin,
  twitterHref: siteConfig.links.twitter,
  primaryCTA: { label: 'Download resume', href: RESUME_HREF },
  secondaryCTA: { label: 'Get in touch', href: '#contact' },
}

export type SnapshotCardId = 'strengths' | 'proof' | 'thinking' | 'stack' | 'location' | 'resume'

export const recruiterSnapshot = {
  eyebrow: 'Snapshot',
  title: 'Who I am, what I build, and how I think — at a glance.',
  description:
    'A recruiter-focused overview of my craft, proof of work, product thinking, stack, and where to find me.',
  stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js'],
  cards: {
    strengths: {
      heading: 'Design Engineer by Practice',
      description:
        'Bridging design, engineering and product thinking to create polished digital experiences.',
    },
    proof: {
      heading: 'Production Work, Not Demos',
      description: 'A collection of products, systems and interfaces built for real-world use.',
    },
    thinking: {
      heading: 'Built Around Outcomes',
      description:
        'Every decision is driven by usability, maintainability and long-term product value.',
    },
    stack: {
      heading: 'Modern Web Technologies',
      description: 'The tools powering most of my frontend and full-stack projects.',
    },
    location: {
      heading: 'Based in Toronto',
      description: 'Working with teams across Canada and remotely around the world.',
    },
    resume: {
      heading: 'Experience at a Glance',
      description: 'Projects, skills and technical experience summarized in one place.',
    },
  },
} satisfies {
  eyebrow: string
  title: string
  description: string
  stack: string[]
  cards: Record<SnapshotCardId, { heading: string; description: string }>
}

export const recruiterProjectsMeta = {
  eyebrow: 'Selected work',
  title: 'Production software, framed by impact.',
  description: 'A few shipped products. Scan the highlights, open the live site.',
}

export type Strength = {
  id: string
  label: string
  summary: string
  level: string
  technologies: string[]
  proof: string
  image: string
}

export const recruiterStrengths = {
  eyebrow: 'Technical strengths',
  title: 'What I bring to an engineering team.',
  description:
    'Pick a capability to see where it shows up in real work — depth on the frontend, full-stack delivery when it counts.',
  capabilities: [
    {
      id: 'frontend',
      label: 'Frontend',
      summary:
        'Building accessible, responsive interfaces with React and Next.js — focused on performance, motion, and maintainable component architecture.',
      level: 'Primary expertise',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Accessibility'],
      proof: 'Invora dashboard, CableLink marketing site, this portfolio + UI registry.',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlp3ArUvDLM0p8g2PxJVvac3HKDEiQUlum9GC6',
    },
    {
      id: 'design-systems',
      label: 'Design Systems',
      summary:
        'Designing reusable component libraries and tokens that scale across products — bridging Figma and code with a single source of truth.',
      level: 'Core strength',
      technologies: ['shadcn/ui', 'Radix', 'Tailwind tokens', 'Figma', 'Storybook patterns'],
      proof: '40+ component registry, blocks library, shared design tokens.',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlBE1JQ6bM0rCoZtdKDAVO8yw7eSuvUb1LhYIJ',
    },
    {
      id: 'backend',
      label: 'Backend',
      summary:
        'Designing APIs, auth flows, and data layers to ship complete products — not just the UI on top of them.',
      level: 'Working proficiency',
      technologies: ['Node.js', 'Express', 'REST APIs', 'Auth flows', 'Prisma'],
      proof: 'Invora invoicing backend — auth, PDF export, client management.',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh4cfuGJ0RlaETPbLcZQjyfg2StNvuB13w8rI',
    },
    {
      id: 'database',
      label: 'Database',
      summary:
        'Modeling relational schemas and writing efficient queries that keep product features fast and consistent.',
      level: 'Working proficiency',
      technologies: ['PostgreSQL', 'Prisma', 'Schema design', 'Migrations'],
      proof: 'Invora billing data model and client/payment relationships.',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN',
    },
    {
      id: 'deployment',
      label: 'Deployment',
      summary:
        'Shipping to production with CI/CD, preview environments, and a constant eye on Core Web Vitals.',
      level: 'Working proficiency',
      technologies: ['Vercel', 'CI/CD', 'Docker', 'Performance', 'Web Vitals'],
      proof: 'Sub-2s LCP on shipped marketing sites; automated preview deploys.',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl2qccwOLmnCKEMaPSHlkN9mY0IgJTt8dwQzFb',
    },
  ] satisfies Strength[],
}

export type ProofPillar = {
  id: string
  label: string
  title: string
  description: string
  metrics: { value: string; label: string }[]
  preview: string
  previewAlt: string
  href: string
  cta: string
}

export const recruiterProof = {
  eyebrow: 'Proof of work',
  title: 'I build scalable UI systems, not one-off screens.',
  description:
    'The same design-engineering practice behind my products — distilled into reusable, documented, production-ready systems.',
  pillars: [
    {
      id: 'design-systems',
      label: 'Design Systems',
      title: 'Tokens & primitives',
      description:
        'Color, type, spacing, and motion tokens that keep every interface consistent and themeable.',
      metrics: [
        { value: '1', label: 'Source of truth' },
        { value: 'Light/Dark', label: 'Theming' },
      ],
      preview: '/sections/design3.png',
      previewAlt: 'Design system tokens preview',
      href: '/components',
      cta: 'Explore the system',
    },
    {
      id: 'components',
      label: 'Reusable Components',
      title: 'Component library',
      description:
        'Accessible, copy-paste React components with motion and shadcn-compatible registry entries.',
      metrics: [
        { value: '40+', label: 'Components' },
        { value: 'a11y', label: 'Accessible' },
      ],
      preview: '/sections/design1.png',
      previewAlt: 'Reusable component library preview',
      href: '/components',
      cta: 'Browse components',
    },
    {
      id: 'blocks',
      label: 'Production Blocks',
      title: 'Page blocks',
      description:
        'Full sections — heroes, auth, footers, logo clouds — ready to drop into real applications.',
      metrics: [
        { value: '7', label: 'Categories' },
        { value: 'Live', label: 'Previews' },
      ],
      preview: '/sections/design5.png',
      previewAlt: 'Production UI blocks preview',
      href: '/blocks',
      cta: 'Explore blocks',
    },
  ] satisfies ProofPillar[],
}

export const recruiterWhy = {
  eyebrow: 'Why hire me',
  title: 'How I actually work.',
  description: 'Less buzzwords, more how I show up on a team day to day.',
  cards: [
    {
      id: 'product-thinking',
      title: 'Product thinking',
      story:
        'I start from the user problem, not the ticket. On Invora I cut invoice creation to under 30 seconds because that was the metric that mattered to freelancers.',
      span: 'lg',
    },
    {
      id: 'design-engineering',
      title: 'Design engineering',
      story:
        'I design in code. Figma is a starting point — the real design happens in the browser where motion, spacing, and states are tuned against the live product.',
      span: 'md',
    },
    {
      id: 'ownership',
      title: 'Ownership',
      story:
        'I take features from discovery to production — schema, API, UI, and deploy — and stay accountable for how they perform after launch.',
      span: 'md',
    },
    {
      id: 'communication',
      title: 'Communication',
      story:
        'I write clearly about tradeoffs and timelines so product and design always know where things stand. No surprises late in a sprint.',
      span: 'md',
    },
    {
      id: 'execution',
      title: 'Execution',
      story:
        'I ship. Shipped marketing sites, an invoicing SaaS, and a growing component registry — consistently, with an eye on quality and performance.',
      span: 'lg',
    },
  ],
}

export const recruiterContact = {
  eyebrow: 'Contact',
  title: "Let's talk about your team or product.",
  description:
    'Open to full-time and contract frontend / design-engineering roles. The fastest way to reach me is email.',
  email: 'navdeepannu0@gmail.com',
  signals: [
    { label: 'Response time', value: 'Within 1 business day' },
    { label: 'Availability', value: 'Full-time & contract' },
    { label: 'Preferred contact', value: 'Email or LinkedIn' },
  ],
  methods: [
    {
      label: 'Email',
      value: 'navdeepannu0@gmail.com',
      href: 'mailto:navdeepannu0@gmail.com?subject=Role%20opportunity%20for%20Navdeep',
      primary: true,
    },
    {
      label: 'LinkedIn',
      value: 'navdeepsingh0',
      href: siteConfig.links.linkedin,
    },
    {
      label: 'GitHub',
      value: 'navdeepannu',
      href: 'https://github.com/navdeepannu',
    },
    {
      label: 'Location',
      value: 'Toronto, Canada',
      href: 'https://maps.google.com/?q=Toronto,Canada',
    },
  ],
}
