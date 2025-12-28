'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import { useMotionSystem, MotionToggle } from '@/lib/motion-system'

// Define the props type for the 3D scene
interface CosmicRealitySceneProps {
  mousePosition: { x: number; y: number }
  scrollProgress?: number
  intensity?: number
  reducedMotion?: boolean
  className?: string
}

// Dynamic 3D import with optimized loading
const CosmicRealityScene = dynamic<CosmicRealitySceneProps>(
  () => import('../three/cosmic-reality-scene').then(mod => mod.CosmicRealityScene),
  { 
    ssr: false, 
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000510] to-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-ping absolute" />
          <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="absolute bottom-20 text-center">
          <p className="text-cyan-400/60 text-sm tracking-widest uppercase animate-pulse">Initializing Reality</p>
        </div>
      </div>
    )
  }
) as React.ComponentType<CosmicRealitySceneProps>

gsap.registerPlugin(ScrollTrigger)

// World problems that lead to meeting Amr Gharib
const worldProblems = [
  { 
    problem: "Businesses are bleeding customers", 
    statistic: "67% lost to poor digital experiences",
    solution: "I build experiences that make people stay" 
  },
  { 
    problem: "Technology moves too fast for most", 
    statistic: "80% of companies can't keep up",
    solution: "I bridge the gap between vision and reality" 
  },
  { 
    problem: "Great ideas die in execution", 
    statistic: "90% of startups fail due to tech",
    solution: "I turn impossible ideas into inevitable success" 
  },
  { 
    problem: "AI is changing everything", 
    statistic: "Companies without AI will disappear",
    solution: "I make AI work for humans, not against them" 
  },
  { 
    problem: "The digital world is broken", 
    statistic: "95% of apps frustrate their users",
    solution: "I create digital experiences that feel magical" 
  },
]

export function ViralHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [currentProblem, setCurrentProblem] = useState(0)
  const [phase, setPhase] = useState<'darkness' | 'problems' | 'hope' | 'reveal' | 'mission' | 'impact'>('darkness')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  
  // Motion system integration
  const { reducedMotion } = useMotionSystem()
  
  // Scroll progress for background effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const [scrollValue, setScrollValue] = useState(0)
  
  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latest) => {
      setScrollValue(latest)
    })
    return () => unsubscribe()
  }, [scrollProgress])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  // Track mouse for interactive effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e
    setMousePosition({ x: clientX, y: clientY })
    mouseX.set(clientX)
    mouseY.set(clientY)
  }, [mouseX, mouseY])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Typewriter effect
  useEffect(() => {
    if (phase !== 'darkness') return
    
    const text = "The world has problems..."
    let index = 0
    setTypewriterText('')
    
    const interval = setInterval(() => {
      if (index <= text.length) {
        setTypewriterText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 80)
    
    return () => clearInterval(interval)
  }, [phase])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Epic narrative sequence
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    
    // Phase transitions - dramatic storytelling
    timeouts.push(setTimeout(() => setPhase('problems'), 3500))    // Show world problems
    timeouts.push(setTimeout(() => setPhase('hope'), 12000))       // Transition to hope
    timeouts.push(setTimeout(() => setPhase('reveal'), 15000))     // Reveal the name
    timeouts.push(setTimeout(() => setPhase('mission'), 20000))    // Show mission
    timeouts.push(setTimeout(() => setPhase('impact'), 26000))     // Show impact

    return () => {
      timeouts.forEach(t => clearTimeout(t))
    }
  }, [])

  // Cycle through problems
  useEffect(() => {
    if (phase !== 'problems') return
    const interval = setInterval(() => {
      setCurrentProblem(prev => (prev + 1) % worldProblems.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [phase])

  // Glitch text effect
  const GlitchText = ({ children, className = '' }: { children: string, className?: string }) => {
    return (
      <span className={`relative inline-block ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 text-cyan-400 opacity-70 animate-glitch-1" aria-hidden>
          {children}
        </span>
        <span className="absolute inset-0 text-red-400 opacity-70 animate-glitch-2" aria-hidden>
          {children}
        </span>
      </span>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] overflow-hidden"
      style={{ background: 'transparent' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mind-blowing 3D Background */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <CosmicRealityScene 
          mousePosition={mousePosition} 
          scrollProgress={scrollValue}
          intensity={phase === 'darkness' || phase === 'problems' ? 0.3 : 1}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Motion Toggle */}
      <div className="fixed top-24 right-4 z-50">
        <MotionToggle className="opacity-50 hover:opacity-100 transition-opacity" />
      </div>

      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-15 mix-blend-overlay" style={{ zIndex: 20 }}>
        <div className="absolute inset-0 bg-noise animate-grain" />
      </div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-vignette" style={{ zIndex: 20 }} />

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center" style={{ zIndex: 30 }}>
        <div ref={textRef} className="text-center px-6 md:px-12 py-12 max-w-7xl">
          <AnimatePresence mode="wait">
            
            {/* PHASE 1: The world has problems - Typewriter */}
            {phase === 'darkness' && (
              <motion.div
                key="darkness"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <motion.div
                  className="relative"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white/80 tracking-tight">
                    {typewriterText}
                    <span className={`inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                  </h1>
                </motion.div>
              </motion.div>
            )}

            {/* PHASE 2: World Problems Showcase */}
            {phase === 'problems' && (
              <motion.div
                key="problems"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <motion.p
                  className="text-lg md:text-xl text-red-400/80 tracking-[0.3em] uppercase font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  THE WORLD IS BROKEN
                </motion.p>

                <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProblem}
                      initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -100, opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                      {/* The Problem */}
                      <p className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                        {worldProblems[currentProblem].problem}
                      </p>
                      
                      {/* The Statistic */}
                      <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-red-400 font-bold mb-6"
                      >
                        {worldProblems[currentProblem].statistic}
                      </motion.p>
                      
                      {/* The Hope (teaser) */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl text-cyan-400/60 italic"
                      >
                        But what if there was someone who could change that?
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Problem indicators */}
                <div className="flex justify-center gap-2">
                  {worldProblems.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === currentProblem ? 'w-8 bg-red-400' : 'w-2 bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* PHASE 3: Hope - Transition */}
            {phase === 'hope' && (
              <motion.div
                key="hope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 1, type: 'spring' }}
                className="space-y-6"
              >
                <motion.p
                  className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-400"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  Every problem has a solution.
                </motion.p>
                <motion.p
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Every challenge needs a <span className="text-cyan-400">problem solver</span>.
                </motion.p>
                <motion.p
                  className="text-xl md:text-2xl text-gray-500 tracking-[0.5em] uppercase mt-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Meet
                </motion.p>
              </motion.div>
            )}

            {/* PHASE 4: The Grand Reveal - AMR GHARIB */}
            {phase === 'reveal' && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.h1
                  className="text-7xl md:text-9xl lg:text-[14rem] font-black tracking-tighter leading-none"
                  initial={{ scale: 3, opacity: 0, filter: 'blur(30px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
                >
                  <GlitchText className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent block">
                    AMR
                  </GlitchText>
                  <motion.span 
                    className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block"
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                  >
                    GHARIB
                  </motion.span>
                </motion.h1>
                
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-400 tracking-widest uppercase"
                >
                  <span className="px-4 py-2 border border-cyan-400/30 rounded-full hover:border-cyan-400 transition-colors">Problem Solver</span>
                  <span className="px-4 py-2 border border-purple-400/30 rounded-full hover:border-purple-400 transition-colors">Idea Creator</span>
                  <span className="px-4 py-2 border border-pink-400/30 rounded-full hover:border-pink-400 transition-colors">Future Builder</span>
                </motion.div>
              </motion.div>
            )}

            {/* PHASE 5: Mission Statement */}
            {phase === 'mission' && (
              <motion.div
                key="mission"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <motion.div
                  className="relative"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 1 }}
                >
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
                    <span className="block text-white/30 line-through decoration-red-500/50">Just a Developer</span>
                    <span className="block text-white/30 line-through decoration-red-500/50">Just a Designer</span>
                    <motion.span
                      className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6, type: 'spring' }}
                    >
                      A PROBLEM SOLVER
                    </motion.span>
                  </h2>
                </motion.div>
                
                <motion.p
                  className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  I see the problems <span className="text-red-400">others overlook</span>.
                  <br />
                  I find solutions <span className="text-cyan-400">others can&apos;t imagine</span>.
                  <br />
                  I build futures <span className="text-emerald-400">others only dream about</span>.
                </motion.p>
              </motion.div>
            )}

            {/* PHASE 6: Impact & CTA */}
            {phase === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                {/* Impact stats */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                >
                  {[
                    { number: '18+', label: 'Years of Solving', color: 'text-cyan-400' },
                    { number: '100+', label: 'Problems Crushed', color: 'text-purple-400' },
                    { number: '10K+', label: 'Minds Mentored', color: 'text-pink-400' },
                    { number: '∞', label: 'Ideas Created', color: 'text-emerald-400' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                      className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all hover:scale-105"
                    >
                      <p className={`text-4xl md:text-5xl font-black ${stat.color}`}>{stat.number}</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mt-2">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl text-gray-300 italic"
                >
                  &ldquo;The world has problems. <span className="text-cyan-400 not-italic font-bold">I have solutions.</span>&rdquo;
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                  <motion.a
                    href="#problems"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-12 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden shadow-2xl shadow-white/20"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors">See How I Solve Problems</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 border-2 border-white/30 text-white font-bold text-lg rounded-full hover:border-cyan-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 transition-all"
                  >
                    Let&apos;s Create Together
                  </motion.a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'impact' ? 1 : 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-sm tracking-widest uppercase">Discover the Journey</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Interactive cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed w-10 h-10 border border-white/50 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
      />
    </section>
  )
}
