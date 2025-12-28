'use client'

import { motion } from 'framer-motion'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export function Marquee({ items, speed = 30, direction = 'left', className = '' }: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items]
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -100 * items.length] : [-100 * items.length, 0]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className="text-8xl md:text-9xl font-black text-white/5 select-none"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// Tech marquee with logos
interface TechMarqueeProps {
  speed?: number
  className?: string
}

export function TechMarquee({ speed = 40, className = '' }: TechMarqueeProps) {
  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Python', 'TensorFlow', 
    'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Kubernetes',
    'GraphQL', 'Prisma', 'Redis', 'MongoDB', 'FastAPI'
  ]
  
  const duplicatedTech = [...technologies, ...technologies]
  
  return (
    <div className={`overflow-hidden py-8 ${className}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -50 * technologies.length] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedTech.map((tech, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.2, color: '#00d4ff' }}
            className="text-2xl font-bold text-white/30 cursor-default transition-colors"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

// Statement marquee
interface StatementMarqueeProps {
  statements: string[]
  speed?: number
  className?: string
}

export function StatementMarquee({ statements, speed = 60, className = '' }: StatementMarqueeProps) {
  const duplicatedStatements = [...statements, ...statements]
  
  return (
    <div className={`overflow-hidden py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 ${className}`}>
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: [0, -100 * statements.length] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedStatements.map((statement, i) => (
          <span
            key={i}
            className="text-lg font-bold text-white flex items-center gap-4"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            {statement}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
