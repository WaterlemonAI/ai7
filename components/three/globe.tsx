'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GLOBE_RADIUS = 1.55
const SURFACE_RADIUS = 1.585
const ROTATION_SPEED = 0.055

function latLngToVec(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function GlobeCore() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshPhysicalMaterial
          color="#0b1f4d"
          roughness={0.28}
          metalness={0.08}
          clearcoat={0.75}
          clearcoatRoughness={0.2}
          transparent
          opacity={0.94}
        />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshBasicMaterial color="#3b82f6" side={THREE.BackSide} transparent opacity={0.12} />
      </mesh>
    </>
  )
}

function GlobeGrid() {
  const positions = useMemo(() => {
    const values: number[] = []
    const addLoop = (points: THREE.Vector3[]) => {
      for (let i = 0; i < points.length; i++) {
        const current = points[i]
        const next = points[(i + 1) % points.length]
        values.push(current.x, current.y, current.z, next.x, next.y, next.z)
      }
    }

    for (const latitude of [-60, -40, -20, 0, 20, 40, 60]) {
      const points: THREE.Vector3[] = []
      for (let longitude = -180; longitude < 180; longitude += 4) {
        points.push(latLngToVec(latitude, longitude, SURFACE_RADIUS))
      }
      addLoop(points)
    }

    for (let longitude = -180; longitude < 180; longitude += 30) {
      const points: THREE.Vector3[] = []
      for (let latitude = -88; latitude <= 88; latitude += 4) {
        points.push(latLngToVec(latitude, longitude, SURFACE_RADIUS))
      }
      for (let i = 0; i < points.length - 1; i++) {
        const current = points[i]
        const next = points[i + 1]
        values.push(current.x, current.y, current.z, next.x, next.y, next.z)
      }
    }
    return new Float32Array(values)
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#60a5fa" transparent opacity={0.34} />
    </lineSegments>
  )
}

const hubs = [
  { name: 'Dubai', lat: 25.2, lng: 55.27, main: true },
  { name: 'Riyadh', lat: 24.7, lng: 46.67 },
  { name: 'Singapore', lat: 1.35, lng: 103.8 },
  { name: 'London', lat: 51.5, lng: -0.12 },
  { name: 'New York', lat: 40.7, lng: -74 },
  { name: 'Tokyo', lat: 35.6, lng: 139.7 },
]

function NetworkArcs() {
  const positions = useMemo(() => {
    const values: number[] = []
    const origin = latLngToVec(hubs[0].lat, hubs[0].lng, SURFACE_RADIUS + 0.015)
    for (const hub of hubs.slice(1)) {
      const destination = latLngToVec(hub.lat, hub.lng, SURFACE_RADIUS + 0.015)
      const midpoint = origin.clone().add(destination).normalize().multiplyScalar(SURFACE_RADIUS + 0.52)
      const curve = new THREE.QuadraticBezierCurve3(origin, midpoint, destination)
      const points = curve.getPoints(48)
      for (let i = 0; i < points.length - 1; i++) {
        values.push(points[i].x, points[i].y, points[i].z, points[i + 1].x, points[i + 1].y, points[i + 1].z)
      }
    }
    return new Float32Array(values)
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#93c5fd" transparent opacity={0.72} />
    </lineSegments>
  )
}

function NetworkNodes() {
  return (
    <group>
      {hubs.map((hub) => {
        const point = latLngToVec(hub.lat, hub.lng, SURFACE_RADIUS + 0.04)
        return (
          <group key={hub.name} position={[point.x, point.y, point.z]}>
            <mesh>
              <sphereGeometry args={[hub.main ? 0.075 : 0.037, 20, 20]} />
              <meshBasicMaterial color={hub.main ? '#ffffff' : '#60a5fa'} />
            </mesh>
            {hub.main ? (
              <mesh scale={1.9}>
                <sphereGeometry args={[0.075, 20, 20]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} />
              </mesh>
            ) : null}
          </group>
        )
      })}
    </group>
  )
}

function GlobeSystem() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * ROTATION_SPEED
  })

  return (
    <group ref={group} rotation={[0.13, -0.82, -0.06]}>
      <GlobeCore />
      <GlobeGrid />
      <NetworkArcs />
      <NetworkNodes />
    </group>
  )
}

export function Globe() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.7} />
      <directionalLight position={[3, 4, 5]} intensity={4.2} color="#dbeafe" />
      <pointLight position={[-3, -1, 3]} intensity={18} color="#2563eb" />
      <Suspense fallback={null}>
        <GlobeSystem />
      </Suspense>
    </Canvas>
  )
}
