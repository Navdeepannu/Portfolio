import Image from 'next/image'
import Link from 'next/link'

import { FlowDeskSection } from '../components'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FlowDeskHero() {
  return (
    <FlowDeskSection withBorder={false} containerClassName="pt-28 pb-0 lg:pt-40">
      <div className="flex flex-col">
        <div className="max-w-5xl">
          <h1 className="md:max-w-4xl max-w-3xl text-4xl font-semibold tracking-[-0.065em] text-foreground md:text-7xl lg:text-8xl">
            <span className="text-muted-foreground">Simpler operations </span>
            for teams that move fast.
          </h1>

          <div className="mt-6 flex flex-col gap-6">
            <p className="max-w-2xl text-base text-muted-foreground md:text-xl md:leading-8">
              We automate repetitive work, connect your tools, and build internal systems that save
              your team time every week.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Button className="rounded-full px-4" size="lg">
                View product demo
              </Button>

              <Link
                href="#pricing"
                className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                See pricing
                <ArrowRight className="size-4 transition duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-20 overflow-hidden md:p-2">
          <div className="relative rounded-[20px] p-3 md:p-4">
            {/* Background image */}
            <div className="absolute inset-0 overflow-hidden rounded-[20px]">
              <Image
                src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlAuYWmkpKQGnmhpoFHtl8C3qOXrgevszwxZPM"
                alt="background"
                fill
                className="object-cover object-top opacity-90"
              />
              <div className="absolute inset-0 bg-background/10" />
            </div>

            {/* Demo image */}
            <div className="relative z-10 mx-auto max-w-6xl pt-8 md:pt-12">
              <Image
                src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlwoufloT0Ebck1dTslf49q5rag7XIHeMz6Sj3"
                alt="FlowDesk product dashboard"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="rounded-xl border border-border/60 bg-muted object-cover object-top shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </FlowDeskSection>
  )
}
