'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { products } from '@/lib/site'

const RINGS = [{ duration: 44, items: products }]

export function Orbit() {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center overflow-hidden sm:overflow-visible">
      {/* Concentric guide rings */}
      {RINGS.map((ring) => (
        <div
          key={ring.duration}
          className="absolute h-[min(78vw,23.125rem)] w-[min(78vw,23.125rem)] rounded-full border border-border/60"
        />
      ))}

      {/* Ambient glow */}
      <div className="absolute h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

      {/* Central core */}
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-card/80 backdrop-blur-md sm:h-28 sm:w-28">
        <div className="absolute inset-0 animate-ping rounded-full border border-primary/30" style={{ animationDuration: '3s' }} />
        <span className="bg-gradient-to-r from-primary via-chart-3 to-accent bg-clip-text text-lg font-semibold text-transparent">
          AI7Lab
        </span>
      </div>

      {/* Orbiting nodes — mounted client-side only to avoid subpixel hydration drift */}
      {mounted &&
        RINGS.map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute h-[min(78vw,23.125rem)] w-[min(78vw,23.125rem)]"
          animate={reduced ? undefined : { rotate: ri % 2 === 0 ? 360 : -360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
        >
          {ring.items.map((product, i) => {
            const angle = (i / ring.items.length) * Math.PI * 2
            const x = 50 + Math.cos(angle) * 50
            const y = 50 + Math.sin(angle) * 50
            return (
              <motion.div
                key={product.slug}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
                animate={reduced ? undefined : { rotate: ri % 2 === 0 ? -360 : 360 }}
                transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
              >
                <div className="group flex items-center">
                  <div className="relative flex h-10 w-20 items-center justify-center overflow-hidden rounded-xl border border-border bg-card/95 px-2 shadow-lg backdrop-blur transition-colors hover:border-primary/50 sm:h-12 sm:w-24">
                    {product.logo ? (
                      <Image
                        src={product.logo}
                        alt={`${product.name} logo`}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-foreground">{product.name.slice(0, 2)}</span>
                    )}
                  </div>
                  <span className="sr-only">
                    {product.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      ))}
    </div>
  )
}
