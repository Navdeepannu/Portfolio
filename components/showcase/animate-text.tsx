'use client'

import { TextEffect } from '@/components/ui/custom/text-effect'

export default function AnimateTextShowcase() {
  return (
    <div className="flex size-full items-center justify-center p-6">
      <TextEffect
        per="char"
        preset="fade-in-blur"
        className="font-serif text-5xl tracking-tight text-foreground md:text-6xl"
        speedReveal={1.2}
        speedSegment={0.8}
      >
        hello
      </TextEffect>
    </div>
  )
}
