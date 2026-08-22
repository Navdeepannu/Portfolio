export type SourceTreeFile = {
  type: 'file'
  name: string
  path: string
}

export type SourceTreeDirectory = {
  type: 'directory'
  name: string
  path: string
  children: SourceTreeNode[]
}

export type SourceTreeNode = SourceTreeDirectory | SourceTreeFile

/**
 * Turns a portable shadcn target such as `@components/blocks/hero.tsx` into the
 * consumer-facing path shown by the explorer.
 */
export function registryTargetToDisplayPath(target: string): string {
  return target.trim().replaceAll('\\', '/').replace(/^@/, '').replace(/^\/+/, '')
}

function sortTree(nodes: SourceTreeNode[]): SourceTreeNode[] {
  return [...nodes]
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'directory' ? -1 : 1
      return a.name.localeCompare(b.name)
    })
    .map((node) =>
      node.type === 'directory' ? { ...node, children: sortTree(node.children) } : node,
    )
}

/** Builds a nested directory tree from normalized consumer installation paths. */
export function buildSourceTree(paths: string[]): SourceTreeNode[] {
  const root: SourceTreeNode[] = []

  for (const filePath of new Set(paths)) {
    const segments = filePath.split('/').filter(Boolean)
    if (segments.length === 0) continue

    let siblings = root
    const ancestors: string[] = []

    for (const segment of segments.slice(0, -1)) {
      ancestors.push(segment)
      const directoryPath = ancestors.join('/')
      let directory = siblings.find(
        (node): node is SourceTreeDirectory =>
          node.type === 'directory' && node.path === directoryPath,
      )

      if (!directory) {
        directory = {
          type: 'directory',
          name: segment,
          path: directoryPath,
          children: [],
        }
        siblings.push(directory)
      }

      siblings = directory.children
    }

    const name = segments.at(-1)
    if (name) siblings.push({ type: 'file', name, path: filePath })
  }

  return sortTree(root)
}

/** Returns every directory path so the complete file tree can be expanded initially. */
export function getSourceTreeDirectoryPaths(nodes: SourceTreeNode[]): string[] {
  return nodes.flatMap((node) =>
    node.type === 'directory' ? [node.path, ...getSourceTreeDirectoryPaths(node.children)] : [],
  )
}
