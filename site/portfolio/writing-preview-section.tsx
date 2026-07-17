import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { blogPosts, getReadingTime } from '@/data/blog'
import { LandingSection } from '@/site/portfolio/landing-section'

export function WritingPreviewSection() {
  return (
    <LandingSection id="writing" label="Writing">
      <div>
        <p className="max-w-[68ch] text-base leading-7 text-foreground/80">
          Notes from debugging frontend systems, packaging reusable UI, and making interaction
          details work for more people.
        </p>

        <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="writing-row group/writing grid min-h-28 gap-3 py-6 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground sm:justify-end">
                  <span>{getReadingTime(post)} min read</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="writing-arrow size-4 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-5 inline-flex min-h-11 items-center text-sm font-medium underline decoration-border underline-offset-4 transition-[color,text-decoration-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground active:scale-[0.98]"
        >
          View all writing
        </Link>
      </div>
    </LandingSection>
  )
}
