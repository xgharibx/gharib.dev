'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface AuroraBackgroundProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  speed?: number
}

export function AuroraBackground({ 
  className = '', 
  intensity = 'medium',
  speed = 1 
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const opacityMap = {
    low: 0.3,
    medium: 0.5,
    high: 0.7,
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      
      {/* Aurora layers */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: opacityMap[intensity] }}
      >
        {/* Primary aurora wave */}
        <motion.div
          className="absolute -top-1/2 left-0 h-[200%] w-full"
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-5%', '5%', '-5%'],
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: 20 / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 50%, 
                  rgba(92, 124, 250, 0.4) 0%, 
                  rgba(132, 94, 247, 0.2) 30%, 
                  transparent 60%
                )
              `,
              filter: 'blur(60px)',
            }}
          />
        </motion.div>

        {/* Secondary aurora wave */}
        <motion.div
          className="absolute -top-1/2 left-0 h-[200%] w-full"
          animate={{
            x: ['10%', '-10%', '10%'],
            y: ['5%', '-5%', '5%'],
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 25 / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 70% 60%, 
                  rgba(34, 184, 207, 0.3) 0%, 
                  rgba(92, 124, 250, 0.15) 40%, 
                  transparent 70%
                )
              `,
              filter: 'blur(80px)',
            }}
          />
        </motion.div>

        {/* Tertiary aurora wave */}
        <motion.div
          className="absolute -top-1/2 left-0 h-[200%] w-full"
          animate={{
            x: ['-5%', '15%', '-5%'],
            y: ['10%', '-10%', '10%'],
            rotate: [0, 7, 0, -7, 0],
          }}
          transition={{
            duration: 30 / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(ellipse 50% 60% at 30% 40%, 
                  rgba(132, 94, 247, 0.35) 0%, 
                  rgba(255, 107, 107, 0.1) 50%, 
                  transparent 80%
                )
              `,
              filter: 'blur(100px)',
            }}
          />
        </motion.div>

        {/* Accent aurora wave */}
        <motion.div
          className="absolute -top-1/2 left-0 h-[200%] w-full"
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['-15%', '15%', '-15%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35 / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background: `
                radial-gradient(ellipse 40% 30% at 60% 70%, 
                  rgba(81, 207, 102, 0.2) 0%, 
                  rgba(34, 184, 207, 0.1) 40%, 
                  transparent 70%
                )
              `,
              filter: 'blur(70px)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
    </div>
  )
}

// Animated gradient mesh background
export function GradientMeshBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-dark-900" />
      
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Mesh gradient blobs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[100px]"
            style={{
              width: `${300 + i * 50}px`,
              height: `${300 + i * 50}px`,
              left: `${10 + i * 15}%`,
              top: `${5 + i * 10}%`,
              background: [
                'rgba(92, 124, 250, 0.4)',
                'rgba(132, 94, 247, 0.3)',
                'rgba(34, 184, 207, 0.35)',
                'rgba(255, 107, 107, 0.25)',
                'rgba(81, 207, 102, 0.3)',
                'rgba(251, 146, 60, 0.25)',
              ][i],
            }}
            animate={{
              x: [0, 50 * (i % 2 === 0 ? 1 : -1), 0],
              y: [0, 30 * (i % 2 === 0 ? -1 : 1), 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// Interactive cursor glow
export function CursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(600px at ${cursorXSpring}px ${cursorYSpring}px, rgba(92, 124, 250, 0.1), transparent 80%)`,
      }}
    />
  )
}

// Animated gradient border
export function GradientBorder({ 
  children, 
  className = '',
  borderWidth = 1,
  animated = true,
}: { 
  children: React.ReactNode
  className?: string
  borderWidth?: number
  animated?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: borderWidth,
          background: 'linear-gradient(135deg, #5c7cfa, #845ef7, #22b8cf, #5c7cfa)',
          backgroundSize: '300% 300%',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={animated ? {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        } : undefined}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {children}
    </div>
  )
}

// Spotlight effect
export function Spotlight({ className = '' }: { className?: string }) {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 150 }
  const spotlightX = useSpring(x, springConfig)
  const spotlightY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const rect = spotlightRef.current.getBoundingClientRect()
        x.set(e.clientX - rect.left)
        y.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <div ref={spotlightRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(92, 124, 250, 0.15) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
