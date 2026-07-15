'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Character({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <button
      className="rounded-full shadow-sm ring-1 shadow-black/12 ring-foreground/6.5"
      onClick={() => {
        router.push('/')
      }}
    >
      <Image
        src="/char.jpg"
        alt="Navdeep character icon"
        className={cn(`${className} size-10 cursor-pointer rounded-full object-cover`)}
        width={1000}
        height={1000}
        loading="eager"
        preload
      />
    </button>
  )
}
