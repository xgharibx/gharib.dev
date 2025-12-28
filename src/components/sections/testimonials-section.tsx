'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/constants'
import { RevealOnScroll } from '@/components/ui/animated-text'
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              Testimonials
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              What People
              <span className="gradient-text"> Say About Me</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Trusted by industry leaders, startups, and students worldwide
            </p>
          </div>
        </RevealOnScroll>

        {/* Main Testimonial */}
        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-dark-600 dark:bg-dark-700 md:p-12">
                {/* Quote icon */}
                <Quote className="mb-6 h-12 w-12 text-primary-500/20" />

                {/* Content */}
                <blockquote className="mb-8 font-display text-xl leading-relaxed text-gray-900 dark:text-white md:text-2xl">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 font-display text-xl font-bold text-white">
                      {currentTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {currentTestimonial.role}
                        {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="hidden items-center gap-1 sm:flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-5 w-5',
                          i < currentTestimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-lg transition-all hover:border-primary-500 hover:text-primary-600 dark:border-dark-600 dark:bg-dark-700 dark:text-gray-300 dark:hover:border-primary-400"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1)
                    setCurrentIndex(i)
                    setIsAutoPlaying(false)
                  }}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === currentIndex
                      ? 'w-8 bg-primary-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-dark-600 dark:hover:bg-dark-500'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-lg transition-all hover:border-primary-500 hover:text-primary-600 dark:border-dark-600 dark:bg-dark-700 dark:text-gray-300 dark:hover:border-primary-400"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mini testimonials */}
        <RevealOnScroll>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-600 dark:bg-dark-700"
              >
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={cn(
                        'h-4 w-4',
                        j < testimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
