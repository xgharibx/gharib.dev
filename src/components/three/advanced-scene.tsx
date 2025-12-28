'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Sphere, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Torus,
  Box,
  Icosahedron,
  Octahedron,
  Environment,
  Stars,
  Trail,
  Sparkles,
  useTexture,
  shaderMaterial,
} from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Custom Gradient Shader Material
const GradientMaterial = shaderMaterial(
  {
    time: 0,
    colorA: new THREE.Color('#5c7cfa'),
    colorB: new THREE.Color('#845ef7'),
    colorC: new THREE.Color('#22b8cf'),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float displacement = sin(pos.x * 3.0 + time) * sin(pos.y * 3.0 + time) * 0.1;
      pos += normal * displacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    
    void main() {
      float mixFactor1 = sin(vUv.x * 3.14159 + time * 0.5) * 0.5 + 0.5;
      float mixFactor2 = cos(vUv.y * 3.14159 + time * 0.3) * 0.5 + 0.5;
      
      vec3 color1 = mix(colorA, colorB, mixFactor1);
      vec3 finalColor = mix(color1, colorC, mixFactor2);
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `
)

extend({ GradientMaterial })

// Animated Core Sphere with morphing
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 128, 128]} scale={1.8}>
        <MeshDistortMaterial
          color="#5c7cfa"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  )
}

// Orbiting Rings
function OrbitingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3
      ring1Ref.current.rotation.y = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * -0.2
      ring2Ref.current.rotation.z = t * 0.3
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.4
      ring3Ref.current.rotation.z = t * -0.2
    }
  })

  return (
    <group>
      <Torus ref={ring1Ref} args={[3, 0.02, 16, 100]}>
        <meshStandardMaterial color="#5c7cfa" emissive="#5c7cfa" emissiveIntensity={0.5} />
      </Torus>
      <Torus ref={ring2Ref} args={[3.5, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#845ef7" emissive="#845ef7" emissiveIntensity={0.5} />
      </Torus>
      <Torus ref={ring3Ref} args={[4, 0.01, 16, 100]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <meshStandardMaterial color="#22b8cf" emissive="#22b8cf" emissiveIntensity={0.5} />
      </Torus>
    </group>
  )
}

// Floating Geometric Shapes
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 1,
      type: Math.floor(Math.random() * 3),
    }))
  }, [])

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} index={i} />
      ))}
    </group>
  )
}

function FloatingShape({ 
  position, 
  rotation, 
  scale, 
  speed, 
  type, 
  index 
}: { 
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  type: number
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const colors = ['#5c7cfa', '#845ef7', '#22b8cf', '#ff6b6b', '#51cf66']

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * speed + index) * 0.002
    }
  })

  const color = colors[index % colors.length]

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      {type === 0 ? (
        <Box ref={meshRef} args={[1, 1, 1]} position={position} rotation={rotation} scale={scale}>
          <MeshWobbleMaterial color={color} factor={0.4} speed={speed} transparent opacity={0.7} metalness={0.8} roughness={0.2} />
        </Box>
      ) : type === 1 ? (
        <Octahedron ref={meshRef} args={[1]} position={position} rotation={rotation} scale={scale}>
          <MeshWobbleMaterial color={color} factor={0.4} speed={speed} transparent opacity={0.7} metalness={0.8} roughness={0.2} />
        </Octahedron>
      ) : (
        <Icosahedron ref={meshRef} args={[1]} position={position} rotation={rotation} scale={scale}>
          <MeshWobbleMaterial color={color} factor={0.4} speed={speed} transparent opacity={0.7} metalness={0.8} roughness={0.2} />
        </Icosahedron>
      )}
    </Float>
  )
}

// Enhanced Particles with trails
function EnhancedParticles({ count = 1000 }) {
  const points = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 10
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      // Gradient colors
      colors[i * 3] = 0.36 + Math.random() * 0.2 // R
      colors[i * 3 + 1] = 0.48 + Math.random() * 0.2 // G
      colors[i * 3 + 2] = 0.98 // B
    }
    
    return [positions, colors]
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <points ref={points}>
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
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = (state.pointer.x * viewport.width) / 2
      lightRef.current.position.y = (state.pointer.y * viewport.height) / 2
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#5c7cfa"
      intensity={2}
      distance={10}
      position={[0, 0, 5]}
    />
  )
}

// Main Advanced Scene
function AdvancedSceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#845ef7" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#22b8cf" />
      <MouseLight />

      {/* Core Elements */}
      <CoreSphere />
      <OrbitingRings />
      <FloatingShapes />
      <EnhancedParticles count={800} />

      {/* Sparkles Effect */}
      <Sparkles
        count={100}
        scale={15}
        size={2}
        speed={0.3}
        color="#5c7cfa"
        opacity={0.6}
      />

      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  )
}

// Exported Component
export default function AdvancedScene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 blur-xl" />
          </div>
        }
      >
        <Suspense fallback={null}>
          <AdvancedSceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
