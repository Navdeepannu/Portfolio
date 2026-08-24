'use client'

import { Button } from '@/components/ui/button'
import { IconArrowUpRight, IconUser } from '@tabler/icons-react'
import Link from 'next/link'

import { Shader, Blob, FilmGrain, Swirl, TiltShift, WaveDistortion } from 'shaders/react'

export default function HeroSectionThree() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Shader background */}
      <div className="pointer-events-none absolute inset-0 z-0 motion-reduce:hidden">
        {/* Oversized rotated canvas to avoid clipping */}
        <div className="absolute right-[-35%] bottom-[-55%] h-[160%] w-[150%]">
          <Shader className="h-full w-full">
            <Swirl colorB="#f02b63" colorSpace="oklch" />
            <WaveDistortion
              angle={237}
              edges="wrap"
              frequency={1.4}
              strength={0.2}
              transform={{ scale: 1.3 }}
            >
              <WaveDistortion
                angle={314}
                edges="mirror"
                frequency={10}
                speed={0.3}
                waveType="sawtooth"
              >
                <Blob
                  center={{ x: 0.37, y: 0.65 }}
                  deformation={0.7}
                  highlightColor="#ffc61a"
                  highlightX={0.5}
                  size={0.8}
                  softness={1}
                />
              </WaveDistortion>
            </WaveDistortion>
            <TiltShift angle={155} center={{ x: 0.5, y: 0.45 }} intensity={80} width={0.5} />
            <FilmGrain strength={0.2} />
          </Shader>
        </div>
        {/* main horizontal fade */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

        {/* soft seam killer */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_left] from-background/40 via-background/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-8 selection:bg-primary/80 selection:text-primary-foreground md:px-16">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Exceptional product demos in minutes, not days
        </h1>

        <p className="text-md leading-relaxed text-muted-foreground md:text-lg lg:text-xl">
          AI-powered interactive demos that accelerate deals
        </p>

        <div className="mt-2 flex gap-4">
          <Button size="lg" className="rounded-full" asChild>
            <Link href="#presets">
              Explore presets
              <IconArrowUpRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </Button>

          <Button variant="secondary" size="lg" className="rounded-full" asChild>
            <Link href="#sign-up">
              <IconUser aria-hidden="true" data-icon="inline-start" />
              Sign up
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
