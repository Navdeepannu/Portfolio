'use client'

import { createElement, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PackageManagerCommand } from '@/components/ui/components/package-manager-command'
import { cn } from '@/lib/utils'
import { getComponentComponent } from '@/registry/component-entries'
import { getInstallCommands } from '@/site/block-install-commands'
import { blockShowcaseCodeViewportClassName } from '@/site/block-showcase-viewport'
import { CodeXml, RotateCcw, ScanEye } from 'lucide-react'

const subscribeNoop = () => () => {}
const getOriginSnapshot = (): string =>
  typeof window === 'undefined' ? '' : window.location.origin
const getOriginServerSnapshot = (): string => ''

export function ComponentPreview({ slug }: { slug: string }) {
  const Component = getComponentComponent(slug)
  if (!Component) return null
  return createElement(Component)
}

export default function ComponentTabs({
  slug,
  title: _title,
  preview,
  code,
}: {
  slug: string
  title: string
  preview: ReactNode
  code: ReactNode
}) {
  const [reloadKey, setReloadKey] = useState(0)

  const origin = useSyncExternalStore(subscribeNoop, getOriginSnapshot, getOriginServerSnapshot)
  const commands = useMemo(() => getInstallCommands(slug, origin), [slug, origin])

  return (
    <Tabs defaultValue="preview" className="flex w-full flex-col gap-0">
      <div className="mb-3 flex min-h-9 w-full min-w-0 items-center justify-between gap-3 sm:gap-4">
        <TabsList className="rounded-lg p-1">
          <TabsTrigger value="preview" aria-label="Preview" title="Preview">
            <ScanEye />
            <span className="inline">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="code" aria-label="Code" title="Code">
            <CodeXml />
            <span className="inline">Code</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex min-h-9 shrink-0 items-center gap-2">
          <PackageManagerCommand
            commands={commands}
            defaultPackageManager="bun"
            className="w-37 sm:w-88 sm:max-w-[calc(100vw-7rem)]"
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setReloadKey((key) => key + 1)}
            aria-label="Reload preview"
          >
            <RotateCcw />
          </Button>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        <TabsContent
          value="preview"
          className="mt-0 flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-neutral-100 p-1 shadow-xs ring-1 ring-foreground/6.5 transition-[height] duration-200 ease-out outline-none data-[state=inactive]:hidden dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div
            key={reloadKey}
            className="flex min-h-72 w-full items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-sm dark:bg-neutral-950"
          >
            {preview}
          </div>
        </TabsContent>
        <TabsContent
          value="code"
          className={cn(
            'mt-0 flex min-h-0 min-w-0 flex-col overflow-hidden outline-none data-[state=inactive]:hidden',
            blockShowcaseCodeViewportClassName,
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{code}</div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
