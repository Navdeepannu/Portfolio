import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const teamsSectionOneItem = defineBlockItem({
  slug: 'teams-section-one',
  title: 'Teams Section One',
  description:
    'A grouped leadership and team directory with social links and empty-state handling.',
  category: 'teams',
  source: 'src/registry/blocks/team/teams-section-one/teams-section-one.tsx',
  target: '@components/blocks/teams/teams-section-one.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
})
