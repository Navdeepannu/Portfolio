import {
  REGISTRY_ITEM_STATUSES,
  REGISTRY_ITEM_TYPES,
  type NavUIRegistryItem,
  type RegistryFileEntry,
} from './types'

export type RegistryValidationOptions = {
  sourceExists?: (relativePath: string) => boolean | Promise<boolean>
}

const LOCAL_DEPENDENCY_PREFIX = '@navdeep-singh/'

function localDependencyName(dependency: string): string | undefined {
  return dependency.startsWith(LOCAL_DEPENDENCY_PREFIX)
    ? dependency.slice(LOCAL_DEPENDENCY_PREFIX.length)
    : undefined
}

function canGenerateOutput(item: NavUIRegistryItem): boolean {
  return item.status === 'published' || Boolean(item.compatibilityOutput)
}

export async function validateRegistryDefinitions(
  items: NavUIRegistryItem[],
  options: RegistryValidationOptions = {},
): Promise<string[]> {
  const errors: string[] = []
  const byName = new Map<string, NavUIRegistryItem>()
  const targetClaims = new Map<string, { item: string; file: RegistryFileEntry }>()

  for (const item of items) {
    const label = `[${item.slug || '(missing name)'}]`

    if (!item.slug) errors.push(`${label} Missing registry name.`)
    if (byName.has(item.slug)) {
      errors.push(
        `${label} Duplicate registry name; also claimed by [${byName.get(item.slug)?.slug}].`,
      )
    } else {
      byName.set(item.slug, item)
    }

    if (item.registry.name !== item.slug) {
      errors.push(
        `${label} Registry identifier "${item.registry.name}" must match canonical name "${item.slug}".`,
      )
    }
    if (!REGISTRY_ITEM_STATUSES.includes(item.status)) {
      errors.push(`${label} Invalid status "${String(item.status)}".`)
    }
    if (!REGISTRY_ITEM_TYPES.includes(item.registry.type)) {
      errors.push(`${label} Invalid item type "${String(item.registry.type)}".`)
    }
    if (!item.title.trim()) errors.push(`${label} Missing title.`)
    if (item.description.trim().length < 20)
      errors.push(`${label} Missing required useful description.`)
    if (/\s—\s.+\bblock\.?$/i.test(item.description.trim())) {
      errors.push(`${label} Description is still a generic category placeholder.`)
    }
    if (!item.category.trim()) errors.push(`${label} Missing category.`)
    if (!Array.isArray(item.registry.dependencies)) {
      errors.push(`${label} npm dependencies must be an array.`)
    }
    if (!Array.isArray(item.registry.registryDependencies)) {
      errors.push(`${label} registry dependencies must be an array.`)
    }
    if (item.status === 'published' && item.kind !== 'support' && !item.preview?.module) {
      errors.push(`${label} Published catalog item is missing a preview entry.`)
    }
    if (item.preview && !item.preview.module) {
      errors.push(`${label} Preview entry has no static module path.`)
    }
    if (canGenerateOutput(item) && item.registry.files.length === 0) {
      errors.push(`${label} Public item has no generated output files.`)
    }

    const sourcePaths = new Set(item.sourceFiles.map((file) => file.path))
    const registryPaths = new Set(item.registry.files.map((file) => file.path))

    for (const sourceFile of item.sourceFiles) {
      if (!registryPaths.has(sourceFile.path)) {
        errors.push(
          `${label} Source file "${sourceFile.path}" is missing a registry output target (incomplete multi-file definition).`,
        )
      }
      if (options.sourceExists && !(await options.sourceExists(sourceFile.path))) {
        errors.push(`${label} Missing source file: ${sourceFile.path}.`)
      }
    }

    for (const file of item.registry.files) {
      if (!sourcePaths.has(file.path)) {
        errors.push(
          `${label} Registry file "${file.path}" is not declared in sourceFiles (incomplete multi-file definition).`,
        )
      }
      if (!file.target.trim())
        errors.push(`${label} File "${file.path}" is missing an output target.`)

      const previous = targetClaims.get(file.target)
      if (previous) {
        const isAllowedSharedFile =
          previous.item !== item.slug &&
          previous.file.shared &&
          file.shared &&
          previous.file.path === file.path
        if (!isAllowedSharedFile) {
          errors.push(
            `${label} Duplicate output target "${file.target}"; already claimed by [${previous.item}] from "${previous.file.path}".`,
          )
        }
      } else {
        targetClaims.set(file.target, { item: item.slug, file })
      }
    }
  }

  for (const item of items) {
    for (const dependency of item.registry.registryDependencies) {
      const dependencyName = localDependencyName(dependency)
      if (!dependencyName) continue
      const resolved = byName.get(dependencyName)
      if (!resolved || !canGenerateOutput(resolved)) {
        errors.push(
          `[${item.slug}] Unresolved local registry dependency "${dependency}"; add an output-capable canonical item.`,
        )
      }
    }
  }

  const visiting = new Set<string>()
  const visited = new Set<string>()
  const visit = (name: string, ancestry: string[]): void => {
    if (visited.has(name)) return
    if (visiting.has(name)) {
      const cycleStart = ancestry.indexOf(name)
      errors.push(
        `Circular registry dependency: ${[...ancestry.slice(cycleStart), name].join(' -> ')}.`,
      )
      return
    }

    const item = byName.get(name)
    if (!item) return
    visiting.add(name)
    for (const dependency of item.registry.registryDependencies) {
      const child = localDependencyName(dependency)
      if (child) visit(child, [...ancestry, name])
    }
    visiting.delete(name)
    visited.add(name)
  }

  for (const item of items) visit(item.slug, [])

  return errors
}

export type PublicArtifact = {
  name?: unknown
  files?: Array<{ path?: unknown; target?: unknown; content?: unknown }>
}

export type PublicArtifactValidationOptions = {
  readSource: (relativePath: string) => string | Promise<string>
}

export async function validatePublicArtifacts(
  items: NavUIRegistryItem[],
  artifacts: Map<string, PublicArtifact>,
  options: PublicArtifactValidationOptions,
): Promise<string[]> {
  const errors: string[] = []
  const outputItems = items.filter(canGenerateOutput)
  const expected = new Map(outputItems.map((item) => [item.slug, item] as const))

  for (const item of items.filter((candidate) => candidate.status === 'draft')) {
    if (artifacts.has(item.slug)) {
      errors.push(`[${item.slug}] Draft item is accidentally present in public/r.`)
    }
  }

  for (const [name] of artifacts) {
    if (!expected.has(name)) {
      errors.push(`[${name}] Stale public artifact has no output-capable canonical item.`)
    }
  }

  for (const [name, item] of expected) {
    const artifact = artifacts.get(name)
    if (!artifact) {
      errors.push(`[${name}] Published item is missing generated output public/r/${name}.json.`)
      continue
    }
    if (artifact.name !== name) {
      errors.push(`[${name}] Public artifact declares mismatched name "${String(artifact.name)}".`)
    }

    const publicFiles = Array.isArray(artifact.files) ? artifact.files : []
    if (publicFiles.length !== item.registry.files.length) {
      errors.push(
        `[${name}] Public artifact has ${publicFiles.length} file(s); canonical item declares ${item.registry.files.length}.`,
      )
    }

    for (const canonicalFile of item.registry.files) {
      const publicFile = publicFiles.find(
        (file) => file.path === canonicalFile.path && file.target === canonicalFile.target,
      )
      if (!publicFile) {
        errors.push(
          `[${name}] Public artifact is missing canonical file "${canonicalFile.path}" -> "${canonicalFile.target}".`,
        )
        continue
      }

      const source = await options.readSource(canonicalFile.path)
      if (publicFile.content !== source) {
        errors.push(
          `[${name}] Installed content for "${canonicalFile.path}" differs from the canonical preview/code source.`,
        )
      }
    }
  }

  return errors
}
