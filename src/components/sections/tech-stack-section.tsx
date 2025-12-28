'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { 
  Code2, 
  Database, 
  Cloud, 
  Brain, 
  Palette, 
  Server,
  Smartphone,
  Shield,
  Zap
} from 'lucide-react'

interface TechCategory {
  id: string
  name: string
  icon: LucideIcon
  color: string
  technologies: Array<{
    name: string
    level: 'expert' | 'advanced' | 'proficient'
    years: number
  }>
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Code2,
    color: '#00d4ff',
    technologies: [
      { name: 'React/Next.js', level: 'expert', years: 8 },
      { name: 'TypeScript', level: 'expert', years: 6 },
      { name: 'Vue.js', level: 'advanced', years: 4 },
      { name: 'Tailwind CSS', level: 'expert', years: 4 },
      { name: 'Three.js/WebGL', level: 'advanced', years: 3 },
      { name: 'Framer Motion', level: 'expert', years: 3 },
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    color: '#ff00ff',
    technologies: [
      { name: 'Node.js', level: 'expert', years: 10 },
      { name: 'Python', level: 'expert', years: 12 },
      { name: 'Go', level: 'advanced', years: 3 },
      { name: 'GraphQL', level: 'expert', years: 5 },
      { name: 'REST APIs', level: 'expert', years: 12 },
      { name: 'FastAPI', level: 'expert', years: 3 },
    ]
  },
  {
    id: 'database',
    name: 'Databases',
    icon: Database,
    color: '#00ff88',
    technologies: [
      { name: 'PostgreSQL', level: 'expert', years: 10 },
      { name: 'MongoDB', level: 'expert', years: 8 },
      { name: 'Redis', level: 'advanced', years: 6 },
      { name: 'Prisma', level: 'expert', years: 4 },
      { name: 'Elasticsearch', level: 'advanced', years: 4 },
      { name: 'ClickHouse', level: 'proficient', years: 2 },
    ]
  },
  {
    id: 'ai',
    name: 'AI/ML',
    icon: Brain,
    color: '#ffaa00',
    technologies: [
      { name: 'TensorFlow', level: 'expert', years: 6 },
      { name: 'PyTorch', level: 'advanced', years: 4 },
      { name: 'OpenAI/LLMs', level: 'expert', years: 3 },
      { name: 'Scikit-learn', level: 'expert', years: 8 },
      { name: 'Computer Vision', level: 'advanced', years: 4 },
      { name: 'NLP', level: 'advanced', years: 5 },
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: '#ff5555',
    technologies: [
      { name: 'AWS', level: 'expert', years: 8 },
      { name: 'Docker', level: 'expert', years: 7 },
      { name: 'Kubernetes', level: 'advanced', years: 4 },
      { name: 'CI/CD', level: 'expert', years: 8 },
      { name: 'Terraform', level: 'advanced', years: 3 },
      { name: 'Serverless', level: 'expert', years: 5 },
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    icon: Smartphone,
    color: '#8855ff',
    technologies: [
      { name: 'React Native', level: 'expert', years: 6 },
      { name: 'Flutter', level: 'advanced', years: 3 },
      { name: 'iOS (Swift)', level: 'proficient', years: 3 },
      { name: 'Android (Kotlin)', level: 'proficient', years: 3 },
      { name: 'Expo', level: 'expert', years: 4 },
      { name: 'PWA', level: 'expert', years: 5 },
    ]
  },
]

// Category card
function CategoryCard({ category, isSelected, onSelect }: { 
  category: TechCategory
  isSelected: boolean
  onSelect: () => void
}) {
  const IconComponent = category.icon

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-6 rounded-2xl transition-all duration-300 ${
        isSelected 
          ? 'bg-white/10 border-2' 
          : 'bg-white/5 border border-white/10 hover:border-white/30'
      }`}
      style={{ borderColor: isSelected ? category.color : undefined }}
    >
      <div className="w-8 h-8 mb-3" style={{ color: category.color }}>
        <IconComponent className="w-full h-full" />
      </div>
      <h3 className="text-lg font-bold text-white">{category.name}</h3>
      <p className="text-sm text-gray-400 mt-1">
        {category.technologies.length} technologies
      </p>

      {isSelected && (
        <motion.div
          layoutId="activeCategory"
          className="absolute -bottom-1 left-1/2 w-4 h-1 rounded-full"
          style={{ backgroundColor: category.color, x: '-50%' }}
        />
      )}
    </motion.button>
  )
}

// Technology item
function TechItem({ tech, index, color }: { 
  tech: TechCategory['technologies'][0]
  index: number
  color: string
}) {
  const levelWidth = {
    expert: 100,
    advanced: 75,
    proficient: 50,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{tech.name}</span>
          <span className="text-xs text-gray-500">{tech.years}+ years</span>
        </div>
        <span 
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {tech.level}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${levelWidth[tech.level]}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  )
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('frontend')
  const isInView = useInView(sectionRef, { once: true })

  const activeCategory = techCategories.find(c => c.id === selectedCategory)

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            TECH
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> ARSENAL</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The tools I use to solve problems. 18 years of mastering the craft.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {techCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={() => setSelectedCategory(category.id)}
            />
          ))}
        </motion.div>

        {/* Technologies list */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              {activeCategory.technologies.map((tech, index) => (
                <TechItem 
                  key={tech.name} 
                  tech={tech} 
                  index={index} 
                  color={activeCategory.color}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { value: '50+', label: 'Technologies Mastered', color: '#00d4ff' },
            { value: '18+', label: 'Years of Experience', color: '#ff00ff' },
            { value: '100+', label: 'Projects Delivered', color: '#00ff88' },
            { value: '24/7', label: 'Always Learning', color: '#ffaa00' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-4xl font-black mb-2" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
