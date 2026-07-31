import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="max-w-6xl py-24 px-12">
      <h1 className="font-geist text-9xl font-bold tracking-tight text-shadow-accent text-shadow-xs">
        Playground
      </h1>

      <div className="flex items-center justify-center gap-4 py-12">
        <Button size="lg" className="rounded-full px-7 py-6 text-xl font-medium" variant="default">
          <Link href="ui.navdeepsingh.dev/blocks">Blocks</Link>
        </Button>

        <Button size="lg" className="text-medium rounded-full px-7 py-6 text-xl shadow-xl shadow-foreground/10 ring-1 ring-foreground/5.5" variant="outline">
          <Link href="ui.navdeepsingh.dev/components">Components</Link>
        </Button>
      </div>
    </main>
  )
}
