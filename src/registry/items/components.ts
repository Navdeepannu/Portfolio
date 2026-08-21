import { animatedNumbersItem } from '@/registry/components/animated-numbers/animated-numbers.item'
import { animatedTabsItem } from '@/registry/components/animated-tabs/animated-tabs.item'
import { contributionGraphItem } from '@/registry/components/contribution-graph/contribution-graph.item'
import { expandableCardItem } from '@/registry/components/expandable-card/expandable-card.item'
import { keyboardShortcutItem } from '@/registry/components/keyboard-shortcut/keyboard-shortcut.item'
import { magneticButtonItem } from '@/registry/components/magnetic-button/magnetic-button.item'
import { packageManagerCommandItem } from '@/registry/components/package-manager-command/package-manager-command.item'
import { proximityNavItem } from '@/registry/components/proximity-nav/proximity-nav.item'
import { railNavItem } from '@/registry/components/rail-nav/rail-nav.item'
import { segmentSpotlightItem } from '@/registry/components/segment-spotlight/segment-spotlight.item'

import type { ComponentDefinition } from '@/registry/types'
import type { ComponentExampleItem, ComponentItemEntry } from '@/registry/components/component-item'

export type { ComponentExampleItem, ComponentItemEntry } from '@/registry/components/component-item'

export const componentItemEntries: ComponentItemEntry[] = [
  animatedNumbersItem,
  animatedTabsItem,
  contributionGraphItem,
  expandableCardItem,
  keyboardShortcutItem,
  magneticButtonItem,
  packageManagerCommandItem,
  proximityNavItem,
  railNavItem,
  segmentSpotlightItem,
].sort((a, b) => a.definition.slug.localeCompare(b.definition.slug))

export const componentDefinitions: ComponentDefinition[] = componentItemEntries.map(
  (entry) => entry.definition,
)

export function getComponentItemEntry(slug: string): ComponentItemEntry | undefined {
  return componentItemEntries.find((entry) => entry.definition.slug === slug)
}

export function getComponentExamples(slug: string): ComponentExampleItem[] {
  return getComponentItemEntry(slug)?.examples ?? []
}

export function getComponentExample(
  slug: string,
  exampleId: string,
): ComponentExampleItem | undefined {
  return getComponentExamples(slug).find((example) => example.id === exampleId)
}
