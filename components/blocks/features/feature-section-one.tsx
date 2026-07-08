'use client'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

const items = [
  {
    title: 'Dashboard',
    label: 'A clean overview of activity, progress, key metrics, and recent updates.',
    href: '#dashboard',
    icon: '⌘',
  },
  {
    title: 'Automations',
    label: 'Trigger useful actions, reduce repeated work, and keep workflows moving.',
    href: '#automations',
    icon: '✦',
  },
  {
    title: 'Analytics',
    label: 'Understand usage, performance, trends, and what needs attention.',
    href: '#analytics',
    icon: '◌',
  },
  {
    title: 'Integrations',
    label: 'Connect with the tools your product already depends on.',
    href: '#integrations',
    icon: '↗',
  },
  {
    title: 'Security',
    label: 'Role-based access, protected data, and safer product experiences.',
    href: '#security',
    icon: '◆',
  },
]

export default function FeatureSectionOne() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#f4f2ee] px-4 py-24 text-[#282524] md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <p className="mb-4 text-sm font-medium tracking-[0.25em] text-neutral-500 uppercase">
            Product features
          </p>

          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
            Everything needed to build a polished digital product
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="mx-auto flex w-full max-w-250 flex-col items-center"
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <motion.a
                key={item.title}
                href={item.href}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 24,
                    filter: 'blur(10px)',
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                  },
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative grid min-h-20 w-full grid-cols-1 items-center overflow-hidden rounded-[1.75rem] px-5 outline-none md:min-h-30 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:px-8"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-feature-row"
                    className="absolute inset-0 rounded-[1.75rem] bg-white shadow-[0_24px_90px_rgba(0,0,0,0.09)]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 38,
                    }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`${item.title}-icon`}
                      initial={{
                        opacity: 0,
                        x: -24,
                        scale: 0.9,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        x: -16,
                        scale: 0.95,
                        filter: 'blur(8px)',
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 hidden h-16 w-16 items-center justify-center justify-self-start rounded-2xl border border-neutral-200 bg-white text-2xl shadow-sm md:col-start-1 md:row-start-1 md:mr-16 md:flex"
                    >
                      {item.icon}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.h3
                  animate={{
                    scale: isActive ? 0.94 : 1,
                    opacity: isActive ? 1 : 0.92,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 justify-self-center text-center font-serif text-[clamp(3.4rem,7vw,6rem)] leading-[0.88] tracking-[-0.07em] whitespace-nowrap text-[#282524] md:col-start-2 md:row-start-1"
                >
                  {item.title}
                </motion.h3>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`${item.title}-content`}
                      initial={{
                        opacity: 0,
                        x: 24,
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        x: 16,
                        filter: 'blur(8px)',
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10 hidden max-w-40 justify-self-end text-left md:col-start-3 md:row-start-1 md:ml-16 md:block"
                    >
                      <p className="text-sm leading-5 text-neutral-700">{item.label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
