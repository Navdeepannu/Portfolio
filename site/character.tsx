import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Character() {
  const router = useRouter()

  return (
    <button
      className="rounded-full shadow-sm ring-1 shadow-black/12 ring-foreground/6.5"
      onClick={() => {
        router.push('/')
      }}
    >
      <Image
        src="/character.jpg"
        alt="character"
        className="size-10 cursor-pointer rounded-full object-cover"
        width={1000}
        height={1000}
      />
    </button>
  )
}
