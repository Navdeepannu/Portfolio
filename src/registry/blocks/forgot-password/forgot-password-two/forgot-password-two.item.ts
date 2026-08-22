import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const forgotPasswordTwoItem = defineBlockItem({
  slug: 'forgot-password-two',
  title: 'Forgot Password Two',
  description: 'A centered password-recovery form with a prominent heading and return action.',
  category: 'forgot-password',
  source: 'src/registry/blocks/forgot-password/forgot-password-two/forgot-password-two.tsx',
  target: '@components/blocks/auth/forgot-password-two.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
  registryDependencies: ['button', 'input', 'label'],
})
