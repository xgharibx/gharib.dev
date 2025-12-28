'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { courses, courseCategories } from '@/lib/constants'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Award,
  Sparkles,
  Filter,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price'>('popular')

  const filteredCourses = courses
    .filter((course) => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return (b.students || 0) - (a.students || 0)
      if (sortBy === 'price') return a.price - b.price
      return 0
    })

  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
              <BookOpen className="h-4 w-4" />
              Learn & Grow
            </span>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Master Modern
              <span className="gradient-text"> Technology</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Comprehensive courses designed to take you from beginner to expert.
              Learn at your own pace with lifetime access.
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats */}
        <RevealOnScroll>
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Users, value: '10,000+', label: 'Students' },
              { icon: BookOpen, value: '8', label: 'Courses' },
              { icon: Star, value: '4.9', label: 'Avg Rating' },
              { icon: Award, value: '100%', label: 'Satisfaction' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-lg dark:border-dark-600 dark:bg-dark-700"
              >
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary-500" />
                <div className="font-display text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Search & Filters */}
        <RevealOnScroll>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-600 dark:bg-dark-700 dark:text-white"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none dark:border-dark-600 dark:bg-dark-700 dark:text-white"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price">Price: Low to High</option>
            </select>
          </div>
        </RevealOnScroll>

        {/* Category Filters */}
        <RevealOnScroll>
          <div className="mb-8 flex flex-wrap gap-2">
            {courseCategories.map((category) => (
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
        </RevealOnScroll>

        {/* Courses Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className={cn(
                    'group relative h-full overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-dark-700',
                    course.isFeatured
                      ? 'border-primary-500'
                      : 'border-gray-200 dark:border-dark-600'
                  )}
                >
                  {course.isFeatured && (
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1 text-xs font-semibold text-white">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-16 w-16 text-primary-500/30" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-2 rounded-full bg-white px-5 py-2 font-semibold text-gray-900 transition-transform hover:scale-105"
                      >
                        <Play className="h-4 w-4" />
                        Preview Course
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                        {course.category}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-dark-600 dark:text-gray-400">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="mb-2 font-display text-xl font-bold text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {course.description}
                    </p>

                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students?.toLocaleString()}
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < Math.floor(course.rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {course.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-dark-600">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-1 rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-600"
                      >
                        Enroll Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No courses found matching your criteria.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <RevealOnScroll>
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-center text-white md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Book a 1-on-1 mentoring session and I&apos;ll create a personalized learning path just for you.
            </p>
            <Link
              href="/appointments"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-primary-600 shadow-lg transition-all hover:shadow-xl"
            >
              Book a Session
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
