'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  /** Seconds before the first word animates in. */
  delay?: number
  /** Render element. Defaults to h2. */
  as?: 'h1' | 'h2' | 'h3' | 'p'
  /** 'mount' plays immediately (above-the-fold); 'view' plays on scroll-into-view. */
  trigger?: 'mount' | 'view'
}

/**
 * Cinematic word-by-word reveal — each word slides up from a clipped mask.
 * Mirrors the homepage hero headline animation for cross-page continuity.
 *
 * To avoid hydration mismatches from framer-motion's SSR transforms, the server
 * and first client paint render plain static text; the animated version mounts
 * client-side only. Falls back to static text under prefers-reduced-motion.
 */
export function WordReveal({ text, className, delay = 0, as = 'h2', trigger = 'view' }: Props) {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const Static = as

  if (!mounted || reduced) {
    return <Static className={className}>{text}</Static>
  }

  const words = text.split(' ')
  const Tag = motion[as]
  const animateProps =
    trigger === 'mount'
      ? { animate: { y: '0%' } }
      : { whileInView: { y: '0%' }, viewport: { once: true, margin: '-8% 0px' } }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pr-[0.25em] align-top"
          aria-hidden="true"
        >
          <motion.span
            initial={{ y: '110%' }}
            {...animateProps}
            transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
