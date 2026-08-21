import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const teamsSectionFiveItem = defineBlockItem({
  slug: 'teams-section-five',
  title: 'Teams Section Five',
  description: 'A dark editorial team grid with role badges and portrait-led member cards.',
  category: 'teams',
  source: 'src/registry/blocks/team/teams-section-five/teams-section-five.tsx',
  target: '@components/blocks/teams/teams-section-five.tsx',
  status: 'published',
  registryDependencies: ['badge'],
})
