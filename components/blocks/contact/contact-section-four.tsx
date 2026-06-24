import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

export default function ContactSectionFour() {
  return (
    <section className="min-h-screen px-4 text-foreground">
      <div className="mx-auto max-w-6xl border-x border-border bg-border dark:bg-border">
        <div className="grid min-h-screen gap-px border-y border-border">
          {/* Header box */}
          <div className="flex min-h-50 flex-col items-center justify-center rounded-b-sm bg-background px-6 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-800 md:text-6xl dark:text-zinc-200">
              Get in Touch?
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-balance text-muted-foreground md:text-lg">
              Tell me what you&apos;re working on and let&apos;s explore how we can bring it to
              life.
            </p>
          </div>

          <div className="grid gap-px bg-zinc-200 md:grid-cols-[1fr_minmax(0,552px)_1fr] dark:bg-border">
            <div className="hidden rounded-sm bg-background md:block" />

            <form className="rounded-sm bg-background px-6 py-10 shadow-xs md:px-12 md:py-12">
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Your name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project">Company or project</Label>
                  <Input id="project" type="text" placeholder="Acme Inc." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me a little about your project, idea, or question."
                    className="min-h-36 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">Usually replies within 24 hours.</p>

                  <Button type="submit">Send Message</Button>
                </div>
              </div>
            </form>

            {/* Right empty column */}
            <div className="hidden rounded-sm bg-background md:block" />
          </div>

          {/* Bottom empty row */}
          <div className="h-40 rounded-t-sm bg-background" />
        </div>
      </div>
    </section>
  )
}
