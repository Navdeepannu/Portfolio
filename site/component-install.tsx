'use client'

import { Children, useMemo, useSyncExternalStore, type ReactNode } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getInstallCommands, type PackageManagerId } from '@/site/block-install-commands'
import { CodeBlockCommand } from '@/components/ui/custom/code-block-command'

const subscribeNoop = () => () => {}

const getOriginSnapshot = (): string =>
  typeof window === 'undefined' ? '' : window.location.origin

const getOriginServerSnapshot = (): string => ''

type PackageCommands = Record<PackageManagerId, string>

function getDependencyCommands(dependencies: string[]): PackageCommands | null {
  if (dependencies.length === 0) return null

  const packages = dependencies.join(' ')

  return {
    npm: `npm install ${packages}`,
    pnpm: `pnpm add ${packages}`,
    yarn: `yarn add ${packages}`,
    bun: `bun add ${packages}`,
  }
}

function getRegistryDependencyCommands(registryDependencies: string[]): PackageCommands | null {
  if (registryDependencies.length === 0) return null

  const packages = registryDependencies.join(' ')

  return {
    npm: `npx shadcn@latest add ${packages}`,
    pnpm: `pnpm dlx shadcn@latest add ${packages}`,
    yarn: `yarn dlx shadcn@latest add ${packages}`,
    bun: `bunx --bun shadcn@latest add ${packages}`,
  }
}

function Step({
  title,
  index,
  children,
  isLast = false,
}: {
  index: number
  title: string
  children: ReactNode
  isLast?: boolean
}) {
  return (
    <li className="relative flex flex-col gap-3 pb-8 pl-8 last:pb-0">
      {!isLast && (
        <span aria-hidden="true" className="absolute top-6 bottom-1 left-3 w-px bg-muted rounded-full" />
      )}

      <span
        aria-hidden="true"
        className="absolute top-2 left-3 size-1 -translate-x-1/2 rounded-full bg-foreground ring-1 ring-muted"
      />

      <h4 className="text-sm font-medium text-foreground">{title}</h4>

      <div className="flex flex-col gap-3">{Children.toArray(children)}</div>
    </li>
  )
}

export default function ComponentInstall({
  slug,
  dependencies,
  registryDependencies,
  sourceCode,
  utilsCode,
  showImportNote = true,
}: {
  slug: string
  dependencies: string[]
  registryDependencies: string[]
  sourceCode: ReactNode
  utilsCode: ReactNode
  showImportNote?: boolean
}) {
  const origin = useSyncExternalStore(subscribeNoop, getOriginSnapshot, getOriginServerSnapshot)

  const cliCommands = useMemo(() => getInstallCommands(slug, origin), [slug, origin])

  const depCommands = useMemo(() => {
    return getDependencyCommands(dependencies)
  }, [dependencies])

  const registryCommands = useMemo(() => {
    return getRegistryDependencyCommands(registryDependencies)
  }, [registryDependencies])

  return (
    <Tabs defaultValue="command" className="flex w-full flex-col gap-4">
      <TabsList className="rounded-lg p-1">
        <TabsTrigger value="command">Command</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="command" className="mt-0 flex flex-col gap-3 outline-none">
        <CodeBlockCommand commands={cliCommands} />
      </TabsContent>

      <TabsContent value="manual" className="mt-0 flex flex-col outline-none">
        <ol className="mt-1 flex flex-col">
          <Step index={1} title="Install dependencies">
            {depCommands ? (
              <CodeBlockCommand commands={depCommands} />
            ) : (
              <p className="text-sm text-muted-foreground">No external dependencies required.</p>
            )}

            {registryCommands ? (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground">
                  This component builds on shadcn UI primitives:
                </p>

                <CodeBlockCommand commands={registryCommands} />
              </div>
            ) : null}
          </Step>

          <Step index={2} title="Add the cn utility">
            <p className="text-sm text-muted-foreground">
              The component uses <code className="text-foreground">cn</code> from{' '}
              <code className="text-foreground">@/lib/utils</code>. If your project was set up with
              shadcn, you already have it. Otherwise, add this file:
            </p>

            {utilsCode}
          </Step>

          <Step index={3} title="Copy the component code">
            <p className="text-sm text-muted-foreground">Paste the following into your project.</p>

            {sourceCode}
          </Step>

          {showImportNote ? (
            <Step index={4} title="Update the import paths">
              <p className="text-sm text-muted-foreground">
                Update import paths based on your project setup.
              </p>
            </Step>
          ) : null}
        </ol>
      </TabsContent>
    </Tabs>
  )
}
