import { asset } from '@/lib/assets'

import type { BlockCategoryId } from '@/registry/types'

export type BlockCategoryImageSet = {
  light: string
  dark: string
  width: number
  height: number
}

// Fallback for categories without dedicated artwork.
const DEFAULT_IMAGE_SET: BlockCategoryImageSet = {
  light: '/sections/design1.png',
  dark: '/sections/design2.png',
  width: 1200,
  height: 900,
}

const CATEGORY_IMAGE_MAP: Partial<Record<BlockCategoryId, BlockCategoryImageSet>> = {
  hero: {
    light: asset('hero-light.png'),
    dark: asset('hero-dark.png'),
    width: 2940,
    height: 2874,
  },
  header: {
    light: asset('header-light.png'),
    dark: asset('header-dark.png'),
    width: 2810,
    height: 642,
  },
  features: {
    light: asset('feature-light.png'),
    dark: asset('feature-dark.png'),
    width: 2940,
    height: 1672,
  },
  stats: {
    light: asset('stats-light.png'),
    dark: asset('stats-dark.png'),
    width: 2940,
    height: 1672,
  },
  pricing: {
    light: asset('pricing-light.png'),
    dark: asset('pricing-dark.png'),
    width: 2940,
    height: 2036,
  },
  process: {
    light: asset('process-light.png'),
    dark: asset('process-dark.png'),
    width: 2940,
    height: 4332,
  },
  'forgot-password': {
    light: asset('forgot-password-light.png'),
    dark: asset('forgot-password-dark.png'),
    width: 2940,
    height: 1672,
  },
  'sign-up': {
    light: asset('sign-up-light.png'),
    dark: asset('sign-up-dark.png'),
    width: 2940,
    height: 1672,
  },
  'logo-cloud': {
    light: asset('logo-cloud-light.png'),
    dark: asset('logo-cloud-dark.png'),
    width: 2940,
    height: 1672,
  },
  content: {
    light: asset('content-light.png'),
    dark: asset('content-dark.png'),
    width: 2940,
    height: 1672,
  },
  blog: {
    light: asset('blog-light.png'),
    dark: asset('blog-dark.png'),
    width: 2940,
    height: 1998,
  },
  teams: {
    light: asset('teams-light.png'),
    dark: asset('teams-dark.png'),
    width: 2940,
    height: 2372,
  },
  testimonials: {
    light: asset('testamonials-light.png'),
    dark: asset('testamonials-dark.png'),
    width: 2940,
    height: 1672,
  },
  cta: {
    light: asset('cta-light.png'),
    dark: asset('cta-dark.png'),
    width: 2502,
    height: 755,
  },
  footer: {
    light: asset('footer-light.png'),
    dark: asset('footer-dark.png'),
    width: 2452,
    height: 588,
  },
  faqs: {
    light: asset('faq-light.png'),
    dark: asset('faq-dark.png'),
    width: 2940,
    height: 1688,
  },
  navbar: {
    light: '/sections/design6.png',
    dark: '/sections/design1.png',
    width: 1200,
    height: 860,
  },
  contact: {
    light: asset('contact-light.png'),
    dark: asset('contact-dark.png'),
    width: 2940,
    height: 1672,
  },
}

export function getBlockCategoryImages(categoryId: BlockCategoryId): BlockCategoryImageSet {
  return CATEGORY_IMAGE_MAP[categoryId] ?? DEFAULT_IMAGE_SET
}
