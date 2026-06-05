'use client'

import { useRef, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'

import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Side = 'left' | 'right'

export type FloatingImageConfig = {
  id: string
  src: string
  alt: string
  side: Side
  /** Tailwind absolute-positioning utilities. Responsive variants encouraged. */
  position: string
  /** Tailwind sizing utilities. Responsive variants encouraged. */
  size: string
  /** Static tilt in degrees, applied via CSS transform. */
  rotate: number
  /** Stacking order within the curtain. */
  z: number
  /** Entrance stagger in seconds. */
  delay: number
  /** Drop from layout below the `md` breakpoint to lighten mobile composition. */
  hideOnMobile?: boolean
  /** Mark as an above-the-fold LCP candidate. Maps to `loading="eager"`. */
  preload?: boolean
  /** Optional next/image `sizes` for srcset selection. */
  sizes?: string
}

export type HeroCta = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export type HeroGalleryTheme = 'light' | 'dark'
export type HeroGalleryVariant = 'cinematic' | 'static'

export type HeroGalleryProps = {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  ctas?: HeroCta[]
  images?: FloatingImageConfig[]
  theme?: HeroGalleryTheme
  /** 0 disables motion, 1 is the default, up to 1.5 amplifies parallax. */
  motionIntensity?: number
  variant?: HeroGalleryVariant
  className?: string
}


const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CONTENT_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: EASE_OUT_EXPO },
  }),
}

const SCROLL_SPRING = {
  stiffness: 140,
  damping: 28,
  mass: 0.4,
  restDelta: 0.001,
} as const

const HOVER_SPRING = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 22,
}


const unsplash = (id: string, w: number = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const DEFAULT_HERO_IMAGES: FloatingImageConfig[] = [
  // Left collage
  {
    id: 'l-1',
    src: unsplash('1578321272176-b7bbc0679853'),
    alt: 'Children painting together at a creative studio table',
    side: 'left',
    position: 'top-6 left-4 md:top-8 md:left-6 lg:top-12 lg:left-10',
    size: 'h-36 w-28 md:h-32 md:w-40 lg:h-44 lg:w-56',
    rotate: -4,
    z: 10,
    delay: 0,
    preload: true,
    sizes: '(min-width: 1024px) 14rem, (min-width: 768px) 10rem, 7rem',
  },
  {
    id: 'l-2',
    src: unsplash('1579783902614-a3fb3927b6a5', 600),
    alt: 'A colorful watercolor palette mid-mix',
    side: 'left',
    position: 'top-40 left-2 md:top-36 md:left-4 lg:top-48 lg:left-5',
    size: 'h-28 w-20 md:h-36 md:w-24 lg:h-48 lg:w-32',
    rotate: -8,
    z: 20,
    delay: 0.08,
  },
  {
    id: 'l-3',
    src: unsplash('1549887534-1541e9326642'),
    alt: 'A child proudly holding a freshly painted canvas',
    side: 'left',
    position: 'bottom-36 left-4 md:bottom-32 md:left-4 lg:bottom-24 lg:left-12',
    size: 'h-32 w-24 md:h-36 md:w-28 lg:h-52 lg:w-40',
    rotate: -6,
    z: 10,
    delay: 0.16,
  },
  {
    id: 'l-4',
    src: unsplash('1547891654-e66ed7ebb968', 600),
    alt: 'Paintbrushes resting in glass jars of water',
    side: 'left',
    position: 'bottom-8 left-8 md:bottom-8 md:left-20 lg:bottom-4 lg:left-36',
    size: 'h-40 w-28 md:h-44 md:w-32 lg:h-60 lg:w-44',
    rotate: 4,
    z: 20,
    delay: 0.24,
    hideOnMobile: true,
  },

  // Right collage
  {
    id: 'r-1',
    src: unsplash('1544967082-d9d25d867d66'),
    alt: 'A painter mixing pigments on a wooden palette',
    side: 'right',
    position: 'top-8 right-4 md:top-8 md:right-24 lg:top-12 lg:right-40',
    size: 'h-32 w-24 md:h-28 md:w-36 lg:h-36 lg:w-48',
    rotate: 3,
    z: 10,
    delay: 0.04,
    preload: true,
    sizes: '(min-width: 1024px) 12rem, (min-width: 768px) 9rem, 6rem',
  },
  {
    id: 'r-2',
    src: unsplash('1518998053901-5348d3961a04', 600),
    alt: 'Artwork drying on a sunlit clothesline',
    side: 'right',
    position: 'top-36 right-2 md:top-4 md:right-0 lg:top-8 lg:right-4',
    size: 'h-28 w-20 md:h-40 md:w-28 lg:h-52 lg:w-36',
    rotate: 6,
    z: 20,
    delay: 0.12,
  },
  {
    id: 'r-3',
    src: unsplash('1579541814924-49fef17c5be5'),
    alt: 'Bright abstract watercolor strokes',
    side: 'right',
    position: 'right-4 bottom-36 md:right-4 md:bottom-40 lg:right-8 lg:bottom-32',
    size: 'h-32 w-24 md:h-40 md:w-32 lg:h-52 lg:w-44',
    rotate: 5,
    z: 10,
    delay: 0.2,
  },
  {
    id: 'r-4',
    src: unsplash('1577083552792-a0d461cb1dd6', 600),
    alt: 'A young artist focused on their painting',
    side: 'right',
    position: 'right-8 bottom-8 md:right-28 md:bottom-16 lg:right-48 lg:bottom-8',
    size: 'h-28 w-20 md:h-32 md:w-24 lg:h-44 lg:w-32',
    rotate: -3,
    z: 20,
    delay: 0.28,
    hideOnMobile: true,
  },
  {
    id: 'r-5',
    src: unsplash('1582201942988-13e60e4556ee', 600),
    alt: 'Finished art pieces displayed on a gallery wall',
    side: 'right',
    position: 'right-8 bottom-4 md:right-12 md:bottom-4 lg:right-16 lg:bottom-12',
    size: 'h-36 w-28 lg:h-48 lg:w-36',
    rotate: 8,
    z: 30,
    delay: 0.34,
    hideOnMobile: true,
  },
]

/* -------------------------------------------------------------------------- */
/* FloatingImage                                                              */
/* -------------------------------------------------------------------------- */

type FloatingImageProps = {
  image: FloatingImageConfig
  motionIntensity: number
}

function FloatingImage({ image, motionIntensity }: FloatingImageProps) {
  const direction = image.side === 'left' ? -1 : 1
  const offsetX = 44 * direction * motionIntensity
  const offsetY = 28 * motionIntensity

  return (
    <motion.div
      initial={{ opacity: 0, x: offsetX, y: offsetY }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.95,
        delay: image.delay,
        ease: EASE_OUT_EXPO,
      }}
      style={{ zIndex: image.z, willChange: 'transform, opacity' }}
      className={cn(
        'absolute',
        image.position,
        image.hideOnMobile && 'hidden md:block',
      )}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.04 }}
        transition={HOVER_SPRING}
        style={{ rotate: image.rotate }}
        className={cn(
          'group relative overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-black/5',
          'shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35),0_4px_8px_-2px_rgba(0,0,0,0.18)]',
          image.size,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={image.sizes ?? '(min-width: 1024px) 14rem, (min-width: 768px) 10rem, 7rem'}
          loading={image.preload ? 'eager' : 'lazy'}
          className="object-cover transition-transform duration-900 ease-out group-hover:scale-[1.08]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/15 via-transparent to-white/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
        />
      </motion.div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/* CurtainLayer                                                               */
/* -------------------------------------------------------------------------- */

type CurtainLayerProps = {
  side: Side
  scrollYProgress: MotionValue<number>
  images: FloatingImageConfig[]
  motionIntensity: number
  theme: HeroGalleryTheme
}

function CurtainLayer({
  side,
  scrollYProgress,
  images,
  motionIntensity,
  theme,
}: CurtainLayerProps) {
  const isLeft = side === 'left'
  const dir = isLeft ? -1 : 1

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['0%', `${80 * dir * motionIntensity}%`],
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['0%', `${-30 * motionIntensity}%`],
  )
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1 - 0.3 * motionIntensity])
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 8 * dir * motionIntensity])
  const opacity = useTransform(scrollYProgress, [0.42, 0.62], [1, 0])

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        opacity,
        clipPath: isLeft
          ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
          : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
        transformOrigin: isLeft ? 'top left' : 'top right',
        willChange: 'transform, opacity',
      }}
      className={cn(
        'absolute inset-0 z-10',
        theme === 'dark' ? 'bg-stone-950' : 'bg-stone-50',
      )}
    >
      <div className="relative h-full w-full">
        {images
          .filter((img) => img.side === side)
          .map((img) => (
            <FloatingImage key={img.id} image={img} motionIntensity={motionIntensity} />
          ))}
      </div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/* AmbientBackground                                                          */
/* -------------------------------------------------------------------------- */

const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

function AmbientBackground({ theme }: { theme: HeroGalleryTheme }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          'absolute -top-1/4 left-1/2 h-[120vh] w-[120vh] -translate-x-1/2 rounded-full blur-3xl',
          theme === 'dark'
            ? 'bg-[radial-gradient(circle,rgba(255,160,90,0.16),transparent_60%)]'
            : 'bg-[radial-gradient(circle,rgba(255,200,140,0.28),transparent_60%)]',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-1/3 left-1/2 h-[110vh] w-[110vh] -translate-x-1/2 rounded-full blur-3xl',
          theme === 'dark'
            ? 'bg-[radial-gradient(circle,rgba(120,160,255,0.10),transparent_60%)]'
            : 'bg-[radial-gradient(circle,rgba(170,200,255,0.22),transparent_60%)]',
        )}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_SVG }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* CtaButton                                                                  */
/* -------------------------------------------------------------------------- */

function CtaButton({ cta, theme }: { cta: HeroCta; theme: HeroGalleryTheme }) {
  const isPrimary = (cta.variant ?? 'primary') === 'primary'

  return (
    <Link
      href={cta.href}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 md:px-6 md:py-3 md:text-base',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        isPrimary
          ? theme === 'dark'
            ? 'bg-white text-stone-900 shadow-lg shadow-black/30 hover:bg-stone-100 focus-visible:ring-white/70 focus-visible:ring-offset-stone-900'
            : 'bg-stone-900 text-white shadow-lg shadow-stone-900/15 hover:bg-stone-800 focus-visible:ring-stone-900/70 focus-visible:ring-offset-white'
          : theme === 'dark'
            ? 'border border-white/15 bg-white/5 text-white/90 backdrop-blur-md hover:bg-white/10 focus-visible:ring-white/40 focus-visible:ring-offset-stone-900'
            : 'border border-stone-300 bg-white/60 text-stone-900 backdrop-blur-md hover:border-stone-400 hover:bg-white focus-visible:ring-stone-900/40 focus-visible:ring-offset-white',
      )}
    >
      {cta.label}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* HeroContent                                                                */
/* -------------------------------------------------------------------------- */

type HeroContentProps = {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  ctas?: HeroCta[]
  theme: HeroGalleryTheme
  scrollYProgress: MotionValue<number>
  motionIntensity: number
}

function HeroContent({
  eyebrow,
  title,
  subtitle,
  ctas,
  theme,
  scrollYProgress,
  motionIntensity,
}: HeroContentProps) {
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 1 - 0.05 * motionIntensity],
  )
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.25],
    ['0%', `${-10 * motionIntensity}%`],
  )
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <motion.div
      style={{
        opacity: contentOpacity,
        scale: contentScale,
        y: contentY,
        willChange: 'transform, opacity',
      }}
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center md:px-12"
    >
      {eyebrow ? (
        <motion.span
          variants={CONTENT_VARIANTS}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className={cn(
            'mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase backdrop-blur-md',
            theme === 'dark'
              ? 'border-white/15 bg-white/5 text-white/80'
              : 'border-black/10 bg-white/60 text-stone-700',
          )}
        >
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              theme === 'dark' ? 'bg-amber-300' : 'bg-amber-500',
            )}
          />
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.h1
        variants={CONTENT_VARIANTS}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className={cn(
          'max-w-4xl text-balance font-serif text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl lg:text-7xl',
          theme === 'dark' ? 'text-stone-50' : 'text-stone-900',
        )}
      >
        {title}
      </motion.h1>

      {subtitle ? (
        <motion.p
          variants={CONTENT_VARIANTS}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className={cn(
            'mt-5 max-w-xl text-pretty text-sm leading-relaxed md:mt-7 md:text-base lg:text-lg',
            theme === 'dark' ? 'text-stone-300' : 'text-stone-600',
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}

      {ctas?.length ? (
        <motion.div
          variants={CONTENT_VARIANTS}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-9 md:gap-4"
        >
          {ctas.map((cta) => (
            <CtaButton key={`${cta.href}-${cta.label}`} cta={cta} theme={theme} />
          ))}
        </motion.div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT_EXPO }}
        style={{ opacity: hintOpacity }}
        aria-hidden
        className={cn(
          'absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase md:flex',
          theme === 'dark' ? 'text-white/60' : 'text-stone-500',
        )}
      >
        Scroll
        <span
          className={cn(
            'h-8 w-px',
            theme === 'dark' ? 'bg-white/30' : 'bg-stone-400/60',
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export function HeroSectionFive({
  eyebrow,
  title,
  subtitle,
  ctas,
  images = DEFAULT_HERO_IMAGES,
  theme = 'light',
  motionIntensity = 1,
  variant = 'cinematic',
  className,
}: HeroGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion() ?? false

  const effectiveIntensity = prefersReduced ? 0 : Math.max(0, Math.min(motionIntensity, 1.5))
  const isCinematic = !prefersReduced && variant === 'cinematic'

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Spring-smoothed scrubbing produces noticeably silkier scroll choreography
  // than raw scroll progress while staying GPU-friendly.
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING)

  const splitOpacity = useTransform(smoothProgress, [0, 0.2], [0.35, 0])

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className={cn('relative', isCinematic ? 'h-[180vh]' : 'h-screen', className)}
    >
      <div
        className={cn(
          'sticky top-0 h-screen overflow-hidden',
          theme === 'dark' ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900',
        )}
      >
        <AmbientBackground theme={theme} />

        {isCinematic ? (
          <>
            <CurtainLayer
              side="left"
              theme={theme}
              images={images}
              scrollYProgress={smoothProgress}
              motionIntensity={effectiveIntensity}
            />
            <CurtainLayer
              side="right"
              theme={theme}
              images={images}
              scrollYProgress={smoothProgress}
              motionIntensity={effectiveIntensity}
            />
          </>
        ) : (
          <div className="absolute inset-0 z-10">
            {images.map((img) => (
              <FloatingImage key={img.id} image={img} motionIntensity={effectiveIntensity} />
            ))}
          </div>
        )}

        <HeroContent
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          ctas={ctas}
          theme={theme}
          scrollYProgress={smoothProgress}
          motionIntensity={effectiveIntensity}
        />

        {isCinematic ? (
          <motion.div
            aria-hidden
            style={{ opacity: splitOpacity }}
            className={cn(
              'absolute top-0 left-1/2 z-30 h-full w-px',
              theme === 'dark'
                ? 'bg-linear-to-b from-transparent via-white/15 to-transparent'
                : 'bg-linear-to-b from-transparent via-stone-300 to-transparent',
            )}
          />
        ) : null}
      </div>
    </section>
  )
}
