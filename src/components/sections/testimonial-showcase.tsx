'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Quote, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating: number
  projectType: string
  video?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "TechStart AI",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    quote: "Amr didn't just solve our problem - he showed us we were solving the wrong problem. His approach completely transformed our product roadmap.",
    rating: 5,
    projectType: "AI Platform",
    video: true
  },
  {
    id: 2,
    name: "Michael Foster",
    role: "CTO",
    company: "DataFlow Systems",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    quote: "The system he built processes 10x more data than we expected, at half the cost. His problem-solving skills are unmatched.",
    rating: 5,
    projectType: "Data Pipeline"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Product Manager",
    company: "FinanceHub",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    quote: "He saw user experience issues we'd been blind to for years. Our customer satisfaction scores jumped 40% after his redesign.",
    rating: 5,
    projectType: "UX Overhaul"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder",
    company: "EduTech Pro",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    quote: "His teaching approach is unlike anything I've seen. My entire team went from beginners to confident developers in 3 months.",
    rating: 5,
    projectType: "Team Training"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Director of Engineering",
    company: "CloudScale",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    quote: "What impressed me most was how he anticipated problems before they happened. He saved us months of potential issues.",
    rating: 5,
    projectType: "Architecture"
  }
]

// Testimonial card with 3D tilt
function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl ${
        isActive ? 'z-10' : 'pointer-events-none'
      }`}
    >
      {/* Quote icon */}
      <Quote className="absolute top-8 right-8 w-12 h-12 text-cyan-400/20" />

      {/* Rating stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
          {testimonial.video && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
          <p className="text-gray-400">{testimonial.role} at {testimonial.company}</p>
        </div>
        <div className="ml-auto hidden md:block">
          <span className="px-4 py-2 rounded-full bg-cyan-400/10 text-cyan-400 text-sm font-medium">
            {testimonial.projectType}
          </span>
        </div>
      </div>

      {/* Gradient border effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}

export function TestimonialShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  // Auto-advance
  useEffect(() => {
    if (!isAutoplay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoplay])

  const next = () => {
    setIsAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setIsAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-32 md:py-48 bg-gradient-to-b from-black via-gray-900/20 to-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
            WHAT THEY
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> SAY</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don&apos;t take my word for it. Here&apos;s what the people I&apos;ve worked with have to say.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[currentIndex].id}
              testimonial={testimonials[currentIndex]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoplay(false)
                    setCurrentIndex(i)
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIndex 
                      ? 'w-8 bg-cyan-400' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">
            Trusted by innovative companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['TechStart', 'DataFlow', 'FinanceHub', 'EduTech', 'CloudScale'].map((company, i) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-bold text-white/50 hover:text-white/80 transition-colors"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
