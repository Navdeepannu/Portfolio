import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IconMail } from "@tabler/icons-react";

export default function ForgotPasswordTwo() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <IconMail className="size-6 text-indigo-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Forgot Password?
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-2" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email-2"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Send Reset Link
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/work/forgot-password/one"
            className="text-sm text-neutral-600 group hover:text-neutral-900 transition-colors 
            "
          >
            ← Back to{" "}
            <span className="font-medium group-hover:underline">Sign In</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
