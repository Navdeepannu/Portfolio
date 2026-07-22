'use client'

import React, { type ReactNode } from 'react'
import { motion, type TargetAndTransition, type Variants } from 'motion/react'

type DynamicElementProps = {
  as: React.ElementType
  children?: ReactNode
  className?: string
}

const DynamicElement = React.forwardRef<HTMLElement, DynamicElementProps>(
  ({ as: Component, ...props }, ref) => <Component ref={ref} {...props} />,
)

DynamicElement.displayName = 'DynamicElement'

const MotionElement = motion.create(DynamicElement)

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing'

export type AnimatedGroupProps = {
  children: ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
  preset?: PresetType
  as?: React.ElementType
  asChild?: React.ElementType
}

type AnimationStates = {
  hidden?: TargetAndTransition
  visible?: TargetAndTransition
}

const defaultContainerVariants: AnimationStates = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: AnimationStates = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const presetVariants: Record<PresetType, AnimationStates> = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 8,
      },
    },
  },
}

function addDefaultVariants(variants: AnimationStates): Variants {
  return {
    hidden: {
      ...defaultItemVariants.hidden,
      ...variants.hidden,
    },
    visible: {
      ...defaultItemVariants.visible,
      ...variants.visible,
    },
  }
}

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  }

  const containerVariants = variants?.container ?? selectedVariants.container

  const itemVariants = variants?.item ?? selectedVariants.item

  return (
    <MotionElement
      as={as}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionElement as={asChild} key={index} variants={itemVariants}>
          {child}
        </MotionElement>
      ))}
    </MotionElement>
  )
}

export { AnimatedGroup }
