'use client'

import { useRef } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { HeroScene } from '@/components/three/hero-scene'
import { MagneticButton } from '@/components/magnetic-button'
import { CountUp } from '@/components/count-up'

const HEADLINE = ['Building', 'the', 'Operating', 'System', 'for', 'AI-Native', 'Enterprises']

const stats = [
  { value: 3, suffix: '', label: 'Live AI products' },
  { value: 50, suffix: '+', label: 'Jurisdictions served' },
  { value: 2031, suffix: '', label: 'UAE AI Strategy aligned' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* WebGL particle field */}
      <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0">
        <HeroScene />
      </motion.div>

      {/* Pure white background with no overlays */}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-20 pt-24 sm:min-h-screen sm:px-6 sm:pb-24 sm:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[11px] leading-tight text-muted-foreground backdrop-blur-md sm:text-xs"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Research-led AI Product Company · Dubai
        </motion.div>

        <h1 className="mt-6 max-w-5xl text-balance text-[2.45rem] font-semibold leading-[1.02] tracking-[-0.035em] min-[390px]:text-[2.75rem] sm:text-6xl sm:tracking-tight md:text-7xl lg:text-[5.5rem]">
          {HEADLINE.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.25em] align-top">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  word === 'AI-Native'
                    ? 'inline-block bg-gradient-to-r from-primary via-chart-3 to-accent bg-clip-text text-transparent'
                    : 'inline-block'
                }
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground"
        >
          We combine technology research with market research to build visual intelligence,
          supplier intelligence, and voice-led automation for real enterprise workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <MagneticButton
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-primary-foreground shadow-[0_0_40px_-8px_rgba(59,130,246,0.6)] min-h-[44px] sm:min-h-auto"
          >
            Talk to Founder
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-foreground backdrop-blur-md min-h-[44px] sm:min-h-auto"
          >
            Explore Products
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 grid max-w-3xl grid-cols-3 gap-3 border-t border-border/60 pt-6 sm:mt-16 sm:gap-8 sm:pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xl font-semibold tracking-tight text-foreground min-[390px]:text-2xl sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dt>
              <dd className="mt-1 text-[11px] leading-snug text-muted-foreground min-[390px]:text-xs sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}
