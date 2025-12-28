'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Lightbulb, 
  Sparkles, 
  Star, 
  Zap,
  ArrowUpRight,
  Quote
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Idea {
  id: number
  title: string
  question: string
  description: string
  status: 'exploring' | 'building' | 'launched'
  category: string
  icon: string
}

const ideasData: Idea[] = [
  {
    id: 1,
    title: "Emotion-Aware AI",
    question: "What if AI could understand how you feel?",
    description: "Building systems that detect and respond to human emotions in real-time, creating truly empathetic digital experiences.",
    status: 'building',
    category: 'AI/ML',
    icon: '🧠'
  },
  {
    id: 2,
    title: "Self-Healing Code",
    question: "What if bugs could fix themselves?",
    description: "Developing intelligent debugging systems that identify, diagnose, and repair code issues automatically.",
    status: 'exploring',
    category: 'Developer Tools',
    icon: '🔧'
  },
  {
    id: 3,
    title: "Predictive UX",
    question: "What if websites knew what you need before you do?",
    description: "Creating interfaces that adapt and present information based on predicted user intent.",
    status: 'launched',
    category: 'Web Development',
    icon: '✨'
  },
  {
    id: 4,
    title: "Code-to-Reality",
    question: "What if you could code the physical world?",
    description: "Bridging digital and physical through IoT and AR, making programming tangible.",
    status: 'exploring',
    category: 'Innovation',
    icon: '🌍'
  },
  {
    id: 5,
    title: "Learning by Osmosis",
    question: "What if education happened while you sleep?",
    description: "Researching passive learning techniques enhanced by AI-curated content delivery.",
    status: 'exploring',
    category: 'Education',
    icon: '📚'
  },
  {
    id: 6,
    title: "Universal Translator",
    question: "What if everyone could understand everyone?",
    description: "Not just language - translating concepts, expertise, and ideas across disciplines.",
    status: 'building',
    category: 'AI/ML',
    icon: '🌐'
  }
]

// Floating idea card with 3D effect
function IdeaCard({ idea, index }: { idea: Idea; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const statusColors = {
    exploring: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-400' },
    building: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', dot: 'bg-cyan-400' },
    launched: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer perspective-1000"
    >
      <motion.div
        className={`
          relative h-full p-8 rounded-3xl
          bg-gradient-to-br from-white/10 to-white/5
          border border-white/10 backdrop-blur-xl
          transition-all duration-500
          ${isHovered ? 'border-white/30' : ''}
        `}
        whileHover={{ scale: 1.02 }}
      >
        {/* Icon */}
        <motion.div
          className="text-6xl mb-6"
          animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {idea.icon}
        </motion.div>

        {/* Category & Status */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-wider text-gray-500">{idea.category}</span>
          <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${statusColors[idea.status].bg} ${statusColors[idea.status].text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusColors[idea.status].dot} animate-pulse`} />
            {idea.status}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {idea.question}
        </h3>

        {/* Title */}
        <p className="text-lg text-gray-400 mb-4">{idea.title}</p>

        {/* Description - appears on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-gray-500 text-sm overflow-hidden"
            >
              {idea.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Explore link */}
        <motion.div
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
      </motion.div>
    </motion.div>
  )
}

// Idea generator animation
function IdeaGenerator() {
  const [currentWord, setCurrentWord] = useState(0)
  const words = ['thinking', 'creating', 'innovating', 'solving', 'dreaming']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <span className="text-gray-400">Currently</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWord}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            {words[currentWord]}
          </motion.span>
        </AnimatePresence>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-6 h-6 text-purple-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function IdeasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current) return

    gsap.fromTo(
      headingRef.current.querySelectorAll('.word'),
      { opacity: 0, y: 50, rotateX: -45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  return (
    <section
      id="ideas"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="overflow-hidden mb-4">
            {['MY', 'MIND', 'NEVER'].map((word, i) => (
              <motion.span
                key={i}
                className="word inline-block text-5xl md:text-7xl lg:text-8xl font-black text-white mx-2"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {['STOPS', 'CREATING'].map((word, i) => (
              <motion.span
                key={i}
                className="word inline-block text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mx-2"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Quote className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-2xl md:text-3xl text-gray-400 italic">
            Ideas are my currency. Every problem I see becomes an opportunity.
            <br />
            <span className="text-white font-bold">Every limitation becomes a challenge to overcome.</span>
          </p>
        </motion.div>

        {/* Idea generator */}
        <IdeaGenerator />

        {/* Ideas grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ideasData.map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 mb-8">Have an idea that needs a problem solver?</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
          >
            <Zap className="w-5 h-5" />
            Let&apos;s Create Together
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
