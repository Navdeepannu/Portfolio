'use client'

import Link from 'next/link'
import { Shader, FilmGrain, Swirl, WaveDistortion } from 'shaders/react'

import { Logo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SiGithub } from 'react-icons/si'

export default function SignUpTwo() {
  return (
    <section className="min-h-screen py-6 md:py-10">
      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Left side */}
        <div className="flex w-full items-center justify-center px-4 md:h-170 md:pr-0 md:pl-8 lg:pl-16">
          <form action="" className="w-full max-w-md">
            <div className="text-left">
              <Link href="/" aria-label="Go home" className="inline-flex w-fit">
                <Logo className="h-8 w-8 text-zinc-800 dark:text-zinc-100" />
              </Link>

              <h1 className="mt-5 mb-1 text-2xl font-semibold tracking-tight">
                Create a Hexora Account
              </h1>

              <p className="text-sm text-muted-foreground">
                Welcome! Create an account to get started.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="block text-sm">
                    First name
                  </Label>
                  <Input type="text" placeholder="John" required name="firstname" id="firstname" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastname" className="block text-sm">
                    Last name
                  </Label>
                  <Input type="text" placeholder="Doe" required name="lastname" id="lastname" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="youremail@domain.com"
                  required
                  name="email"
                  id="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pwd" className="block text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  required
                  name="pwd"
                  id="pwd"
                  placeholder="Create a password"
                />
              </div>

              <Button className="w-full shadow-lg ring-2 shadow-black/20 ring-ring/50">
                Create account
              </Button>
            </div>

            <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <hr className="border-dashed" />
              <span className="text-xs text-muted-foreground">Or continue with</span>
              <hr className="border-dashed" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button type="button" variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-3 0 262 262"
                  preserveAspectRatio="xMidYMid"
                  className="size-4"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
                <span>Google</span>
              </Button>

              <Button type="button" variant="outline">
               <SiGithub />
                <span>Github</span>
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Have an account?
              <Button asChild variant="link" className="px-2">
                <Link href="#">Sign in</Link>
              </Button>
            </p>
          </form>
        </div>

        {/* Right side pushed to the screen edge */}
        <div className="hidden w-full items-center justify-end md:flex md:h-170">
          <div className="relative h-full w-full overflow-hidden rounded-l-2xl rounded-r-none">
            <div className="absolute inset-0">
              <Shader className="h-full">
                <Swirl
                  colorA="#7090c5"
                  colorB="#add7e3"
                  colorSpace="oklch"
                  detail={1.6}
                  speed={0.5}
                />
                <WaveDistortion
                  angle={20}
                  edges="mirror"
                  frequency={1.6}
                  speed={0.8}
                  strength={0.1}
                />
                <FilmGrain strength={0.15} />
              </Shader>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end p-10 text-white">
              <h2 className="max-w-md text-3xl leading-tight font-semibold">
                Build Faster With Hexora
              </h2>

              <p className="mt-3 max-w-sm text-sm text-white/80">
                Join thousands of developers and teams using Hexora to manage projects, collaborate,
                and ship faster.
              </p>

              <div className="mt-6 space-y-2 text-sm text-white/90">
                <p>• Organize projects and workflows</p>
                <p>• Collaborate with your team</p>
                <p>• Track progress in real time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
