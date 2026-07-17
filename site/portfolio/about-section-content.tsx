'use client'

import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

import { landingPageContent } from './landing-page-content'

export function AboutSectionContent() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const content = landingPageContent.about
  const words = content.split(' ')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'start 45%'],
  })

  let characterIndex = 0

  return (
    <div ref={sectionRef} id="about">
      <p className="max-w-4xl text-base leading-8 text-foreground sm:text-lg">
        <span className="sr-only">{content}</span>

        <span aria-hidden="true">
          {words.map((word, wordIndex) => {
            const wordStartIndex = characterIndex
            characterIndex += word.length + 1

            return (
              <Fragment key={`${word}-${wordIndex}`}>
                <span className="inline-block whitespace-nowrap">
                  {[...word].map((character, index) => (
                    <ScrollCharacter
                      key={`${wordStartIndex + index}-${character}`}
                      character={character}
                      index={wordStartIndex + index}
                      total={content.length}
                      scrollYProgress={scrollYProgress}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </span>

                {wordIndex < words.length - 1 && <span className="inline-block w-[0.2em]" />}
              </Fragment>
            )
          })}
        </span>
      </p>
    </div>
  )
}

type ScrollCharacterProps = {
  character: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  shouldReduceMotion: boolean | null
}

function ScrollCharacter({
  character,
  index,
  total,
  scrollYProgress,
  shouldReduceMotion,
}: ScrollCharacterProps) {
  const characterProgress = index / Math.max(total - 1, 1)
  const start = characterProgress * 0.82
  const end = Math.min(start + 0.12, 1)
  const peak = start + (end - start) / 2

  const opacity = useTransform(
    scrollYProgress,
    [start, peak, end],
    shouldReduceMotion ? [1, 1, 1] : [0.2, 0.75, 1],
  )

  const y = useTransform(
    scrollYProgress,
    [start, peak, end],
    shouldReduceMotion ? [0, 0, 0] : [0, -7, 0],
  )

  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {character}
    </motion.span>
  )
}
