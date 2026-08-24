import { ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'

import type { ComponentDefinition } from '@/registry/types'
import {
  loadBlockCodeFiles,
  readProjectSourceFile,
  type LoadedBlockSourceFile,
} from '@/features/navui/code/source-loader'
import {
  getComponentExamples,
  getComponentShowcase,
} from '@/features/navui/catalog/components/component-entries'
import BlockCode from '@/features/navui/code/block-code'
import ComponentTabs, { ComponentPreview } from '@/features/navui/catalog/components/component-tabs'
import ComponentInstall from '@/features/navui/catalog/components/component-install'
import {
  ComponentNavigation,
  type ComponentNavigationItem,
} from '@/features/navui/catalog/components/component-navigation'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'

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
      className="flex w-fit max-w-xl items-start gap-2 rounded-md bg-muted/50 px-3 py-2 text-xs leading-5 text-muted-foreground"
    >
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />

      <div className="flex flex-col gap-1">
        {notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </aside>
  )
}

export default async function ComponentRenderer({
  component,
  previous,
  next,
}: {
  component: ComponentDefinition
  previous?: ComponentNavigationItem
  next?: ComponentNavigationItem
}) {
  const ShowcaseComponent = getComponentShowcase(component.slug)

  if (!ShowcaseComponent) {
    return (
      <article className="rounded-xl bg-card p-6 text-sm text-muted-foreground">
        Component for <code className="text-foreground">{component.slug}</code> is not registered.
      </article>
    )
  }

  const secondaryExamples = getComponentExamples(component.slug)

  const [componentFiles, exampleDocs] = await Promise.all([
    loadBlockCodeFiles(component),
    Promise.all(
      secondaryExamples.map(async (example) => ({
        example,
        files: await loadBlockCodeFiles({ ...component, sourceFiles: example.sourceFiles }),
      })),
    ),
  ])

  let utilsFiles: LoadedBlockSourceFile[] = []

  try {
    const utilsCode = await readProjectSourceFile('lib/utils.ts')
    utilsFiles = [{ filename: 'lib/utils.ts', language: 'ts', code: utilsCode }]
  } catch {
    utilsFiles = []
  }

  const deps = component.registry.dependencies ?? []
  const registryDeps = component.registry.registryDependencies ?? []

  const tunableProps = (component.api ?? [])
    .map((row) => row.prop)
    .filter((prop) => !['children', 'className', '...props'].includes(prop))

  return (
    <article className="flex w-full min-w-0 flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Breadcrumb className="flex-1">
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components" className="flex w-fit items-center gap-1.5">
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  Components
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="flex flex-col gap-3 pb-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="min-w-0 flex-1 text-3xl font-semibold tracking-tight text-foreground">
              {component.title}
            </h1>

            <ComponentNavigation previous={previous} next={next} />
          </div>

          <p className="max-w-xl text-sm text-muted-foreground">{component.description}</p>

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
          preview={<ComponentPreview slug={component.slug} />}
          code={
            <BlockCode
              files={componentFiles}
              analytics={{
                item_type: 'component',
                item_slug: component.slug,
                item_title: component.title,
                source: 'component_detail',
              }}
            />
          }
        />

        <ComponentNotes notes={component.notes} />
      </div>

      <section className="flex flex-col gap-4">
        <SectionHeading id="installation">Installation</SectionHeading>

        <ComponentInstall
          slug={component.slug}
          title={component.title}
          dependencies={deps}
          registryDependencies={registryDeps}
          sourceCode={
            <BlockCode
              key="component-source-code"
              files={componentFiles}
              collapsible
              analytics={{
                item_type: 'component',
                item_slug: component.slug,
                item_title: component.title,
                source: 'component_manual_install',
              }}
            />
          }
          utilsCode={
            <BlockCode
              key="utils-source-code"
              files={utilsFiles}
              analytics={{
                item_type: 'component',
                item_slug: component.slug,
                item_title: component.title,
                source: 'component_utility',
              }}
            />
          }
        />
      </section>

      {exampleDocs.length > 0 ? (
        <section aria-labelledby="examples" className="flex flex-col gap-6">
          <SectionHeading id="examples">Examples</SectionHeading>

          <div className="flex flex-col gap-10">
            {exampleDocs.map(({ example, files }) => (
              <div key={example.id} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <h3
                    id={`example-${example.id}`}
                    className="scroll-mt-24 text-base font-semibold text-foreground"
                  >
                    {example.title}
                  </h3>

                  {example.description ? (
                    <p className="max-w-2xl text-sm text-muted-foreground">{example.description}</p>
                  ) : null}
                </div>

                <ComponentTabs
                  slug={component.slug}
                  exampleId={example.id}
                  preview={<ComponentPreview slug={component.slug} exampleId={example.id} />}
                  code={
                    <BlockCode
                      files={files}
                      analytics={{
                        item_type: 'component',
                        item_slug: component.slug,
                        item_title: component.title,
                        example_id: example.id,
                        source: 'component_example',
                      }}
                    />
                  }
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

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
