'use client'

import React from 'react'

import { SITE_ORIGINS } from '@/lib/sites'
import Masonry from '@/site/masonry-grid'

interface LandingProjectsProps {
  showAll?: boolean
}
const items = [
  {
    id: '2',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlzyCwl1GLxvDQCGptolAdz7ghSeXqVYN9E24H',
    url: `${SITE_ORIGINS.ui}/blocks/hero`,
  },
  {
    id: '3',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTltgWg2wAncYx8GiQaPmyboup14RwlrMzW3IA9',
    url: `${SITE_ORIGINS.ui}/blocks/logo-cloud`,
  },
  {
    id: '4',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlQICKERjBWY7XQAxMKNls4T6nZb0U2pHvfS9G',
    url: `${SITE_ORIGINS.ui}/blocks/footer`,
  },
  {
    id: '5',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlNP5cqDeJIMXrF35vasVbLAD0jBGhUEyeltu8',
    url: `${SITE_ORIGINS.ui}/blocks/logo-cloud`,
  },
  {
    id: '6',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlVinCr1kua1nwvRWLo6bCcepS4YzPXjuFMh7T',
    url: `${SITE_ORIGINS.ui}/blocks/hero`,
  },
  {
    id: '7',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTluWJOBoa0NZaY9AGeqk23D8IxEFOyV1srnSBw',
    url: `${SITE_ORIGINS.ui}/blocks/teams`,
  },
  {
    id: '8',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
    url: `${SITE_ORIGINS.ui}/blocks`,
  },
  {
    id: '9',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlxMptHdg7C4maJxGZf1yUPI6YWNcVgE0T9hXu',
    url: `${SITE_ORIGINS.ui}/blocks`,
  },
  {
    id: '10',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlIU24l7uN5NM8tUJvn9haERPTBFr4HXxQoWsw',
    url: `${SITE_ORIGINS.ui}/blocks`,
  },
  {
    id: '11',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTltgWg2wAncYx8GiQaPmyboup14RwlrMzW3IA9',
    url: `${SITE_ORIGINS.ui}/blocks/logo-cloud`,
  },
  {
    id: '12',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTla061friSJOXQxRe6zTuKjbhs70mMEZD2U1Aw',
    url: `${SITE_ORIGINS.ui}/blocks`,
  },
]
export const ShowcaseSection: React.FC<LandingProjectsProps> = () => {
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
