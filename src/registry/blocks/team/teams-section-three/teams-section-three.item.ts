import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const teamsSectionThreeItem = defineBlockItem({
  slug: 'teams-section-three',
  title: 'Teams Section Three',
  description: 'A centered team directory with portrait cards, roles, and profile links.',
  category: 'teams',
  source: 'src/registry/blocks/team/teams-section-three/teams-section-three.tsx',
  target: '@components/blocks/teams/teams-section-three.tsx',
  status: 'published',
})
