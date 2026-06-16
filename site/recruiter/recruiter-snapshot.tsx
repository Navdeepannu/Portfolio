'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowDownToLine, Award, BookOpenCheck, GraduationCap, MapPin } from 'lucide-react'
import { SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { staggerItem } from '@/site/recruiter/recruiter-primitives'
import { recruiterSnapshot } from '@/site/recruiter/recruiter-content'
import { Safari } from './browser-mockup'
import Character from '../character'
import { Globe } from './globe'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import Image from 'next/image'

export const RESUME_HREF = '/resume/resume.pdf'

export function RecruiterSnapshot() {
  const { eyebrow, title, description, cards } = recruiterSnapshot

  return (
    <section className="relative overflow-x-clip py-20 font-schibsted selection:bg-emerald-200/60 max-md:py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-8 md:px-12">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {eyebrow}
        </span>

        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left">
            <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
              {title}
            </h2>
          </div>

          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 border-y border-border mask-x-from-75% dark:border-neutral-800" />

        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x border-border mask-y-from-90% dark:border-neutral-800" />

          <div className="overflow-hidden">
            <div className="bg-foreground/4 p-2 dark:bg-neutral-800/30">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:auto-rows-[12rem] lg:grid-cols-3">
                {/* Top row */}
                <BentoCard
                  className="lg:row-span-2"
                  heading={cards.strengths.heading}
                  description={cards.strengths.description}
                  contentPosition="bottom"
                  minClassName="min-h-[20rem] lg:min-h-0"
                >
                  <StrengthsIllustration />
                </BentoCard>

                <BentoCard
                  className="lg:row-span-2"
                  heading={cards.stack.heading}
                  description={cards.stack.description}
                  contentPosition="bottom"
                  minClassName="min-h-[20rem] lg:min-h-0"
                >
                  <StackIllustration />
                </BentoCard>

                <BentoCard
                  className="md:col-span-2 lg:col-span-1 lg:row-span-2"
                  heading="Qualifications"
                  description="Education, certifications, and learning signals that support the work."
                  contentPosition="bottom"
                  minClassName="min-h-[20rem] lg:min-h-0"
                >
                  <QualificationsIllustration />
                </BentoCard>

                {/* Large feature card */}
                <BentoCard
                  className="md:col-span-2 lg:col-span-2 lg:row-span-3"
                  heading={cards.proof.heading}
                  description={cards.proof.description}
                  contentPosition="bottom"
                  minClassName="min-h-[27rem] lg:min-h-0"
                >
                  <ProofIllustrationLarge />
                </BentoCard>

                {/* Right column */}
                <BentoCard
                  className="lg:row-span-2"
                  heading={cards.location.heading}
                  description={cards.location.description}
                  contentPosition="top"
                  minClassName="min-h-[20rem] lg:min-h-0"
                >
                  <LocationIllustration />
                </BentoCard>

                <ResumeCtaCard className="lg:row-span-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// bento card structure
function BentoCard({
  heading,
  description,
  children,
  className,
  minClassName,
  contentPosition = 'bottom',
}: {
  heading: string
  description: string
  contentPosition?: 'top' | 'bottom'
  children: ReactNode
  className?: string
  minClassName?: string
}) {
  const isTop = contentPosition === 'top'

  return (
    <motion.div variants={staggerItem} className={cn('h-full', className)}>
      <Card
        className={cn(
          'group/card relative grid h-full overflow-hidden rounded-2xl border border-border/80 bg-card p-7 text-card-foreground shadow-sm ring-1 shadow-black/5 ring-black/3 transition-all duration-300 hover:shadow-md hover:shadow-black/8 dark:border-white/10 dark:ring-white/4',
          isTop ? 'grid-rows-[auto_1fr]' : 'grid-rows-[1fr_auto]',
          minClassName,
        )}
      >
        {isTop ? (
          <>
            <CardCopy heading={heading} description={description} />
            <div className="relative z-10 flex min-h-0 w-full items-stretch justify-stretch">
              {children}
            </div>
          </>
        ) : (
          <>
            <div className="relative z-10 flex min-h-0 w-full items-stretch justify-stretch">
              {children}
            </div>
            <CardCopy heading={heading} description={description} />
          </>
        )}
      </Card>
    </motion.div>
  )
}
function QualificationsIllustration() {
  return (
    <div className="relative flex h-full min-h-44 w-full items-center justify-center overflow-hidden">
      <DotGrid />

      <div className="relative z-10 w-full max-w-xs">
        <div className="rounded-2xl border border-border/80 bg-background/85 p-3 shadow-xl shadow-black/5 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-xl bg-muted ring-1 ring-border">
                <GraduationCap className="size-4 text-foreground" />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">Education</p>
                <p className="text-[10px] text-muted-foreground">Toronto, Canada</p>
              </div>
            </div>

            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          </div>

          <div className="space-y-2">
            <QualificationRow
              icon={BookOpenCheck}
              title="Software / Web Development"
              description="Frontend, full-stack, UI systems"
            />

            <QualificationRow
              icon={Award}
              title="AWS Developer Associate"
              description="Preparing alongside project work"
            />
          </div>
        </div>

        <div className="mx-auto mt-2 h-2 w-[82%] rounded-b-2xl bg-border/70" />
      </div>
    </div>
  )
}

// Qualification Illustration
function QualificationRow({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-3 py-2 shadow-sm">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </span>

      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-foreground">{title}</p>
        <p className="truncate text-[10px] text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
function ProofIllustrationLarge() {
  return (
    <div className="relative flex h-full min-h-72 w-full items-center justify-center overflow-hidden">
      <DotGrid />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_25%,hsl(var(--card))_78%)]" />

      <div className="relative z-20 flex w-full max-w-2xl items-center justify-center perspective-distant">
        <ProofCardLarge
          image="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlxMptHdg7C4maJxGZf1yUPI6YWNcVgE0T9hXu"
          label="Invora"
          position="left"
        />

        <ProofCardLarge
          image="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlB0I6CDbM0rCoZtdKDAVO8yw7eSuvUb1LhYIJ"
          label="CableLink"
          position="center"
        />

        <ProofCardLarge
          image="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlIU24l7uN5NM8tUJvn9haERPTBFr4HXxQoWsw"
          label="UI Registry"
          position="right"
        />
      </div>
    </div>
  )
}

// Proof Card
function ProofCardLarge({
  image,
  label,
  position,
}: {
  image: string
  label: string
  position: 'left' | 'center' | 'right'
}) {
  return (
    <motion.div
      className={cn(
        'absolute overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl ring-1 shadow-black/10 ring-black/5',
        position === 'left' &&
          'top-14 left-0 z-10 w-56 scale-90 rotate-y-12 -rotate-z-3 opacity-75',
        position === 'center' && 'left-1/2 z-30 w-80 -translate-x-1/2 shadow-black/15',
        position === 'right' &&
          'top-10 right-0 z-20 w-56 scale-90 -rotate-y-12 rotate-z-3 opacity-75',
      )}
    >
      <Image
        src={image}
        alt={`${label} project preview`}
        width={1200}
        height={800}
        className="aspect-16/10 w-full object-cover"
      />

      <div className="flex items-center justify-between border-t bg-background/90 px-3 py-2 backdrop-blur">
        <span className="text-[10px] font-medium text-foreground">{label}</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
          shipped
        </span>
      </div>
    </motion.div>
  )
}

function LocationIllustration() {
  return (
    <div className="relative h-full min-h-40 w-full self-stretch overflow-visible">
      <DotGrid />

      <div
        className={cn(
          'absolute left-1/2',
          'aspect-square w-[clamp(16rem,125%,34rem)] -translate-x-1/2',
          'shadow-xl shadow-black/5',
        )}
      >
        <Globe className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  )
}
function ResumeCtaCard({ className }: { className?: string }) {
  return (
    <motion.div variants={staggerItem} className={cn('h-full', className)}>
      <Card className="group relative flex h-full min-h-36 overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-sm ring-1 shadow-black/5 ring-black/3 transition-all duration-300 hover:shadow-md hover:shadow-black/8 dark:border-white/10 dark:ring-white/4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--foreground)/0.08),transparent_35%)]" />

        <div className="relative z-10 flex w-full items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Resume
            </p>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Download the resume
            </h3>
            <p className="mt-3 max-w-40 text-balance text-xs leading-relaxed text-muted-foreground">
              One-page recruiter-friendly PDF.
            </p>
          </div>

          <Button asChild size="icon" className="size-11 shrink-0 rounded-full">
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
            >
              <ArrowDownToLine className="size-4" />
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
function CardCopy({ heading, description }: { heading: string; description: string }) {
  return (
    <div className="relative z-20 space-y-2">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">{heading}</h3>
      <p className="max-w-md text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,black,transparent_80%)] bg-size-[24px_24px] text-foreground/15 dark:text-white/12"
    />
  )
}
function FigmaTile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className="size-10 shrink-0 rounded-xl bg-black shadow-2xl ring-1 ring-foreground/20 sm:size-12"
    >
      <path
        d="M30 84C30 77.373 35.373 72 42 72H54V84C54 90.627 48.627 96 42 96C35.373 96 30 90.627 30 84Z"
        fill="#24CB71"
      />

      <path
        d="M54 24V48H66C72.627 48 78 42.627 78 36C78 29.373 72.627 24 66 24H54Z"
        fill="#FF7237"
      />

      <circle cx="66" cy="60" r="12" fill="#00B6FF" />

      <path
        d="M30 36C30 42.627 35.373 48 42 48H54V24H42C35.373 24 30 29.373 30 36Z"
        fill="#FF3737"
      />

      <path
        d="M30 60C30 66.627 35.373 72 42 72H54V48H42C35.373 48 30 53.373 30 60Z"
        fill="#874FFF"
      />
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className="size-10 shrink-0 rounded-xl bg-black p-1 shadow-2xl ring-1 ring-foreground/10 sm:size-12"
      aria-hidden="true"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z"
          fill="#0065A9"
        />
        <g filter="url(#filter0_d)">
          <path
            d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z"
            fill="#007ACC"
          />
        </g>
        <g filter="url(#filter1_d)">
          <path
            d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z"
            fill="#1F9CF0"
          />
        </g>
        <g opacity="0.25">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z"
            fill="url(#paint0_linear)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="-8.39411"
          y="15.8291"
          width="116.727"
          height="92.2456"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.16667" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="filter1_d"
          x="60.4167"
          y="-8.07558"
          width="47.9167"
          height="116.151"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.16667" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="49.9392"
          y1="0.257812"
          x2="49.9392"
          y2="99.7423"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function FloatingPointer() {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const move = () => {
      setPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      })
    }

    move()

    const interval = setInterval(move, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="absolute z-20"
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      transition={{
        duration: 2.5,
        ease: 'easeInOut',
      }}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-4 rotate-[-70deg] text-zinc-200 dark:text-emerald-200"
        fill="currentColor"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
    </motion.div>
  )
}

function StrengthsIllustration() {
  return (
    <div className="relative isolate flex min-h-65 w-full items-center justify-center overflow-hidden">
      <DotGrid />
      <FloatingPointer />

      <div className="relative z-10 flex h-65 w-full max-w-2xl items-center justify-center perspective-distant">
        {/* left: design */}
        <div className="absolute left-6 z-10 w-[46%] max-w-72 transform-[rotateY(28deg)_rotateX(6deg)_rotateZ(-4deg)]">
          <Safari
            url="navdeepsingh.dev/design"
            className="w-full shadow-2xl"
            imageSrc="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlJA1w6AVCFnyBOghzSVcZUAotrd3uvf7wkH9T"
          />

          <div className="absolute -top-5 -left-4 z-20 rounded-2xl border p-1 shadow-xl backdrop-blur">
            <FigmaTile />
          </div>
        </div>

        {/* center bridge */}
        <div className="absolute top-1/2 left-1/2 z-20 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-lg">
          <Character />
        </div>

        {/* right: code */}
        <div className="absolute right-6 z-10 w-[46%] max-w-72 transform-[rotateY(-28deg)_rotateX(6deg)_rotateZ(4deg)]">
          <Safari
            url="navdeepsingh.dev/code"
            className="w-full shadow-2xl"
            imageSrc="https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh435xBk0RlaETPbLcZQjyfg2StNvuB13w8rI"
          />

          <div className="absolute -top-5 -right-4 z-20 rounded-2xl border p-1 shadow-xl backdrop-blur">
            <CodeIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

const STACK_NODES = [
  { Icon: SiNextdotjs, x: 50, y: 50, size: 'lg', delay: 0 },
  { Icon: SiReact, x: 16, y: 28, size: 'md', delay: 0.5 },
  { Icon: SiTypescript, x: 84, y: 24, size: 'md', delay: 1 },
  { Icon: SiTailwindcss, x: 20, y: 76, size: 'md', delay: 1.5 },
  { Icon: SiNodedotjs, x: 82, y: 74, size: 'md', delay: 2 },
] as const

const MARQUEE_ITEMS = Array.from({ length: 8 }, () => STACK_NODES).flat()

function StackIllustration() {
  return (
    <div className="relative mx-auto h-48 w-full max-w-md overflow-hidden mask-x-from-90%">
      {/* fade edges */}
      <DotGrid />

      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_30%,hsl(var(--background))_82%)]" />

      {/* center logo */}
      <div className="absolute top-1/2 left-1/2 z-30 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-background/80 shadow-xl ring-1 ring-foreground/8 backdrop-blur">
        <Character className="size-8" />
      </div>

      {/* tilted marquee plane */}
      <div className="absolute top-[56%] left-1/2 w-md -translate-x-1/2 -translate-y-1/2 rotate-x-58 rotate-z-[-8deg] space-y-4 transform-3d">
        <InfiniteSlider gap={10} speed={28} className="overflow-visible px-3">
          {MARQUEE_ITEMS.map(({ Icon }, index) => (
            <TechTile key={`row-1-${Icon.name}-${index}`} Icon={Icon} />
          ))}
        </InfiniteSlider>

        <InfiniteSlider gap={10} reverse speed={24} className="overflow-visible px-3">
          {[...MARQUEE_ITEMS].reverse().map(({ Icon }, index) => (
            <TechTile key={`row-2-${Icon.name}-${index}`} Icon={Icon} />
          ))}
        </InfiniteSlider>

        <InfiniteSlider gap={10} speed={22} className="overflow-visible px-3">
          {MARQUEE_ITEMS.map(({ Icon }, index) => (
            <TechTile key={`row-3-${Icon.name}-${index}`} Icon={Icon} />
          ))}
        </InfiniteSlider>
      </div>
    </div>
  )
}

function TechTile({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm ring-1 ring-foreground/7">
      <Icon className="size-5 text-foreground" />
    </div>
  )
}
