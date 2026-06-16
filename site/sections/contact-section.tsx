'use client'

import Link from 'next/link'
import { IconArrowUp, IconLocation, IconSend } from '@tabler/icons-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/context/portfolio-mode-provider'

function InfoCell({
  label,
  children,
  link,
  className,
}: {
  label: string
  children: ReactNode
  link?: string
  className?: string
}) {
  const isExternal = link?.startsWith('http://') || link?.startsWith('https://')

  return (
    <Link
      href={link ?? '#'}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(
        'group group/cell block rounded-sm bg-muted p-5 text-foreground',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 hover:text-white hover:shadow-sm',
        'focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none',
        'md:p-6',
        className,
      )}
    >
      <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover/cell:text-white/70">
        {label}
      </p>

      <div className="mt-1 text-base font-medium text-current transition-colors duration-300">
        {children}
      </div>
    </Link>
  )
}

function ContactForm({ email }: { email: string }) {
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') ?? '').trim()
    const from = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !from || !message) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: from,
          message,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error ?? 'Failed to send message')
        return
      }

      toast.success('Message sent successfully')
      form.reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-xs font-medium">
            Name
          </Label>

          <Input
            id="contact-name"
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
            className="h-10 rounded-md"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-email" className="text-xs font-medium">
            Email
          </Label>

          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@email.com"
            required
            autoComplete="email"
            className="h-10 rounded-md"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-xs font-medium">
          Message
        </Label>

        <Textarea
          id="contact-message"
          name="message"
          placeholder="Brief note about the role or project..."
          required
          className="min-h-24 resize-none rounded-md"
        />
      </div>

      <div className="pt-1">
        <Button
          type="submit"
          variant="default"
          size="sm"
          disabled={isSending}
          className="h-9 gap-1 rounded-full px-4"
        >
          {isSending ? 'Sending...' : 'Send message'}
          <IconSend className="size-4" />
        </Button>
      </div>
    </form>
  )
}

export function ContactSection() {
  const { mode } = usePortfolioMode()
  const { contact } = getPortfolioContent(mode)

  return (
    <section
      id="contact"
      className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8 md:px-12">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {contact.eyebrow}
        </span>
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left text-balance">
            <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
              {contact.title}
            </h2>
          </div>

          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>{contact.description}</p>
          </div>
        </div>
      </div>
      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 z-20 border-y border-border mask-x-from-75% dark:border-neutral-800" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 z-20 border-x border-border mask-y-from-90% dark:border-neutral-800" />
          <div className="overflow-hidden">
            <div className="grid gap-0.5 bg-muted-foreground/12 p-0.5 md:grid-cols-3 dark:bg-muted">
              {/* Left Column */}
              <div className="grid gap-0.5">
                <InfoCell
                  label="General"
                  className="bg-card hover:bg-[#34a853]"
                  link="mailto:navdeepannu1@gmail.com?subject=Portfolio Inquiry"
                >
                  <span className="underline-offset-2 group-hover:underline">
                    navdeepannu1@gmail.com
                  </span>
                </InfoCell>

                <InfoCell
                  label="LinkedIn"
                  className="bg-card hover:bg-[#0A66C2]"
                  link="https://linkedin.com/in/navdeepsingh0"
                >
                  <span className="flex items-center gap-1 underline-offset-2 group-hover:underline">
                    <span>navdeepsingh0</span>
                    <IconArrowUp className="size-4 rotate-45 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                </InfoCell>

                <InfoCell
                  label="Github"
                  className="bg-card hover:bg-[#24292F]"
                  link="https://github.com/Navdeepannu"
                >
                  <span className="flex items-center gap-1 underline-offset-2 group-hover:underline">
                    <span>Navdeepannu</span>
                    <IconArrowUp className="size-4 rotate-45 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                </InfoCell>
              </div>

              {/* Contact Form */}
              <div className="rounded-sm bg-card p-6 md:col-span-2">
                <ContactForm email="navdeepannu1@gmail.com" />
              </div>

              {/* Bottom Row */}
              <InfoCell
                label="Twitter/X"
                className="bg-card hover:bg-black"
                link="https://x.com/navdeepannu0"
              >
                <span className="flex items-center gap-1 underline-offset-2 group-hover:underline">
                  <span>@navdeepannu0</span>
                  <IconArrowUp className="size-4 rotate-45 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </span>
              </InfoCell>

              <InfoCell
                label="Location"
                className="bg-card hover:bg-[#ea4335] md:col-span-2"
                link="https://maps.google.com/?q=Toronto,Canada"
              >
                <div className="flex items-center gap-2">
                  <IconLocation className="size-4 opacity-70 transition-colors duration-300 group-hover:text-white group-hover:opacity-90" />
                  <span className="underline-offset-2 group-hover:underline">Toronto, Canada</span>
                  <IconArrowUp className="size-4 rotate-45 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
              </InfoCell>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
