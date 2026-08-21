import type { SupportDefinition } from '@/registry/types'

export function defineSupportItem(
  input: Omit<SupportDefinition, 'category' | 'kind' | 'status' | 'tags' | 'compatibilityOutput'>,
): SupportDefinition {
  return {
    ...input,
    category: 'support',
    kind: 'support',
    status: 'archived',
    tags: ['support'],
    compatibilityOutput: true,
  }
}
