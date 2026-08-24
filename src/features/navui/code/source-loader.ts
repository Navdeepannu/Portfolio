import { promises as fs } from 'node:fs'
import path from 'node:path'

import type { BundledLanguage } from 'shiki'

import { DEFAULT_NAVUI_PRIMITIVE, primitiveConfig, type Primitive } from '@/config/navui-primitives'
import { registryTargetToDisplayPath } from '@/features/navui/code/source-tree'
import {
  getPrimitiveComponentDefinition,
  type PrimitiveComponentDefinition,
} from '@/registry/primitives/definitions'
import {
  resolveBlockDefinition,
  resolveRegistryItemForPrimitive,
} from '@/registry/primitives/resolve'
import type {
  BlockDefinition,
  ComponentDefinition,
  NavUIRegistryItem,
  ResolvedBlockDefinition,
} from '@/registry/types'

export type SourceDefinition = BlockDefinition | ComponentDefinition

export type LoadedBlockSourceFile = {
  filename: string
  language: BundledLanguage
  code: string
}

export type LoadedRegistrySourceFile = LoadedBlockSourceFile & {
  /** Portable shadcn destination from the canonical registry item. */
  target: string
  /** Consumer-facing target used by the file explorer. */
  displayPath: string
  /** Canonical item that owns this file. */
  ownerSlug: string
  ownerTitle: string
  relationship: 'direct' | 'registry-dependency' | 'primitive-dependency'
}

const LOCAL_REGISTRY_DEPENDENCY_PREFIX = '@navdeep-singh/'

function localRegistryDependencyName(dependency: string): string | undefined {
  return dependency.startsWith(LOCAL_REGISTRY_DEPENDENCY_PREFIX)
    ? dependency.slice(LOCAL_REGISTRY_DEPENDENCY_PREFIX.length)
    : undefined
}

/**
 * Resolves NavUI-owned registry dependencies. Supported generic primitive
 * dependencies are resolved separately after this traversal.
 */
export function resolveLocalRegistryDependencyItems(
  definition: NavUIRegistryItem,
  registryItems: NavUIRegistryItem[],
  primitive: Primitive = DEFAULT_NAVUI_PRIMITIVE,
): Array<NavUIRegistryItem | ResolvedBlockDefinition> {
  const bySlug = new Map(registryItems.map((item) => [item.slug, item]))
  const visited = new Set([definition.slug])
  const resolved: Array<NavUIRegistryItem | ResolvedBlockDefinition> = []

  const visit = (item: NavUIRegistryItem | ResolvedBlockDefinition) => {
    for (const dependency of item.registry.registryDependencies) {
      const dependencyName = localRegistryDependencyName(dependency)
      if (!dependencyName || visited.has(dependencyName)) continue

      const dependencyItem = bySlug.get(dependencyName)
      if (!dependencyItem) continue

      visited.add(dependencyName)
      const resolvedDependency = resolveRegistryItemForPrimitive(dependencyItem, primitive)
      resolved.push(resolvedDependency)
      visit(resolvedDependency)
    }
  }

  visit(definition)
  return resolved
}

type PrimitiveDependencyResolution = {
  definition: PrimitiveComponentDefinition
  implementation: PrimitiveComponentDefinition['implementations'][Primitive]
}

function resolvePrimitiveComponentDependencies(
  items: Array<NavUIRegistryItem | ResolvedBlockDefinition>,
  primitive: Primitive,
): PrimitiveDependencyResolution[] {
  const pending = items.flatMap((item) => item.registry.registryDependencies)
  const visited = new Set<string>()
  const resolved: PrimitiveDependencyResolution[] = []

  while (pending.length > 0) {
    const name = pending.shift()
    if (!name || visited.has(name) || localRegistryDependencyName(name)) continue

    const definition = getPrimitiveComponentDefinition(name)
    if (!definition) continue

    visited.add(name)
    const implementation = definition.implementations[primitive]
    resolved.push({ definition, implementation })
    pending.push(...implementation.registryDependencies)
  }

  return resolved
}

function languageFromPath(filePath: string): BundledLanguage {
  const extension = path.extname(filePath).toLowerCase()
  const languages: Partial<Record<string, BundledLanguage>> = {
    '.css': 'css',
    '.html': 'html',
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.json': 'json',
    '.md': 'markdown',
    '.mdx': 'mdx',
    '.svg': 'xml',
    '.ts': 'typescript',
    '.tsx': 'tsx',
  }

  return languages[extension] ?? 'typescript'
}

async function resolveSafeProjectPath(relativePath: string): Promise<string> {
  if (relativePath === 'src/lib/utils.ts') {
    return path.join(process.cwd(), 'src', 'lib', 'utils.ts')
  }

  const registryPrefix = 'src/registry/'

  if (!relativePath.startsWith(registryPrefix)) {
    throw new Error(`Refusing to read unsupported project path: ${relativePath}`)
  }

  const registryRoot = path.join(process.cwd(), 'src', 'registry')
  const registryPath = relativePath.slice(registryPrefix.length)
  const resolved = path.resolve(registryRoot, registryPath)
  const [realRegistryRoot, realResolved] = await Promise.all([
    fs.realpath(registryRoot),
    fs.realpath(resolved),
  ])
  const registryRootWithSep = `${realRegistryRoot}${path.sep}`

  if (!realResolved.startsWith(registryRootWithSep)) {
    throw new Error(`Refusing to read path outside the registry: ${relativePath}`)
  }

  return realResolved
}

/**
 * Read a UTF-8 file under the project root (blocks registry, components, etc.).
 */
export async function readProjectSourceFile(relativePath: string): Promise<string> {
  const absolute = await resolveSafeProjectPath(relativePath)
  return fs.readFile(absolute, 'utf8')
}

/**
 * Loads every `sourceFiles` entry for a block for the code preview tab.
 */
export async function loadBlockCodeFiles(
  definition: SourceDefinition,
): Promise<LoadedBlockSourceFile[]> {
  return Promise.all(
    definition.sourceFiles.map(async (spec) => {
      try {
        const code = await readProjectSourceFile(spec.path)
        return {
          filename: spec.filename ?? path.basename(spec.path),
          language: spec.language,
          code,
        }
      } catch {
        const label = spec.filename ?? path.basename(spec.path)
        return {
          filename: label,
          language: spec.language,
          code: `// Could not read: ${spec.path}\n`,
        }
      }
    }),
  )
}

/**
 * Loads the exact files declared by a block's shadcn install manifest. Registry
 * dependencies remain separate and are intentionally not resolved here.
 */
export async function loadRegistryCodeFiles(
  definition: BlockDefinition,
  registryItems: NavUIRegistryItem[] = [],
  primitive: Primitive = DEFAULT_NAVUI_PRIMITIVE,
): Promise<LoadedRegistrySourceFile[]> {
  const resolvedDefinition = resolveBlockDefinition(definition, primitive)
  const owners = [
    { item: resolvedDefinition, relationship: 'direct' as const },
    ...resolveLocalRegistryDependencyItems(resolvedDefinition, registryItems, primitive).map(
      (item) => ({
        item,
        relationship: 'registry-dependency' as const,
      }),
    ),
  ]
  const primitiveDependencies = resolvePrimitiveComponentDependencies(
    owners.map(({ item }) => item),
    primitive,
  )
  const seenTargets = new Set<string>()
  const itemFiles = owners.flatMap(({ item, relationship }) =>
    item.registry.files.flatMap((file) => {
      if (seenTargets.has(file.target)) return []
      seenTargets.add(file.target)

      return [{ file, item, relationship }]
    }),
  )
  const primitiveFiles = primitiveDependencies.flatMap(
    ({ definition: component, implementation }) =>
      implementation.files.flatMap((file) => {
        if (seenTargets.has(file.target)) return []
        seenTargets.add(file.target)

        return [
          {
            file,
            item: {
              slug: component.name,
              title: `${primitiveConfig[primitive].label} ${component.title}`,
            },
            relationship: 'primitive-dependency' as const,
          },
        ]
      }),
  )
  const files = [...itemFiles, ...primitiveFiles]

  return Promise.all(
    files.map(async ({ file, item, relationship }) => {
      const displayPath = registryTargetToDisplayPath(file.target)

      return {
        filename: path.basename(displayPath),
        displayPath,
        target: file.target,
        language: languageFromPath(file.path),
        code: await readProjectSourceFile(file.path),
        ownerSlug: item.slug,
        ownerTitle: item.title,
        relationship,
      }
    }),
  )
}

export function resolveRegistryPackageDependencies(
  definition: BlockDefinition,
  registryItems: NavUIRegistryItem[] = [],
  primitive: Primitive = DEFAULT_NAVUI_PRIMITIVE,
): string[] {
  const resolvedDefinition = resolveBlockDefinition(definition, primitive)
  const dependencyItems = resolveLocalRegistryDependencyItems(
    resolvedDefinition,
    registryItems,
    primitive,
  )
  const owners = [resolvedDefinition, ...dependencyItems]
  const primitiveDependencies = resolvePrimitiveComponentDependencies(owners, primitive)

  return [
    ...new Set([
      ...owners.flatMap((item) => item.registry.dependencies),
      ...primitiveDependencies.flatMap(({ implementation }) => implementation.dependencies),
    ]),
  ].sort((a, b) => a.localeCompare(b))
}
