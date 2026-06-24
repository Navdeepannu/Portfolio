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
    id: '1',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlwnc9sHT0Ebck1dTslf49q5rag7XIHeMz6Sj3',
    url: 'https://navdeepsingh.dev/blocks/sign-up',
    height: 500,
  },
  {
    id: '2',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlzyCwl1GLxvDQCGptolAdz7ghSeXqVYN9E24H',
    url: 'https://navdeepsingh.dev/blocks/hero',
    height: 800,
  },
  {
    id: '3',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTltgWg2wAncYx8GiQaPmyboup14RwlrMzW3IA9',
    url: 'https://navdeepsingh.dev/blocks/logo-cloud',

    height: 300,
  },
  {
    id: '4',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlQICKERjBWY7XQAxMKNls4T6nZb0U2pHvfS9G',
    url: 'https://navdeepsingh.dev/blocks/footer',
    height: 300,
  },
  {
    id: '5',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlNP5cqDeJIMXrF35vasVbLAD0jBGhUEyeltu8',
    url: 'https://navdeepsingh.dev/blocks/logo-cloud',

    height: 300,
  },
  {
    id: '6',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlVinCr1kua1nwvRWLo6bCcepS4YzPXjuFMh7T',
    url: 'https://navdeepsingh.dev/blocks/hero',
    height: 800,
  },
  {
    id: '7',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlNTMZnKeJIMXrF35vasVbLAD0jBGhUEyeltu8',
    url: 'https://navdeepsingh.dev/blocks/teams',
    height: 500,
  },
]

export const LandingProjects: React.FC<LandingProjectsProps> = () => {
  const { mode } = usePortfolioMode()
  const { showcase } = getPortfolioContent(mode)

  return (
    <section id="showcase" className="mx-auto max-w-360 pt-24 pb-12">
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.98}
        blurToFocus
        colorShiftOnHover={false}
      />
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
