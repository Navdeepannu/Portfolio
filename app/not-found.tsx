import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Navbar } from '@/site/navbar'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background selection:bg-emerald-200/60 dark:bg-zinc-950 dark:selection:bg-emerald-500 dark:selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col">
        <Navbar fullWidth className="border-x border-border" />

        <section className="flex flex-1 items-center justify-center border-x border-border px-6 py-20">
          <div className="flex max-w-md flex-col items-center text-center">
            <p className="font-caveat text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
              404
            </p>

            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Page not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-balance text-muted-foreground sm:text-base">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>

            <Button asChild className="mt-8">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
