import { Button } from '@/components/ui/button'
import { IconCaretRightFilled } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Mail, SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import HeaderOne from '../header/header-one'

export default function HeroSectionOne() {
  return (
    <section className="overflow-hidden">
      <HeaderOne />
      <div className="mt:20 flex flex-col items-center justify-center gap-6 py-16 sm:mt-10 md:py-24">
        <Badge
          variant="outline"
          className="cursor-pointer gap-1 bg-muted px-3 py-1.5 text-sm shadow-sm ring-1 ring-foreground/5 transition duration-200 hover:bg-white hover:shadow-md"
        >
          Now available for teams and individuals
          <IconCaretRightFilled className="size-4" />
        </Badge>

        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
          <h1 className="bg-linear-to-b from-neutral-900 to-neutral-600 bg-clip-text text-4xl leading-[1.15] font-semibold tracking-tight text-transparent md:text-5xl md:leading-[1.1]">
            Your personal AI workspace, built around how you actually work
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-balance text-muted-foreground md:text-lg">
            A smart assistant that connects your notes, conversations, and files into one searchable
            workspace — so you can find answers instantly and stay focused on real work.
          </p>
        </div>

        <div className="pt-6">
          <form action="" className="mx-auto max-w-sm">
            <div className="relative grid grid-cols-[1fr_auto] items-center rounded-full border bg-background pr-1 shadow ring-3 shadow-zinc-950/5 ring-ring/50 has-[input:focus]:ring-2 has-[input:focus]:ring-ring">
              <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4 text-muted-foreground" />

              <input
                placeholder="Enter your email"
                className="h-11 w-full bg-transparent pl-12 text-sm focus:outline-none md:text-base"
                type="email"
              />

              <div className="pr-1.5">
                <Button
                  aria-label="submit"
                  size="sm"
                  className="rounded-2xl bg-linear-to-t from-neutral-600 via-neutral-700 to-neutral-900 px-4 ring-1 ring-ring/50 transition duration-200 hover:bg-black hover:shadow-sm hover:shadow-ring"
                >
                  <span className="hidden md:block">Get started</span>
                  <SendHorizonal className="relative mx-auto size-4 md:hidden" strokeWidth={2} />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl overflow-hidden mask-b-from-40%">
        <div className="rounded-2xl shadow-2xl shadow-zinc-950/50">
          <div className="relative rounded-2xl border-2 border-ring/50 bg-muted p-2 inset-shadow-2xs">
            <Image
              src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlE9oUC13H4OTvGY1JlWfro8aBDtuimbCQEPpN"
              alt="product-showcase"
              width={2700}
              height={1440}
              className="h-auto w-full rounded-xl border object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
