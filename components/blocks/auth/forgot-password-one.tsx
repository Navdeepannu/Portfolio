import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconFingerprint } from "@tabler/icons-react";
import Link from "next/link";

export default function ForgotPasswordOne() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        action=""
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center">
              <IconFingerprint className="size-10 text-red-400" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Forgot your password?
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Don&apos;t worry we will send you reset instructions
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium">
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

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Follow the instructions in the email.
          </p>
        </div>

        <div className="p-4">
          <p className="text-accent-foreground text-center text-sm">
            <Link
              href="/work/forgot-password/one"
              className="text-sm text-neutral-600 group hover:text-neutral-900 transition-colors 
            "
            >
              ← Back to{" "}
              <span className="font-medium group-hover:underline">Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
