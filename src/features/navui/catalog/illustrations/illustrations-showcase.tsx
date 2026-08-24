'use client'

import type { ComponentType, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Code2, Terminal, X } from 'lucide-react'
import { Drawer } from 'vaul'
import type { BundledLanguage } from 'shiki'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/features/navui/code/copy-button/copy-button'
import { CodeBlockCommand } from '@/features/navui/code/commands/code-block-command'
import { cn } from '@/lib/utils'
import { illustrationPreviewComponents } from '@/registry/generated/illustration-previews.generated'
import { illustrationItems } from '@/registry/items/illustrations'
import { getInstallCommands } from '@/features/navui/catalog/install-commands-display'
import BlockCode from '@/features/navui/code/block-code'
import { ANALYTICS_EVENTS } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'

type IllustrationSize = (typeof illustrationItems)[number]['size']

type IllustrationItem = (typeof illustrationItems)[number] & { Component: ComponentType }

type IllustrationSourceFile = {
  filename: string
  language: BundledLanguage
  code: string
}

type IllustrationSources = Record<string, IllustrationSourceFile[]>

const sizeClassName: Record<IllustrationSize, string> = {
  sm: 'min-h-76',
  md: 'min-h-88 md:col-span-2',
  wide: 'min-h-88 lg:col-span-2',
  tall: 'min-h-112 md:row-span-2',
  hero: 'min-h-128 md:col-span-2 lg:col-span-2 lg:row-span-2',
}

const illustrations: IllustrationItem[] = illustrationItems
  .filter((item) => item.status === 'published')
  .map((item) => ({ ...item, Component: illustrationPreviewComponents[item.slug] }))

function IllustrationTile({
  item,
  onCode,
}: {
  item: IllustrationItem
  onCode: (item: IllustrationItem) => void
}) {
  const installCommand = getInstallCommands(item.slug).npm
  const Preview = item.Component

  return (
    <article
      className={cn(
        'group relative isolate flex items-center justify-center bg-background p-8 md:p-10 lg:p-12',
        sizeClassName[item.size],
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100">
        <div className="absolute inset-0 bg-linear-to-b from-background/65 via-transparent to-background/65" />
      </div>

      <div className={cn('flex size-full items-center justify-center', item.previewClassName)}>
        <Preview />
      </div>

      <div className="absolute top-4 right-4 z-20 flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-8 gap-1.5 rounded-md border border-border/70 bg-background/90 px-2.5 text-xs shadow-sm backdrop-blur"
          onClick={() => onCode(item)}
        >
          <Code2 className="size-3.5" />
          Code
        </Button>

        <CopyButton
          type="button"
          variant="secondary"
          size="sm"
          text={installCommand}
          idleIcon={<Terminal className="size-3.5" />}
          className="ph-no-capture h-8 gap-1.5 rounded-md border border-border/70 bg-background/90 px-2.5 text-xs shadow-sm backdrop-blur"
          aria-label={`Copy install command for ${item.title}`}
          onCopySuccess={() =>
            trackAnalyticsEvent(ANALYTICS_EVENTS.CLI_COMMAND_COPIED, {
              item_type: 'illustration',
              item_slug: item.slug,
              item_title: item.title,
              package_manager: 'npm',
              source: 'illustration_catalog',
            })
          }
        >
          Install
        </CopyButton>
      </div>
    </article>
  )
}

function EmptyIllustrationTile() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <article className="grid min-h-76 place-items-center bg-background p-8 text-center md:p-10 lg:p-12">
      <motion.p
        initial={shouldReduceMotion ? false : { backgroundPosition: '200% center' }}
        animate={shouldReduceMotion ? undefined : { backgroundPosition: '-200% center' }}
        transition={{
          duration: 4.5,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 0.6,
        }}
        className="bg-[linear-gradient(105deg,var(--muted-foreground)_18%,var(--primary)_38%,#a78bfa_48%,#22d3ee_56%,var(--foreground)_66%,var(--muted-foreground)_82%)] bg-size-[250%_100%] bg-clip-text text-sm font-medium text-transparent"
      >
        Crafting more illustrations...
      </motion.p>
    </article>
  )
}

function CodeDrawer({
  illustrationSources,
  item,
  onClose,
}: {
  illustrationSources: IllustrationSources
  item: IllustrationItem | null
  onClose: () => void
}) {
  const installCommands = useMemo(() => {
    return getInstallCommands(item?.slug ?? 'payment-card')
  }, [item?.slug])

  const sourceFiles = useMemo(() => {
    if (!item) return []
    return illustrationSources[item.slug] ?? []
  }, [illustrationSources, item])

  return (
    <Drawer.Root
      open={Boolean(item)}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-80 bg-black/45 backdrop-blur-[2px]" />
        <Drawer.Content className="fixed right-2 bottom-0 left-2 z-90 mx-auto max-h-[88vh] max-w-340 overflow-hidden rounded-t-3xl border border-b-0 border-border bg-background shadow-2xl outline-none sm:right-4 sm:left-4">
          <div className="flex max-h-[88vh] min-h-[72vh] flex-col">
            <div className="flex justify-center pt-4">
              <div className="h-1.5 w-16 rounded-full bg-muted-foreground/25" />
            </div>

            <div className="mx-auto flex w-full max-w-250 flex-1 flex-col overflow-hidden px-6 pt-8 pb-10 sm:px-10 lg:px-12">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <Drawer.Title className="text-2xl font-semibold tracking-tight text-foreground">
                    {item?.title ?? 'Illustration'}
                  </Drawer.Title>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Install with the shadcn CLI or copy the complete illustration source into your
                    project.
                  </p>
                  <Drawer.Description className="sr-only">
                    Installation command and full source code for the selected illustration.
                  </Drawer.Description>
                </div>

                <Drawer.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="mt-0.5 shrink-0 rounded-full"
                    aria-label="Close code drawer"
                  >
                    <X className="size-4" />
                  </Button>
                </Drawer.Close>
              </div>

              <div className="mt-10 flex min-h-0 flex-1 flex-col gap-10 overflow-auto pr-1">
                <section className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Installation</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Copies the published registry item into your components/illustrations folder.
                    </p>
                  </div>

                  <CodeBlockCommand
                    commands={installCommands}
                    defaultPackageManager="npm"
                    onCopySuccess={(packageManager) => {
                      if (!item) return
                      trackAnalyticsEvent(ANALYTICS_EVENTS.CLI_COMMAND_COPIED, {
                        item_type: 'illustration',
                        item_slug: item.slug,
                        item_title: item.title,
                        package_manager: packageManager,
                        source: 'illustration_detail',
                      })
                    }}
                  />
                </section>

                <section className="flex min-h-0 flex-1 flex-col gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Code</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Full source for this illustration and its local helper file.
                    </p>
                  </div>

                  <div className="overflow-visible rounded-xl pb-8">
                    <BlockCode
                      files={sourceFiles}
                      collapsible
                      collapsedMaxHeightClassName="max-h-76"
                      expandedMaxHeightClassName="max-h-none"
                      analytics={
                        item
                          ? {
                              item_type: 'illustration',
                              item_slug: item.slug,
                              item_title: item.title,
                              source: 'illustration_detail',
                            }
                          : undefined
                      }
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default function IllustrationsShowcase({
  illustrationSources,
}: {
  illustrationSources: IllustrationSources
}): ReactNode {
  const [activeItem, setActiveItem] = useState<IllustrationItem | null>(null)
  const countLabel = useMemo(() => String(illustrations.length).padStart(2, '0'), [])

  return (
    <>
      <header className="grid min-h-96 place-items-center border-b border-border px-6 text-center md:min-h-100">
        <h1 className="font-geist text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Illustrations{' '}
          <span className="font-mono font-light text-muted-foreground/55">{countLabel}</span>
        </h1>
      </header>

      <section className="grid grid-flow-dense grid-cols-1 gap-px border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {illustrations.map((item) => (
          <IllustrationTile key={item.slug} item={item} onCode={setActiveItem} />
        ))}

        <EmptyIllustrationTile />
      </section>

      <CodeDrawer
        illustrationSources={illustrationSources}
        item={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </>
  )
}
