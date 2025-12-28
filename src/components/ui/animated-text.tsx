'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedText({ text, className, delay = 0, once = true }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const words = text.split(' ')

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={cn('flex flex-wrap', className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: delay + i * 0.1,
              },
            },
          }}
          className="mr-2 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function AnimatedLetters({ text, className, delay = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const letters = text.split('')

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className={cn('inline-flex', className)}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                delay: delay + i * 0.03,
                ease: [0.215, 0.61, 0.355, 1],
              },
            },
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent',
        'animate-gradient bg-[length:200%_auto]',
        className
      )}
    >
      {children}
    </span>
  )
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 }
      case 'down':
        return { opacity: 0, y: -50 }
      case 'left':
        return { opacity: 0, x: 50 }
      case 'right':
        return { opacity: 0, x: -50 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitialPosition()}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleOnHover({
  children,
  className,
  scale = 1.05,
}: {
  children: React.ReactNode
  className?: string
  scale?: number
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('transition-transform duration-200', className)}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({
  end,
  duration = 2,
  suffix = '',
  className,
}: {
  end: number
  duration?: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const startTime = Date.now()
    const startValue = 0

    const updateCounter = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.floor(startValue + (end - startValue) * easeProgress)

      if (ref.current) {
        ref.current.textContent = current.toLocaleString() + suffix
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [isInView, end, duration, suffix])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}

export function TypeWriter({
  texts,
  className,
}: {
  texts: string[]
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeout: NodeJS.Timeout

    const type = () => {
      const currentText = texts[textIndex]

      if (isDeleting) {
        ref.current!.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
      } else {
        ref.current!.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
      }

      let delay = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentText.length) {
        delay = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        delay = 500
      }

      timeout = setTimeout(type, delay)
    }

    type()

    return () => clearTimeout(timeout)
  }, [texts])

  return (
    <span className={className}>
      <span ref={ref} />
      <span className="animate-pulse">|</span>
    </span>
  )
}
