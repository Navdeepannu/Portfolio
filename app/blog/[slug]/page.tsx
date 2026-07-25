import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { blogPosts, getBlogPost } from '@/data/blog'
import { portfolioSiteConfig } from '@/lib/site'
import { BlogArticle } from '@/site/blog/blog-article'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) return {}

  const path = `/blog/${post.slug}`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [portfolioSiteConfig.name],
      images: ['/icon.svg'],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
      images: ['/icon.svg'],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const canonicalUrl = `${portfolioSiteConfig.url}/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    image: `${portfolioSiteConfig.url}/icon.svg`,
    author: {
      '@type': 'Person',
      name: portfolioSiteConfig.name,
      url: portfolioSiteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: portfolioSiteConfig.name,
      url: portfolioSiteConfig.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <BlogArticle post={post} />
    </>
  )
}
