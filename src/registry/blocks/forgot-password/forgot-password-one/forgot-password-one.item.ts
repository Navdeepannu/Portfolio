import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const forgotPasswordOneItem = defineBlockItem({
  slug: 'forgot-password-one',
  title: 'Forgot Password One',
  description: 'A compact password-recovery card with email input, submit action, and return link.',
  category: 'forgot-password',
  source: 'src/registry/blocks/forgot-password/forgot-password-one/forgot-password-one.tsx',
  target: '@components/blocks/auth/forgot-password-one.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
  registryDependencies: ['button', 'input', 'label'],
})
