import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const signalLines = [
  { width: '58%', x: '11%' },
  { width: '78%', x: '4%' },
  { width: '66%', x: '20%' },
  { width: '88%', x: '0%' },
  { width: '72%', x: '15%' },
  { width: '92%', x: '5%' },
  { width: '61%', x: '26%' },
  { width: '82%', x: '9%' },
  { width: '54%', x: '31%' },
] as const

function SignalField({ className }: { className: string }) {
  const mask = 'linear-gradient(to right, transparent 0%, black 26%, black 72%, transparent 100%)'

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute flex flex-col justify-center gap-4', className)}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      {signalLines.map((line, index) => (
        <div
          key={index}
          className="relative h-px bg-border"
          style={{
            width: line.width,
            transform: `translateX(${line.x})`,
          }}
        >
          <span
            className="absolute top-1/2 h-px -translate-y-1/2 bg-foreground/50"
            style={{
              left: `${18 + index * 5}%`,
              width: `${16 + (index % 3) * 7}%`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function CtaSectionTwo() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <SignalField className="top-0 right-[-8%] h-full w-[54%] opacity-40 lg:flex" />

      <div className="relative mx-auto grid min-h-100 max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs tracking-wide text-muted-foreground">Built for momentum</p>

          <h2 className="text-left text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Bring clarity to every stage of your workflow.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Give your team a focused system for planning, building, and delivering work without
            unnecessary process.
          </p>
        </div>

        <div className="relative z-10 flex flex-row items-start gap-3 lg:justify-end">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link href="/get-started">Start building</Link>
          </Button>

          <Button asChild size="lg" variant="secondary" className="rounded-full border px-7">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
