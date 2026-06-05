'use client'

import { createElement, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { getComponentComponent } from '@/registry/component-entries'
import { getInstallCommands, type PackageManagerId } from '@/site/block-install-commands'
import { blockShowcaseCodeViewportClassName } from '@/site/block-showcase-viewport'
import { IconCheck, IconCopy } from '@tabler/icons-react'

const subscribeNoop = () => () => {}
const getOriginSnapshot = (): string =>
  typeof window === 'undefined' ? '' : window.location.origin
const getOriginServerSnapshot = (): string => ''

const TOOLBAR_SEGMENT_SHELL =
  'rounded-lg border border-border/60 shadow-sm ring-1 ring-foreground/6.5 dark:bg-background/50'

const TOOLBAR_TAB_STRIP =
  'inline-flex h-9 min-h-9 w-fit shrink-0 items-stretch gap-0.5 overflow-hidden' +
  TOOLBAR_SEGMENT_SHELL

const TOOLBAR_TAB_TRIGGER =
  'h-full min-h-0 w-auto flex-none shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-0 text-sm font-medium leading-none whitespace-nowrap text-muted-foreground/80 shadow-none transition-[color,background-color,border-color,box-shadow] duration-200 ease-out hover:bg-muted/60 hover:text-foreground/75 dark:hover:bg-input/40 data-[state=active]:bg-background bg-muted data-[state=active]:text-foreground dark:data-[state=active]:bg-background'

const PACKAGE_MANAGERS: readonly { id: PackageManagerId; name: string }[] = [
  { id: 'npm', name: 'npm' },
  { id: 'pnpm', name: 'pnpm' },
  { id: 'yarn', name: 'Yarn' },
  { id: 'bun', name: 'Bun' },
] as const

function CopyIconSlot({ copied }: { copied: boolean }) {
  return (
    <span className="relative flex size-4 shrink-0 items-center justify-center" aria-hidden>
      <AnimatePresence initial={false} mode="wait">
        {copied ? (
          <motion.span
            key="check"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.22 }}
          >
            <IconCheck className="size-4 shrink-0 text-emerald-800 dark:text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.22 }}
          >
            <IconCopy className="size-4 shrink-0 text-muted-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

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
  const [selectedPm, setSelectedPm] = useState<PackageManagerId>('bun')
  const [copied, setCopied] = useState(false)
  const [copyToastVisible, setCopyToastVisible] = useState(false)
  const copyToastTimeoutRef = useRef<number | null>(null)

  const origin = useSyncExternalStore(subscribeNoop, getOriginSnapshot, getOriginServerSnapshot)
  const commands = useMemo(() => getInstallCommands(slug, origin), [slug, origin])

  const copyCurrentToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(commands[selectedPm])
      setCopied(true)
      setCopyToastVisible(true)
      if (copyToastTimeoutRef.current != null) window.clearTimeout(copyToastTimeoutRef.current)
      copyToastTimeoutRef.current = window.setTimeout(() => {
        setCopyToastVisible(false)
        copyToastTimeoutRef.current = null
      }, 2000)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <Tabs defaultValue="preview" className="flex w-full flex-col gap-0">
      <div className="mb-3 flex min-h-9 w-full min-w-0 items-center justify-between gap-3 sm:gap-4">
        <TabsList className={TOOLBAR_TAB_STRIP}>
          <TabsTrigger value="preview" className={cn(TOOLBAR_TAB_TRIGGER)}>
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className={cn(TOOLBAR_TAB_TRIGGER)}>
            Code
          </TabsTrigger>
        </TabsList>

        <div className="flex min-h-9 shrink-0 items-center gap-2">
          <DropdownMenu modal={false}>
            <div
              className={cn(
                'flex h-9 shrink-0 items-stretch overflow-hidden rounded-lg border border-border/60 bg-background/80 shadow-sm ring-1 ring-foreground/6.5 dark:bg-background/50',
              )}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="inline-flex h-full min-h-0 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-none border-0 bg-transparent px-2 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
                  aria-label="Choose package manager"
                >
                  {selectedPm}
                </Button>
              </DropdownMenuTrigger>
              <span aria-hidden className="my-1.5 w-px self-stretch bg-border/60" />
              <Button
                type="button"
                variant="ghost"
                className="inline-flex h-full min-h-0 w-9 shrink-0 cursor-pointer items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
                aria-label="Copy install command"
                onClick={() => void copyCurrentToClipboard()}
              >
                <CopyIconSlot copied={copied} />
              </Button>
            </div>
            <DropdownMenuContent sideOffset={6} align="end" className="min-w-40">
              {PACKAGE_MANAGERS.map((pm) => (
                <DropdownMenuItem key={pm.id} onSelect={() => setSelectedPm(pm.id)}>
                  {pm.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setReloadKey((key) => key + 1)}
            aria-label="Reload preview"
          >
            Reload
          </Button>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        <TabsContent
          value="preview"
          className="mt-0 flex min-w-0 flex-col outline-none data-[state=inactive]:hidden"
        >
          <div
            key={reloadKey}
            className="flex min-h-72 w-full items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-muted/20 p-8"
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

      {copyToastVisible ? (
        <output
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-6 left-1/2 z-100 -translate-x-1/2 rounded-lg border border-border/80 bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5"
        >
          Copied to clipboard
        </output>
      ) : null}
    </Tabs>
  )
}
