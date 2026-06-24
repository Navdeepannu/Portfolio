export default function ContactSectionTwo() {
  return (
    <section className="bg-background px-4 py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Contact</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-6xl">
            Have something in mind? Let&apos;s make it real.
          </h2>

          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Send over the details and we&apos;ll get back with a clear, practical response.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded border border-border bg-background">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left info side */}
            <div className="relative order-2 border-t border-border p-6 md:p-8 lg:order-1 lg:border-t-0 lg:border-r">
              <div className="hidden lg:block">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-px w-8 bg-border" />
                  <span>How it works</span>
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-balance">
                  We&apos;ll review your message and follow up.
                </h3>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Include your goal, timeline, and any important details.
                </p>
              </div>

              <div className="grid border lg:mt-10">
                <div className="border-b p-4">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">Email</p>
                  <p className="mt-1 text-sm font-medium">hello@domain.com</p>
                </div>

                <div className="border-b p-4">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Response time
                  </p>
                  <p className="mt-1 text-sm font-medium">Within 1-2 business days</p>
                </div>

                <div className="p-4">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">Location</p>
                  <p className="mt-1 text-sm font-medium">Toronto, Canada</p>
                </div>
              </div>
            </div>

            {/* Form side */}
            <form className="order-1 grid lg:order-2">
              <div className="grid md:grid-cols-2">
                <div className="border-b border-border p-5 md:border-r">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="mt-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>

                <div className="border-b border-border p-5">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    className="mt-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="border-b border-border p-5">
                <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What would you like to discuss?"
                  className="mt-3 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="border-b border-border p-5">
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your goals, timeline, budget, or anything else we should know..."
                  rows={7}
                  className="mt-3 w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span />

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
