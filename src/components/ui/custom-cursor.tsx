'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointing, setIsPointing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    const handlePointerElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer'
      )

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsPointing(true))
        el.addEventListener('mouseleave', () => setIsPointing(false))
      })
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Initial check and mutation observer for dynamic elements
    handlePointerElements()
    const observer = new MutationObserver(handlePointerElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', checkMobile)
      observer.disconnect()
    }
  }, [])

  if (isMobile) return null

  return (
    <AnimatePresence>
      {!isHidden && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
            animate={{
              x: mousePosition.x - 6,
              y: mousePosition.y - 6,
              scale: isPointing ? 1.5 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          >
            <div className="h-3 w-3 rounded-full bg-white" />
          </motion.div>

          {/* Cursor ring */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9998]"
            animate={{
              x: mousePosition.x - 20,
              y: mousePosition.y - 20,
              scale: isPointing ? 1.5 : 1,
              opacity: isPointing ? 0.5 : 0.3,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
          >
            <div className="h-10 w-10 rounded-full border-2 border-primary-500 dark:border-primary-400" />
          </motion.div>

          {/* Cursor glow */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9997]"
            animate={{
              x: mousePosition.x - 100,
              y: mousePosition.y - 100,
            }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 20,
            }}
          >
            <div className="h-[200px] w-[200px] rounded-full bg-gradient-radial from-primary-500/10 via-primary-500/5 to-transparent blur-xl" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
