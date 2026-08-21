import { promises as fs } from 'node:fs'
import path from 'node:path'

import { componentItemEntries, registryItems } from '@/registry/items'

import {
  GENERATED_BLOCK_PREVIEWS_PATH,
  GENERATED_COMPONENT_PREVIEWS_PATH,
  GENERATED_ILLUSTRATION_PREVIEWS_PATH,
  ROOT_REGISTRY_PATH,
  renderBlockPreviewModule,
  renderComponentPreviewModule,
  renderIllustrationPreviewModule,
  renderRootRegistry,
} from './core'

const ROOT = process.cwd()

async function writeIfChanged(relativePath: string, contents: string): Promise<boolean> {
  const filePath = path.join(ROOT, relativePath)
  let current = ''
  try {
    current = await fs.readFile(filePath, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }

  if (current === contents) return false
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, contents, 'utf8')
  return true
}

async function main() {
  const outputs = [
    [ROOT_REGISTRY_PATH, renderRootRegistry(registryItems)],
    [GENERATED_BLOCK_PREVIEWS_PATH, renderBlockPreviewModule(registryItems)],
    [
      GENERATED_COMPONENT_PREVIEWS_PATH,
      renderComponentPreviewModule(registryItems, componentItemEntries),
    ],
    [GENERATED_ILLUSTRATION_PREVIEWS_PATH, renderIllustrationPreviewModule(registryItems)],
  ] as const

  const changed: string[] = []
  for (const [relativePath, contents] of outputs) {
    if (await writeIfChanged(relativePath, contents)) changed.push(relativePath)
  }

  console.log(
    changed.length > 0
      ? `[registry:source] Updated ${changed.join(', ')}`
      : '[registry:source] Canonical source artifacts are already current.',
  )
}

main().catch((error) => {
  console.error('[registry:source] Failed:', error)
  process.exit(1)
})
