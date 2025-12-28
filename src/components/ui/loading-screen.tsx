'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
  minDuration?: number
}

export function LoadingScreen({ onComplete, minDuration = 2500 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading')
  const [loadingText, setLoadingText] = useState('Initializing')
  const startTime = useRef(Date.now())

  const loadingPhrases = [
    'Initializing Reality',
    'Loading Dimensions',
    'Rendering Universe',
    'Calibrating Experience',
    'Preparing Magic',
    'Almost There',
  ]

  useEffect(() => {
    let frameId: number
    let textInterval: NodeJS.Timeout

    // Update loading text
    textInterval = setInterval(() => {
      setLoadingText(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)])
    }, 500)

    // Smooth progress animation
    const animate = () => {
      const elapsed = Date.now() - startTime.current
      const targetProgress = Math.min(100, (elapsed / minDuration) * 100)
      
      setProgress(prev => {
        const diff = targetProgress - prev
        return prev + diff * 0.1
      })

      if (targetProgress < 100) {
        frameId = requestAnimationFrame(animate)
      } else {
        setPhase('complete')
        setTimeout(() => {
          setPhase('exit')
          setTimeout(() => {
            onComplete?.()
          }, 800)
        }, 500)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      clearInterval(textInterval)
    }
  }, [minDuration, onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#000005' }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Glowing orb */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Outer glow rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border border-cyan-400/30"
                style={{
                  width: 80 + ring * 30,
                  height: 80 + ring * 30,
                  left: -(ring * 15),
                  top: -(ring * 15),
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: ring * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Core orb */}
            <motion.div
              className="relative w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, #00d4ff 0%, #0066ff 50%, #000033 100%)',
                boxShadow: '0 0 60px #00d4ff, 0 0 100px #00d4ff50, inset 0 0 30px #ffffff30',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Inner shine */}
              <motion.div
                className="absolute top-2 left-3 w-4 h-4 rounded-full bg-white/60 blur-sm"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                AMR
              </span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                GHARIB
              </span>
            </h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative h-1 bg-gray-800 rounded-full overflow-hidden mb-4"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-200, 200] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 text-sm tracking-widest uppercase"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {phase === 'complete' ? 'Welcome' : loadingText}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          {/* Progress percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 text-xs mt-2 font-mono"
          >
            {Math.floor(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
