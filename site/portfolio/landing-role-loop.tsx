'use client'

import { useReducedMotion } from 'motion/react'

import { TextLoop } from '@/components/ui/text-loop'

const roles = ['Open-source contributor', 'Freelancer', 'UI library builder']

export function LandingRoleLoop() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <span className="sr-only">Open-source contributor</span>
      <div aria-hidden="true">
        <TextLoop
          trigger={!shouldReduceMotion}
          className="pointer-events-none bg-linear-to-b from-emerald-400 to-emerald-600 bg-clip-text font-caveat text-lg text-transparent md:text-2xl"
        >
          {roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </TextLoop>
      </div>
    </>
  )
}
