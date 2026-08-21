import type { IllustrationDefinition, IllustrationSize, RegistryFileEntry } from '@/registry/types'

type IllustrationInput = {
  slug: string
  title: string
  description: string
  source: string
  target: string
  size: IllustrationSize
  previewClassName?: string
  dependencies: string[]
  sharedExpenseParts?: boolean
}

const sharedExpenseFile: RegistryFileEntry = {
  path: 'src/registry/illustrations/expense-workflow/expense-workflow-parts.tsx',
  target: '@components/illustrations/_expense-workflow-parts.tsx',
  type: 'registry:component',
  shared: true,
}

function toAliasPath(source: string) {
  return source.startsWith('src/') ? `@/${source.slice(4)}` : `@/${source}`
}

export function defineIllustrationItem(input: IllustrationInput): IllustrationDefinition {
  const primaryFile: RegistryFileEntry = {
    path: input.source,
    target: input.target,
    type: 'registry:component',
  }
  const files = input.sharedExpenseParts ? [primaryFile, sharedExpenseFile] : [primaryFile]

  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: 'illustrations',
    tags: ['illustration'],
    kind: 'illustration',
    status: 'published',
    size: input.size,
    previewClassName: input.previewClassName,
    sourceFiles: files.map((file) => ({ path: file.path, language: 'tsx' })),
    preview: { module: toAliasPath(input.source).replace(/\.tsx$/, '') },
    registry: {
      name: input.slug,
      type: 'registry:component',
      dependencies: input.dependencies,
      registryDependencies: [],
      files,
    },
  }
}
