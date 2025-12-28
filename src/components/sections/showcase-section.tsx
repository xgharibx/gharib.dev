'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { 
  ExternalLink, 
  Github, 
  Star, 
  Eye,
  ArrowUpRight,
  Play,
  Code,
  Layers,
  Zap
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: number
  title: string
  tagline: string
  description: string
  problem: string
  solution: string
  impact: string
  image: string
  video?: string
  tech: string[]
  category: string
  color: string
  liveUrl?: string
  githubUrl?: string
  stats?: { label: string; value: string }[]
  featured: boolean
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "NeuroFlow AI",
    tagline: "AI that understands you",
    description: "An emotion-aware AI assistant that adapts its responses based on user sentiment and context.",
    problem: "AI assistants feel cold and robotic",
    solution: "Built ML models that detect emotional context from text, voice, and behavior patterns",
    impact: "40% improvement in user satisfaction scores",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tech: ["Python", "TensorFlow", "FastAPI", "React", "WebSockets"],
    category: "AI/ML",
    color: "#00d4ff",
    liveUrl: "https://neuroflow.ai",
    githubUrl: "https://github.com/xgharibx/neuroflow",
    stats: [
      { label: "Accuracy", value: "94%" },
      { label: "Users", value: "10K+" },
      { label: "Response Time", value: "50ms" }
    ],
    featured: true
  },
  {
    id: 2,
    title: "CodeForge",
    tagline: "Build faster, break less",
    description: "Intelligent code generation and debugging platform that learns from your codebase.",
    problem: "Developers waste hours debugging trivial issues",
    solution: "Created AI-powered code analysis that predicts and prevents bugs before they happen",
    impact: "60% reduction in debugging time",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tech: ["TypeScript", "OpenAI", "Next.js", "PostgreSQL", "Docker"],
    category: "Developer Tools",
    color: "#ff00ff",
    githubUrl: "https://github.com/xgharibx/codeforge",
    stats: [
      { label: "Lines Analyzed", value: "1M+" },
      { label: "Bugs Caught", value: "50K+" },
      { label: "Teams", value: "200+" }
    ],
    featured: true
  },
  {
    id: 3,
    title: "DataLens",
    tagline: "See what matters",
    description: "Real-time data visualization platform that transforms complex data into actionable insights.",
    problem: "Data overload paralyzes decision-making",
    solution: "Built intelligent dashboards that highlight anomalies and surface key insights automatically",
    impact: "3x faster decision-making for executives",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tech: ["D3.js", "React", "Python", "Apache Kafka", "ClickHouse"],
    category: "Data Science",
    color: "#00ff88",
    liveUrl: "https://datalens.io",
    stats: [
      { label: "Data Points", value: "1B+" },
      { label: "Dashboards", value: "5K+" },
      { label: "Uptime", value: "99.99%" }
    ],
    featured: true
  },
  {
    id: 4,
    title: "LearnPath",
    tagline: "Education reimagined",
    description: "Adaptive learning platform that personalizes education paths based on individual learning styles.",
    problem: "One-size-fits-all education fails most learners",
    solution: "Developed ML algorithms that adapt content delivery to how each person learns best",
    impact: "85% course completion rate (vs 15% industry average)",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    tech: ["Next.js", "Python", "TensorFlow", "MongoDB", "AWS"],
    category: "Education",
    color: "#ffaa00",
    liveUrl: "https://learnpath.dev",
    stats: [
      { label: "Students", value: "50K+" },
      { label: "Courses", value: "500+" },
      { label: "Countries", value: "40+" }
    ],
    featured: false
  },
  {
    id: 5,
    title: "FlowState",
    tagline: "Work in your zone",
    description: "Productivity platform that helps developers achieve and maintain flow state.",
    problem: "Constant interruptions destroy productivity",
    solution: "Created smart scheduling and notification management that protects focus time",
    impact: "4 hours of additional focus time per developer per day",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    tech: ["Electron", "React", "Node.js", "SQLite", "AI"],
    category: "Productivity",
    color: "#ff5555",
    githubUrl: "https://github.com/xgharibx/flowstate",
    stats: [
      { label: "Downloads", value: "25K+" },
      { label: "Daily Active", value: "8K+" },
      { label: "Focus Hours", value: "100K+" }
    ],
    featured: false
  },
  {
    id: 6,
    title: "Synapse",
    tagline: "Connect everything",
    description: "Universal API gateway that connects any service to any other service with zero code.",
    problem: "Integration hell slows down every project",
    solution: "Built a visual integration builder with pre-built connectors and custom logic",
    impact: "90% reduction in integration time",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    tech: ["Go", "gRPC", "Kubernetes", "React", "GraphQL"],
    category: "Infrastructure",
    color: "#8855ff",
    liveUrl: "https://synapse.dev",
    githubUrl: "https://github.com/xgharibx/synapse",
    stats: [
      { label: "Integrations", value: "500+" },
      { label: "API Calls/Day", value: "10M+" },
      { label: "Latency", value: "<10ms" }
    ],
    featured: false
  }
]

// Featured project card (large)
function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image side */}
      <motion.div
        className={`relative aspect-video rounded-3xl overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}
        whileHover={{ scale: 1.02 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isHovered ? 0.3 : 0.5 }}
        />
        {/* Play button for video */}
        {project.video && (
          <motion.button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </motion.button>
        )}
        {/* Category badge */}
        <div
          className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-xl text-white text-sm font-bold"
          style={{ backgroundColor: `${project.color}33`, border: `1px solid ${project.color}` }}
        >
          {project.category}
        </div>
      </motion.div>

      {/* Content side */}
      <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
        <div>
          <motion.p
            className="text-sm uppercase tracking-widest mb-2"
            style={{ color: project.color }}
          >
            {project.tagline}
          </motion.p>
          <h3 className="text-4xl md:text-5xl font-black text-white">{project.title}</h3>
        </div>

        {/* Problem/Solution */}
        <div className="space-y-4">
          <div>
            <p className="text-red-400/80 text-sm uppercase tracking-wider mb-1">Problem</p>
            <p className="text-gray-400 line-through">{project.problem}</p>
          </div>
          <div>
            <p className="text-emerald-400/80 text-sm uppercase tracking-wider mb-1">Solution</p>
            <p className="text-white">{project.solution}</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 ${index % 2 === 1 ? 'ml-auto' : ''}`}>
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">{project.impact}</span>
          </div>
        </div>

        {/* Tech stack */}
        <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? 'justify-end' : ''}`}>
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-sm border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        {project.stats && (
          <div className={`flex gap-6 ${index % 2 === 1 ? 'justify-end' : ''}`}>
            {project.stats.map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-black" style={{ color: project.color }}>{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        <div className={`flex gap-4 ${index % 2 === 1 ? 'justify-end' : ''}`}>
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-black font-bold"
              style={{ backgroundColor: project.color }}
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:border-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Regular project card
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 transition-all"
        whileHover={{ y: -10 }}
      >
        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: `${project.color}33`, color: project.color }}
            >
              {project.category}
            </span>
            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Github className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{project.tagline}</p>

          {/* Stats */}
          {project.stats && (
            <div className="flex gap-4">
              {project.stats.slice(0, 2).map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-lg font-bold" style={{ color: project.color }}>{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState('all')
  
  const categories = ['all', ...new Set(projectsData.map(p => p.category))]
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter)

  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
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
            PROBLEMS
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> SOLVED</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each project started with a problem someone said couldn&apos;t be solved.
            <br />
            <span className="text-cyan-400">I proved them wrong.</span>
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all ${
                filter === cat
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Regular projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* More projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/xgharibx"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 rounded-full text-white font-bold hover:border-white transition-colors"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
