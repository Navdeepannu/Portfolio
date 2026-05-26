'use client'

import React from 'react'
import Image from 'next/image'

interface LandingProjectsProps {
  showAll?: boolean
}

export const LandingProjects: React.FC<LandingProjectsProps> = () => {
  return (
    <section
      id="projects"
      className="scrollbar-hide relative w-full overflow-hidden mask-b-from-95% py-8 2xl:mx-auto 2xl:max-w-7xl"
    >
      <div className="absolute inset-0 bg-linear-to-t from-muted/50 via-muted/40 to-muted/10 dark:from-muted/30 dark:to-transparent"></div>
      <div className="min-h-0 w-full overflow-hidden mask-b-from-90% lg:overflow-visible">
        <div className="relative lg:block">
          <div className="grid w-[140vw] max-w-none translate-x-[-20vw] grid-flow-dense grid-cols-3 gap-3 p-0 pr-0 md:w-[130vw] md:translate-x-[-15vw] md:grid-cols-3 lg:w-auto lg:translate-x-0 lg:grid-cols-4 lg:p-3 lg:*:first:mt-56 lg:*:nth-2:mt-24 lg:*:nth-3:mt-44">
            <Column offset="mt-0 md:mt-0 lg:mt-0">
              <Card src="/sections/design1.png" alt="Project 1" className="" />
              <Card src="/sections/design2.png" alt="Project 3" className="" />
            </Column>

            <Column offset="mt-12 md:mt-14 lg:mt-12">
              <Card src="/sections/design3.png" alt="Project 4" className="" />
              <Card src="/sections/design4.png" alt="Project 5" className="" />
            </Column>

            <Column offset="mt-6 md:mt-8 lg:mt-6">
              <Card src="/sections/design5.png" alt="Project 7" className="" />
              <Card src="/sections/design6.png" alt="Project 8" className="" />
            </Column>

            <Column offset="mt-16 md:mt-24 lg:mt-16" hideOnMobile={true}>
              <Card src="/sections/design7.png" alt="Project 9" className="" />
              <Card src="/sections/design8.png" alt="Project 6" className="" />
            </Column>
          </div>
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
