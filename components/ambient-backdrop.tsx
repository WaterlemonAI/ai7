'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Lightweight, GPU-friendly ambient backdrop used behind interior page headers.
 * No WebGL — just a dotted grid, a masked fade, and two slowly drifting glows.
 * Respects prefers-reduced-motion by rendering the static layers only.
 */
export function AmbientBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const animate = mounted && !reduced

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {/* Dotted grid, faded top + bottom */}
      <div className="absolute inset-0 bg-grid mask-fade-y opacity-60" />

      {/* Drifting primary glow */}
      <motion.div
        className="absolute -top-24 left-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)',
        }}
        animate={animate ? { x: [0, 60, -20, 0], y: [0, 30, -10, 0], opacity: [0.5, 0.75, 0.55, 0.5] } : undefined}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />

      {/* Drifting accent glow */}
      <motion.div
        className="absolute right-[12%] top-10 h-80 w-80 rounded-full opacity-35 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)',
        }}
        animate={animate ? { x: [0, -40, 20, 0], y: [0, 20, -20, 0], opacity: [0.35, 0.55, 0.4, 0.35] } : undefined}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />

      {/* Bottom fade into page background for seamless continuity */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
