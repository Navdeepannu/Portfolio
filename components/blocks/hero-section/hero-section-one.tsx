import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconCaretRightFilled } from '@tabler/icons-react'
import { Mail, SendHorizontal } from 'lucide-react'
import Image from 'next/image'

import HeaderOne from '../header/header-one'

export default function HeroSectionOne() {
  return (
    <section className="overflow-hidden bg-background text-foreground">
      <HeaderOne />

      <div className="mt-20 flex flex-col items-center justify-center gap-6 px-4 py-16 sm:mt-10 md:py-24">
        <Badge
          variant="outline"
          className="group cursor-pointer gap-1 border-border/70 bg-muted/70 px-3 py-1.5 text-sm text-foreground shadow-sm ring-1 ring-foreground/5 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
        >
          Now available for teams and individuals
          <IconCaretRightFilled className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Badge>

        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
          <h1 className="bg-linear-to-b from-zinc-950 via-zinc-800 to-zinc-600 bg-clip-text text-4xl leading-[1.15] font-semibold tracking-tight text-balance text-transparent md:text-5xl md:leading-[1.1] dark:from-white dark:via-zinc-200 dark:to-zinc-500">
            Your personal AI workspace, built around how you actually work
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-balance text-muted-foreground md:text-lg">
            A smart assistant that connects your notes, conversations, and files into one searchable
            workspace — so you can find answers instantly and stay focused on real work.
          </p>
        </div>

        <div className="w-full pt-6">
          <form action="" className="mx-auto max-w-sm">
            <div className="relative grid grid-cols-[1fr_auto] items-center rounded-full border border-border/80 bg-background pr-1 shadow-sm ring-1 shadow-zinc-950/5 ring-foreground/5 transition-all duration-200 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 dark:bg-muted/30 dark:shadow-black/30">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4 text-muted-foreground"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                aria-label="Email address"
                className="h-12 w-full bg-transparent pl-11 text-sm text-foreground outline-none placeholder:text-muted-foreground md:text-base"
              />

              <div className="pr-1">
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-full bg-linear-to-t from-zinc-800 via-zinc-900 to-black px-5 text-white shadow-sm ring-1 ring-white/10 transition-all duration-200 hover:opacity-90 hover:shadow-md dark:from-zinc-200 dark:via-zinc-100 dark:to-white dark:text-zinc-950 dark:ring-black/10"
                >
                  <span className="hidden sm:inline">Get started</span>
                  <SendHorizontal aria-hidden="true" className="size-4 sm:hidden" strokeWidth={2} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl mask-b-from-40% px-4">
        <div className="rounded-2xl shadow-2xl shadow-zinc-950/15 dark:shadow-black/50">
          <div className="relative rounded-2xl border border-border/70 bg-muted/60 p-2 ring-1 ring-foreground/5 dark:bg-muted/30">
            <Image
              src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlE9oUC13H4OTvGY1JlWfro8aBDtuimbCQEPpN"
              alt="AI workspace product dashboard"
              width={2700}
              height={1440}
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="h-auto w-full rounded-xl border border-border/70 bg-background object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
