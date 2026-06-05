import { promises as fs } from 'node:fs'
import path from 'node:path'

import type { BundledLanguage } from 'shiki'

import type { BlockDefinition } from '@/registry/types'
import type { ComponentDefinition } from '@/data/component-types'

export type SourceDefinition = BlockDefinition | ComponentDefinition

export type LoadedBlockSourceFile = {
  filename: string
  language: BundledLanguage
  code: string
}

function resolveSafeProjectPath(relativePath: string): string {
  const base = process.cwd()
  const resolved = path.resolve(base, relativePath)
  const baseWithSep = base.endsWith(path.sep) ? base : `${base}${path.sep}`
  if (resolved !== base && !resolved.startsWith(baseWithSep)) {
    throw new Error(`Refusing to read path outside project: ${relativePath}`)
  }
  return resolved
}

/**
 * Read a UTF-8 file under the project root (blocks registry, components, etc.).
 */
export async function readProjectSourceFile(relativePath: string): Promise<string> {
  const absolute = resolveSafeProjectPath(relativePath)
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
