import Link from 'next/link'
import { IconMail } from '@tabler/icons-react'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordTwo() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-background to-muted/60 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-lg shadow-black/5 dark:shadow-black/20">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50">
              <IconMail
                aria-hidden="true"
                className="size-6 text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground">Forgot Password?</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-2" className="text-sm font-medium">
                Email Address
              </Label>

              <Input
                id="email-2"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/work/forgot-password/one"
            className="group inline-flex items-center justify-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
            />
            Back to <span className="font-medium underline underline-offset-2">Sign In</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
