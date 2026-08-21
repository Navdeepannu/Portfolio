import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const teamsSectionFourItem = defineBlockItem({
  slug: 'teams-section-four',
  title: 'Teams Section Four',
  description: 'A global-team recruiting section with portrait cards and role badges.',
  category: 'teams',
  source: 'src/registry/blocks/team/teams-section-four/teams-section-four.tsx',
  target: '@components/blocks/teams/teams-section-four.tsx',
  status: 'published',
  registryDependencies: ['badge'],
})
