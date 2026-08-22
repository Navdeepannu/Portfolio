'use client'

import { useMemo, useState } from 'react'
import { FaReact } from 'react-icons/fa'
import { LuChevronRight, LuFolder, LuFolderOpen } from 'react-icons/lu'

import type { BundledLanguage } from '@/features/navui/code/code-block'
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from '@/features/navui/code/code-block'
import type { LoadedRegistrySourceFile } from '@/features/navui/code/source-loader'
import {
  buildSourceTree,
  getSourceTreeDirectoryPaths,
  type SourceTreeNode,
} from '@/features/navui/code/source-tree'
import { cn } from '@/lib/utils'

type FileTreeProps = {
  nodes: SourceTreeNode[]
  selectedPath: string
  expandedDirectories: Set<string>
  fileDetails: Map<string, LoadedRegistrySourceFile>
  onSelect: (path: string) => void
  onToggleDirectory: (path: string) => void
  depth?: number
}

function FileTree({
  nodes,
  selectedPath,
  expandedDirectories,
  fileDetails,
  onSelect,
  onToggleDirectory,
  depth = 0,
}: FileTreeProps) {
  return (
    <ul className="flex flex-col" aria-label={depth === 0 ? 'Registry files' : undefined}>
      {nodes.map((node) => {
        const paddingInlineStart = 8 + depth * 14

        if (node.type === 'directory') {
          const isExpanded = expandedDirectories.has(node.path)

          return (
            <li key={node.path}>
              <button
                type="button"
                className="flex h-8 w-full items-center gap-1.5 rounded-lg pr-2 text-left text-xs text-muted-foreground transition-colors outline-none hover:bg-background/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 motion-reduce:transition-none"
                style={{ paddingInlineStart }}
                aria-expanded={isExpanded}
                onClick={() => onToggleDirectory(node.path)}
              >
                <LuChevronRight
                  className={cn(
                    'size-3.5 shrink-0 transition-transform motion-reduce:transition-none',
                    isExpanded && 'rotate-90',
                  )}
                  aria-hidden="true"
                />
                {isExpanded ? (
                  <LuFolderOpen
                    className="size-3.5 shrink-0 text-muted-foreground/80"
                    aria-hidden="true"
                  />
                ) : (
                  <LuFolder
                    className="size-3.5 shrink-0 text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span className="truncate">{node.name}</span>
              </button>

              {isExpanded ? (
                <FileTree
                  nodes={node.children}
                  selectedPath={selectedPath}
                  expandedDirectories={expandedDirectories}
                  fileDetails={fileDetails}
                  onSelect={onSelect}
                  onToggleDirectory={onToggleDirectory}
                  depth={depth + 1}
                />
              ) : null}
            </li>
          )
        }

        const isSelected = node.path === selectedPath
        const file = fileDetails.get(node.path)
        const isDependency = file?.relationship === 'registry-dependency'

        return (
          <li key={node.path}>
            <button
              type="button"
              className={cn(
                'flex h-8 w-full items-center rounded-lg pr-2 text-left font-mono text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60 motion-reduce:transition-none',
                isSelected
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:bg-background/70 hover:text-foreground',
              )}
              style={{ paddingInlineStart: paddingInlineStart + 10 }}
              aria-current={isSelected ? 'page' : undefined}
              title={
                isDependency ? `${node.path} — installed through ${file.ownerTitle}` : node.path
              }
              onClick={() => onSelect(node.path)}
            >
              <span
                className={cn(
                  'flex w-fit max-w-full min-w-0 items-center gap-1.5 rounded-lg px-2 py-1',
                  isSelected && 'bg-background shadow-sm',
                )}
              >
                <FaReact className="size-3.5 shrink-0 text-sky-500/80!" aria-hidden="true" />
                <span className="min-w-0 truncate">{node.name}</span>
                {isDependency ? (
                  <span
                    className="shrink-0 rounded-sm bg-foreground/5 px-1 py-0.5 font-sans text-[9px] leading-none text-muted-foreground uppercase"
                    aria-hidden="true"
                  >
                    dep
                  </span>
                ) : null}
                {isDependency ? (
                  <span className="sr-only">Registry dependency from {file.ownerTitle}</span>
                ) : null}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function BlockSourceExplorer({ files }: { files: LoadedRegistrySourceFile[] }) {
  const data = useMemo(
    () =>
      files.map((file) => ({
        language: file.language,
        filename: file.displayPath,
        code: file.code,
      })),
    [files],
  )
  const tree = useMemo(() => buildSourceTree(files.map((file) => file.displayPath)), [files])
  const fileDetails = useMemo(() => new Map(files.map((file) => [file.displayPath, file])), [files])
  const [selectedPath, setSelectedPath] = useState(data[0]?.filename ?? '')
  const [expandedDirectories, setExpandedDirectories] = useState(
    () => new Set(getSourceTreeDirectoryPaths(tree)),
  )

  if (data.length === 0) return null

  const hasFileTree = data.length > 1
  const selectedFile = fileDetails.get(selectedPath)

  const selectFile = (path: string) => {
    setSelectedPath(path)
    setExpandedDirectories((current) => {
      const next = new Set(current)
      const segments = path.split('/')
      for (let index = 1; index < segments.length; index += 1) {
        next.add(segments.slice(0, index).join('/'))
      }
      return next
    })
  }

  const toggleDirectory = (path: string) => {
    setExpandedDirectories((current) => {
      const next = new Set(current)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  return (
    <CodeBlock
      className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl bg-muted/60 p-1.5 shadow-inner"
      data={data}
      value={selectedPath}
      onValueChange={selectFile}
    >
      <div
        className={cn(
          'grid h-full min-h-0 min-w-0 overflow-hidden rounded-lg bg-background shadow-sm',
          hasFileTree && 'md:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)]',
        )}
      >
        {hasFileTree ? (
          <aside className="hidden min-h-0 min-w-0 flex-col border-r border-border/60 bg-muted/35 md:flex">
            <div className="flex h-11 shrink-0 items-center px-3 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Files
              <span className="ml-auto rounded-full bg-background/80 px-1.5 py-0.5 font-mono text-[9px] leading-none tracking-normal text-muted-foreground shadow-sm">
                {data.length}
              </span>
            </div>
            <nav
              aria-label="Source files"
              className="min-h-0 flex-1 overflow-y-auto border-t border-border/50 p-2.5"
            >
              <FileTree
                nodes={tree}
                selectedPath={selectedPath}
                expandedDirectories={expandedDirectories}
                fileDetails={fileDetails}
                onSelect={selectFile}
                onToggleDirectory={toggleDirectory}
              />
            </nav>
          </aside>
        ) : null}

        <section aria-label="Selected source file" className="flex min-h-0 min-w-0 flex-col">
          <CodeBlockHeader className="min-h-11 shrink-0 border-b border-border/70 bg-background px-2 py-1.5">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <FaReact className="size-4 shrink-0 text-sky-500/80!" aria-hidden="true" />

              {hasFileTree ? (
                <>
                  <div className="min-w-0 flex-1 md:hidden">
                    <CodeBlockSelect>
                      <CodeBlockSelectTrigger
                        aria-label="Select source file"
                        className="h-8 w-full max-w-full min-w-0 justify-between border-border/70 bg-background px-2 font-mono text-xs shadow-none"
                      >
                        <CodeBlockSelectValue className="min-w-0 flex-1">
                          <span className="block min-w-0 truncate text-left" title={selectedPath}>
                            {selectedPath}
                          </span>
                        </CodeBlockSelectValue>
                      </CodeBlockSelectTrigger>

                      <CodeBlockSelectContent
                        position="popper"
                        align="start"
                        sideOffset={4}
                        collisionPadding={12}
                        className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-1.5rem)]"
                      >
                        {(item) => {
                          const file = fileDetails.get(item.filename)
                          const isDependency = file?.relationship === 'registry-dependency'
                          const dependencyLabel = isDependency
                            ? ` — Dependency · ${file.ownerTitle}`
                            : ''
                          const label = `${item.filename}${dependencyLabel}`
                          const filename = item.filename.split('/').pop() ?? item.filename

                          return (
                            <CodeBlockSelectItem
                              key={item.filename}
                              value={item.filename}
                              aria-label={label}
                              className="w-full max-w-full min-w-0 overflow-hidden pr-7 font-mono text-xs [&>span:last-child]:min-w-0 [&>span:last-child]:flex-1"
                              title={label}
                            >
                              <span className="flex w-full min-w-0 items-center gap-2 p-1.5">
                                <FaReact
                                  className="size-3.5 shrink-0 text-sky-500/80!"
                                  aria-hidden="true"
                                />
                                <span className="min-w-0 flex-1 truncate">{filename}</span>
                                {isDependency ? (
                                  <span
                                    aria-hidden="true"
                                    className="shrink-0 rounded-sm bg-muted px-1 py-0.5 font-sans text-[9px] leading-none text-muted-foreground uppercase"
                                  >
                                    dep
                                  </span>
                                ) : null}
                              </span>
                            </CodeBlockSelectItem>
                          )
                        }}
                      </CodeBlockSelectContent>
                    </CodeBlockSelect>
                  </div>
                  <span
                    className="hidden min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground md:block"
                    title={selectedPath}
                  >
                    {selectedPath}
                  </span>
                  {selectedFile?.relationship === 'registry-dependency' ? (
                    <span
                      className="hidden shrink-0 rounded-md bg-muted px-1.5 py-1 text-[10px] font-medium text-muted-foreground lg:inline-flex"
                      title={`Installed through ${selectedFile.ownerTitle}`}
                    >
                      Dependency · {selectedFile.ownerTitle}
                    </span>
                  ) : null}
                </>
              ) : (
                <span
                  className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground"
                  title={selectedPath}
                >
                  {selectedPath}
                </span>
              )}
            </div>

            <CodeBlockCopyButton
              aria-label="Copy selected file"
              title="Copy selected file"
              className="size-8"
            />
          </CodeBlockHeader>

          <CodeBlockBody className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-auto [-webkit-overflow-scrolling:touch]">
            {(item) => (
              <CodeBlockItem key={item.filename} lineNumbers value={item.filename}>
                <CodeBlockContent language={item.language as BundledLanguage}>
                  {item.code}
                </CodeBlockContent>
              </CodeBlockItem>
            )}
          </CodeBlockBody>
        </section>
      </div>
    </CodeBlock>
  )
}
