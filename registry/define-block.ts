import type {
  BlockDefinition,
  BlockRegistryMeta,
  RegistryFileEntry,
  RegistryPreviewSpec,
} from './types'

type DefineBlockInput = Omit<BlockDefinition, 'kind' | 'registry' | 'preview'> & {
  preview?: Partial<RegistryPreviewSpec>
  registry?: Partial<Omit<BlockRegistryMeta, 'name' | 'files'>> & {
    files?: RegistryFileEntry[]
  }
}

/** Normalizes one explicit canonical block item. */
export function defineBlock(input: DefineBlockInput): BlockDefinition {
  const { registry: registryPartial, preview: previewPartial, ...rest } = input
  const files: RegistryFileEntry[] =
    registryPartial?.files ??
    rest.sourceFiles.map((sourceFile) => ({
      path: sourceFile.path,
      target: sourceFile.path,
      type: 'registry:component' as const,
    }))

  return {
    ...rest,
    kind: 'block',
    preview: {
      module: previewPartial?.module ?? `@/${rest.sourceFiles[0]?.path.replace(/\.tsx$/, '')}`,
      exportName: previewPartial?.exportName,
      sourceFiles: previewPartial?.sourceFiles,
    },
    registry: {
      name: rest.slug,
      type: registryPartial?.type ?? 'registry:block',
      dependencies: registryPartial?.dependencies ?? [],
      registryDependencies: registryPartial?.registryDependencies ?? [],
      files,
    },
  }
}
