'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Lightbulb, 
  Puzzle, 
  Target, 
  Zap, 
  Brain, 
  Rocket,
  Eye,
  Cpu,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Problem {
  id: number
  problem: string
  insight: string
  solution: string
  impact: string
  icon: React.ReactNode
  color: string
}

const problemsData: Problem[] = [
  {
    id: 1,
    problem: "Businesses lose 67% of customers due to poor digital experiences",
    insight: "I noticed most websites treat users like data points, not humans",
    solution: "Created AI-powered experience engines that predict and adapt",
    impact: "300% increase in user retention",
    icon: <Eye className="w-8 h-8" />,
    color: "#00d4ff"
  },
  {
    id: 2,
    problem: "Developers spend 40% of time on repetitive tasks",
    insight: "Every minute wasted is an idea left unexplored",
    solution: "Built intelligent automation frameworks that learn and evolve",
    impact: "10,000+ hours saved",
    icon: <Cpu className="w-8 h-8" />,
    color: "#ff00ff"
  },
  {
    id: 3,
    problem: "Data overwhelms decision-makers",
    insight: "Information is useless without understanding",
    solution: "Designed ML dashboards that translate data into actionable insights",
    impact: "50% faster decision making",
    icon: <Brain className="w-8 h-8" />,
    color: "#00ff88"
  },
  {
    id: 4,
    problem: "Ideas die in the gap between vision and execution",
    insight: "The best idea is worthless without rapid prototyping",
    solution: "Developed rapid MVP frameworks that go from idea to product in days",
    impact: "100+ products launched",
    icon: <Rocket className="w-8 h-8" />,
    color: "#ffaa00"
  },
  {
    id: 5,
    problem: "Teams struggle with complex technical challenges",
    insight: "Complex problems need creative solutions, not more complexity",
    solution: "Created training programs that teach thinking, not just coding",
    impact: "1000+ students mentored",
    icon: <Sparkles className="w-8 h-8" />,
    color: "#ff5555"
  }
]

// Animated counter component
function AnimatedNumber({ value, suffix = '' }: { value: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const numValue = typeof value === 'string' ? parseInt(value.replace(/\D/g, '')) : value
    if (isNaN(numValue)) return

    let start = 0
    const duration = 2000
    const increment = numValue / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numValue) {
        setDisplayed(numValue)
        clearInterval(timer)
      } else {
        setDisplayed(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return <span ref={ref}>{displayed}{suffix}</span>
}

// Problem card with reveal animation
function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group perspective-1000"
    >
      <motion.div
        className={`
          relative p-8 rounded-3xl cursor-pointer
          bg-gradient-to-br from-gray-900/80 to-black/80
          border border-white/10 backdrop-blur-xl
          hover:border-white/30 transition-all duration-500
          ${isExpanded ? 'scale-105' : ''}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        style={{
          boxShadow: isExpanded 
            ? `0 0 60px ${problem.color}30, 0 0 120px ${problem.color}10`
            : '0 20px 60px rgba(0,0,0,0.5)'
        }}
      >
        {/* Icon */}
        <motion.div
          className="absolute -top-6 -left-6 p-4 rounded-2xl"
          style={{ backgroundColor: problem.color }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {problem.icon}
        </motion.div>

        {/* Content */}
        <div className="ml-8">
          {/* Problem */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-red-400 font-bold">The Problem</span>
            <p className="text-xl font-bold text-white/90 mt-2 line-through decoration-red-500/50">
              {problem.problem}
            </p>
          </div>

          {/* Insight */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">My Insight</span>
                <p className="text-lg text-yellow-200/80 mt-2 italic">
                  &ldquo;{problem.insight}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Solution */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: problem.color }}>
              My Solution
            </span>
            <p className="text-xl font-bold text-white mt-2">
              {problem.solution}
            </p>
          </div>

          {/* Impact */}
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">{problem.impact}</span>
          </div>
        </div>

        {/* Expand indicator */}
        <motion.div
          className="absolute bottom-4 right-4 text-white/30"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          style={{ backgroundColor: problem.color, transform: 'scale(1.1)' }}
        />
      </motion.div>
    </motion.div>
  )
}

export function ProblemsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  useEffect(() => {
    if (!headingRef.current) return

    // Split text animation
    const chars = headingRef.current.querySelectorAll('.char')
    gsap.fromTo(chars, 
      { opacity: 0, y: 100, rotateX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'back.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  // Split heading into characters
  const heading = "I SEE PROBLEMS"
  const subheading = "OTHERS MISS"

  return (
    <section
      id="problems"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-black overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Floating elements - using deterministic positions based on index */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          style={{ opacity, y }}
          className="text-center mb-20"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {heading.split('').map((char, i) => (
              <span
                key={i}
                className="char inline-block text-5xl md:text-7xl lg:text-8xl font-black text-white"
                style={{ perspective: '1000px' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {subheading.split('').map((char, i) => (
              <span
                key={i}
                className="char inline-block text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                style={{ perspective: '1000px' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Where others see features to build, I see problems to solve.
            <br />
            <span className="text-cyan-400">Here&apos;s how I think differently.</span>
          </motion.p>
        </motion.div>

        {/* Problems grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problemsData.map((problem, index) => (
            <ProblemCard key={problem.id} problem={problem} index={index} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: 18, suffix: '+', label: 'Years Solving', color: '#00d4ff' },
            { value: 100, suffix: '+', label: 'Problems Solved', color: '#ff00ff' },
            { value: 1000, suffix: '+', label: 'Students Mentored', color: '#00ff88' },
            { value: '∞', suffix: '', label: 'Ideas Created', color: '#ffaa00' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              whileHover={{ scale: 1.05, borderColor: stat.color }}
            >
              <p 
                className="text-4xl md:text-5xl font-black mb-2"
                style={{ color: stat.color }}
              >
                {typeof stat.value === 'number' ? (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
