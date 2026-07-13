import type { BlockCategoryId } from './types'

export type BlockCategoryImageSet = {
  light: string
  dark: string
  width: number
  height: number
}

// Replace these dummy images with real category artwork later.
const DEFAULT_IMAGE_SET: BlockCategoryImageSet = {
  light: '/sections/design1.png',
  dark: '/sections/design2.png',
  width: 1200,
  height: 900,
}

const CATEGORY_IMAGE_MAP: Partial<Record<BlockCategoryId, BlockCategoryImageSet>> = {
  hero: {
    light: '/sections/design1.png',
    dark: '/sections/design2.png',
    width: 1200,
    height: 900,
  },
  features: {
    light: '/sections/design3.png',
    dark: '/sections/design4.png',
    width: 1200,
    height: 760,
  },
  footer: {
    light: '/sections/design5.png',
    dark: '/sections/design6.png',
    width: 1200,
    height: 980,
  },
  'logo-cloud': {
    light: '/sections/design7.png',
    dark: '/sections/design1.png',
    width: 1200,
    height: 700,
  },
  'sign-up': {
    light: '/sections/design2.png',
    dark: '/sections/design3.png',
    width: 1200,
    height: 1100,
  },
  'forgot-password': {
    light: '/sections/design4.png',
    dark: '/sections/design5.png',
    width: 1200,
    height: 1030,
  },
  teams: {
    light: '/sections/design6.png',
    dark: '/sections/design7.png',
    width: 1200,
    height: 840,
  },
  pricing: {
    light: '/sections/design1.png',
    dark: '/sections/design4.png',
    width: 1200,
    height: 960,
  },
  cta: {
    light: '/sections/design3.png',
    dark: '/sections/design6.png',
    width: 1200,
    height: 680,
  },
  testimonials: {
    light: '/sections/design5.png',
    dark: '/sections/design2.png',
    width: 1200,
    height: 920,
  },
  faqs: {
    light: '/sections/design7.png',
    dark: '/sections/design3.png',
    width: 1200,
    height: 780,
  },
  header: {
    light: '/sections/design2.png',
    dark: '/sections/design5.png',
    width: 1200,
    height: 860,
  },
  navbar: {
    light: '/sections/design6.png',
    dark: '/sections/design1.png',
    width: 1200,
    height: 860,
  },
  contact: {
    light: '/sections/design4.png',
    dark: '/sections/design7.png',
    width: 1200,
    height: 900,
  },
}

export function getBlockCategoryImages(categoryId: BlockCategoryId): BlockCategoryImageSet {
  return CATEGORY_IMAGE_MAP[categoryId] ?? DEFAULT_IMAGE_SET
}
