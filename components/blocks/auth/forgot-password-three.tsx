import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";

export default function ForgotPasswordThree() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 mb-4">
            <IconMail className="size-5 text-primary" />
          </div>

          <div>
            <h1 className="text-left text-xl font-semibold tracking-tight">
              Forgot your password?
            </h1>
            <p className="mt-1.5 text-left text-sm text-muted-foreground">
              Don&apos;t worry we will send you reset instructions
            </p>
          </div>

          <div className="mt-7 space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-left text-sm font-medium"
              >
                Email address
              </Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                placeholder="you@company.com"
              />
            </div>

            <Button className="w-full">Email me a reset link</Button>
          </div>

          <p className="mt-5  text-xs text-muted-foreground">
            Check your inbox and spam folder if you don&apos;t see it.
          </p>
        </div>

        <div className="p-4">
          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/work/forgot-password/one"
              className="group inline-flex items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-900"
            >
              ← Back to{" "}
              <span className="font-medium group-hover:underline">Sign in</span>
            </Link>
          </p>
        </div>

        <div className="rounded-b-[calc(var(--radius)+.125rem)] text-center border-t  border-dashed border-ring/40 px-4 py-3 ">
          <span className="text-muted-foreground">Secured by </span>
          <span className="bg-gradient-to-r from-indigo-500 to-red-500 text-transparent bg-clip-text font-semibold">
            Vault
          </span>
        </div>
      </form>
    </section>
  );
}
