import { promises as fs } from 'node:fs'
import path from 'node:path'

import type { BundledLanguage } from 'shiki'

import type { BlockDefinition } from '@/registry/types'
import type { ComponentDefinition } from '@/registry/types'

export type SourceDefinition = BlockDefinition | ComponentDefinition

export type LoadedBlockSourceFile = {
  filename: string
  language: BundledLanguage
  code: string
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
