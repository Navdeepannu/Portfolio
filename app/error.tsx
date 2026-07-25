'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-svh place-items-center bg-background px-6 py-20 text-foreground">
      <section className="max-w-md text-center">
        <p className="text-sm font-medium text-muted-foreground">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page could not be loaded</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The issue may be temporary. Try loading this section again, or return to the portfolio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={() => unstable_retry()}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
