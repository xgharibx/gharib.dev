'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import { 
  CharacterReveal, 
  MorphingText, 
  MagneticElement, 
  GlitchText,
  TextScramble,
  SpotlightCard,
} from '@/components/ui/advanced-animations'
import { siteConfig, stats, personalInfo } from '@/lib/constants'
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  Code,
  Cpu,
  Globe,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Star,
  ChevronDown,
} from 'lucide-react'

// Dynamic import for 3D scene with loading state
const AdvancedScene3D = dynamic(
  () => import('@/components/three/advanced-scene'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-64 animate-pulse rounded-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 blur-3xl" />
      </div>
    ),
  }
)

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const roles = [
  'Full Stack Developer',
  'AI/ML Engineer',
  'Cloud Architect',
  'Tech Educator',
  'Startup Mentor',
  'Innovation Pioneer',
]

const techStack = [
  { icon: Code, label: 'Full Stack', color: 'from-blue-500 to-cyan-500' },
  { icon: Brain, label: 'AI/ML', color: 'from-purple-500 to-pink-500' },
  { icon: Globe, label: 'Web3', color: 'from-orange-500 to-red-500' },
  { icon: Cpu, label: 'Cloud', color: 'from-green-500 to-emerald-500' },
]

export function UltimateHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [currentRole, setCurrentRole] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Parallax for different layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!textRef.current) return

    const ctx = gsap.context(() => {
      // Floating elements animation
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      })

      // Glowing border animation
      gsap.to('.glow-border', {
        backgroundPosition: '200% center',
        duration: 3,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #101113, #1a1b1e, #101113)' }}
    >
      {/* Advanced 3D Background */}
      <AdvancedScene3D />

      {/* Animated Grid Pattern */}
      <motion.div
        style={{ y: layer1Y }}
        className="absolute inset-0 opacity-20"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(92, 124, 250, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(92, 124, 250, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `perspective(1000px) rotateX(60deg) translateY(-50%)`,
          }}
        />
      </motion.div>

      {/* Floating Orbs with Mouse Parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              background: `radial-gradient(circle, ${
                ['rgba(92, 124, 250, 0.3)', 'rgba(132, 94, 247, 0.3)', 'rgba(34, 184, 207, 0.3)', 'rgba(255, 107, 107, 0.2)', 'rgba(81, 207, 102, 0.2)'][i]
              }, transparent 70%)`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              x: mousePosition.x * (i + 1) * 0.5,
              y: mousePosition.y * (i + 1) * 0.5,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        ref={textRef}
        style={{ y, opacity, scale }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <SpotlightCard className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium text-white/80">
              Available for projects & collaborations
            </span>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </SpotlightCard>
        </motion.div>

        {/* Name with Advanced Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="font-display text-5xl font-bold text-white sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="inline-block">
              <CharacterReveal text="Amr" className="inline" delay={0.5} />
            </span>
            <span className="inline-block ml-4">
              <GlitchText 
                text="Gharib" 
                className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent"
              />
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8 h-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 text-2xl font-medium text-white/70 sm:text-3xl"
            >
              <Zap className="h-6 w-6 text-yellow-400" />
              <TextScramble text={roles[currentRole]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {techStack.map((tech, i) => (
            <MagneticElement key={tech.label} strength={0.2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`float-element flex items-center gap-2 rounded-full bg-gradient-to-r ${tech.color} p-[1px]`}
              >
                <div className="flex items-center gap-2 rounded-full bg-dark-800/90 px-5 py-2 backdrop-blur-sm">
                  <tech.icon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">{tech.label}</span>
                </div>
              </motion.div>
            </MagneticElement>
          ))}
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {[
            { value: `${personalInfo.yearsOfExperience}+`, label: 'Years Experience' },
            { value: '500+', label: 'Projects' },
            { value: '10K+', label: 'Students' },
            { value: '50+', label: 'Countries' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticElement strength={0.15}>
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-primary-500/30 transition-all hover:shadow-primary-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </MagneticElement>

          <MagneticElement strength={0.15}>
            <Link
              href="/portfolio"
              className="group relative overflow-hidden rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                View My Work
              </span>
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-12 flex items-center gap-6"
        >
          {[
            { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
            { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
            { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
            { icon: Mail, href: `mailto:${siteConfig.email}`, label: 'Email' },
          ].map((social) => (
            <MagneticElement key={social.label} strength={0.3}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
              </a>
            </MagneticElement>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute left-8 top-32 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="h-32 w-32 rounded-full border border-dashed border-white/10"
        />
      </div>
      <div className="absolute right-8 bottom-32 hidden lg:block">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="h-24 w-24 rounded-full border border-dashed border-white/10"
        />
      </div>
    </section>
  )
}
