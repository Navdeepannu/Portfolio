import { ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'

import type { ComponentDefinition } from '@/data/component-types'
import {
  loadBlockCodeFiles,
  readProjectSourceFile,
  type LoadedBlockSourceFile,
} from '@/lib/block-source'
import { getComponentShowcase } from '@/registry/component-entries'
import BlockCode from '@/site/block-code'
import ComponentTabs, { ComponentPreview } from '@/site/component-tabs'
import ComponentInstall from '@/site/component-install'
import { Badge } from '@/components/ui/badge'

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-lg font-semibold text-foreground">
      {children}
    </h2>
  )
}

function ComponentNotes({ notes }: { notes?: string[] }) {
  if (!notes || notes.length === 0) return null

  return (
    <aside
      aria-label="Component notes"
      className="flex max-w-2xl items-start gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground"
    >
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />

      <div className="flex flex-col gap-1 leading-5">
        {notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </aside>
  )
}

export default async function ComponentRenderer({ component }: { component: ComponentDefinition }) {
  const ShowcaseComponent = getComponentShowcase(component.slug)

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

  // The demo usage powers the top Code tab. Fall back to source if absent.
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

        <header className="flex flex-col gap-3 pb-2">
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

      <div className="flex flex-col gap-3">
        <ComponentTabs
          slug={component.slug}
          title={component.title}
          preview={<ComponentPreview slug={component.slug} />}
          code={<BlockCode files={codeTabFiles} />}
        />

        <ComponentNotes notes={component.notes} />
      </div>

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

      <section className="mb-12 flex flex-col gap-4">
        <SectionHeading id="customization">Customization</SectionHeading>

        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
          <li>
            Pass <code className="text-foreground">className</code> to restyle the component.
            Classes are merged with <code className="text-foreground">cn</code>, so your utilities
            win.
          </li>

          <li>
            Styling uses Tailwind utility classes and theme tokens, so it adapts to light/dark mode
            automatically.
          </li>

          {tunableProps.length > 0 ? (
            <li>
              Tune behavior with the props in the API reference above, for example{' '}
              <code className="text-foreground">{tunableProps[0]}</code>.
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
