'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses } from '@/lib/constants'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function CoursesSection() {
  const featuredCourses = courses.filter((c) => c.isFeatured)

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 dark:bg-dark-800 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl dark:bg-accent-500/10" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl dark:bg-primary-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
              <BookOpen className="h-4 w-4" />
              Courses
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Master Modern
              <span className="gradient-text"> Technology</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Comprehensive courses designed to take you from beginner to expert
            </p>
          </div>
        </RevealOnScroll>

        {/* Stats */}
        <RevealOnScroll>
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: '10,000+', label: 'Students Enrolled' },
              { icon: BookOpen, value: '50+', label: 'Course Hours' },
              { icon: Star, value: '4.9', label: 'Average Rating' },
              { icon: Award, value: '100%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-dark-600 dark:bg-dark-700"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Featured Courses */}
        <StaggerContainer className="grid gap-8 lg:grid-cols-3">
          {featuredCourses.map((course, index) => (
            <StaggerItem key={course.id}>
              <motion.div
                whileHover={{ y: -8 }}
                className={cn(
                  'group relative h-full overflow-hidden rounded-3xl border bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-dark-700',
                  index === 1
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-gray-200 dark:border-dark-600'
                )}
              >
                {/* Best Seller Badge */}
                {index === 1 && (
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Best Seller
                  </div>
                )}

                {/* Course Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-primary-500/30" />
                  </div>
                  {/* Hover overlay */}
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
                  {/* Category & Level */}
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

                  {/* Meta info */}
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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

                  {/* Rating */}
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < Math.floor(course.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {course.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({course.students?.toLocaleString()} students)
                    </span>
                  </div>

                  {/* Price & CTA */}
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
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* All Courses CTA */}
        <RevealOnScroll>
          <div className="mt-16 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-500 px-8 py-4 font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-500 dark:hover:text-white"
            >
              Browse All Courses
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
