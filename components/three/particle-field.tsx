'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* -------------------------------------------------------------------------- */
/*  Particle sphere — a slowly rotating cloud of glowing points               */
/* -------------------------------------------------------------------------- */

function Particles({ count = 4200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer, viewport } = useThree()

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    // brand palette: light blue -> medium blue -> dark blue
    const cA = new THREE.Color('#93c5fd')
    const cB = new THREE.Color('#3b82f6')
    const cC = new THREE.Color('#1e40af')

    for (let i = 0; i < count; i++) {
      // Fibonacci-sphere distribution for even coverage, jittered into a shell
      const t = i / count
      const phi = Math.acos(1 - 2 * t)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 2.6 + Math.random() * 1.4

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const mix = Math.random()
      const col = mix < 0.5 ? cA.clone().lerp(cB, mix * 2) : cB.clone().lerp(cC, (mix - 0.5) * 2)
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b

      scales[i] = Math.random()
    }
    return { positions, colors, scales }
  }, [count])

  useFrame((state, delta) => {
    const pts = pointsRef.current
    if (!pts) return
    // gentle autonomous rotation
    pts.rotation.y += delta * 0.05
    pts.rotation.x += delta * 0.012
    // parallax toward pointer
    const targetX = pointer.y * 0.18
    const targetY = pointer.x * 0.28
    pts.rotation.x += (targetX - pts.rotation.x * 0) * 0
    pts.rotation.z += (pointer.x * 0.05 - pts.rotation.z) * 0.04
    // breathing scale
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02
    pts.scale.setScalar(s)
    // subtle camera drift for depth
    state.camera.position.x += (pointer.x * 0.6 - state.camera.position.x) * 0.03
    state.camera.position.y += (pointer.y * 0.4 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
    void viewport
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* A faint inner core glow made of a second, denser sphere */
function Core() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const n = 800
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = Math.random() * 1.6
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#1e40af"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <fog attach="fog" args={['#ffffff', 6, 14]} />
      <Particles />
      <Core />
    </Canvas>
  )
}

export default ParticleField
