import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import {
  loadBlockCodeFiles,
  readProjectSourceFile,
  type LoadedBlockSourceFile,
} from '@/lib/block-source'
import { getComponentComponent } from '@/registry/component-entries'
import BlockCode from '@/site/block-code'
import ComponentTabs, { ComponentPreview } from '@/site/component-tabs'
import ComponentInstall from '@/site/component-install'
import { Badge } from '@/components/ui/badge'

function humanize(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-lg font-semibold text-foreground">
      {children}
    </h2>
  )
}

export default async function ComponentRenderer({ component }: { component: ComponentDefinition }) {
  const ShowcaseComponent = getComponentComponent(component.slug)

  if (!ShowcaseComponent) {
    return (
      <article className="rounded-xl bg-card p-6 text-sm text-muted-foreground">
        Component for <code className="text-foreground">{component.slug}</code> is not registered.
      </article>
    )
  }

  const demoSpecs = component.sourceFiles.filter((spec) => spec.filename === 'demo.tsx')
  const componentSpecs = component.sourceFiles.filter((spec) => spec.filename !== 'demo.tsx')

  const [componentFiles, demoFiles] = await Promise.all([
    loadBlockCodeFiles({ ...component, sourceFiles: componentSpecs }),
    loadBlockCodeFiles({ ...component, sourceFiles: demoSpecs }),
  ])

  let utilsFiles: LoadedBlockSourceFile[] = []
  try {
    const utilsCode = await readProjectSourceFile('lib/utils.ts')
    utilsFiles = [{ filename: 'lib/utils.ts', language: 'ts', code: utilsCode }]
  } catch {
    utilsFiles = []
  }

  const usageFiles: LoadedBlockSourceFile[] = component.usageExample
    ? [{ filename: 'example.tsx', language: 'tsx', code: component.usageExample }]
    : demoFiles

  // The demo (real usage) powers the top Code tab; fall back to source if absent.
  const codeTabFiles = demoFiles.length > 0 ? demoFiles : componentFiles

  const deps = component.registry.dependencies ?? []
  const registryDeps = component.registry.registryDependencies ?? []

  const tunableProps = (component.api ?? [])
    .map((row) => row.prop)
    .filter((prop) => !['children', 'className', '...props'].includes(prop))

  return (
    <article className="flex w-full min-w-0 flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Link
          href="/components"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Components
        </Link>

        <header className="flex flex-col gap-3 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {component.title}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">{component.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            {component.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
      </div>

      <ComponentTabs
        slug={component.slug}
        title={component.title}
        preview={<ComponentPreview slug={component.slug} />}
        code={<BlockCode files={codeTabFiles} />}
      />

      <section className="flex flex-col gap-4">
        <SectionHeading id="installation">Installation</SectionHeading>
        <ComponentInstall
          slug={component.slug}
          dependencies={deps}
          registryDependencies={registryDeps}
          sourceCode={<BlockCode key="component-source-code" files={componentFiles} collapsible />}
          utilsCode={<BlockCode key="utils-source-code" files={utilsFiles} />}
        />
      </section>

      {component.api && component.api.length > 0 ? (
        <section className="flex flex-col gap-4">
          <SectionHeading id="api-reference">API Reference</SectionHeading>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-160 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted text-xs text-foreground">
                  <th className="px-4 py-2.5 font-semibold">Prop</th>
                  <th className="px-4 py-2.5 font-semibold">Type</th>
                  <th className="px-4 py-2.5 font-semibold">Default</th>
                  <th className="px-4 py-2.5 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {component.api.map((row) => (
                  <tr key={row.prop} className="border-b border-border/60 last:border-b-0">
                    <td className="px-4 py-2.5 align-top">
                      <code className="font-mono text-xs text-foreground">{row.prop}</code>
                    </td>
                    <td className="px-4 py-2.5 align-top">
                      <code className="font-mono text-xs text-muted-foreground">{row.type}</code>
                    </td>
                    <td className="px-4 py-2.5 align-top">
                      <code className="font-mono text-xs text-muted-foreground">{row.default}</code>
                    </td>
                    <td className="px-4 py-2.5 align-top text-muted-foreground">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="flex flex-col gap-4 mb-12">
        <SectionHeading id="customization">Customization</SectionHeading>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
          <li>
            Pass <code className="text-foreground">className</code> to restyle the component —
            classes are merged with <code className="text-foreground">cn</code>, so your utilities
            win.
          </li>
          <li>
            Styling uses Tailwind utility classes and theme tokens, so it adapts to light/dark mode
            automatically.
          </li>
          {tunableProps.length > 0 ? (
            <li>
              Tune behavior with the props in the API reference above (e.g.{' '}
              <code className="text-foreground">{tunableProps[0]}</code>).
            </li>
          ) : null}
        </ul>
      </section>

      {component.credits && component.credits.length > 0 ? (
        <section className="flex flex-col gap-4">
          <SectionHeading id="credits">Credits</SectionHeading>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
            {component.credits.map((credit) => (
              <li key={credit.label}>
                {credit.href ? (
                  <a
                    href={credit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {credit.label}
                  </a>
                ) : (
                  credit.label
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {component.references && component.references.length > 0 ? (
        <section className="flex flex-col gap-4">
          <SectionHeading id="references">References</SectionHeading>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
            {component.references.map((reference) => (
              <li key={reference.href}>
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
