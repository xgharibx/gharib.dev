'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { projects, projectCategories } from '@/lib/constants'
import { RevealOnScroll } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import {
  ArrowRight,
  ExternalLink,
  Github,
  X,
  Eye,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
              Portfolio
            </span>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              My
              <span className="gradient-text"> Projects</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              A showcase of my work across various industries and technologies
            </p>
          </div>
        </RevealOnScroll>

        {/* Filters & View Toggle */}
        <RevealOnScroll>
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    activeCategory === category
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300 dark:hover:bg-dark-600'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 rounded-full bg-gray-100 p-1 dark:bg-dark-700">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'rounded-full p-2 transition-colors',
                  viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow dark:bg-dark-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Grid3X3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'rounded-full p-2 transition-colors',
                  viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow dark:bg-dark-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Grid/List */}
        <motion.div
          layout
          className={cn(
            'grid gap-8',
            viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-2xl dark:border-dark-600 dark:bg-dark-700"
                  >
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute right-4 top-4 z-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-xs font-semibold text-white">
                        Featured
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold text-primary-500/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-2 rounded-full bg-white px-5 py-2 font-semibold text-gray-900 transition-transform hover:scale-105"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                        {project.category}
                      </span>
                      <h3 className="mb-2 font-display text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-dark-600 dark:text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ x: 8 }}
                    className="group flex gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-all hover:shadow-xl dark:border-dark-600 dark:bg-dark-700"
                  >
                    <div className="hidden h-32 w-48 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 sm:block dark:from-primary-900/30 dark:to-secondary-900/30">
                      <div className="flex h-full items-center justify-center text-3xl font-bold text-primary-500/20">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-dark-600 dark:text-gray-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
                        >
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 dark:bg-dark-800"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30">
                <div className="flex h-full items-center justify-center">
                  <div className="text-8xl font-bold text-primary-500/20">
                    {selectedProject.title.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    {selectedProject.category}
                  </span>
                  {selectedProject.featured && (
                    <span className="rounded-full bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h3>

                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  {selectedProject.description}
                </p>

                <div className="mt-6">
                  <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-dark-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.client && (
                  <div className="mt-6">
                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Client</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedProject.client}</p>
                  </div>
                )}

                <div className="mt-8 flex gap-4">
                  <Link
                    href={`/portfolio/${selectedProject.slug}`}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                  >
                    View Full Case Study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
