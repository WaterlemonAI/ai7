'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ParticleField = dynamic(() => import('./particle-field'), {
  ssr: false,
  loading: () => null,
})

/**
 * Progressive enhancement wrapper for the WebGL hero scene.
 * - Skips WebGL for reduced-motion users (shows CSS glow instead).
 * - Mounts after paint so it never blocks first render.
 */
export function HeroScene() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // basic WebGL capability check
    let webgl = false
    try {
      const canvas = document.createElement('canvas')
      webgl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
      webgl = false
    }
    if (!reduced && webgl) {
      const id = requestAnimationFrame(() => setEnabled(true))
      return () => cancelAnimationFrame(id)
    }
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* CSS fallback / base glow — always present, sits behind WebGL */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      {enabled && (
        <div className="absolute inset-0">
          <ParticleField />
        </div>
      )}
      {/* vignette to blend scene into page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_92%)]" />
    </div>
  )
}
