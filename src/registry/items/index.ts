import { blockItems } from './blocks'
import { componentItemEntries } from './components'
import { designSystemItems } from './design-systems'
import { illustrationItems } from './illustrations'
import { supportItems } from './support'

import type { NavUIRegistryItem } from '../types'

export { blockItems } from './blocks'
export { componentDefinitions, componentItemEntries } from './components'
export { designSystemItems } from './design-systems'
export { illustrationItems } from './illustrations'
export { retiredRegistryNames } from './retired'
export { supportItems } from './support'

/** The only collection consumed by registry generation and validation. */
export const registryItems: NavUIRegistryItem[] = [
  ...blockItems,
  ...componentItemEntries.map((entry) => entry.definition),
  ...designSystemItems,
  ...illustrationItems,
  ...supportItems,
].sort((a, b) => a.slug.localeCompare(b.slug))
