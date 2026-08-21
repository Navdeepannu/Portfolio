import { promises as fs } from 'node:fs'
import path from 'node:path'

import { PUBLIC_REGISTRY_DIR } from './core'

const ROOT = process.cwd()
const OUTPUT_DIR = path.resolve(ROOT, PUBLIC_REGISTRY_DIR)
const EXPECTED_OUTPUT_DIR = path.join(ROOT, 'public', 'r')

async function main() {
  if (OUTPUT_DIR !== EXPECTED_OUTPUT_DIR || !OUTPUT_DIR.startsWith(`${ROOT}${path.sep}`)) {
    throw new Error(`Refusing to clean unexpected registry directory: ${OUTPUT_DIR}`)
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  const entries = await fs.readdir(OUTPUT_DIR, { withFileTypes: true })
  let removed = 0

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue
    await fs.unlink(path.join(OUTPUT_DIR, entry.name))
    removed += 1
  }

  console.log(`[registry:clean] Removed ${removed} registry-owned JSON artifact(s) from public/r.`)
}

main().catch((error) => {
  console.error('[registry:clean] Failed:', error)
  process.exit(1)
})
