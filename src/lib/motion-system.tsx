'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ============================================================================
// EASING TOKENS - Cinematic motion language
// ============================================================================

export const easings = {
  // Smooth, cinematic defaults
  smooth: 'power2.inOut',
  smoothOut: 'power2.out',
  smoothIn: 'power2.in',
  
  // Dramatic, impactful
  dramatic: 'power4.out',
  dramaticIn: 'power4.in',
  dramaticInOut: 'power4.inOut',
  
  // Elastic, playful
  bounce: 'elastic.out(1, 0.5)',
  bounceSubtle: 'elastic.out(1, 0.75)',
  
  // Snappy, responsive
  snap: 'back.out(1.7)',
  snapIn: 'back.in(1.7)',
  
  // Expo for extreme
  expo: 'expo.out',
  expoIn: 'expo.in',
  expoInOut: 'expo.inOut',
  
  // Custom cubic beziers
  cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
  reveal: 'cubic-bezier(0.77, 0, 0.175, 1)',
  
  // Physics-based
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  springGentle: { type: 'spring', stiffness: 150, damping: 20 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
} as const

// ============================================================================
// DURATION TOKENS - Consistent timing
// ============================================================================

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
  dramatic: 1.2,
  cinematic: 1.6,
  epic: 2.4,
} as const

// ============================================================================
// MOTION CONTEXT - Global motion state
// ============================================================================

interface MotionContextValue {
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  motionIntensity: 'low' | 'medium' | 'high'
  setMotionIntensity: (value: 'low' | 'medium' | 'high') => void
  debugMode: boolean
  setDebugMode: (value: boolean) => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotionState] = useState(false)
  const [motionIntensity, setMotionIntensity] = useState<'low' | 'medium' | 'high'>('high')
  const [debugMode, setDebugMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Check system preference on mount
  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotionState(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotionState(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    // Check for saved preference
    const saved = localStorage.getItem('motion-preference')
    if (saved) {
      setReducedMotionState(saved === 'reduced')
    }

    // Check for debug mode in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setDebugMode(params.has('debug'))
    }

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value)
    localStorage.setItem('motion-preference', value ? 'reduced' : 'full')
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <MotionContext.Provider
      value={{
        reducedMotion,
        setReducedMotion,
        motionIntensity,
        setMotionIntensity,
        debugMode,
        setDebugMode,
      }}
    >
      {children}
    </MotionContext.Provider>
  )
}

export function useMotionSystem() {
  const context = useContext(MotionContext)
  
  // Return default values if used outside provider (for SSR safety)
  if (!context) {
    return {
      reducedMotion: false,
      setReducedMotion: () => {},
      motionIntensity: 'high' as const,
      setMotionIntensity: () => {},
      debugMode: false,
      setDebugMode: () => {},
    }
  }
  
  return context
}

// ============================================================================
// MOTION UTILITIES - Adaptive animation helpers
// ============================================================================

export function useAdaptiveAnimation() {
  const { reducedMotion, motionIntensity } = useMotionSystem()

  const getIntensityMultiplier = useCallback(() => {
    switch (motionIntensity) {
      case 'low': return 0.3
      case 'medium': return 0.6
      case 'high': return 1
    }
  }, [motionIntensity])

  const animate = useCallback((
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    options?: { skipReducedMotion?: boolean }
  ) => {
    if (reducedMotion && !options?.skipReducedMotion) {
      // Instant transition for reduced motion
      return gsap.set(target, {
        ...vars,
        duration: 0,
        ease: 'none',
      })
    }

    const multiplier = getIntensityMultiplier()
    const duration = typeof vars.duration === 'number' 
      ? vars.duration * (1 / multiplier) 
      : vars.duration

    return gsap.to(target, {
      ...vars,
      duration,
    })
  }, [reducedMotion, getIntensityMultiplier])

  const timeline = useCallback((vars?: gsap.TimelineVars) => {
    if (reducedMotion) {
      return gsap.timeline({ ...vars, paused: true })
    }
    return gsap.timeline(vars)
  }, [reducedMotion])

  return { animate, timeline, reducedMotion, motionIntensity }
}

// ============================================================================
// SCROLL CHOREOGRAPHY - Scroll-triggered animations
// ============================================================================

export interface ScrollSequence {
  id: string
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean | string
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  animation?: gsap.core.Timeline
}

export function useScrollChoreography() {
  const { reducedMotion, debugMode } = useMotionSystem()

  const createScrollSequence = useCallback((sequence: ScrollSequence) => {
    if (reducedMotion) {
      // For reduced motion, just trigger callbacks without animation
      return ScrollTrigger.create({
        trigger: sequence.trigger,
        start: sequence.start || 'top center',
        end: sequence.end || 'bottom center',
        onEnter: sequence.onEnter,
        onLeave: sequence.onLeave,
        onEnterBack: sequence.onEnterBack,
        onLeaveBack: sequence.onLeaveBack,
        markers: debugMode,
      })
    }

    return ScrollTrigger.create({
      trigger: sequence.trigger,
      start: sequence.start || 'top center',
      end: sequence.end || 'bottom center',
      scrub: sequence.scrub ?? 1,
      pin: sequence.pin,
      markers: debugMode || sequence.markers,
      animation: sequence.animation,
      onEnter: sequence.onEnter,
      onLeave: sequence.onLeave,
      onEnterBack: sequence.onEnterBack,
      onLeaveBack: sequence.onLeaveBack,
    })
  }, [reducedMotion, debugMode])

  return { createScrollSequence }
}

// ============================================================================
// PAGE TRANSITION SYSTEM
// ============================================================================

export interface PageTransition {
  type: 'fade' | 'slide' | 'scale' | 'wipe' | 'morph'
  duration?: number
  ease?: string
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function usePageTransition() {
  const { reducedMotion } = useMotionSystem()

  const getTransitionVariants = useCallback((transition: PageTransition) => {
    if (reducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 },
      }
    }

    const duration = transition.duration ?? durations.normal
    const ease = transition.ease ?? easings.smooth

    switch (transition.type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration, ease },
        }
      case 'slide':
        const slideOffset = transition.direction === 'up' || transition.direction === 'down' 
          ? { y: transition.direction === 'up' ? 100 : -100 }
          : { x: transition.direction === 'left' ? 100 : -100 }
        return {
          initial: { opacity: 0, ...slideOffset },
          animate: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, ...slideOffset },
          transition: { duration, ease },
        }
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 },
          transition: { duration, ease },
        }
      case 'wipe':
        return {
          initial: { clipPath: 'inset(0 100% 0 0)' },
          animate: { clipPath: 'inset(0 0% 0 0)' },
          exit: { clipPath: 'inset(0 0 0 100%)' },
          transition: { duration: duration * 1.5, ease: easings.expo },
        }
      case 'morph':
        return {
          initial: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
          animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, scale: 1.2, filter: 'blur(20px)' },
          transition: { duration, ease },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration },
        }
    }
  }, [reducedMotion])

  return { getTransitionVariants }
}

// ============================================================================
// MAGNETIC BUTTON PHYSICS
// ============================================================================

export function useMagneticEffect(strength: number = 0.5) {
  const { reducedMotion } = useMotionSystem()

  const handleMouseMove = useCallback((
    e: React.MouseEvent<HTMLElement>,
    element: HTMLElement
  ) => {
    if (reducedMotion) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: easings.smoothOut,
    })
  }, [reducedMotion, strength])

  const handleMouseLeave = useCallback((element: HTMLElement) => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: easings.bounce,
    })
  }, [])

  return { handleMouseMove, handleMouseLeave }
}

// ============================================================================
// MOTION TOGGLE UI COMPONENT
// ============================================================================

export function MotionToggle({ className = '' }: { className?: string }) {
  const { reducedMotion, setReducedMotion, motionIntensity, setMotionIntensity } = useMotionSystem()

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={() => setReducedMotion(!reducedMotion)}
        className={`
          relative px-4 py-2 rounded-full text-sm font-medium
          transition-all duration-300 overflow-hidden
          ${reducedMotion 
            ? 'bg-gray-800 text-gray-400' 
            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
          }
        `}
        aria-label={reducedMotion ? 'Enable motion' : 'Disable motion'}
      >
        <span className="relative z-10">
          Motion: {reducedMotion ? 'Off' : 'On'}
        </span>
        {!reducedMotion && (
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </button>

      {!reducedMotion && (
        <div className="flex items-center gap-2">
          {(['low', 'medium', 'high'] as const).map((intensity) => (
            <button
              key={intensity}
              onClick={() => setMotionIntensity(intensity)}
              className={`
                w-8 h-8 rounded-full text-xs font-bold
                transition-all duration-200
                ${motionIntensity === intensity
                  ? 'bg-cyan-500 text-white scale-110'
                  : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                }
              `}
              aria-label={`Set motion intensity to ${intensity}`}
            >
              {intensity[0].toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// PERFORMANCE MONITOR (Debug Only)
// ============================================================================

export function PerformanceMonitor() {
  const { debugMode } = useMotionSystem()
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState<number | null>(null)

  useEffect(() => {
    if (!debugMode) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const updateStats = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round(frameCount / ((currentTime - lastTime) / 1000)))
        frameCount = 0
        lastTime = currentTime

        // Memory info (Chrome only)
        if ((performance as any).memory) {
          setMemory(Math.round((performance as any).memory.usedJSHeapSize / 1048576))
        }
      }

      animationId = requestAnimationFrame(updateStats)
    }

    animationId = requestAnimationFrame(updateStats)
    return () => cancelAnimationFrame(animationId)
  }, [debugMode])

  if (!debugMode) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 backdrop-blur-sm rounded-lg p-3 font-mono text-xs text-white border border-cyan-500/30">
      <div className="flex items-center gap-3">
        <div className={`${fps < 30 ? 'text-red-500' : fps < 55 ? 'text-yellow-500' : 'text-green-500'}`}>
          {fps} FPS
        </div>
        {memory && (
          <div className="text-purple-400">
            {memory} MB
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// PERFORMANCE BUDGET
// ============================================================================

export const performanceBudget = {
  // Initial load
  initialBundle: '200KB', // JS bundle size
  firstContentfulPaint: '1.5s',
  largestContentfulPaint: '2.5s',
  timeToInteractive: '3.5s',
  
  // Runtime
  targetFPS: 60,
  minAcceptableFPS: 30,
  maxJSExecutionTime: '50ms', // Per frame
  
  // GPU
  maxShaderComplexity: 'medium',
  maxParticleCount: 5000,
  maxDrawCalls: 100,
  
  // Network
  maxImageSize: '200KB',
  lazyLoadThreshold: '200px',
  
  // Checklist
  checklist: [
    '✓ Code splitting with dynamic imports',
    '✓ GPU scenes lazy-loaded',
    '✓ Reduced motion support',
    '✓ Image optimization',
    '✓ Font subsetting',
    '✓ Preconnect to CDNs',
    '✓ Service worker caching',
    '✓ Bundle analysis',
  ]
}

export default {
  easings,
  durations,
  performanceBudget,
}
