import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const heroSectionFourItem = defineBlockItem({
  slug: 'hero-section-four',
  title: 'Hero Section Four',
  description:
    'A complete expense-workflow hero with responsive header, lead form, logo cloud, and supporting illustrations.',
  category: 'hero',
  source: 'src/registry/blocks/hero/hero-section-four/hero-section-four.tsx',
  target: '@components/blocks/hero-section/hero-section-four.tsx',
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
      path: 'src/registry/blocks/hero/hero-section-four/hero-section-four-illustration.tsx',
      target: '@components/blocks/hero-section/hero-section-four-illustration.tsx',
      type: 'registry:component',
    },
  ],
})
