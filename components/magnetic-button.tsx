'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const MotionLink = motion.create(Link)

type Props = {
  href: string
  className?: string
  children: React.ReactNode
  strength?: number
}

/**
 * A button/link that subtly follows the cursor (magnetic effect).
 * Falls back to a plain link when the user prefers reduced motion.
 */
export function MagneticButton({ href, className, children, strength = 0.35 }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </MotionLink>
  )
}
