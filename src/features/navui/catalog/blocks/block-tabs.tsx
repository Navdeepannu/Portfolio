'use client'

import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'
import { LuMonitor, LuSmartphone, LuTablet } from 'react-icons/lu'

import { Button } from '@/components/ui/button'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import BlockIframe, { type BlockPreviewWidth } from '@/features/navui/previews/block-iframe'
import { getInstallCommands } from '@/features/navui/catalog/install-commands-display'
import { blockShowcaseCodeViewportClassName } from '@/features/navui/previews/block-showcase-viewport'
import { CodeXml, Maximize, RotateCcw, ScanEye } from 'lucide-react'

import { PackageManagerCommand } from '@/components/package-manager-command'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import PrimitiveSelector from '@/features/navui/primitives/primitive-selector'
import type { Primitive } from '@/config/navui-primitives'

type BlockTab = 'preview' | 'code'

const previewWidthOptions = [
  { value: 'full', label: 'Desktop', icon: LuMonitor },
  { value: 768, label: 'Tablet', icon: LuTablet },
  { value: 390, label: 'Mobile', icon: LuSmartphone },
] satisfies Array<{
  value: BlockPreviewWidth
  label: string
  icon: typeof LuMonitor
}>

export default function BlockTabs({
  slug,
  title,
  primitive,
  code,
}: {
  slug: string
  title: string
  primitive: Primitive
  code: ReactNode
}) {
  const [reloadKey, setReloadKey] = useState(0)
  const [activeTab, setActiveTab] = useState<BlockTab>('preview')
  const [previewWidth, setPreviewWidth] = useState<BlockPreviewWidth>('full')

  const commands = useMemo(() => getInstallCommands(slug), [slug])

  const onReload = () => setReloadKey((key) => key + 1)

  const onPreviewWidthChange = (width: BlockPreviewWidth) => {
    setPreviewWidth(width)
    setActiveTab('preview')
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as BlockTab)}
      className="flex w-full flex-col gap-0"
    >
      <div className="mb-3 flex min-h-9 w-full min-w-0 flex-col justify-between gap-3 sm:gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
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

          <div
            role="group"
            aria-label="Preview width"
            className="hidden h-9 items-center gap-1 rounded-lg bg-muted p-1 sm:flex"
          >
            {previewWidthOptions.map(({ value, label, icon: Icon }) => {
              const isActive = previewWidth === value

              return (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    'rounded-md text-muted-foreground',
                    isActive && 'bg-background text-foreground shadow-sm hover:bg-background/80',
                  )}
                  aria-label={`${label} preview`}
                  aria-pressed={isActive}
                  title={`${label} preview`}
                  onClick={() => onPreviewWidthChange(value)}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                </Button>
              )
            })}
          </div>

          <PrimitiveSelector primitive={primitive} />
        </div>

        <div className="flex min-h-9 shrink-0 items-center gap-2">
          <PackageManagerCommand commands={commands} defaultValue="npm" />

          <div className="flex h-9 items-center gap-1 rounded-lg bg-muted p-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="rounded-md bg-background shadow-sm hover:bg-background/80"
                  aria-label="Open preview in new tab"
                  title="Open in new tab"
                >
                  <Link href={`/preview/${slug}`} target="_blank" rel="noopener noreferrer">
                    <Maximize className="size-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="-translate-y-4 shadow-sm ring-1 ring-foreground/8.5"
              >
                <span className="text-sm">Open in full screen</span>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-md bg-background shadow-sm hover:bg-background/80"
                  onClick={onReload}
                  aria-label="Reload preview"
                  title="Reload preview"
                >
                  <RotateCcw />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="-translate-y-4 shadow-sm ring-1 ring-foreground/8.5"
              >
                <span className="text-sm">Reload Preview</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        <TabsContent
          value="preview"
          className="mt-0 flex min-w-0 flex-col outline-none data-[state=inactive]:hidden"
        >
          <BlockIframe
            slug={slug}
            title={title}
            primitive={primitive}
            reloadKey={reloadKey}
            width={previewWidth}
          />
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
