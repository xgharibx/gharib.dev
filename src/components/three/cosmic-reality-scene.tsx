'use client'

// Cosmic Reality Scene - Ultra-optimized 3D background
import { useRef, useMemo, useEffect, useState, Suspense, memo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial, 
  Environment,
  Stars,
  Sparkles,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  Preload,
} from '@react-three/drei'
import * as THREE from 'three'

// ============================================================================
// PERFORMANCE DETECTION
// ============================================================================

interface DeviceCapabilities {
  isMobile: boolean
  isLowEnd: boolean
  tier: 'low' | 'medium' | 'high' | 'ultra'
  particleMultiplier: number
  effectsEnabled: boolean
}

function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return { isMobile: false, isLowEnd: false, tier: 'medium', particleMultiplier: 0.5, effectsEnabled: true }
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as any).deviceMemory || 4
  const isLowEnd = cores < 4 || memory < 4

  let tier: 'low' | 'medium' | 'high' | 'ultra' = 'medium'
  let particleMultiplier = 0.5
  let effectsEnabled = true

  if (isMobile && isLowEnd) {
    tier = 'low'
    particleMultiplier = 0.15
    effectsEnabled = false
  } else if (isMobile) {
    tier = 'medium'
    particleMultiplier = 0.25
    effectsEnabled = true
  } else if (isLowEnd) {
    tier = 'medium'
    particleMultiplier = 0.4
    effectsEnabled = true
  } else if (cores >= 8 && memory >= 8) {
    tier = 'ultra'
    particleMultiplier = 1.0
    effectsEnabled = true
  } else {
    tier = 'high'
    particleMultiplier = 0.7
    effectsEnabled = true
  }

  return { isMobile, isLowEnd, tier, particleMultiplier, effectsEnabled }
}

// ============================================================================
// QUANTUM PARTICLE FIELD - Optimized with instancing considerations
// ============================================================================

const QuantumParticleField = memo(function QuantumParticleField({ 
  mousePosition, 
  count = 1500,
  reducedMotion = false 
}: { 
  mousePosition: { x: number; y: number }
  count?: number
  reducedMotion?: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const frameSkip = useRef(0)
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 5 + Math.random() * 15
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
      
      // Cyan, Purple, Teal palette
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        col[i * 3] = 0
        col[i * 3 + 1] = 0.83 + Math.random() * 0.17
        col[i * 3 + 2] = 1
      } else if (colorChoice < 0.7) {
        col[i * 3] = 0.6 + Math.random() * 0.2
        col[i * 3 + 1] = 0
        col[i * 3 + 2] = 1
      } else {
        col[i * 3] = 0
        col[i * 3 + 1] = 1
        col[i * 3 + 2] = 0.5 + Math.random() * 0.3
      }
      
      vel[i * 3] = (Math.random() - 0.5) * 0.015
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015
    }
    
    velocitiesRef.current = vel
    return { positions: pos, colors: col }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current || !velocitiesRef.current) return
    
    // Skip frames for performance on reduced motion
    if (reducedMotion) {
      frameSkip.current++
      if (frameSkip.current % 3 !== 0) return
    }
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current
    const time = state.clock.elapsedTime
    
    // Normalize mouse position
    const mouseX = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 15 : 0
    const mouseY = typeof window !== 'undefined' ? -(mousePosition.y / window.innerHeight - 0.5) * 15 : 0
    
    // Update every nth particle per frame for performance
    const step = reducedMotion ? 4 : 2
    const startIdx = Math.floor(time * 100) % step
    
    for (let i = startIdx; i < count; i += step) {
      const i3 = i * 3
      
      // Apply velocity with time-based oscillation
      posArray[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.002
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.1) * 0.002
      posArray[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.4 + i * 0.1) * 0.002
      
      // Mouse attraction
      const dx = mouseX - posArray[i3]
      const dy = mouseY - posArray[i3 + 1]
      const distSq = dx * dx + dy * dy
      
      if (distSq < 25 && distSq > 0.1) {
        const force = (5 - Math.sqrt(distSq)) * 0.0015
        posArray[i3] += dx * force
        posArray[i3 + 1] += dy * force
      }
      
      // Boundary wrap
      const limit = 18
      if (posArray[i3] > limit) posArray[i3] = -limit
      if (posArray[i3] < -limit) posArray[i3] = limit
      if (posArray[i3 + 1] > limit) posArray[i3 + 1] = -limit
      if (posArray[i3 + 1] < -limit) posArray[i3 + 1] = limit
      if (posArray[i3 + 2] > limit) posArray[i3 + 2] = -limit
      if (posArray[i3 + 2] < -limit) posArray[i3 + 2] = limit
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = time * 0.015
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
})

// ============================================================================
// NEURAL CONSTELLATION - Optimized
// ============================================================================

const NeuralConstellation = memo(function NeuralConstellation({ 
  mousePosition,
  nodeCount = 40 
}: { 
  mousePosition: { x: number; y: number }
  nodeCount?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const connectionThreshold = 4.5
  
  const { nodes, nodeColors, lineGeometry } = useMemo(() => {
    const nodesArray: THREE.Vector3[] = []
    const colorsArray: THREE.Color[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 7 + Math.random() * 5
      
      nodesArray.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ))
      
      const t = i / nodeCount
      colorsArray.push(new THREE.Color().setHSL(0.52 + t * 0.15, 0.85, 0.55))
    }
    
    const lines: Array<{ start: number; end: number; distance: number }> = []
    for (let i = 0; i < nodesArray.length; i++) {
      for (let j = i + 1; j < nodesArray.length; j++) {
        const dist = nodesArray[i].distanceTo(nodesArray[j])
        if (dist < connectionThreshold) {
          lines.push({ start: i, end: j, distance: dist })
        }
      }
    }
    
    // Pre-compute line geometry for all connections
    const linePositions: number[] = []
    const lineColors: number[] = []
    lines.slice(0, 35).forEach(conn => {
      const start = nodesArray[conn.start]
      const end = nodesArray[conn.end]
      const color = colorsArray[conn.start]
      const opacity = 1 - (conn.distance / connectionThreshold)
      
      linePositions.push(start.x, start.y, start.z, end.x, end.y, end.z)
      lineColors.push(color.r * opacity, color.g * opacity, color.b * opacity)
      lineColors.push(color.r * opacity, color.g * opacity, color.b * opacity)
    })
    
    return { 
      nodes: nodesArray, 
      nodeColors: colorsArray, 
      lineGeometry: {
        positions: new Float32Array(linePositions),
        colors: new Float32Array(lineColors)
      }
    }
  }, [nodeCount])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = time * 0.025
      groupRef.current.rotation.x = Math.sin(time * 0.015) * 0.08
      
      // Smooth mouse influence
      const mouseX = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 0.3 : 0
      const mouseY = typeof window !== 'undefined' ? -(mousePosition.y / window.innerHeight - 0.5) * 0.3 : 0
      groupRef.current.rotation.y += mouseX * 0.05
      groupRef.current.rotation.x += mouseY * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nodes as instanced spheres - simplified for performance */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={nodeColors[i]} transparent opacity={0.9} />
        </mesh>
      ))}
      
      {/* All connections as a single line segments geometry */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineGeometry.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineGeometry.colors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  )
})

// ============================================================================
// HOLOGRAPHIC ORBS - Optimized
// ============================================================================

const HolographicOrbs = memo(function HolographicOrbs({ count = 6 }: { count?: number }) {
  const orbsRef = useRef<THREE.Group>(null)

  const orbs = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 4
      ] as [number, number, number],
      scale: 0.25 + Math.random() * 0.4,
      speed: 0.4 + Math.random() * 0.8,
      color: `hsl(${175 + i * 25}, 85%, 55%)`,
    }))
  , [count])

  useFrame((state) => {
    if (!orbsRef.current) return
    const time = state.clock.elapsedTime
    orbsRef.current.children.forEach((orb, i) => {
      const t = time * orbs[i].speed
      orb.position.y += Math.sin(t) * 0.001
      orb.rotation.x = t * 0.15
      orb.rotation.y = t * 0.2
    })
  })

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={orb.position} scale={orb.scale}>
            <icosahedronGeometry args={[1, 1]} />
            <MeshDistortMaterial
              color={orb.color}
              envMapIntensity={0.8}
              clearcoat={1}
              clearcoatRoughness={0}
              metalness={0.85}
              roughness={0.15}
              distort={0.25}
              speed={1.5}
              transparent
              opacity={0.65}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
})

// ============================================================================
// CENTRAL SPHERE - The hero element
// ============================================================================

const CentralSphere = memo(function CentralSphere({ 
  mousePosition,
  scrollProgress = 0 
}: { 
  mousePosition: { x: number; y: number }
  scrollProgress?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    const targetX = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 1.5 : 0
    const targetY = typeof window !== 'undefined' ? -(mousePosition.y / window.innerHeight - 0.5) * 1.5 : 0
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY * 0.25 + time * 0.08,
      0.04
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetX * 0.25 + time * 0.12,
      0.04
    )
    
    // Pulse based on scroll
    const scale = 1.8 + Math.sin(time * 0.5) * 0.1 + scrollProgress * 0.3
    meshRef.current.scale.setScalar(scale)
    
    // Update glow
    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation)
      glowRef.current.scale.setScalar(scale * 1.3)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Outer glow */}
        <mesh ref={glowRef}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.08} 
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Main sphere */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#00d4ff"
            envMapIntensity={1.2}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.92}
            roughness={0.08}
            distort={0.35}
            speed={1.8}
          />
        </mesh>
      </group>
    </Float>
  )
})

// ============================================================================
// SPIRAL VORTEX - Optimized
// ============================================================================

const SpiralVortex = memo(function SpiralVortex({ particleCount = 1200 }: { particleCount?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      const angle = t * Math.PI * 16
      const radius = t * 8 + 0.5
      const height = (t - 0.5) * 16
      
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
      
      // Gradient from cyan to purple
      col[i * 3] = t * 0.6
      col[i * 3 + 1] = 0.85 - t * 0.4
      col[i * 3 + 2] = 1
    }
    
    return { positions: pos, colors: col }
  }, [particleCount])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
})

// ============================================================================
// AMBIENT PARTICLES - Floating dust
// ============================================================================

const AmbientParticles = memo(function AmbientParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5
    }
    
    return pos
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.003
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
})

// ============================================================================
// MAIN SCENE
// ============================================================================

interface SceneProps {
  mousePosition: { x: number; y: number }
  scrollProgress: number
  intensity?: number
  reducedMotion?: boolean
  deviceCapabilities: DeviceCapabilities
}

function Scene({ mousePosition, scrollProgress, reducedMotion = false, deviceCapabilities }: SceneProps) {
  const { tier, particleMultiplier, effectsEnabled } = deviceCapabilities
  
  // Calculate particle counts based on device tier
  const particleCounts = useMemo(() => ({
    quantum: Math.floor(1500 * particleMultiplier),
    neural: Math.floor(40 * particleMultiplier) + 15,
    vortex: Math.floor(1200 * particleMultiplier),
    orbs: tier === 'low' ? 3 : tier === 'medium' ? 4 : 6,
    ambient: Math.floor(200 * particleMultiplier),
    stars: tier === 'low' ? 1500 : tier === 'medium' ? 3000 : 5000,
    sparkles: tier === 'low' ? 50 : tier === 'medium' ? 150 : 300,
  }), [particleMultiplier, tier])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.12} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" distance={50} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#9900ff" distance={40} />
      <pointLight position={[0, 10, -10]} intensity={0.4} color="#00ff88" distance={35} />
      <spotLight position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={0.4} color="#ffffff" />

      {/* Background and atmosphere */}
      <color attach="background" args={['#000005']} />
      <fog attach="fog" args={['#000005', 12, 55]} />

      {/* Stars - Always render */}
      <Stars 
        radius={70} 
        depth={50} 
        count={particleCounts.stars} 
        factor={4.5} 
        saturation={0.6} 
        fade 
        speed={reducedMotion ? 0.15 : 0.6} 
      />
      
      {/* Main elements */}
      <CentralSphere mousePosition={mousePosition} scrollProgress={scrollProgress} />
      <QuantumParticleField 
        mousePosition={mousePosition} 
        count={particleCounts.quantum} 
        reducedMotion={reducedMotion}
      />
      
      {/* Conditional elements based on tier */}
      {tier !== 'low' && (
        <>
          <NeuralConstellation mousePosition={mousePosition} nodeCount={particleCounts.neural} />
          <SpiralVortex particleCount={particleCounts.vortex} />
        </>
      )}
      
      {effectsEnabled && (
        <>
          <HolographicOrbs count={particleCounts.orbs} />
          <AmbientParticles count={particleCounts.ambient} />
        </>
      )}

      {/* Sparkles */}
      <Sparkles 
        count={particleCounts.sparkles} 
        scale={22} 
        size={2.5} 
        speed={reducedMotion ? 0.2 : 0.5} 
        color="#00d4ff" 
      />
      {tier !== 'low' && (
        <Sparkles 
          count={Math.floor(particleCounts.sparkles * 0.5)} 
          scale={18} 
          size={2} 
          speed={reducedMotion ? 0.15 : 0.35} 
          color="#9900ff" 
        />
      )}

      {/* Environment */}
      <Environment preset="night" />
      <Preload all />
    </>
  )
}

// ============================================================================
// EXPORTED COMPONENT
// ============================================================================

export interface CosmicRealitySceneProps {
  mousePosition: { x: number; y: number }
  scrollProgress?: number
  intensity?: number
  reducedMotion?: boolean
  className?: string
}

export function CosmicRealityScene({ 
  mousePosition, 
  scrollProgress = 0, 
  intensity = 1,
  reducedMotion = false,
  className = ''
}: CosmicRealitySceneProps) {
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities>(() => getDeviceCapabilities())
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Visibility detection for performance
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  // Update capabilities on resize
  useEffect(() => {
    const handleResize = () => {
      setDeviceCapabilities(getDeviceCapabilities())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePerformanceChange = useCallback(() => {
    // Automatically reduce quality if performance drops
    setDeviceCapabilities(prev => ({
      ...prev,
      particleMultiplier: Math.max(0.1, prev.particleMultiplier * 0.7),
      tier: 'low'
    }))
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`} style={{ background: '#000005' }}>
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 14], fov: 58, near: 0.1, far: 100 }}
          dpr={deviceCapabilities.tier === 'low' ? 1 : deviceCapabilities.tier === 'medium' ? 1.5 : [1, 2]}
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: deviceCapabilities.tier !== 'low',
            powerPreference: 'high-performance',
            alpha: false,
          }}
        >
          <Suspense fallback={null}>
            <PerformanceMonitor onDecline={handlePerformanceChange} flipflops={3} />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <Scene 
              mousePosition={mousePosition} 
              scrollProgress={scrollProgress}
              intensity={intensity}
              reducedMotion={reducedMotion}
              deviceCapabilities={deviceCapabilities}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}

export default CosmicRealityScene
