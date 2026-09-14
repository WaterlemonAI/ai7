'use client'

import { useEffect, useRef, useState } from 'react'
import { stages } from './stages'
import s from './particle-journey.module.css'

type Point = { x: number; y: number; z: number }
const objects = ['Compass', 'Connected architecture', 'AI processor', 'Neural brain', 'Engineering gear', 'Governance shield', 'Operations monitor']
const COUNT = 2600
const PERIOD = 6400

// Sample actual silhouettes so every grain has a stable destination in each object.
function makeShape(index: number): Point[] {
  const mask = document.createElement('canvas')
  mask.width = mask.height = 400
  const c = mask.getContext('2d')!
  c.strokeStyle = c.fillStyle = '#000'
  c.lineWidth = 9; c.lineCap = 'round'; c.lineJoin = 'round'
  const path = (d: string, fill = false) => fill ? c.fill(new Path2D(d)) : c.stroke(new Path2D(d))
  const circle = (x: number, y: number, r: number) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke() }
  if (index === 0) {
    circle(200, 200, 135); circle(200, 200, 117)
    for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8; c.beginPath(); c.moveTo(200 + Math.cos(a) * 103, 200 + Math.sin(a) * 103); c.lineTo(200 + Math.cos(a) * 113, 200 + Math.sin(a) * 113); c.stroke() }
    path('M245 112 L221 220 L155 288 L179 180 Z', true)
    circle(200, 200, 13)
  } else if (index === 1) {
    path('M200 70 L285 115 L200 160 L115 115 Z M115 115 L115 205 L200 252 L285 205 L285 115 M200 160 L200 252')
    path('M115 205 L70 230 L155 278 L200 252 M70 230 L70 300 L155 345 L155 278 M155 345 L200 319 L200 252 M285 205 L330 230 L245 278 L200 252 M330 230 L330 300 L245 345 L245 278 M245 345 L200 319')
  } else if (index === 2) {
    c.strokeRect(100, 100, 200, 200); c.strokeRect(132, 132, 136, 136)
    for (let n = 0; n < 7; n++) { const p = 119 + n * 27; path(`M${p} 65 V95 M${p} 305 V335 M65 ${p} H95 M305 ${p} H335`) }
    path('M163 236 L187 164 L211 236 M173 214 H202 M229 164 V236')
  } else if (index === 3) {
    path('M196 86 C162 48 120 70 112 103 C68 99 52 141 70 170 C38 201 54 245 84 253 C79 301 128 326 158 306 C174 336 194 319 200 302 C220 337 246 326 258 306 C301 317 325 286 318 255 C355 232 354 190 333 170 C351 131 324 99 292 103 C281 66 242 52 206 86 Z')
    path('M200 91 V302 M112 103 C143 110 141 139 127 152 M72 170 C118 150 154 175 146 205 M84 253 C106 220 141 231 157 260 M119 294 C113 271 132 259 151 268 M166 102 C151 138 184 147 195 141 M292 103 C263 108 258 140 275 151 M333 170 C296 146 260 175 268 205 M318 255 C285 222 257 237 243 264 M236 102 C254 134 224 153 204 140 M269 296 C280 270 261 257 247 268')
  } else if (index === 4) {
    const pts: string[] = []
    for (let i = 0; i < 48; i++) { const a = i * Math.PI / 24; const r = i % 4 < 2 ? 139 : 110; pts.push(`${200 + Math.cos(a) * r},${200 + Math.sin(a) * r}`) }
    path('M' + pts.join(' L') + ' Z'); circle(200, 200, 65); circle(200, 200, 43)
  } else if (index === 5) {
    path('M200 58 C238 90 285 95 316 100 V192 C314 259 258 315 200 345 C142 315 86 259 84 192 V100 C115 95 162 90 200 58 Z')
    path('M200 82 C237 108 274 117 295 120 V192 C291 249 246 294 200 320 C154 294 109 249 105 192 V120 C132 114 166 108 200 82 Z')
    c.lineWidth = 17; path('M142 196 L181 235 L259 154')
  } else {
    path('M67 86 H333 V279 H67 Z M157 280 L147 326 H253 L243 280 M123 328 H277')
    c.lineWidth = 11; path('M93 199 H130 L157 140 L192 236 L229 166 L248 199 H307')
    c.lineWidth = 5; path('M91 108 H155 M91 120 H129')
  }
  const data = c.getImageData(0, 0, 400, 400).data
  const pixels: Point[] = []
  for (let y = 0; y < 400; y += 2) for (let x = 0; x < 400; x += 2) if (data[(y * 400 + x) * 4 + 3] > 100) pixels.push({ x: x - 200, y: y - 200, z: 0 })
  let seed = 713 + index
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }
  return Array.from({ length: COUNT }, () => { const p = pixels[Math.floor(random() * pixels.length)]; return { x: p.x + (random() - .5) * 3, y: p.y + (random() - .5) * 3, z: (random() - .5) * 24 } })
}

export function ParticleJourney() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const selected = useRef(0)
  const reducedRef = useRef(false)
  const transition = useRef<(index: number) => void>(() => {})
  const [active, setActive] = useState(0)
  useEffect(() => {
    const el = canvas.current!
    const ctx = el.getContext('2d')
    if (!ctx) return
    const shapes = stages.map((_, i) => makeShape(i))
    let from = shapes[0].map(p => ({ ...p })), positions = from.map(p => ({ ...p }))
    let elapsed = 0, morph = 1, last = 0, frame = 0, visible = true, width = 600, height = 450
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => { reducedRef.current = media.matches }
    syncMotion(); media.addEventListener('change', syncMotion)
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      el.width = width * dpr; el.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    resize.observe(el)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(el)
    const change = (index: number) => {
      if (index === selected.current) return
      from = positions.map(p => ({ ...p })); selected.current = index; morph = 0; elapsed = 0; setActive(index)
    }
    transition.current = change
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      const dt = Math.min(time - (last || time), 40); last = time
      if (!visible || document.hidden || width < 1) return
      const still = reducedRef.current
      if (!still) { elapsed += dt; morph = Math.min(1, morph + dt / 2200); if (elapsed > PERIOD) change((selected.current + 1) % 7) }
      if (reducedRef.current) morph = 1
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width / 480, height / 430)
      const phase = still ? 0 : time * .00032
      const yaw = Math.sin(phase) * .14
      const target = shapes[selected.current]
      const ease = morph * morph * (3 - 2 * morph)
      const scatter = Math.sin(Math.PI * morph)
      // A soft pool of light anchors the volume without a dark background.
      const glow = ctx.createRadialGradient(width / 2, height * .5, 0, width / 2, height * .5, width * .43)
      glow.addColorStop(0, '#dbeafe80'); glow.addColorStop(1, '#eff6ff00'); ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height)
      for (let i = 0; i < COUNT; i++) {
        const a = from[i], b = target[i], wave = i * 2.39996
        const spread = 35 + (i % 83)
        const p = positions[i]
        p.x = a.x + (b.x - a.x) * ease + Math.cos(wave + morph * 3) * scatter * spread
        p.y = a.y + (b.y - a.y) * ease + Math.sin(wave + morph * 3) * scatter * spread * .7
        p.z = a.z + (b.z - a.z) * ease + Math.sin(wave) * scatter * 85
        const x = p.x * Math.cos(yaw) + p.z * Math.sin(yaw)
        const depth = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw)
        const perspective = 650 / (650 - depth)
        const drift = still ? 0 : Math.sin(phase * 3 + wave) * .65
        const px = width / 2 + (x + drift) * scale * perspective
        const py = height * .48 + (p.y + drift) * scale * perspective
        const size = (.65 + (i % 7) * .13) * scale * perspective
        ctx.fillStyle = i % 5 === 0 ? '#60a5fa' : i % 3 === 0 ? '#2563eb' : '#174bb5'
        ctx.globalAlpha = .48 + (i % 9) * .055
        ctx.beginPath(); ctx.arc(px, py, Math.max(.45, size), 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); media.removeEventListener('change', syncMotion) }
  }, [])
  return <div className={s.journey}>
    <canvas ref={canvas} className={s.canvas} role="img" aria-label={`Blue sand particles forming a ${objects[active].toLowerCase()} to represent ${stages[active].short}`} />
    <div className={s.caption}><span className={s.number}>0{active + 1}<small> / 07</small></span><div><h2>{stages[active].short}</h2><p>{objects[active]} · {stages[active].delivery}</p></div><span className={s.next}>NEXT<br /><b>{stages[(active + 1) % 7].short} ↗</b></span></div>
    <div className={s.steps} aria-label="Choose an AI7 discipline">{stages.map((stage, i) => <button key={stage.slug} type="button" aria-label={`Show ${stage.short}`} aria-pressed={i === active} onClick={() => transition.current(i)}><span>0{i + 1}</span><span>{stage.short}</span></button>)}</div>
    <p className={s.footnote}>CONTINUOUSLY REFORMING. ALWAYS UNDER YOUR CONTROL.</p>
  </div>
}
