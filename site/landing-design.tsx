'use client'

import React from 'react'
import Image from 'next/image'

import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/context/portfolio-mode-provider'
import Masonry from './masonry-grid'

interface LandingProjectsProps {
  showAll?: boolean
}
const items = [
  {
    id: '2',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlzyCwl1GLxvDQCGptolAdz7ghSeXqVYN9E24H',
    url: 'https://navdeepsingh.dev/blocks/hero',
  },
  {
    id: '3',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTltgWg2wAncYx8GiQaPmyboup14RwlrMzW3IA9',
    url: 'https://navdeepsingh.dev/blocks/logo-cloud',
  },
  {
    id: '4',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlQICKERjBWY7XQAxMKNls4T6nZb0U2pHvfS9G',
    url: 'https://navdeepsingh.dev/blocks/footer',
  },
  {
    id: '5',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlNP5cqDeJIMXrF35vasVbLAD0jBGhUEyeltu8',
    url: 'https://navdeepsingh.dev/blocks/logo-cloud',
  },
  {
    id: '6',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlVinCr1kua1nwvRWLo6bCcepS4YzPXjuFMh7T',
    url: 'https://navdeepsingh.dev/blocks/hero',
  },
  {
    id: '7',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTluWJOBoa0NZaY9AGeqk23D8IxEFOyV1srnSBw',
    url: 'https://navdeepsingh.dev/blocks/teams',
  },
  {
    id: '8',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
    url: 'https://navdeepsingh.dev/blocks',
  },
  {
    id: '9',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlxMptHdg7C4maJxGZf1yUPI6YWNcVgE0T9hXu',
    url: 'https://navdeepsingh.dev/blocks',
  },
  {
    id: '10',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlIU24l7uN5NM8tUJvn9haERPTBFr4HXxQoWsw',
    url: 'https://navdeepsingh.dev/blocks',
  },
  {
    id: '11',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTltgWg2wAncYx8GiQaPmyboup14RwlrMzW3IA9',
    url: 'https://navdeepsingh.dev/blocks/logo-cloud',
  },
  {
    id: '12',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTla061friSJOXQxRe6zTuKjbhs70mMEZD2U1Aw',
    url: 'https://navdeepsingh.dev/blocks',
  },
]
export const LandingProjects: React.FC<LandingProjectsProps> = () => {
  const { mode } = usePortfolioMode()
  const { showcase } = getPortfolioContent(mode)

  return (
    <section id="showcase" className="overflow-hidden pt-20 pb-12">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-background/60 p-3 sm:p-4">
          <Masonry
            items={items}
            ease="expo.out"
            duration={0.75}
            stagger={0.045}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.98}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  )
}

const Column = ({
  children,
  offset,
  hideOnMobile = false,
}: {
  children: React.ReactNode
  offset?: string
  hideOnMobile?: boolean
}) => {
  return (
    <div
      className={`flex w-[43vw] shrink-0 flex-col gap-3 md:w-[40vw] md:gap-4 lg:w-auto lg:shrink ${offset || ''} ${hideOnMobile ? 'hidden lg:flex' : ''}`}
    >
      {children}
    </div>
  )
}

const Card = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  return (
    <div className="py-2">
      <div className="relative block min-w-0 overflow-hidden rounded-lg shadow-lg ring-1 ring-ring/20 dark:shadow-neutral-950/50">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className={`h-auto w-full object-contain ${className}`}
          sizes="(max-width: 768px) 43vw, (max-width: 1024px) 40vw, 25vw"
        />
      </div>
    </div>
  )
}
