import { RailNav } from '@/components/ui/components/rail-nav'

const onThisPageItems = [
  { label: 'Introduction', href: '#introduction' },
  { label: 'Installation', href: '#installation' },
  { label: 'Usage', href: '#usage' },
  { label: 'Props', href: '#props' },
  { label: 'Examples', href: '#examples' },
] as const

export default function RailNavDemo() {
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 xl:grid-cols-[minmax(0,1fr)_180px] xl:items-start">
      <article className="max-w-3xl">
        <section id="introduction" className="min-h-[70vh] scroll-mt-24">
          <h1 className="text-4xl font-semibold tracking-tight">Rail Navigation</h1>

          <p className="mt-4 text-muted-foreground">
            Small right-side navigation for long documentation pages.
          </p>
        </section>

        <section id="installation" className="min-h-[70vh] scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>

          <p className="mt-4 text-muted-foreground">Install the package and add the component.</p>
        </section>

        <section id="usage" className="min-h-[70vh] scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>

          <p className="mt-4 text-muted-foreground">Pass the page sections as navigation items.</p>
        </section>

        <section id="props" className="min-h-[70vh] scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight">Props</h2>

          <p className="mt-4 text-muted-foreground">
            Customize labels, destinations, state, and observer behavior.
          </p>
        </section>

        <section id="examples" className="min-h-[70vh] scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

          <p className="mt-4 text-muted-foreground">
            Use it in documentation, case studies, or long portfolio pages.
          </p>
        </section>
      </article>

      <RailNav items={onThisPageItems} className="sticky top-28 h-fit self-start" />
    </main>
  )
}
