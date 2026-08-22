import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const teamsSectionTwoItem = defineBlockItem({
  slug: 'teams-section-two',
  title: 'Teams Section Two',
  description: 'A simple responsive team grid with names, roles, and portrait imagery.',
  category: 'teams',
  source: 'src/registry/blocks/team/teams-section-two/teams-section-two.tsx',
  target: '@components/blocks/teams/teams-section-two.tsx',
  status: 'published',
})
