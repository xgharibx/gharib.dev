'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { projects } from '@/lib/constants'
import { RevealOnScroll } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Layers,
  CheckCircle,
  Star,
  Globe,
  Smartphone,
  Server,
  Database,
} from 'lucide-react'

const techIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'React': Globe,
  'Next.js': Globe,
  'Node.js': Server,
  'Python': Code,
  'PostgreSQL': Database,
  'MongoDB': Database,
  'TypeScript': Code,
  'TensorFlow': Star,
  'Flutter': Smartphone,
  'Swift': Smartphone,
  'AWS': Server,
  'Docker': Layers,
}

export default function ProjectDetailPage() {
  const params = useParams()
  const project = projects.find((p) => p.id === params.slug)
  
  const currentIndex = projects.findIndex((p) => p.id === params.slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project not found</h1>
        <Link href="/portfolio" className="mt-4 text-primary-600 hover:underline">
          Browse all projects
        </Link>
      </div>
    )
  }

  // Extended project details (in production, fetch from DB)
  const projectDetails = {
    ...project,
    client: 'Enterprise Client',
    duration: '3 months',
    year: '2024',
    role: 'Lead Developer',
    challenges: [
      'Complex data synchronization across multiple platforms',
      'Real-time updates with minimal latency',
      'Scalable architecture for 100K+ users',
      'Integration with legacy systems',
    ],
    solutions: [
      'Implemented event-driven architecture with message queues',
      'Used WebSocket for real-time bidirectional communication',
      'Deployed on AWS with auto-scaling capabilities',
      'Created custom API adapters for legacy integration',
    ],
    results: [
      '99.9% uptime achieved',
      '40% reduction in load times',
      '50% increase in user engagement',
      'Successfully migrated 1M+ records',
    ],
  }

  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dark-800 via-dark-900 to-black py-16 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-primary-500/20 px-4 py-2 text-sm font-medium text-primary-300">
                {project.category.toUpperCase()}
              </span>
              <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
                {project.title}
              </h1>
              <p className="mb-6 text-xl text-gray-300">
                {project.description}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                  <Calendar className="mb-2 h-5 w-5 text-primary-400" />
                  <div className="text-gray-400">Year</div>
                  <div className="font-semibold">{projectDetails.year}</div>
                </div>
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                  <Code className="mb-2 h-5 w-5 text-primary-400" />
                  <div className="text-gray-400">Role</div>
                  <div className="font-semibold">{projectDetails.role}</div>
                </div>
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                  <Layers className="mb-2 h-5 w-5 text-primary-400" />
                  <div className="text-gray-400">Duration</div>
                  <div className="font-semibold">{projectDetails.duration}</div>
                </div>
                <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                  <Star className="mb-2 h-5 w-5 text-primary-400" />
                  <div className="text-gray-400">Client</div>
                  <div className="font-semibold">{projectDetails.client}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="aspect-video w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Project Overview
                </h2>
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.description} This project showcases advanced techniques in {project.technologies.slice(0, 3).join(', ')}, 
                    demonstrating how modern technologies can be combined to create powerful, scalable solutions.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    The primary goal was to deliver a solution that not only meets the immediate requirements but also 
                    sets a foundation for future growth and adaptation. Special attention was paid to code quality, 
                    performance optimization, and user experience.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Challenges */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Challenges
                </h2>
                <div className="space-y-3">
                  {projectDetails.challenges.map((challenge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-900/20"
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Solutions */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Solutions
                </h2>
                <div className="space-y-3">
                  {projectDetails.solutions.map((solution, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-900/20"
                    >
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Results */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Results
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {projectDetails.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl border border-gray-200 bg-gradient-to-br from-primary-50 to-accent-50 p-5 dark:border-dark-600 dark:from-primary-900/20 dark:to-accent-900/20"
                    >
                      <Star className="mb-2 h-5 w-5 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{result}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <RevealOnScroll>
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-dark-600 dark:bg-dark-700">
                  <h3 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => {
                      const Icon = techIcons[tech] || Code
                      return (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-dark-600 dark:text-gray-300"
                        >
                          <Icon className="h-4 w-4" />
                          {tech}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-dark-600 dark:bg-dark-700">
                  <h3 className="mb-4 font-display text-lg font-bold text-gray-900 dark:text-white">
                    Interested in a Similar Project?
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Let&apos;s discuss how I can help you build something amazing.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl"
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-dark-600">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.id}`}
              className="group flex items-center gap-3 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="text-sm text-gray-400">Previous</div>
                <div className="font-semibold">{prevProject.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject && (
            <Link
              href={`/portfolio/${nextProject.id}`}
              className="group flex items-center gap-3 text-right text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <div>
                <div className="text-sm text-gray-400">Next</div>
                <div className="font-semibold">{nextProject.title}</div>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
