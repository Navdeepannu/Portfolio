import Link from 'next/link'

export function BlogFooter() {
  return (
    <footer className="mx-auto max-w-4xl border-t border-border/70 px-5 py-10 text-sm text-muted-foreground sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>Practical notes by Navdeep Singh.</p>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          Back to portfolio
        </Link>
      </div>
    </footer>
  )
}
