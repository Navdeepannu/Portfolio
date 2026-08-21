import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const forgotPasswordThreeItem = defineBlockItem({
  slug: 'forgot-password-three',
  title: 'Forgot Password Three',
  description: 'A left-aligned password-recovery form with concise guidance and navigation back.',
  category: 'forgot-password',
  source: 'src/registry/blocks/forgot-password/forgot-password-three/forgot-password-three.tsx',
  target: '@components/blocks/auth/forgot-password-three.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
  registryDependencies: ['button', 'input', 'label'],
})
