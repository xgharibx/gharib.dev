'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ExternalLink, Github, Eye, ArrowUpRight, Star, Zap } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  index?: number
}

export function AdvancedProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  featured = false,
  index = 0,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // Spotlight gradient
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 })
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { damping: 30, stiffness: 200 })
  
  const spotlight = useMotionTemplate`radial-gradient(600px at ${spotlightX}% ${spotlightY}%, rgba(92, 124, 250, 0.15), transparent 80%)`

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full perspective-1000"
    >
      {/* Card glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary-500/50 via-secondary-500/50 to-accent-500/50 blur-xl"
          />
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-dark-800/80 backdrop-blur-xl"
        style={{ background: spotlight }}
      >
        {/* Featured badge */}
        {featured && (
          <div className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            <Star className="h-3 w-3" />
            Featured
          </div>
        )}

        {/* Image container */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"
          >
            <div className="flex gap-4">
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              )}
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-transform hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-6" style={{ transform: 'translateZ(50px)' }}>
          <motion.h3
            className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-primary-400"
            style={{ transform: 'translateZ(30px)' }}
          >
            {title}
          </motion.h3>

          <p className="mb-4 line-clamp-2 text-sm text-white/60">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/70 transition-colors group-hover:bg-primary-500/20 group-hover:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View project link */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-400 opacity-0 transition-opacity group-hover:opacity-100"
            initial={{ x: -10 }}
            animate={{ x: isHovered ? 0 : -10 }}
          >
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(92, 124, 250, 0.5), rgba(132, 94, 247, 0.5), rgba(34, 184, 207, 0.5))',
            backgroundSize: '200% 200%',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
            opacity: isHovered ? 1 : 0,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Service Card with glass morphism and 3D effects
interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  gradient: string
  index?: number
}

export function AdvancedServiceCard({
  icon,
  title,
  description,
  features,
  gradient,
  index = 0,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${gradient} blur-xl opacity-50`}
      />

      {/* Card */}
      <div 
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-dark-800/50 p-8 backdrop-blur-xl"
        style={{
          background: isHovered 
            ? 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(92, 124, 250, 0.1), transparent 40%)' 
            : undefined,
        }}
      >
        {/* Icon */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>

        {/* Description */}
        <p className="mb-6 text-white/60">{description}</p>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <Zap className="h-4 w-4 text-primary-400" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Hover indicator */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-primary-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        >
          <span className="text-sm font-medium">Learn More</span>
          <ArrowUpRight className="h-4 w-4" />
        </motion.div>

        {/* Corner decoration */}
        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
      </div>
    </motion.div>
  )
}

// Testimonial Card with advanced animations
interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
  index?: number
}

export function AdvancedTestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-dark-800/80 to-dark-900/80 p-8 backdrop-blur-xl">
        {/* Quote mark */}
        <div className="absolute -right-4 -top-4 text-[120px] font-serif text-white/5">
          &ldquo;
        </div>

        {/* Rating */}
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="mb-6 text-lg text-white/80 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={avatar}
              alt={author}
              width={48}
              height={48}
              className="rounded-full ring-2 ring-primary-500/30"
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-dark-800" />
          </div>
          <div>
            <div className="font-semibold text-white">{author}</div>
            <div className="text-sm text-white/50">{role}</div>
          </div>
        </div>

        {/* Gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(92, 124, 250, 0.3), rgba(132, 94, 247, 0.3))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
      </div>
    </motion.div>
  )
}
