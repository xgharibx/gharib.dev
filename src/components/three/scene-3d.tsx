'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#5c7cfa"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function Particles({ count = 500 }) {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05
      points.current.rotation.x = state.clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#5c7cfa"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <mesh position={[
            Math.cos(i * (Math.PI * 2) / 5) * 3,
            Math.sin(i * 0.5) * 0.5,
            Math.sin(i * (Math.PI * 2) / 5) * 3
          ]}>
            <sphereGeometry args={[0.1 + i * 0.05, 32, 32]} />
            <meshStandardMaterial
              color={['#5c7cfa', '#f06595', '#20c997', '#fab005', '#845ef7'][i]}
              emissive={['#5c7cfa', '#f06595', '#20c997', '#fab005', '#845ef7'][i]}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#f06595" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#20c997" intensity={0.5} />
        
        <AnimatedSphere />
        <Particles count={300} />
        <FloatingOrbs />
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
      </Canvas>
    </div>
  )
}
