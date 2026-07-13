import type { ComponentDefinition } from './component-types'

export type ComponentPreviewImageSet = {
  light: string
  dark: string
  width: number
  height: number
}

// Central place for component card artwork. Replace with real assets anytime.
const COMPONENT_PREVIEW_IMAGE_MAP: Partial<Record<string, ComponentPreviewImageSet>> = {
  'segment-spotlight': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlHuf7vDqHjv3VPCtBSMksEJOn7pmfxyc9IoU5',
    dark: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlHuf7vDqHjv3VPCtBSMksEJOn7pmfxyc9IoU5',
    width: 1080,
    height: 1920,
  },
  'magnetic-button': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlXH1ynpA2u3zKHak0FTUAL7ZrsNJE5jQiOYwt',
    dark: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlXH1ynpA2u3zKHak0FTUAL7ZrsNJE5jQiOYwt',
    width: 1080,
    height: 1920,
  },
  'animated-tabs': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlX3opSU2u3zKHak0FTUAL7ZrsNJE5jQiOYwtd',
    dark: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlX3opSU2u3zKHak0FTUAL7ZrsNJE5jQiOYwtd',
    width: 1080,
    height: 1920,
  },
  'expandable-card': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlx629Fkg7C4maJxGZf1yUPI6YWNcVgE0T9hXu',
    dark: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlx629Fkg7C4maJxGZf1yUPI6YWNcVgE0T9hXu',
    width: 1080,
    height: 1920,
  },
  'rail-nav': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
    dark: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
    width: 1080,
    height: 1920,
  },
}

export function getComponentPreviewImages(component: ComponentDefinition): ComponentPreviewImageSet {
  const mapped = COMPONENT_PREVIEW_IMAGE_MAP[component.slug]
  if (mapped) return mapped

  return {
    light: component.image,
    dark: component.image,
    width: 1080,
    height: 1920,
  }
}
