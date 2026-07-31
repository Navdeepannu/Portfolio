import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function FadedDotField({ className }: { className: string }) {
  const mask =
    'radial-gradient(ellipse 72% 68% at 50% 42%, black 0%, rgba(0,0,0,0.9) 38%, transparent 78%)'

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute text-foreground/13', className)}
      style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1.2px)',
        backgroundSize: '10px 10px',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  )
}

export default function CTASectionThree() {
  return (
    <section className="relative isolate overflow-hidden border-b bg-background">
      <FadedDotField className="-bottom-4 left-1/2 h-50 w-200 max-w-[140vw] -translate-x-1/2" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <h2 className="max-w-4xl text-4xl font-semibold tracking-tighter text-balance sm:text-5xl md:text-6xl">
          Turn your next idea into a product people can use.
        </h2>

        <div className="mt-9 flex flex-row items-center gap-3">
          <Button asChild variant="default" size="lg" className="rounded-full">
            <Link href="#">Explore components</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="secondary"
            className="rounded-full border border-accent"
          >
            <Link href="#">Browse blocks</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
