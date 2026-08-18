'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** stagger delay in milliseconds */
  delay?: number
  /** translate distance in px */
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/**
 * Scroll-driven reveal. Fades + rises + de-blurs into view once.
 * Respects prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y, filter: reduced ? 'blur(0px)' : 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Container that staggers its children (each should be a motion child or Reveal).
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}
