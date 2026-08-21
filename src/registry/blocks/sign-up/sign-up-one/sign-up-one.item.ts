import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const signUpOneItem = defineBlockItem({
  slug: 'sign-up-one',
  title: 'Sign Up One',
  description:
    'A detailed account creation form with identity, password, consent, and sign-in actions.',
  category: 'sign-up',
  source: 'src/registry/blocks/sign-up/sign-up-one/sign-up-one.tsx',
  target: '@components/blocks/auth/sign-up-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
  registryDependencies: ['button', 'input', 'label', '@navdeep-singh/brand-logo'],
})
