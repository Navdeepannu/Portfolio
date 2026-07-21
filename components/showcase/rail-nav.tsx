import { RailNav } from '@/components/ui/components/rail-nav'

const onThisPageItems = [
  { label: 'Introduction', href: '#introduction' },
  { label: 'Installation', href: '#installation' },
  { label: 'Usage', href: '#usage' },
  { label: 'Props', href: '#props' },
  { label: 'Examples', href: '#examples' },
]

export default function RailNavDemo() {
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-[1fr_180px]">
      <article className="max-w-3xl">
        <section id="introduction" className="scroll-mt-24">
          <h1>Rail Navigation</h1>
          <p>Small right-side navigation for long docs pages.</p>
        </section>

        <section id="installation" className="mt-24 scroll-mt-24">
          <h2>Installation</h2>
          <p>Install the package and add the component.</p>
        </section>

        <section id="usage" className="mt-24 scroll-mt-24">
          <h2>Usage</h2>
          <p>Pass the page sections as items.</p>
        </section>

        <section id="props" className="mt-24 scroll-mt-24">
          <h2>Props</h2>
          <p>Customize labels and href values.</p>
        </section>

        <section id="examples" className="mt-24 scroll-mt-24">
          <h2>Examples</h2>
          <p>Use it in docs, case studies, or long portfolio pages.</p>
        </section>
      </article>

      <div className="relative">
        <RailNav items={onThisPageItems} className="sticky top-28" />
      </div>
    </main>
  )
}
