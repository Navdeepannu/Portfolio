'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { FlowDeskContainer } from '../components'
import { companies } from '../data/flowdesk-logocloud'

const FLIP_INTERVAL = 2600

export function FlowDeskLogoCloud() {
  const [showSecondSet, setShowSecondSet] = useState(false)

  const firstSet = companies.slice(0, 4)
  const secondSet = companies.slice(4, 8)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowSecondSet((current) => !current)
    }, FLIP_INTERVAL)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <FlowDeskContainer className="grid gap-10 py-16 md:grid-cols-[0.7fr_1.3fr] md:items-center">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Integrations</p>

        <h3 className="mt-3 max-w-sm text-xl font-medium tracking-tight text-balance text-foreground md:text-3xl">
          Designed to work with the tools your team already depends on
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {firstSet.map((_, index) => {
          const company = showSecondSet ? secondSet[index] : firstSet[index]

          if (!company) return null

          return (
            <div
              key={index}
              className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-background perspective-[1000px] md:h-28 lg:h-32"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${showSecondSet ? 'second' : 'first'}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.2,
                    translateY: -12,
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    translateY: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 flex items-center justify-center px-6 backface-hidden [&_svg]:h-11 [&_svg]:w-auto [&_svg]:max-w-full md:[&_svg]:h-14 lg:[&_svg]:h-16"
                >
                  {company.icon}
                </motion.div>
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </FlowDeskContainer>
  )
}
