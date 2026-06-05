'use client'
import { Globe, Mail, User } from 'lucide-react'
import { SiInstagram } from 'react-icons/si'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
export default function Page() {
  return (
    <section className="min-h-screen">
      <InteractiveAddress email="nav@hex-ui.com" />
    </section>
  )
}

type HighlightType = 'name' | 'website' | 'email' | 'instagram' | null

const InteractiveAddress = ({ email = 'navdeepannu0@gmail.com' }: { email: string }) => {
  const [highlight, setHighlight] = useState<HighlightType>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const atRef = useRef<HTMLDivElement>(null)
  const domainRef = useRef<HTMLDivElement>(null)
  const extRef = useRef<HTMLDivElement>(null)

  // Icons
  const icons = [
    {
      type: 'name' as HighlightType,
      label: 'Name',
      icon: User,
    },
    {
      type: 'website' as HighlightType,
      label: 'Website',
      icon: Globe,
    },
    {
      type: 'email' as HighlightType,
      label: 'Email',
      icon: Mail,
    },
    {
      type: 'instagram' as HighlightType,
      label: 'Instagram',
      icon: SiInstagram,
    },
  ]

  // Name seperation
  const [emailName, emailDomain] = email.split('@')
  const domainParts = emailDomain.split('.')
  const domainName = domainParts[0]
  const domainExt = domainParts.slice(1).join('.')

  // Get Segment States : active, blurred,
  const getSegmentStates = () => {
    switch (highlight) {
      case 'name': {
        return {
          name: { active: true, blurred: false },
          at: { active: false, blurred: true },
          domain: { active: false, blurred: true },
          ext: { active: false, blurred: true },
          label: 'Name',
        }
      }
      case 'website': {
        return {
          name: { active: false, blurred: true },
          at: { active: false, blurred: true },
          domain: { active: true, blurred: false },
          ext: { active: true, blurred: false },
          label: 'Website',
        }
      }
      case 'instagram': {
        return {
          name: { active: false, blurred: true },
          at: { active: true, blurred: false },
          domain: { active: true, blurred: false },
          ext: { active: false, blurred: true },
          label: 'Instagram',
        }
      }
      case 'email': {
        return {
          name: { active: true, blurred: false },
          at: { active: true, blurred: false },
          domain: { active: true, blurred: false },
          ext: { active: true, blurred: false },
          label: 'Email',
        }
      }
      default: {
        return {
          name: { active: false, blurred: false },
          at: { active: false, blurred: false },
          domain: { active: false, blurred: false },
          ext: { active: false, blurred: false },
        }
      }
    }
  }

  const segmentStates = getSegmentStates()
  const [boxPosition, setBoxPosition] = useState<{ x: number; width: number }>({ x: 0, width: 0 })

  useEffect(() => {
    if (!containerRef.current || !highlight) return

    const containerRect = containerRef.current.getBoundingClientRect()
    let startX = Infinity
    let endX = 0

    const getSegmentRef = () => {
      switch (highlight) {
        case 'name': {
          return [nameRef]
        }
        case 'website': {
          return [domainRef, extRef]
        }
        case 'email': {
          return [nameRef, domainRef, atRef, extRef]
        }
        case 'instagram': {
          return [atRef, domainRef]
        }
        default:
          return []
      }
    }

    const refs = getSegmentRef()

    refs.forEach((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const relativeX = rect.left - containerRect.left
        startX = Math.min(startX, relativeX)
        endX = Math.max(endX, relativeX + rect.width)
      }

      if (startX !== Infinity) {
        setBoxPosition({
          x: startX,
          width: endX - startX,
        })
      }
    })
  }, [highlight])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-12">
      <div className="relative flex min-h-20 flex-col items-center">
        <div ref={containerRef} className="relative flex items-center justify-center">
          <TextSegment
            isActive={segmentStates.name.active}
            isBlurred={segmentStates.name.blurred}
            segmentRef={nameRef as React.RefObject<HTMLSpanElement>}
          >
            {emailName}
          </TextSegment>
          <TextSegment
            segmentRef={atRef as React.RefObject<HTMLSpanElement>}
            isActive={segmentStates.at.active}
            isBlurred={segmentStates.at.blurred}
          >
            @
          </TextSegment>

          <TextSegment
            segmentRef={domainRef as React.RefObject<HTMLSpanElement>}
            isActive={segmentStates.domain.active}
            isBlurred={segmentStates.domain.blurred}
          >
            {domainName}
          </TextSegment>
          <TextSegment
            segmentRef={extRef as React.RefObject<HTMLSpanElement>}
            isActive={segmentStates.ext.active}
            isBlurred={segmentStates.ext.blurred}
          >
            .{domainExt}
          </TextSegment>

          <AnimatedDashedBox
            width={boxPosition.width}
            x={boxPosition.x}
            visible={highlight !== null}
            label={segmentStates.label}
          />
        </div>
      </div>
      {/* icon container */}
      <div className="flex items-center">
        {icons.map(({ type, icon: Icon }) => (
          <motion.button
            key={type}
            onMouseEnter={() => setHighlight(type)}
            onMouseLeave={() => setHighlight(null)}
            className="relative rounded-lg p-2 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="size-5 transition-colors duration-150"> </Icon>
            <AnimatePresence>
              {highlight === type && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 -z-10 rounded-lg bg-neutral-500/5"
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

interface TextSegmentProps {
  children: React.ReactNode
  isActive: boolean
  isBlurred: boolean
  segmentRef: React.RefObject<HTMLSpanElement>
}

const TextSegment = ({ children, isActive, isBlurred, segmentRef }: TextSegmentProps) => {
  return (
    <motion.span
      className={cn(
        'text-3xl font-medium tracking-tight md:text-4xl',
        isActive ? 'text-neutral-900' : 'text-neutral-400',
      )}
      ref={segmentRef as React.RefObject<HTMLSpanElement>}
      animate={{
        filter: isBlurred ? 'blur(4px)' : 'blur(0px)',
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.span>
  )
}

function AnimatedDashedBox({
  width,
  x,
  visible,
  label,
}: {
  width: number
  x: number
  visible?: boolean
  label?: string
}) {
  const paddingX = 6
  const boxWidth = Math.max(width + paddingX * 2, 40)
  const boxHeight = 16
  const path = `
     M 0 0 
     L 0 ${boxHeight}
     L ${boxWidth} ${boxHeight}
     L ${boxWidth} 0
  `
  return (
    <motion.div
      transition={{ duration: 0.3, ease: 'easeOut' }}
      animate={{ opacity: visible ? 1 : 0, x: x - paddingX }}
      className={cn(`pointer-event-none absolute top-full left-0 mt-4 flex flex-col items-start`)}
      layoutId="animated-dashed-box"
    >
      <motion.svg
        width={boxWidth}
        height={boxHeight}
        viewBox={`0 0 ${boxWidth} ${boxHeight}`}
        fill="none"
        className="overflow-visible"
      >
        <motion.path
          d={path}
          stroke="var(--color-neutral-500)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />
      </motion.svg>
      <div className="relative mt-1 h-6 min-w-16 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              exit={{ opacity: 0, y: 0, filter: 'blur(4px)' }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
