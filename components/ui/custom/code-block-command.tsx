'use client'

import { useMemo, useState } from 'react'
import { CopyIcon, TerminalIcon } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from '@/components/ui/custom/copy-button'
import { cn } from '@/lib/utils'

export type PackageManagerId = 'pnpm' | 'yarn' | 'npm' | 'bun'

export type PackageCommandTabsProps = {
  commands: Record<PackageManagerId, string>
  defaultPackageManager?: PackageManagerId
  className?: string
  showPromptSymbol?: boolean
}

const PACKAGE_MANAGERS: readonly {
  id: PackageManagerId
  name: string
}[] = [
  { id: 'pnpm', name: 'pnpm' },
  { id: 'yarn', name: 'yarn' },
  { id: 'npm', name: 'npm' },
  { id: 'bun', name: 'bun' },
] as const

function PackageManagerIcon({ manager }: { manager: PackageManagerId }) {
  if (manager === 'bun') {
    return (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9" />
        <circle cx="8.6" cy="11.2" r="1" fill="white" />
        <circle cx="15.4" cy="11.2" r="1" fill="white" />
        <path
          d="M9.5 14.4c.6.7 1.4 1.1 2.5 1.1s1.9-.4 2.5-1.1"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (manager === 'pnpm') {
    return (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden>
        <path fill="currentColor" d="M3 3h5v5H3zM9.5 3h5v5h-5zM16 3h5v5h-5z" />
        <path fill="currentColor" opacity="0.65" d="M16 9.5h5v5h-5zM9.5 9.5h5v5h-5z" />
        <path fill="currentColor" opacity="0.35" d="M3 16h5v5H3zM9.5 16h5v5h-5zM16 16h5v5h-5z" />
      </svg>
    )
  }

  if (manager === 'npm') {
    return (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden>
        <path
          fill="currentColor"
          d="M2 7h20v8H12v2H7v-2H2zm2 6h2V9h1v4h1V8H4zm6-5v7h2v-2h3V8zm2 1h1v3h-1zm5-1v5h2V9h1v4h1V8z"
        />
      </svg>
    )
  }

  if (manager === 'yarn') {
    return (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9" />
        <path
          d="M13.6 7.4c-.5-.1-1 .7-1.2 1.1-.9-.1-1.7.2-2.3.8-.4.4-.7.5-1 .6-.2.1-.5.8-.6 1.2-.2.8.5 1.7.5 1.7s-1 .8-1.4 1.8a4.6 4.6 0 0 0-.3 2.1s-.7.7-.8 1.4c-.1.6.2 1.2.4 1.5.2.3.5.2.5.2s-.4.5 0 .8c.4.2 1.1.3 1.5 0 .3-.3.3-.9.4-1.2.1-.1.2.1.3.2.2.1.3.2.3.2s-.6.3-.4.9c.1.3.5.4 1 .4.2 0 2.4-.1 3-.3.3-.1.5-.3.5-.3s1.4-.4 2.7-1.2c.8-.5 1.2-.7 1.8-.9.6-.1.5-1-.2-1-.8 0-1.5.4-2 .8-1 .6-1.5.6-1.5.6s.3-1.1-.1-2.4c-.5-1.4-1.3-1.7-1.2-1.8.3-.5 1-1.2 1.2-2.5.2-.8.1-2.1-.2-2.8-.1-.2-.7.2-.7.2s-.5-1.3-.7-1.4z"
          fill="white"
        />
      </svg>
    )
  }

  return <TerminalIcon className="size-4 shrink-0" aria-hidden />
}

export function CodeBlockCommand({
  commands,
  defaultPackageManager = 'npm',
  className,
  showPromptSymbol = true,
}: PackageCommandTabsProps) {
  const [packageManager, setPackageManager] = useState<PackageManagerId>(defaultPackageManager)

  const selectedCommand = commands[packageManager]

  const tabs = useMemo(() => {
    return PACKAGE_MANAGERS.filter((pm) => Boolean(commands[pm.id]))
  }, [commands])

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-muted p-1 shadow-sm ring-1 ring-foreground/5',
        className,
      )}
    >
      <Tabs
        value={packageManager}
        onValueChange={(value) => setPackageManager(value as PackageManagerId)}
        className="gap-0 rounded-lg bg-background"
      >
        <div className="relative flex h-12 items-center border-b border-border/70 pr-12">
          <TabsList className="h-full justify-start gap-1 rounded-none bg-transparent p-0 px-4">
            <div className="mr-2 flex size-5 shrink-0 items-center justify-center text-muted-foreground">
              <PackageManagerIcon manager={packageManager} />
            </div>

            {tabs.map((pm) => (
              <TabsTrigger
                key={pm.id}
                value={pm.id}
                className={cn(
                  'relative h-full rounded-none border-0 bg-transparent px-2.5 font-mono text-sm text-muted-foreground shadow-none',
                  'data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
                  'after:absolute after:right-0 after:-bottom-px after:left-0 after:h-[1.5px] after:bg-transparent',
                  'data-[state=active]:after:bg-foreground',
                )}
              >
                {pm.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <CopyButton
            type="button"
            variant="ghost"
            size="icon"
            text={selectedCommand}
            className={cn(
              'absolute top-1/2 right-3 size-8 -translate-y-1/2 rounded-md text-muted-foreground',
              'hover:bg-muted hover:text-foreground dark:hover:bg-input/40',
              '[&_svg]:size-4',
            )}
            aria-label="Copy command"
            title="Copy command"
          />
        </div>

        {tabs.map((pm) => (
          <TabsContent key={pm.id} value={pm.id} className="mt-0 outline-none">
            <pre className="overflow-x-auto p-4">
              <code className="flex min-w-max items-center font-mono text-sm text-muted-foreground">
                {showPromptSymbol ? (
                  <span className="mr-3 text-muted-foreground/80 select-none">$</span>
                ) : null}

                <span className="text-foreground">{commands[pm.id]}</span>
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
