import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const signUpTwoItem = defineBlockItem({
  slug: 'sign-up-two',
  title: 'Sign Up Two',
  description:
    'A split-screen account creation flow with social sign-in, product benefits, and an animated visual.',
  category: 'sign-up',
  source: 'src/registry/blocks/sign-up/sign-up-two/sign-up-two.tsx',
  target: '@components/blocks/auth/sign-up-two.tsx',
  status: 'published',
  dependencies: ['lucide-react', 'react-icons', 'shaders'],
  registryDependencies: ['button', 'input', 'label', '@navdeep-singh/brand-logo'],
})
