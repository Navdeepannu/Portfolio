import { promises as fs } from 'node:fs'
import path from 'node:path'

import type { BundledLanguage } from 'shiki'

import { registryTargetToDisplayPath } from '@/features/navui/code/source-tree'
import type { BlockDefinition, ComponentDefinition, NavUIRegistryItem } from '@/registry/types'

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
  relationship: 'direct' | 'registry-dependency'
}

const LOCAL_REGISTRY_DEPENDENCY_PREFIX = '@navdeep-singh/'

function localRegistryDependencyName(dependency: string): string | undefined {
  return dependency.startsWith(LOCAL_REGISTRY_DEPENDENCY_PREFIX)
    ? dependency.slice(LOCAL_REGISTRY_DEPENDENCY_PREFIX.length)
    : undefined
}

/**
 * Resolves only NavUI-owned registry dependencies. Generic shadcn items such
 * as `button` remain installer-managed and are not presented as NavUI files.
 */
export function resolveLocalRegistryDependencyItems(
  definition: NavUIRegistryItem,
  registryItems: NavUIRegistryItem[],
): NavUIRegistryItem[] {
  const bySlug = new Map(registryItems.map((item) => [item.slug, item]))
  const visited = new Set([definition.slug])
  const resolved: NavUIRegistryItem[] = []

  const visit = (item: NavUIRegistryItem) => {
    for (const dependency of item.registry.registryDependencies) {
      const dependencyName = localRegistryDependencyName(dependency)
      if (!dependencyName || visited.has(dependencyName)) continue

      const dependencyItem = bySlug.get(dependencyName)
      if (!dependencyItem) continue

      visited.add(dependencyName)
      resolved.push(dependencyItem)
      visit(dependencyItem)
    }
  }

  visit(definition)
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
): Promise<LoadedRegistrySourceFile[]> {
  const owners = [
    { item: definition, relationship: 'direct' as const },
    ...resolveLocalRegistryDependencyItems(definition, registryItems).map((item) => ({
      item,
      relationship: 'registry-dependency' as const,
    })),
  ]
  const seenTargets = new Set<string>()
  const files = owners.flatMap(({ item, relationship }) =>
    item.registry.files.flatMap((file) => {
      if (seenTargets.has(file.target)) return []
      seenTargets.add(file.target)

      return [{ file, item, relationship }]
    }),
  )

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
