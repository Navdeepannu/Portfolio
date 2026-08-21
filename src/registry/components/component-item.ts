import type { BlockSourceFileSpec, ComponentDefinition } from '@/registry/types'

export type ComponentExampleItem = {
  id: string
  title: string
  description?: string
  sourceFiles: BlockSourceFileSpec[]
  previewModule: string
}

export type ComponentItemEntry = {
  definition: ComponentDefinition
  examples: ComponentExampleItem[]
}

export function defineComponentItem(
  definition: ComponentDefinition,
  previewModule: string,
  examples: ComponentExampleItem[] = [],
): ComponentItemEntry {
  definition.preview = { ...definition.preview, module: previewModule }
  return { definition, examples }
}
