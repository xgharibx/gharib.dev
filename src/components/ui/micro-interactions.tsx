'use client'

import { useRef, useState, useCallback, ReactNode, MouseEvent as ReactMouseEvent } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { useMotionSystem } from '@/lib/motion-system'

// ============================================================================
// MAGNETIC BUTTON - Button that attracts to cursor
// ============================================================================

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  onClick?: () => void
  href?: string
  disabled?: boolean
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 150,
  onClick,
  href,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const { reducedMotion } = useMotionSystem()
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 350, damping: 25 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  const rotateX = useTransform(springY, [-20, 20], [10, -10])
  const rotateY = useTransform(springX, [-20, 20], [-10, 10])

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (reducedMotion || disabled) return
    
    const button = buttonRef.current
    if (!button) return
    
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceFromCenter = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + 
      Math.pow(e.clientY - centerY, 2)
    )
    
    if (distanceFromCenter < radius) {
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      x.set(deltaX)
      y.set(deltaY)
    }
  }, [x, y, strength, radius, reducedMotion, disabled])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const commonProps = {
    ref: buttonRef as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    className: `relative ${className}`,
    style: {
      x: springX,
      y: springY,
      rotateX: reducedMotion ? 0 : rotateX,
      rotateY: reducedMotion ? 0 : rotateY,
    },
  }

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button disabled={disabled} {...commonProps}>
      {children}
    </motion.button>
  )
}

// ============================================================================
// HOVER CARD - Card with 3D tilt effect on hover
// ============================================================================

interface HoverCardProps {
  children: ReactNode
  className?: string
  glare?: boolean
  tiltIntensity?: number
}

export function HoverCard({
  children,
  className = '',
  glare = true,
  tiltIntensity = 15,
}: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useMotionSystem()
  const [isHovered, setIsHovered] = useState(false)
  
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  
  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    
    const card = cardRef.current
    if (!card) return
    
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    
    rotateY.set(deltaX * tiltIntensity)
    rotateX.set(-deltaY * tiltIntensity)
    
    // Glare position
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [rotateX, rotateY, glareX, glareY, tiltIntensity, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }, [rotateX, rotateY])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative ${className}`}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
      
      {/* Glare overlay */}
      {glare && isHovered && !reducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  )
}

// ============================================================================
// RIPPLE BUTTON - Material design inspired ripple effect
// ============================================================================

interface RippleButtonProps {
  children: ReactNode
  className?: string
  rippleColor?: string
  onClick?: () => void
  href?: string
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

export function RippleButton({
  children,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.5)',
  onClick,
  href,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const { reducedMotion } = useMotionSystem()

  const handleClick = useCallback((e: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!reducedMotion) {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      
      const ripple: Ripple = {
        id: Date.now(),
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      }
      
      setRipples((prev) => [...prev, ripple])
      
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 600)
    }
    
    onClick?.()
  }, [onClick, reducedMotion])

  const commonProps = {
    onClick: handleClick,
    className: `relative overflow-hidden ${className}`,
  }

  const content = (
    <>
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </>
  )

  if (href) {
    return <a href={href} {...commonProps}>{content}</a>
  }

  return <button {...commonProps}>{content}</button>
}

// ============================================================================
// GLOW BUTTON - Button with animated glow border
// ============================================================================

interface GlowButtonProps {
  children: ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
  href?: string
}

export function GlowButton({
  children,
  className = '',
  glowColor = '#00d4ff',
  onClick,
  href,
}: GlowButtonProps) {
  const { reducedMotion } = useMotionSystem()
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div className="relative">
      {/* Animated glow border */}
      <motion.div
        className="absolute -inset-[2px] rounded-full opacity-0"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, #ff00ff, ${glowColor})`,
          backgroundSize: '200% 100%',
        }}
        animate={isHovered && !reducedMotion ? {
          opacity: 1,
          backgroundPosition: ['0% 0%', '200% 0%'],
        } : { opacity: 0 }}
        transition={{
          opacity: { duration: 0.3 },
          backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
        }}
      />
      
      {/* Inner button */}
      <div className={`relative bg-black rounded-full ${className}`}>
        {children}
      </div>
    </div>
  )

  const commonProps = {
    onClick,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: 'relative inline-block',
  }

  if (href) {
    return <a href={href} {...commonProps}>{content}</a>
  }

  return <button {...commonProps}>{content}</button>
}

// ============================================================================
// MORPHING TEXT - Text that morphs between values
// ============================================================================

interface MorphingTextProps {
  texts: string[]
  interval?: number
  className?: string
}

export function MorphingText({
  texts,
  interval = 3000,
  className = '',
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { reducedMotion } = useMotionSystem()

  useCallback(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.span
        key={currentIndex}
        initial={reducedMotion ? {} : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reducedMotion ? {} : { y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="block"
      >
        {texts[currentIndex]}
      </motion.span>
    </div>
  )
}

// ============================================================================
// STAGGER REVEAL - Container that staggers children animations
// ============================================================================

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
}: StaggerRevealProps) {
  const { reducedMotion } = useMotionSystem()
  
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 30 }
      case 'down': return { y: -30 }
      case 'left': return { x: 30 }
      case 'right': return { x: -30 }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, ...getInitialPosition() },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.1 : 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}

// ============================================================================
// PARALLAX CONTAINER - Elements that move at different speeds on scroll
// ============================================================================

interface ParallaxContainerProps {
  children: ReactNode
  className?: string
  speed?: number // Positive = slower, negative = faster
  direction?: 'vertical' | 'horizontal'
}

export function ParallaxContainer({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useMotionSystem()

  const y = useMotionValue(0)
  const x = useMotionValue(0)

  useCallback(() => {
    if (reducedMotion) return

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const offset = (scrollProgress - 0.5) * 200 * speed

      if (direction === 'vertical') {
        y.set(offset)
      } else {
        x.set(offset)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [x, y, speed, direction, reducedMotion])

  const springConfig = { stiffness: 100, damping: 30 }
  const springY = useSpring(y, springConfig)
  const springX = useSpring(x, springConfig)

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        y: direction === 'vertical' ? springY : 0,
        x: direction === 'horizontal' ? springX : 0,
      }}
    >
      {children}
    </motion.div>
  )
}

export default {
  MagneticButton,
  HoverCard,
  RippleButton,
  GlowButton,
  MorphingText,
  StaggerReveal,
  ParallaxContainer,
}
