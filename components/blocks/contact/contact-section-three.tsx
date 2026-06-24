import Image from 'next/image'
import type { CSSProperties } from 'react'

const maskSvg = `
<svg viewBox="0 0 700 760" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="black"
    d="M112 0H660Q700 0 700 40V640Q700 676 664 676H652Q622 676 622 706V720Q622 760 582 760H40Q0 760 0 720V105Q0 65 40 65H58Q82 65 82 41V40Q82 0 112 0Z"
  />
</svg>
`

const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(maskSvg)}")`

const imageMaskStyle: CSSProperties = {
  WebkitMask: `${maskUrl} center / 100% 100% no-repeat`,
  mask: `${maskUrl} center / 100% 100% no-repeat`,
}

export default function ContactSection() {
  return (
    <section className="min-h-svh bg-background px-4 py-4 text-foreground md:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-2rem)] max-w-7xl items-center">
        <div className="grid w-full gap-6 lg:h-[calc(100svh-3rem)] lg:max-h-175 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          {/* Form */}
          <div className="flex items-center rounded-[2rem] border bg-background px-5 py-8 md:px-8 lg:px-12">
            <div className="w-full">
              <div className="mb-8">
                <span className="text-sm text-muted-foreground">Contact us</span>

                <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight md:text-4xl">
                  Let&apos;s build something useful together.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground md:text-base">
                  Tell us what you&apos;re working on and we&apos;ll get back to you with a clear
                  next step.
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm transition outline-none placeholder:text-muted-foreground focus:border-foreground/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm transition outline-none placeholder:text-muted-foreground focus:border-foreground/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Project inquiry"
                    className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm transition outline-none placeholder:text-muted-foreground focus:border-foreground/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    placeholder="Tell us a little about your project..."
                    className="min-h-32 w-full resize-none rounded-lg border border-border bg-background px-3 py-3 text-sm transition outline-none placeholder:text-muted-foreground focus:border-foreground/40"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-foreground text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>

          {/* Image */}
          <div
            style={imageMaskStyle}
            className="relative hidden overflow-hidden bg-muted lg:block lg:h-full"
          >
            <Image
              src="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlhfHvQK0RlaETPbLcZQjyfg2StNvuB13w8rID"
              alt="People working together"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute right-6 bottom-8 left-6 md:right-10 md:bottom-10 md:left-10">
              <p className="max-w-xl text-3xl leading-tight font-medium tracking-tight text-white md:text-5xl">
                Good ideas deserve clean execution.
              </p>

              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                From landing pages to full products, we help turn rough ideas into polished digital
                experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
