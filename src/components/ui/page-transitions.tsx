'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { useMotionSystem, easings, durations } from '@/lib/motion-system'

interface PageTransitionProps {
  children: ReactNode
}

// Custom ease function
const customEase = [0.22, 1, 0.36, 1] as const

// Page transition overlay variants
const overlayVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: durations.normal,
      ease: customEase as unknown as [number, number, number, number],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      duration: durations.normal,
      ease: customEase as unknown as [number, number, number, number],
      delay: durations.fast,
    },
  },
}

// Page content variants
const contentVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.slow,
      ease: [0.22, 1, 0.36, 1],
      delay: durations.fast,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: {
      duration: durations.fast,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Reduced motion variants
const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { reducedMotion } = useMotionSystem()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const variants = reducedMotion ? reducedMotionVariants : contentVariants

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Wipe transition - more dramatic page transitions
export function WipeTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { reducedMotion } = useMotionSystem()
  const [showOverlay, setShowOverlay] = useState(false)

  if (reducedMotion) {
    return <PageTransition>{children}</PageTransition>
  }

  return (
    <>
      {/* Transition overlays */}
      <AnimatePresence>
        {showOverlay && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998] bg-gradient-to-r from-cyan-500 to-purple-500 origin-bottom"
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
            <motion.div
              className="fixed inset-0 z-[9999] bg-black origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1, transition: { duration: durations.normal, delay: 0.1, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ scaleY: 0, transition: { duration: durations.normal, ease: [0.22, 1, 0.36, 1] } }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: durations.fast, delay: durations.normal } }}
          exit={{ opacity: 0, transition: { duration: durations.instant } }}
          onAnimationStart={() => setShowOverlay(true)}
          onAnimationComplete={() => setShowOverlay(false)}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// Morph transition - smooth morphing effect
export function MorphTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { reducedMotion } = useMotionSystem()

  const morphVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      borderRadius: '50%',
      clipPath: 'circle(0% at 50% 50%)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      borderRadius: '0%',
      clipPath: 'circle(150% at 50% 50%)',
      transition: {
        duration: durations.cinematic,
        ease: 'easeOut' as const,
        clipPath: { duration: durations.dramatic },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      clipPath: 'circle(0% at 50% 50%)',
      transition: {
        duration: durations.slow,
        ease: 'easeOut' as const,
      },
    },
  }

  if (reducedMotion) {
    return <PageTransition>{children}</PageTransition>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={morphVariants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Slide transition - horizontal slide effect
interface SlideTransitionProps extends PageTransitionProps {
  direction?: 'left' | 'right'
}

export function SlideTransition({ children, direction = 'right' }: SlideTransitionProps) {
  const pathname = usePathname()
  const { reducedMotion } = useMotionSystem()

  const offset = direction === 'right' ? 100 : -100

  const slideVariants = {
    initial: {
      opacity: 0,
      x: offset,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.slow,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      x: -offset,
      transition: {
        duration: durations.normal,
        ease: 'easeOut' as const,
      },
    },
  }

  if (reducedMotion) {
    return <PageTransition>{children}</PageTransition>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Stairs transition - staggered reveal effect
export function StairsTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { reducedMotion } = useMotionSystem()
  const [showStairs, setShowStairs] = useState(false)

  const stairCount = 5

  if (reducedMotion) {
    return <PageTransition>{children}</PageTransition>
  }

  return (
    <>
      {/* Stairs overlay */}
      <AnimatePresence>
        {showStairs && (
          <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
            {Array.from({ length: stairCount }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: 1,
                  transition: { 
                    duration: 0.4,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{ 
                  scaleX: 0,
                  transition: { 
                    duration: 0.3,
                    delay: (stairCount - i - 1) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1, 
            transition: { 
              duration: 0.3,
              delay: stairCount * 0.08 + 0.2,
            },
          }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          onAnimationStart={() => setShowStairs(true)}
          onAnimationComplete={() => setTimeout(() => setShowStairs(false), 500)}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default {
  PageTransition,
  WipeTransition,
  MorphTransition,
  SlideTransition,
  StairsTransition,
}
