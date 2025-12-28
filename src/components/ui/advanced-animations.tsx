'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation, useSpring, useTransform, MotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Morphing Text Animation
export function MorphingText({ words, className }: { words: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : -20,
            rotateX: index === currentIndex ? 0 : -90,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Character-by-character reveal animation
export function CharacterReveal({ 
  text, 
  className,
  delay = 0,
  staggerDelay = 0.03
}: { 
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const characters = text.split('')

  return (
    <span ref={containerRef} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Word-by-word reveal with stagger
export function WordReveal({ 
  text, 
  className,
  delay = 0,
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  const words = text.split(' ')

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Line-by-line reveal
export function LineReveal({ 
  lines, 
  className,
  delay = 0,
}: { 
  lines: string[]
  className?: string
  delay?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

// Glitch Text Effect
export function GlitchText({ text, className }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute left-0 top-0 -z-10 text-cyan-400"
            style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-3px, -2px)' }}
          >
            {text}
          </span>
          <span
            className="absolute left-0 top-0 -z-10 text-red-400"
            style={{ clipPath: 'inset(50% 0 20% 0)', transform: 'translate(3px, 2px)' }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}

// Parallax Text
export function ParallaxText({ 
  text, 
  speed = 0.5, 
  className 
}: { 
  text: string
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {text}
    </div>
  )
}

// Magnetic Button/Element
export function MagneticElement({ 
  children, 
  className,
  strength = 0.3
}: { 
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 150, damping: 15 })
  const y = useSpring(0, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Number Counter with Spring
export function SpringCounter({ 
  value, 
  className 
}: { 
  value: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 30 })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString())

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}

// Spotlight/Cursor Glow Effect
export function SpotlightCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(92, 124, 250, 0.15), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}

// Text Scramble Effect
export function TextScramble({ 
  text, 
  className 
}: { 
  text: string
  className?: string
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  )
}

// Reveal on scroll with mask
export function MaskReveal({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// 3D Tilt Card
export function TiltCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 25 })
  const y = useSpring(0, { stiffness: 200, damping: 25 })

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
