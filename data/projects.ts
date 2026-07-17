import { SITE_ORIGINS } from '@/lib/sites'

export type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

export type ProjectImage = {
  src: string
  alt: string
  position?: 'center' | 'top'
  placeholder?: boolean
}

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  role: string
  stack: string[]
  featured?: boolean
  image: string
  imageAlt: string
  images: ProjectImage[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    slug: 'ui-library',
    title: 'Navdeep UI',
    summary: 'Open registry for reusable components, blocks, and illustrations',
    description:
      'A shadcn-compatible React registry for reusable components, content blocks, and illustrations.',
    role: 'Design direction · Frontend architecture',
    stack: ['Next.js', 'React', 'TypeScript'],
    featured: true,
    image: '/sections/design3.png',
    imageAlt: 'Light product landing-page block with an AI workspace dashboard preview',
    images: [
      {
        src: '/sections/design3.png',
        alt: 'Light product landing-page block with an AI workspace dashboard preview',
        position: 'top',
      },
      {
        src: '/sections/design1.png',
        alt: 'Dark interface preview used as a temporary Navdeep UI project detail image',
        position: 'top',
        placeholder: true,
      },
      {
        src: '/sections/design2.png',
        alt: 'Interface preview used as a temporary Navdeep UI project detail image',
        position: 'top',
        placeholder: true,
      },
    ],
    links: [
      { label: 'Explore components', href: `${SITE_ORIGINS.ui}/components`, external: true },
      { label: 'Browse blocks', href: `${SITE_ORIGINS.ui}/blocks`, external: true },
    ],
  },
  {
    slug: 'cablelink-solutions',
    title: 'CableLink Solutions',
    summary: 'Marketing site for a telecommunications services company',
    description: 'A responsive client website for a telecommunications services business.',
    role: 'Requirements · Interface design · Frontend development',
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    featured: true,
    image: '/projects/project-1.png',
    imageAlt: 'CableLink Solutions website with service navigation and a network cabling hero',
    images: [
      {
        src: '/projects/project-1.png',
        alt: 'CableLink Solutions website with service navigation and a network cabling hero',
        position: 'top',
      },
      {
        src: '/sections/design4.png',
        alt: 'Interface preview used as a temporary CableLink Solutions project detail image',
        placeholder: true,
      },
      {
        src: '/sections/design5.png',
        alt: 'Interface preview used as a temporary CableLink Solutions project detail image',
        placeholder: true,
      },
    ],
    links: [
      { label: 'Visit live site', href: 'https://www.cablelinksolutions.ca', external: true },
    ],
  },
  {
    slug: 'invora',
    title: 'Invora Invoice Builder',
    summary: 'Invoice-generation app for freelancers and small businesses',
    description: 'An invoice builder with dynamic forms, live totals, and a print-ready preview.',
    role: 'Product UI · Forms · Document layout',
    stack: ['Next.js', 'React', 'TypeScript'],
    featured: true,
    image: '/projects/project-2.png',
    imageAlt: 'Invora invoice builder showing editable form fields beside a live invoice preview',
    images: [
      {
        src: '/projects/project-2.png',
        alt: 'Invora invoice builder showing editable form fields beside a live invoice preview',
        position: 'top',
      },
      {
        src: '/sections/design6.png',
        alt: 'Interface preview used as a temporary Invora project detail image',
        placeholder: true,
      },
      {
        src: '/sections/design7.png',
        alt: 'Interface preview used as a temporary Invora project detail image',
        placeholder: true,
      },
    ],
    links: [
      { label: 'Open invoice builder', href: 'https://invoicely-two.vercel.app/', external: true },
    ],
  },
]
