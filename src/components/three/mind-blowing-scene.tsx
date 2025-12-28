'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial, 
  Environment,
  Stars,
  Sparkles,
  Trail,
  useTexture,
  Text3D,
  Center,
} from '@react-three/drei'
import * as THREE from 'three'

interface SceneProps {
  mousePosition: { x: number; y: number }
  phase: string
}

// Morphing brain/idea sphere
function IdeaSphere({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    
    const targetX = (mousePosition.x / window.innerWidth - 0.5) * 2
    const targetY = -(mousePosition.y / window.innerHeight - 0.5) * 2
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY * 0.3 + state.clock.elapsedTime * 0.1,
      0.05
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetX * 0.3 + state.clock.elapsedTime * 0.15,
      0.05
    )
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#00d4ff"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

// Neural network connections
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const nodeCount = 50
  
  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ))
    }
    return positions
  }, [])

  const connections = useMemo(() => {
    const lines: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 5) {
          lines.push({ start: nodes[i], end: nodes[j] })
        }
      }
    }
    return lines
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>
      ))}
      {connections.map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([
                conn.start.x, conn.start.y, conn.start.z,
                conn.end.x, conn.end.y, conn.end.z
              ]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00d4ff" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  )
}

// Orbiting problem/solution particles
function ProblemSolver({ phase }: { phase: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const particleCount = 200
  
  const particles = useMemo(() => {
    const data: Array<{ pos: THREE.Vector3; speed: number; radius: number }> = []
    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      data.push({
        pos: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        speed: 0.2 + Math.random() * 0.5,
        radius
      })
    }
    return data
  }, [])

  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colors = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      // Problem = red, Solution = green
      const isRed = Math.random() > 0.5
      arr[i * 3] = isRed ? 1 : 0
      arr[i * 3 + 1] = isRed ? 0.3 : 0.9
      arr[i * 3 + 2] = isRed ? 0.3 : 0.5
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed
      const angle = t + (i / particleCount) * Math.PI * 2
      
      dummy.position.set(
        particle.radius * Math.cos(angle),
        Math.sin(t * 2 + i) * 2,
        particle.radius * Math.sin(angle)
      )
      dummy.scale.setScalar(0.03 + Math.sin(t + i) * 0.01)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

// Energy rings
function EnergyRings() {
  const ringsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!ringsRef.current) return
    ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <group ref={ringsRef}>
      {[2, 3, 4, 5].map((radius, i) => (
        <Trail
          key={i}
          width={0.1}
          length={10}
          color={new THREE.Color(`hsl(${180 + i * 30}, 100%, 50%)`)}
          attenuation={(t) => t * t}
        >
          <mesh position={[radius, 0, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={`hsl(${180 + i * 30}, 100%, 50%)`} />
          </mesh>
        </Trail>
      ))}
    </group>
  )
}

// Floating code fragments
function CodeFragments() {
  const fragments = ['<solve/>', '{ideas}', 'fn()', '∞', '→', '✓', '💡', '🧠']
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5 + (i - 4) * 1.5
        child.rotation.y = state.clock.elapsedTime * 0.2
      })
    }
  })

  return (
    <group ref={groupRef} position={[5, 0, -3]}>
      {fragments.map((text, i) => (
        <mesh key={i} position={[Math.sin(i * 0.8) * 2, i * 1.5 - 4, Math.cos(i * 0.8) * 2]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// Vortex effect
function Vortex() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 3000
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      const angle = t * Math.PI * 20
      const radius = t * 10
      const height = (t - 0.5) * 20
      
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
      
      // Gradient from cyan to purple
      col[i * 3] = 0 + t * 0.5
      col[i * 3 + 1] = 0.8 - t * 0.5
      col[i * 3 + 2] = 1
    }
    
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Glass shards floating - using simpler material for better compatibility
function GlassShards() {
  const shardsRef = useRef<THREE.Group>(null)
  const shardCount = 15
  
  const shards = useMemo(() => {
    return Array.from({ length: shardCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.2 + Math.random() * 0.5
    }))
  }, [])

  useFrame((state) => {
    if (shardsRef.current) {
      shardsRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1)
        child.rotation.y += 0.002 * (i % 3 === 0 ? 1 : -1)
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001
      })
    }
  })

  return (
    <group ref={shardsRef}>
      {shards.map((shard, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2}>
          <mesh position={shard.position} rotation={shard.rotation} scale={shard.scale}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="#88ccff"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.6}
              envMapIntensity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Main scene component
function Scene({ mousePosition, phase }: SceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />

      {/* Background */}
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 10, 50]} />

      {/* Stars */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Sparkles */}
      <Sparkles count={200} scale={20} size={2} speed={0.5} color="#00d4ff" />

      {/* Main elements */}
      <IdeaSphere mousePosition={mousePosition} />
      <NeuralNetwork />
      <ProblemSolver phase={phase} />
      <Vortex />
      <GlassShards />
      <EnergyRings />
      <CodeFragments />

      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

export function MindBlowingScene({ mousePosition, phase }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: '#000000' }}
    >
      <Scene mousePosition={mousePosition} phase={phase} />
    </Canvas>
  )
}
