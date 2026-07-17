import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import type { BlogBlock, BlogPost } from '@/data/blog'
import { formatBlogDate, getReadingTime } from '@/data/blog'

function ArticleBlock({ block }: { block: BlogBlock }) {
  if (block.type === 'paragraph') {
    return <p>{block.text}</p>
  }

  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={`${item.lead ?? ''}-${item.text}`}>
            {item.lead ? <strong>{item.lead} </strong> : null}
            {item.text}
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'code') {
    return (
      <div className="not-prose my-7 overflow-hidden rounded-xl border border-border/80 bg-muted/60">
        <div className="border-b border-border/80 px-4 py-2 font-mono text-[0.65rem] tracking-wider text-muted-foreground uppercase">
          {block.language}
        </div>
        <pre className="overflow-x-auto px-4 py-5 text-[0.78rem] leading-6 text-foreground sm:px-5">
          <code>{block.code}</code>
        </pre>
      </div>
    )
  }

  return (
    <aside className="not-prose my-7 border-l-2 border-foreground/20 pl-5">
      <p className="text-sm font-semibold text-foreground">{block.title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{block.text}</p>
    </aside>
  )
}

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <main id="blog-content" className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 md:py-20">
      <article>
        <header className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All writing
          </Link>
          <p className="mt-8 font-mono text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {post.topics.join(' · ')}
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.035em] text-foreground sm:text-4xl sm:leading-tight md:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {post.description}
          </p>
          <p className="mt-5 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time> ·{' '}
            {getReadingTime(post)} min read
          </p>
        </header>

        <div className="article-prose mt-14 max-w-2xl">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.blocks.map((block, index) => (
                <ArticleBlock key={`${section.heading}-${block.type}-${index}`} block={block} />
              ))}
            </section>
          ))}

          {post.references.length > 0 ? (
            <section aria-labelledby="article-references">
              <h2 id="article-references">References</h2>
              <ul>
                {post.references.map((reference) => (
                  <li key={reference.href}>
                    <Link
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                      {reference.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  )
}
