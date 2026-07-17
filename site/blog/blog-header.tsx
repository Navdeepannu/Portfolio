import Link from 'next/link'

export function BlogHeader() {
  return (
    <header className="border-b border-border/70">
      <a
        href="#blog-content"
        className="fixed top-3 left-3 z-50 inline-flex min-h-11 -translate-y-20 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background transition-transform duration-150 focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-16 max-w-4xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm font-semibold tracking-tight focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          Navdeep Singh
        </Link>
        <nav aria-label="Writing navigation" className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Portfolio
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center px-2 text-sm text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Writing
          </Link>
          <a
            href="/resume/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:inline-flex"
          >
            Resume
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
