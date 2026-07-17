import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { blogPosts, formatBlogDate, getReadingTime } from '@/data/blog'

export function BlogIndex() {
  return (
    <main id="blog-content" className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 md:py-24">
      <header className="max-w-2xl">
        <p className="font-mono text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Writing
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          Notes from building frontend systems.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Practical drafts about the production details behind routing, reusable UI, and accessible
          interaction.
        </p>
      </header>

      <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
        {blogPosts.map((post) => (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="writing-row group/writing grid gap-5 py-8 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10"
            >
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.015em] text-foreground">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time> ·{' '}
                  {getReadingTime(post)} min read
                </p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="writing-arrow size-4 text-muted-foreground transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
              />
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
