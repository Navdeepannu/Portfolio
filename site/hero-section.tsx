import { Button } from '@/components/ui/button'
import Container from './container'
import { TextLoop } from '@/components/ui/text-loop'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Tooltip } from '@/components/ui/tooltip-card'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section>
      <Container className="font-schibsted selection:bg-emerald-200/60">
        <div className="flex max-w-2xl flex-col justify-center gap-3">
          <div>
            <span className="text-xs font-light">Hi, I&apos;m</span>
            <div className="flex items-center gap-2">
              <h1 className="text-lg tracking-tight md:text-2xl">Navdeep Singh</h1>
              <TextLoop className="pointer-events-none bg-linear-to-b from-emerald-400 to-emerald-600 bg-clip-text font-caveat text-lg text-transparent md:text-2xl">
                <span>Frontend Developer</span>
                <span>Design Engineer</span>
                <span>UI Systems Builder</span>
                <span>Freelancer</span>
              </TextLoop>
            </div>
          </div>

          <div className="space-y-2 text-sm md:text-base">
            <p>
              I design and build scalable interfaces, working across both design and engineering. I
              design in code, create reusable components, and focus on systems over one-off screens.
            </p>
            <div>
              I also work across the stack to ship complete, production-ready products. See my work
              on{' '}
              <Link
                href="https://www.linkedin.com/in/navdeepsingh0/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative border-b border-dashed border-foreground/40 font-medium italic"
              >
                <Tooltip content={<LinkedinCard />}>LinkedIn</Tooltip>
              </Link>
              , follow on{' '}
              <Link
                href="https://x.com/navdeepannu0"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-dashed border-foreground/40 font-medium italic"
              >
                <Tooltip content={<TwitterCard />}>X / Twitter</Tooltip>
              </Link>
              .
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button
              asChild
              className="shadow-xl transition-all duration-300 ease-in-out text-shadow-2xs text-shadow-black/50 dark:text-shadow-white/50"
              variant="default"
            >
              <Link href="/blocks">Explore UI kits</Link>
            </Button>
            <Button variant="link">
              View Projects
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

const LinkedinCard = () => {
  return (
    <Image
      src="/Linkedin.png"
      alt="LinkedIn Image"
      width={1000}
      height={50}
      className="aspect-video w-full rounded-sm object-cover"
    />
  )
}

const TwitterCard = () => {
  return (
    <Image
      src="/x.png"
      alt="Twitter/X Image"
      width={100}
      height={100}
      className="aspect-video w-full rounded-sm"
    />
  )
}
