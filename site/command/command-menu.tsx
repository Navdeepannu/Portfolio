'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Command as CommandPrimitive } from 'cmdk'
import { ArrowUpRight, CornerDownLeft, SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import type { SearchGroup, SearchItem } from '@/lib/search-data'
import Logo from '../ui-library/ui-library-logo'

type CommandMenuProps = {
  site: 'portfolio' | 'ui'
  groups: SearchGroup[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sharedShortcuts = [
  { label: 'Open command menu', keys: ['⌘', 'K'] },
  { label: 'Toggle theme', keys: ['D'] },
  { label: 'Close dialogs', keys: ['Esc'] },
] as const

const siteShortcuts = {
  portfolio: [...sharedShortcuts, { label: 'Previous or next image (viewer)', keys: ['←', '→'] }],
  ui: [...sharedShortcuts],
} as const

export function CommandMenu({ site, groups, open, onOpenChange }: CommandMenuProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next) setQuery('')
      onOpenChange(next)
    },
    [onOpenChange],
  )

  const handleSelect = React.useCallback(
    (item: SearchItem) => {
      handleOpenChange(false)
      if (item.onSelect) {
        item.onSelect()
        return
      }
      if (!item.href) return
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
        return
      }
      router.push(item.href)
    },
    [handleOpenChange, router],
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'top-[18%] grid w-[calc(100%-1.5rem)] max-w-[calc(100%-1.5rem)] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl',
          'rounded-2xl bg-muted/80 shadow-2xl ring-1 ring-foreground/10',
        )}
      >
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <DialogDescription className="sr-only">
          {site === 'ui'
            ? 'Search across NavUI pages, blocks, and components.'
            : 'Search across portfolio pages and links.'}{' '}
          Use arrow keys to navigate and Enter to open.
        </DialogDescription>

        <CommandPrimitive
          data-slot="command"
          label="Command Menu"
          shouldFilter
          className="flex w-full flex-col text-sm text-popover-foreground"
        >
          <CommandSearch value={query} onValueChange={setQuery} />

          <div className="px-2 pb-2">
            <div
              className={cn(
                'overflow-hidden rounded-xl border border-border/70',
                'bg-background/50 dark:bg-background/30',
              )}
            >
              <CommandPrimitive.List
                data-slot="command-list"
                className={cn(
                  '/6 no-scrollbar max-h-80 scroll-py-2 overflow-x-hidden overflow-y-auto bg-card shadow-xl',
                  'p-1.5 outline-none',
                )}
              >
                <CommandPrimitive.Empty asChild>
                  <CommandEmpty query={query} site={site} />
                </CommandPrimitive.Empty>

                {query ? null : <CommandShortcuts site={site} />}

                {groups.map((group) => (
                  <CommandGroupRender key={group.id} group={group} onSelect={handleSelect} />
                ))}
              </CommandPrimitive.List>
            </div>
          </div>

          <CommandFooter />
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}

function CommandShortcuts({ site }: { site: CommandMenuProps['site'] }) {
  return (
    <section aria-labelledby={`${site}-keyboard-shortcuts`} className="px-4 pt-3 pb-2">
      <h2
        id={`${site}-keyboard-shortcuts`}
        className="text-[11px] font-medium tracking-wide text-muted-foreground/80"
      >
        Keyboard shortcuts
      </h2>
      <dl className="mt-1.5 divide-y divide-border/50">
        {siteShortcuts[site].map((shortcut) => (
          <div key={shortcut.label} className="flex min-h-10 items-center gap-4 py-1.5">
            <dt className="text-sm text-foreground/75">{shortcut.label}</dt>
            <dd className="ml-auto">
              <KbdGroup>
                {shortcut.keys.map((key) => (
                  <Kbd key={key} className="bg-background/80 dark:bg-background/40">
                    {key}
                  </Kbd>
                ))}
              </KbdGroup>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function CommandSearch({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (next: string) => void
}) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3.5">
      <SearchIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        autoFocus
        value={value}
        onValueChange={onValueChange}
        placeholder="Type a command or search…"
        className={cn(
          'flex h-6 w-full min-w-0 bg-transparent text-[15px] tracking-tight text-foreground',
          'placeholder:font-normal placeholder:text-muted-foreground/70',
          'outline-none disabled:cursor-not-allowed disabled:opacity-50',
        )}
      />
    </div>
  )
}

function CommandGroupRender({
  group,
  onSelect,
}: {
  group: SearchGroup
  onSelect: (item: SearchItem) => void
}) {
  if (group.items.length === 0) return null

  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      heading={group.heading}
      className={cn(
        'overflow-hidden px-1.5',
        'first:**:[[cmdk-group-heading]]:pt-2',
        '**:[[cmdk-group-heading]]:px-2.5 **:[[cmdk-group-heading]]:pt-3 **:[[cmdk-group-heading]]:pb-1.5',
        '**:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-wide',
        '**:[[cmdk-group-heading]]:text-muted-foreground/80',
      )}
    >
      {group.items.map((item) => (
        <CommandRow key={item.id} item={item} onSelect={onSelect} />
      ))}
    </CommandPrimitive.Group>
  )
}

function CommandRow({
  item,
  onSelect,
}: {
  item: SearchItem
  onSelect: (item: SearchItem) => void
}) {
  const Icon = item.icon
  const value = [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(' ')

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      value={value}
      onSelect={() => onSelect(item)}
      className={cn(
        'group relative flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2',
        'text-sm text-foreground/75 transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        'data-selected:bg-accent data-selected:text-accent-foreground',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      )}
    >
      {Icon ? (
        <Icon
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-colors group-data-selected:text-accent-foreground"
        />
      ) : (
        <span aria-hidden="true" className="size-4" />
      )}

      <span className="truncate">{item.label}</span>

      {item.external ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 text-muted-foreground/60 transition-colors group-data-selected:text-accent-foreground/70"
        />
      ) : null}

      <div className="ml-auto flex items-center gap-1.5">
        {item.shortcut ? (
          <KbdGroup className="opacity-70 group-data-selected:opacity-100">
            {item.shortcut.map((key) => (
              <Kbd
                key={key}
                className="bg-background/80 group-data-selected:bg-background/60 group-data-selected:text-foreground dark:bg-background/40"
              >
                {key}
              </Kbd>
            ))}
          </KbdGroup>
        ) : null}
      </div>
    </CommandPrimitive.Item>
  )
}

function CommandEmpty({ query, site }: { query: string; site: CommandMenuProps['site'] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-4 py-12 text-center">
      <p className="text-sm font-medium text-foreground">No results found</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        {query
          ? `Nothing matched “${query}”. Try a different query.`
          : site === 'ui'
            ? 'Try searching for a block or component.'
            : 'Try searching for a project, page or profile.'}
      </p>
    </div>
  )
}

function CommandFooter() {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 border-t border-border/60 px-3.5 py-2',
        'bg-background/40 dark:bg-background/20',
      )}
    >
      <Logo />
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>Go to Page</span>
        <Kbd className="bg-popover shadow-sm dark:bg-background/40">
          <CornerDownLeft className="size-3" />
        </Kbd>
      </div>
    </div>
  )
}
