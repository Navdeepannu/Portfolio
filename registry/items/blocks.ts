import { defineBlock } from '../define-block'
import type { BlockDefinition, RegistryFileEntry, RegistryItemStatus } from '../types'

type BlockItemInput = {
  slug: string
  title: string
  description: string
  category: string
  source: string
  status: RegistryItemStatus
  dependencies?: string[]
  registryDependencies?: string[]
  supportingFiles?: RegistryFileEntry[]
}

function blockItem(input: BlockItemInput): BlockDefinition {
  const primaryFile: RegistryFileEntry = {
    path: input.source,
    target: `@${input.source}`,
    type: 'registry:component',
  }
  const files = [primaryFile, ...(input.supportingFiles ?? [])]

  return defineBlock({
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: input.category,
    tags: [input.category],
    status: input.status,
    sourceFiles: files.map((file) => ({ path: file.path, language: 'tsx' })),
    registry: {
      type: 'registry:block',
      dependencies: input.dependencies ?? [],
      registryDependencies: input.registryDependencies ?? [],
      files,
    },
  })
}

/**
 * Canonical block definitions. A source file is never published merely because
 * it exists; every block below has an explicit lifecycle status.
 */
export const blockItems: BlockDefinition[] = [
  blockItem({
    slug: 'blog-section-one',
    title: 'Blog Section One',
    description:
      'A semantic blog archive grouped by year, with aligned dates, useful metadata, and accessible row links.',
    category: 'blog',
    source: 'components/blocks/blog/blog-section-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
  }),
  blockItem({
    slug: 'contact-section-four',
    title: 'Contact Section Four',
    description:
      'A focused project-inquiry form with contact details and a large editorial heading.',
    category: 'contact',
    source: 'components/blocks/contact/contact-section-four.tsx',
    status: 'published',
    registryDependencies: ['button', 'input', 'label', 'textarea'],
  }),
  blockItem({
    slug: 'contact-section-one',
    title: 'Contact Section One',
    description:
      'A contact directory that routes visitors to sales, support, community, documentation, and developer resources.',
    category: 'contact',
    source: 'components/blocks/contact/contact-section-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
  }),
  blockItem({
    slug: 'contact-section-three',
    title: 'Contact Section Three',
    description: 'A compact project contact form paired with a concise service introduction.',
    category: 'contact',
    source: 'components/blocks/contact/contact-section-three.tsx',
    status: 'published',
  }),
  blockItem({
    slug: 'contact-section-two',
    title: 'Contact Section Two',
    description:
      'A split contact section with a consultation summary and detailed project inquiry form.',
    category: 'contact',
    source: 'components/blocks/contact/contact-section-two.tsx',
    status: 'published',
  }),
  blockItem({
    slug: 'content-section-four',
    title: 'Content Section Four',
    description:
      'A connected-publishing story with an animated revision metric, trend visualization, and output checklist.',
    category: 'content',
    source: 'components/blocks/content/content-section-four.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['@navdeep-singh/revision-cycles-illustration'],
  }),
  blockItem({
    slug: 'content-section-one',
    title: 'Content Section One',
    description:
      'A restrained principles section with a clear introduction and a responsive set of supporting ideas.',
    category: 'content',
    source: 'components/blocks/content/content-section-one.tsx',
    status: 'published',
    dependencies: ['motion'],
    registryDependencies: [
      '@navdeep-singh/fast-by-default-illustration',
      '@navdeep-singh/designed-for-focus-illustration',
      '@navdeep-singh/flexible-at-scale-illustration',
    ],
  }),
  blockItem({
    slug: 'content-section-three',
    title: 'Content Section Three',
    description:
      'A structured feature grid with one dominant narrative and two focused supporting ideas.',
    category: 'content',
    source: 'components/blocks/content/content-section-three.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['@navdeep-singh/release-workflow-illustration'],
  }),
  blockItem({
    slug: 'content-section-two',
    title: 'Content Section Two',
    description:
      'An editorial product story with balanced copy, configurable local media, and optional caption metadata.',
    category: 'content',
    source: 'components/blocks/content/content-section-two.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
  }),
  blockItem({
    slug: 'cta-section-one',
    title: 'CTA Section One',
    description: 'A polished call to action with primary and secondary links for clear next steps.',
    category: 'cta',
    source: 'components/blocks/cta/cta-section-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'cta-section-three',
    title: 'CTA Section Three',
    description: 'A centered product call to action over a restrained fading dot field.',
    category: 'cta',
    source: 'components/blocks/cta/cta-section-three.tsx',
    status: 'draft',
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'cta-section-two',
    title: 'CTA Section Two',
    description:
      'A split call to action with primary and secondary actions over a signal-line field.',
    category: 'cta',
    source: 'components/blocks/cta/cta-section-two.tsx',
    status: 'draft',
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'faq-section-one',
    title: 'FAQ Section One',
    description: 'A two-column FAQ layout with accessible accordion answers and a support prompt.',
    category: 'faqs',
    source: 'components/blocks/faqs/faq-section-one.tsx',
    status: 'published',
    registryDependencies: ['accordion'],
  }),
  blockItem({
    slug: 'faq-section-three',
    title: 'FAQ Section Three',
    description:
      'An editorial FAQ section with a large introduction and accessible accordion rows.',
    category: 'faqs',
    source: 'components/blocks/faqs/faq-section-three.tsx',
    status: 'published',
    registryDependencies: ['accordion'],
  }),
  blockItem({
    slug: 'faqs-section-two',
    title: 'FAQs Section Two',
    description: 'A centered FAQ section with accessible accordions and a follow-up contact link.',
    category: 'faqs',
    source: 'components/blocks/faqs/faqs-section-two.tsx',
    status: 'published',
    registryDependencies: ['accordion'],
  }),
  blockItem({
    slug: 'feature-section-two',
    title: 'Feature Section Two',
    description:
      'An expandable workflow feature section with autoplay, reduced-motion handling, and three interactive illustrations.',
    category: 'features',
    source: 'components/blocks/features/feature-section-two.tsx',
    status: 'draft',
    dependencies: ['motion'],
  }),
  blockItem({
    slug: 'footer-section-one',
    title: 'Footer Section One',
    description: 'A multi-column product footer with social links and an email newsletter form.',
    category: 'footer',
    source: 'components/blocks/footer/footer-section-one.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'footer-section-two',
    title: 'Footer Section Two',
    description: 'A compact navigation footer with product links, social actions, and legal copy.',
    category: 'footer',
    source: 'components/blocks/footer/footer-section-two.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
  }),
  blockItem({
    slug: 'forgot-password-one',
    title: 'Forgot Password One',
    description:
      'A compact password-recovery card with email input, submit action, and return link.',
    category: 'forgot-password',
    source: 'components/blocks/auth/forgot-password-one.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['button', 'input', 'label'],
  }),
  blockItem({
    slug: 'forgot-password-three',
    title: 'Forgot Password Three',
    description: 'A left-aligned password-recovery form with concise guidance and navigation back.',
    category: 'forgot-password',
    source: 'components/blocks/auth/forgot-password-three.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['button', 'input', 'label'],
  }),
  blockItem({
    slug: 'forgot-password-two',
    title: 'Forgot Password Two',
    description: 'A centered password-recovery form with a prominent heading and return action.',
    category: 'forgot-password',
    source: 'components/blocks/auth/forgot-password-two.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['button', 'input', 'label'],
  }),
  blockItem({
    slug: 'header-four',
    title: 'Header Four',
    description:
      'A responsive header with animated multi-level desktop and mobile navigation menus.',
    category: 'header',
    source: 'components/blocks/header/header-four.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button', 'navigation-menu'],
  }),
  blockItem({
    slug: 'header-one',
    title: 'Header One',
    description:
      'A responsive marketing header with animated mobile navigation and account actions.',
    category: 'header',
    source: 'components/blocks/header/header-one.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'header-three',
    title: 'Header Three',
    description:
      'A payment-product header with grouped navigation menus and a responsive mobile drawer.',
    category: 'header',
    source: 'components/blocks/header/header-three.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
    registryDependencies: ['button', 'navigation-menu'],
  }),
  blockItem({
    slug: 'header-two',
    title: 'Header Two',
    description: 'A responsive marketing header with a bordered shell and animated mobile menu.',
    category: 'header',
    source: 'components/blocks/header/header-two.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'hero-section-four',
    title: 'Hero Section Four',
    description:
      'A complete expense-workflow hero with responsive header, lead form, logo cloud, and supporting illustrations.',
    category: 'hero',
    source: 'components/blocks/hero-section/hero-section-four.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'motion'],
    registryDependencies: [
      'button',
      'label',
      '@navdeep-singh/header-three',
      '@navdeep-singh/logo-cloud-five',
    ],
    supportingFiles: [
      {
        path: 'components/blocks/hero-section/hero-section-four-illustration.tsx',
        target: '@components/blocks/hero-section/hero-section-four-illustration.tsx',
        type: 'registry:component',
      },
    ],
  }),
  blockItem({
    slug: 'hero-section-one',
    title: 'Hero Section One',
    description:
      'A dark product hero with badges, dual actions, and the matching responsive header.',
    category: 'hero',
    source: 'components/blocks/hero-section/hero-section-one.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react', 'lucide-react'],
    registryDependencies: ['badge', 'button', '@navdeep-singh/header-one'],
  }),
  blockItem({
    slug: 'hero-section-three',
    title: 'Hero Section Three',
    description: 'An art-directed hero with shader-backed visuals and a focused primary action.',
    category: 'hero',
    source: 'components/blocks/hero-section/hero-section-three.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react', 'shaders'],
    registryDependencies: ['button'],
  }),
  blockItem({
    slug: 'hero-section-two',
    title: 'Hero Section Two',
    description: 'A motion-led hero with animated copy, grouped reveals, and its matching header.',
    category: 'hero',
    source: 'components/blocks/hero-section/hero-section-two.tsx',
    status: 'published',
    dependencies: ['motion'],
    registryDependencies: [
      '@navdeep-singh/header-two',
      '@navdeep-singh/animated-group',
      '@navdeep-singh/text-effect',
    ],
  }),
  blockItem({
    slug: 'logo-cloud-five',
    title: 'Logo Cloud Five',
    description: 'A headline-led animated logo cloud with responsive brand cards.',
    category: 'logo-cloud',
    source: 'components/blocks/logo-cloud/logo-cloud-five.tsx',
    status: 'published',
    dependencies: ['motion'],
  }),
  blockItem({
    slug: 'logo-cloud-four',
    title: 'Logo Cloud Four',
    description: 'A large animated company grid with a prominent trust statement.',
    category: 'logo-cloud',
    source: 'components/blocks/logo-cloud/logo-cloud-four.tsx',
    status: 'published',
    dependencies: ['motion'],
  }),
  blockItem({
    slug: 'logo-cloud-one',
    title: 'Logo Cloud One',
    description: 'A compact monochrome logo strip for customer or partner proof.',
    category: 'logo-cloud',
    source: 'components/blocks/logo-cloud/logo-cloud-one.tsx',
    status: 'published',
  }),
  blockItem({
    slug: 'logo-cloud-three',
    title: 'Logo Cloud Three',
    description: 'A horizontally framed customer logo strip with restrained typography.',
    category: 'logo-cloud',
    source: 'components/blocks/logo-cloud/logo-cloud-three.tsx',
    status: 'published',
  }),
  blockItem({
    slug: 'logo-cloud-two',
    title: 'Logo Cloud Two',
    description: 'A compact partner logo strip using a mixed icon and wordmark collection.',
    category: 'logo-cloud',
    source: 'components/blocks/logo-cloud/logo-cloud-two.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
  }),
  blockItem({
    slug: 'pricing-section-one',
    title: 'Pricing Section One',
    description:
      'A responsive three-tier pricing section with a monthly and yearly billing switcher.',
    category: 'pricing',
    source: 'components/blocks/pricing/pricing-section-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
    registryDependencies: ['badge', 'button', 'card', 'tabs'],
  }),
  blockItem({
    slug: 'process-section-one',
    title: 'Process Section One',
    description:
      'A sticky how-it-works narrative with a normal mobile flow and a sequence of image-led process panels.',
    category: 'process',
    source: 'components/blocks/process/process-section-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
  }),
  blockItem({
    slug: 'sign-up-one',
    title: 'Sign Up One',
    description:
      'A detailed account creation form with identity, password, consent, and sign-in actions.',
    category: 'sign-up',
    source: 'components/blocks/auth/sign-up-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
    registryDependencies: ['button', 'input', 'label', '@navdeep-singh/brand-logo'],
  }),
  blockItem({
    slug: 'sign-up-two',
    title: 'Sign Up Two',
    description:
      'A split-screen account creation flow with social sign-in, product benefits, and an animated visual.',
    category: 'sign-up',
    source: 'components/blocks/auth/sign-up-two.tsx',
    status: 'published',
    dependencies: ['lucide-react', 'react-icons', 'shaders'],
    registryDependencies: ['button', 'input', 'label', '@navdeep-singh/brand-logo'],
  }),
  blockItem({
    slug: 'stats-section-one',
    title: 'Stats Section One',
    description:
      'A business results section that combines measurable outcomes with a customer proof point.',
    category: 'stats',
    source: 'components/blocks/stats/stats-section-one.tsx',
    status: 'published',
    dependencies: ['lucide-react'],
    registryDependencies: ['badge', 'button', 'card', 'separator'],
  }),
  blockItem({
    slug: 'teams-section-five',
    title: 'Teams Section Five',
    description: 'A dark editorial team grid with role badges and portrait-led member cards.',
    category: 'teams',
    source: 'components/blocks/teams/teams-section-five.tsx',
    status: 'published',
    registryDependencies: ['badge'],
  }),
  blockItem({
    slug: 'teams-section-four',
    title: 'Teams Section Four',
    description: 'A global-team recruiting section with portrait cards and role badges.',
    category: 'teams',
    source: 'components/blocks/teams/teams-section-four.tsx',
    status: 'published',
    registryDependencies: ['badge'],
  }),
  blockItem({
    slug: 'teams-section-one',
    title: 'Teams Section One',
    description:
      'A grouped leadership and team directory with social links and empty-state handling.',
    category: 'teams',
    source: 'components/blocks/teams/teams-section-one.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
  }),
  blockItem({
    slug: 'teams-section-three',
    title: 'Teams Section Three',
    description: 'A centered team directory with portrait cards, roles, and profile links.',
    category: 'teams',
    source: 'components/blocks/teams/teams-section-three.tsx',
    status: 'published',
  }),
  blockItem({
    slug: 'teams-section-two',
    title: 'Teams Section Two',
    description: 'A simple responsive team grid with names, roles, and portrait imagery.',
    category: 'teams',
    source: 'components/blocks/teams/teams-section-two.tsx',
    status: 'published',
  }),
  blockItem({
    slug: 'testamonial-section-one',
    title: 'Testamonial Section One',
    description:
      'A customer-story hero with proof badges, a featured quote, and success-story action.',
    category: 'testimonials',
    source: 'components/blocks/testamonials/testamonial-section-one.tsx',
    status: 'published',
    dependencies: ['@tabler/icons-react'],
    registryDependencies: ['badge', 'button'],
  }),
].sort((a, b) => a.slug.localeCompare(b.slug))
