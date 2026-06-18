'use client'

import Link from 'next/link'
import { useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import BlockIframe from '@/site/block-iframe'
import { getInstallCommands } from '@/site/block-install-commands'
import { blockShowcaseCodeViewportClassName } from '@/site/block-showcase-viewport'
import { CodeXml, Maximize, RotateCcw, ScanEye } from 'lucide-react'

import { PackageManagerCommand } from '@/components/ui/components/package-manager-command'

const subscribeNoop = () => () => {}
const getOriginSnapshot = (): string =>
  typeof window === 'undefined' ? '' : window.location.origin
const getOriginServerSnapshot = (): string => ''

const TOOLBAR_SEGMENT_SHELL =
  'rounded-lg border border-border/60 shadow-sm ring-1 ring-foreground/6.5 dark:bg-background/50'

const TOOLBAR_OPEN_PREVIEW_CHROME =
  'inline-flex h-9 min-h-9 w-9 shrink-0 items-stretch overflow-hidden ' + TOOLBAR_SEGMENT_SHELL
const TOOLBAR_OPEN_PREVIEW_BUTTON =
  'flex size-full min-h-0 items-center justify-center gap-0 rounded-none border-0 bg-transparent p-0 shadow-none hover:bg-muted/60 dark:hover:bg-input/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4'

export default function BlockTabs({
  slug,
  title,
  code,
}: {
  slug: string
  title: string
  code: ReactNode
}) {
  const [reloadKey, setReloadKey] = useState(0)

  const origin = useSyncExternalStore(subscribeNoop, getOriginSnapshot, getOriginServerSnapshot)

  const commands = useMemo(() => getInstallCommands(slug, origin), [slug, origin])

  const onReload = () => setReloadKey((key) => key + 1)
  return (
    <Tabs defaultValue="preview" className="flex w-full flex-col gap-0">
      <div className="mb-3 flex min-h-9 w-full min-w-0 items-center justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
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

          <div className="group flex h-9 cursor-pointer items-center rounded-lg bg-muted p-0.5">
            <Button
              asChild
              variant="ghost"
              className="inline-flex rounded-md bg-background shadow-sm [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              aria-label="Open preview in new tab"
              title="Open in new tab"
            >
              <Link href={`/preview/${slug}`} target="_blank" rel="noopener noreferrer">
                <Maximize className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex min-h-9 shrink-0 items-center gap-2">
          <PackageManagerCommand commands={commands} defaultPackageManager="npm" />

          <div className={TOOLBAR_OPEN_PREVIEW_CHROME}>
            <Button
              type="button"
              variant="ghost"
              className={cn(TOOLBAR_OPEN_PREVIEW_BUTTON)}
              onClick={onReload}
              aria-label="Reload preview"
              title="Reload preview"
            >
              <RotateCcw />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        <TabsContent
          value="preview"
          className="mt-0 flex min-w-0 flex-col outline-none data-[state=inactive]:hidden"
        >
          <BlockIframe slug={slug} title={title} reloadKey={reloadKey} />
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
