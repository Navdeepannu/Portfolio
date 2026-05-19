'use client'

import { Geist } from 'next/font/google'
import {
  IconCircle0,
  IconEye,
  IconHeartFilled,
  IconMessageCircle,
  IconFlagFilled,
} from '@tabler/icons-react'
import { motion, Variants } from 'motion/react'

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

interface CapsuleCustom {
  x: number
  y: number
  delay: number
}

const capsule: Variants = {
  hidden: { opacity: 0, scale: 0.3, x: 0, y: 0 },
  show: (custom: CapsuleCustom) => ({
    opacity: 1,
    scale: 1,
    x: custom.x,
    y: custom.y,
    transition: {
      delay: custom.delay,
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  }),
}

const Header = () => {
  return (
    <header className="flex w-full justify-center pt-6">
      <div className="flex items-center gap-2 rounded-full">
        {/* Logo */}
        <div className="flex size-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
          <IconCircle0 />
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 rounded-full bg-gray-200/70 px-6 py-3 text-sm font-medium">
          <a href="#" className="text-neutral-600 hover:text-black">
            Approach
          </a>
          <a href="#" className="text-neutral-600 hover:text-black">
            Instructor
          </a>
          <a href="#" className="text-neutral-600 hover:text-black">
            Curriculum
          </a>
          <a href="#" className="text-neutral-600 hover:text-black">
            Pricing
          </a>
        </nav>

        {/* Button */}
        <button className="rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white hover:bg-gray-800 md:text-sm">
          Enroll Now
        </button>
      </div>
    </header>
  )
}

export default function HeroSectionFour() {
  return (
    <section className={`${geist.className} px-6`}>
      <Header />
      <div className="flex flex-col items-center justify-start gap-3 py-24 text-center">
        <div className="relative inline-block">
          <motion.div
            custom={{ x: -100, y: -20, delay: 0.2 }}
            variants={capsule}
            initial="hidden"
            animate="show"
            className="pointer-events-none absolute -top-1 -left-16 -rotate-12 sm:-left-25"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-medium text-neutral-700 shadow-xl ring-2 shadow-black/10 ring-neutral-100">
              <IconEye className="size-4 shrink-0 text-sky-500" /> 8600
            </span>
          </motion.div>

          {/* Heart */}
          <motion.div
            custom={{ x: -110, y: 40, delay: 0.35 }}
            variants={capsule}
            initial="hidden"
            animate="show"
            className="pointer-events-none absolute -bottom-2 -left-18 rotate-12 sm:-left-29"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-medium text-neutral-700 shadow-xl ring-2 shadow-black/10 ring-neutral-100">
              <IconHeartFilled className="size-4 shrink-0 text-red-600" /> 1520
            </span>
          </motion.div>

          {/* Message */}
          <motion.div
            custom={{ x: 80, y: -10, delay: 0.5 }}
            variants={capsule}
            initial="hidden"
            animate="show"
            className="pointer-events-none absolute -top-1 -right-2 rotate-12 sm:-right-4"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-medium text-neutral-700 shadow-xl ring-2 shadow-black/10 ring-neutral-100">
              <IconMessageCircle className="size-4 shrink-0 text-amber-500" /> 1160
            </span>
          </motion.div>

          {/* Flag */}
          <motion.div
            custom={{ x: 120, y: 70, delay: 0.65 }}
            variants={capsule}
            initial="hidden"
            animate="show"
            className="pointer-events-none absolute -right-22 -bottom-10 -rotate-12 sm:-right-25"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-sm font-medium text-neutral-700 shadow-xl ring-2 shadow-black/10 ring-neutral-100">
              <IconFlagFilled className="size-4 shrink-0 text-emerald-600" /> 730
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              ease: 'easeIn',
              duration: 0.3,
            }}
            className="relative text-6xl font-bold text-neutral-800 lg:text-[5.6rem]"
          >
            Take over <br />
            the timeline
          </motion.h1>
        </div>
        <motion.p
          initial={{
            opacity: 0,
            y: 10,
            filter: 'blur(10px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            ease: 'easeIn',
            duration: 0.3,
            delay: 0.2,
          }}
          className="text-xl font-medium text-gray-500 md:text-2xl"
        >
          Unlock the content tactics creators use to <br /> blow up fast and stay at the top of the
          feed.
        </motion.p>

        <div className="mt-2 flex items-center gap-2">
          <button className="cursor-pointer rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-black/80">
            Enroll Now
          </button>
          <button className="cursor-pointer rounded-full bg-neutral-200 px-5 py-2.5 font-medium">
            See Details
          </button>
        </div>
      </div>
    </section>
  )
}
