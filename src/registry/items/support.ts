import { animatedGroupItem } from '@/registry/components/animated-group/animated-group.item'
import { brandLogoItem } from '@/registry/components/brand-logo/brand-logo.item'
import { contentSectionSixItem } from '@/registry/blocks/blog/content-section-six/content-section-six.item'
import { textEffectItem } from '@/registry/components/text-effect/text-effect.item'

import type { SupportDefinition } from '@/registry/types'

export const supportItems: SupportDefinition[] = [
  animatedGroupItem,
  brandLogoItem,
  contentSectionSixItem,
  textEffectItem,
].sort((a, b) => a.slug.localeCompare(b.slug))
