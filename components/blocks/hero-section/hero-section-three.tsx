'use client'

import { Button } from '@/components/ui/button'
import { IconArrowUpRight, IconUser } from '@tabler/icons-react'

import { Shader, Blob, FilmGrain, Swirl, TiltShift, WaveDistortion } from 'shaders/react'

export default function HeroSectionThree() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-[#1a1a1a]">
      {/* Shader background */}
      <div className="pointer-events-none absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />

        {/* soft seam killer */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_left] from-white/40 via-white/10 to-transparent dark:from-black/40 dark:via-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-8 selection:bg-sky-500/80 md:px-16">
        <h1 className="text-4xl font-medium tracking-tight text-neutral-800 md:text-6xl dark:text-neutral-100">
          Exceptional product demos in minutes, not days
        </h1>

        <p className="text-md leading-relaxed text-neutral-600 md:text-lg lg:text-xl dark:text-neutral-300">
          AI-powered interactive demos that accelerate deals
        </p>

        <div className="mt-2 flex gap-4">
          <Button size="lg" className="rounded-full">
            Explore presents
            <IconArrowUpRight />
          </Button>

          <Button variant="secondary" size="lg" className="rounded-full">
            <IconUser />
            Sign up
          </Button>
        </div>
      </div>
    </section>
  )
}
