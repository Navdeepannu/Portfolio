'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { IconArrowUp } from '@tabler/icons-react'
import { Clock, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Eyebrow, Reveal } from '@/site/recruiter/recruiter-primitives'
import { recruiterContact } from '@/site/recruiter/recruiter-content'

export function RecruiterContact() {
  return (
    <section
      id="contact"
      className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8">
        <Reveal>
          <Eyebrow className="mb-4">{recruiterContact.eyebrow}</Eyebrow>
          <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
            <div className="max-w-md text-left text-balance">
              <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
                {recruiterContact.title}
              </h2>
            </div>
            <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
              <p>{recruiterContact.description}</p>
            </div>
          </div>
        </Reveal>

        {/* Recruiter signals — response time / availability / preferred contact */}
        <Reveal className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border/70 bg-border/60 ring-1 ring-foreground/5 sm:grid-cols-3">
          {recruiterContact.signals.map((signal) => (
            <div key={signal.label} className="flex items-center gap-3 bg-card px-4 py-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{signal.label}</p>
                <p className="text-sm font-medium text-foreground">{signal.value}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Methods + form */}
        <Reveal className="mt-4 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {recruiterContact.methods.map((method) => {
              const isExternal = method.href.startsWith('http')
              return (
                <Link
                  key={method.label}
                  href={method.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'group flex items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-3.5 ring-1 ring-foreground/5 transition-colors hover:border-border',
                    method.primary && 'border-emerald-500/30 bg-emerald-500/[0.04]',
                  )}
                >
                  <div>
                    <p className="text-xs text-muted-foreground">{method.label}</p>
                    <p className="text-sm font-medium text-foreground">{method.value}</p>
                  </div>
                  <IconArrowUp className="size-4 rotate-45 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              )
            })}
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5 md:p-6">
            <ContactForm email={recruiterContact.email} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ContactForm({ email }: { email: string }) {
  const [isSending, setIsSending] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    const subject = encodeURIComponent(`Role opportunity for ${name}`)
    const body = encodeURIComponent(`Hi Navdeep,\n\n${message}\n\n— ${name}\n${from}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    toast.success('Opening your mail client…')
    window.setTimeout(() => setIsSending(false), 1200)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="recruiter-contact-name" className="text-xs font-medium">
            Name
          </Label>
          <Input
            id="recruiter-contact-name"
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
            className="h-10 rounded-md"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="recruiter-contact-email" className="text-xs font-medium">
            Work email
          </Label>
          <Input
            id="recruiter-contact-email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            autoComplete="email"
            className="h-10 rounded-md"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="recruiter-contact-message" className="text-xs font-medium">
          Role details
        </Label>
        <Textarea
          id="recruiter-contact-message"
          name="message"
          placeholder="Role, team, stack, and timeline..."
          required
          className="min-h-28 resize-none rounded-md"
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground">Replies within 1 business day.</p>
        <Button
          type="submit"
          size="sm"
          disabled={isSending}
          className="h-9 gap-1 rounded-full px-4"
        >
          {isSending ? 'Opening...' : 'Send message'}
          <Send className="size-4" />
        </Button>
      </div>
    </form>
  )
}
