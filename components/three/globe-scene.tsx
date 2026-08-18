'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const Globe = dynamic(() => import('./globe').then((m) => m.Globe), { ssr: false })

export function GlobeScene() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-primary/10 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.12),transparent_62%)]">
      <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      {visible && !reduced ? (
        <Globe />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="relative h-3/5 w-3/5 rounded-full border border-blue-300/50 bg-[radial-gradient(circle_at_35%_30%,#2563eb,#0b1f4d_68%)] shadow-[0_0_80px_rgba(37,99,235,0.3)]">
            <div className="absolute inset-[18%] rounded-full border border-blue-200/30" />
            <div className="absolute inset-[36%] rounded-full border border-blue-200/30" />
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-full border border-primary/15 bg-background/85 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur-xl sm:text-xs">
          <span className="text-primary">Dubai</span><span>→</span><span>GCC</span><span>→</span><span>World</span>
        </div>
      </div>
    </div>
  )
}
