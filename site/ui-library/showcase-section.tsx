'use client'

import React from 'react'

import { asset } from '@/lib/assets'
import Masonry from '@/site/masonry-grid'

interface LandingProjectsProps {
  showAll?: boolean
}
const items = [
  {
    id: '2',
    img: asset('hero-light.png'),
    imgDark: asset('hero-dark.png'),
    url: '/blocks/hero',
  },
  {
    id: '3',
    img: asset('faq-light.png'),
    imgDark: asset('faq-dark.png'),
    url: '/blocks/faqs',
  },
  {
    id: '4',
    img: asset('footer-light.png'),
    imgDark: asset('footer-dark.png'),
    url: '/blocks/footer',
  },
  {
    id: '5',
    img: asset('logo-cloud-light.png'),
    imgDark: asset('logo-cloud-dark.png'),
    url: '/blocks/logo-cloud',
  },
  {
    id: '6',
    img: asset('content-light.png'),
    imgDark: asset('content-dark.png'),
    url: '/blocks/content',
  },
  {
    id: '7',
    img: asset('teams-light.png'),
    imgDark: asset('teams-dark.png'),
    url: '/blocks/teams',
  },
  {
    id: '8',
    img: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
    imgDark: asset('rail-nav-dark.png'),
    url: '/components/rail-nav',
  },
  {
    id: '9',
    img: asset('cta-light.png'),
    imgDark: asset('cta-dark.png'),
    url: '/blocks/cta',
  },
  {
    id: '10',
    img: asset('stats-light.png'),
    imgDark: asset('stats-dark.png'),
    url: '/blocks/stats',
  },
  {
    id: '11',
    img: asset('Animated-tabs-light.png'),
    imgDark: asset('Animated-tabs-dark.png'),
    url: '/components/animated-tabs',
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
