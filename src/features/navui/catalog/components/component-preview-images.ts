import type { ComponentDefinition } from '@/registry/types'
import { asset } from '@/lib/assets'

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
    light: asset('Animated-tabs-light.png'),
    dark: asset('Animated-tabs-dark.png'),
    width: 1080,
    height: 1920,
  },
  'expandable-card': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlSoC1OywE8Bm2KWO3IgkTqwviNajx6JyfGHAQ',
    dark: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlU731ePXMcP1suvnB5JoeGFDfSm7wChl8LtpH',
    width: 1080,
    height: 1920,
  },
  'rail-nav': {
    light: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
    dark: asset('rail-nav-dark.png'),
    width: 1080,
    height: 1920,
  },
  'package-manager-command': {
    light: asset('package-manager-light.png'),
    dark: asset('package-manager-dark.png'),
    width: 1080,
    height: 1920,
  },
  'public-insights': {
    light: '/component-previews/public-insights.svg',
    dark: asset('public-insights-dark.png'),
    width: 1200,
    height: 800,
  },
  'keyboard-shortcut': {
    light: '/component-previews/keyboard-shortcut.svg',
    dark: '/component-previews/keyboard-shortcut.svg',
    width: 1200,
    height: 800,
  },
}

export function getComponentPreviewImages(
  component: ComponentDefinition,
): ComponentPreviewImageSet {
  const mapped = COMPONENT_PREVIEW_IMAGE_MAP[component.slug]
  if (mapped) return mapped

  return {
    light: component.image,
    dark: component.image,
    width: 1080,
    height: 1920,
  }
}
