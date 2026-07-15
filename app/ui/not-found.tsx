import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { UiLibraryNavbar } from '@/site/ui-library/ui-library-navbar'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <UiLibraryNavbar />
      <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 py-20">
        <div className="flex max-w-md flex-col items-center text-center">
          <p className="font-caveat text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
            404
          </p>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            UI page not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            This component, block, illustration, or template may have moved.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Back to the UI library</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
