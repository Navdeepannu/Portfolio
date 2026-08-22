import type { BlockRegistryMeta, ComponentDefinition, RegistryFileEntry } from './types'

type DefineComponentInput = Omit<ComponentDefinition, 'kind' | 'registry' | 'preview'> & {
  registry?: Partial<Omit<BlockRegistryMeta, 'name' | 'files' | 'type'>> & {
    files?: RegistryFileEntry[]
  }
}

/**
 * Normalizes one component item and separates demo-only files from the files
 * displayed in the primary code tab and installed by shadcn.
 */
export function defineComponent(input: DefineComponentInput): ComponentDefinition {
  const { registry: registryPartial, sourceFiles, ...rest } = input
  const previewSourceFiles = sourceFiles.filter((sourceFile) => sourceFile.filename === 'demo.tsx')
  const installSourceFiles = sourceFiles.filter((sourceFile) => sourceFile.filename !== 'demo.tsx')
  const files: RegistryFileEntry[] =
    registryPartial?.files ??
    installSourceFiles.map((sourceFile) => ({
      path: sourceFile.path,
      target: `@components/${sourceFile.path.split('/').at(-1) ?? rest.slug}`,
      type: 'registry:ui' as const,
    }))

  return {
    ...rest,
    kind: 'component',
    sourceFiles: installSourceFiles,
    preview:
      previewSourceFiles.length > 0
        ? {
            module: '',
            sourceFiles: previewSourceFiles,
          }
        : undefined,
    registry: {
      name: rest.slug,
      type: 'registry:ui',
      dependencies: registryPartial?.dependencies ?? [],
      registryDependencies: registryPartial?.registryDependencies ?? [],
      files,
    },
  }
}
