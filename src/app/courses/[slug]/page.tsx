'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { courses } from '@/lib/constants'
import { RevealOnScroll } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import { cn, formatPrice } from '@/lib/utils'
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  Play,
  CheckCircle,
  X,
  User,
  Mail,
  Phone,
  CreditCard,
  ArrowRight,
  Zap,
  BarChart,
  Calendar,
  Globe,
  MessageCircle,
  Download,
} from 'lucide-react'

interface EnrollFormData {
  name: string
  email: string
  phone: string
  paymentMethod: 'card' | 'paypal' | 'later'
}

const curriculum = [
  { module: 1, title: 'Introduction & Setup', lessons: 5, duration: '1.5 hours' },
  { module: 2, title: 'Core Concepts', lessons: 8, duration: '3 hours' },
  { module: 3, title: 'Advanced Techniques', lessons: 10, duration: '4 hours' },
  { module: 4, title: 'Real-World Projects', lessons: 6, duration: '5 hours' },
  { module: 5, title: 'Best Practices & Optimization', lessons: 4, duration: '2 hours' },
  { module: 6, title: 'Deployment & Beyond', lessons: 3, duration: '1.5 hours' },
]

const features = [
  { icon: Play, title: 'Video Lessons', desc: 'HD quality recordings' },
  { icon: Download, title: 'Downloadable Resources', desc: 'Code files & assets' },
  { icon: MessageCircle, title: 'Community Access', desc: 'Private Discord group' },
  { icon: Award, title: 'Certificate', desc: 'Upon completion' },
  { icon: Globe, title: 'Lifetime Access', desc: 'Learn at your pace' },
  { icon: Calendar, title: 'Live Q&A Sessions', desc: 'Weekly calls' },
]

export default function CourseDetailPage() {
  const params = useParams()
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)
  
  const course = courses.find((c) => c.id === params.slug)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EnrollFormData>()

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course not found</h1>
        <Link href="/courses" className="mt-4 text-primary-600 hover:underline">
          Browse all courses
        </Link>
      </div>
    )
  }

  const onEnroll = async (data: EnrollFormData) => {
    setIsEnrolling(true)
    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          courseId: course.id,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to enroll')
      }

      toast.success('Successfully enrolled! Check your email for details.')
      setShowEnrollModal(false)
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to enroll')
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-dark-800 via-dark-900 to-black py-16 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="mb-8 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-accent-500/20 px-4 py-2 text-sm font-medium text-accent-300">
                {course.category.toUpperCase()}
              </span>
              <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">
                {course.title}
              </h1>
              <p className="mb-6 text-xl text-gray-300">
                {course.description}
              </p>

              <div className="mb-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-400">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-5 w-5" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <BarChart className="h-5 w-5" />
                  {course.level}
                </div>
              </div>

              <div className="mb-8 flex items-center gap-4 group">
                <div className="relative overflow-hidden rounded-full ring-2 ring-cyan-400/30 group-hover:ring-cyan-400 transition-all duration-300">
                  <Image
                    src="/images/amr-gharib.jpg"
                    alt="Amr Gharib - Instructor"
                    width={50}
                    height={50}
                    className="rounded-full transition-all duration-500 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal filter contrast-110"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <p className="font-semibold">Amr Gharib</p>
                  <p className="text-sm text-gray-400">Senior Instructor</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl"
                >
                  <Zap className="h-5 w-5" />
                  Enroll Now - {formatPrice(course.price)}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary-600 transition-transform hover:scale-110">
                    <Play className="h-8 w-8 fill-current" />
                  </button>
                </div>
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
            {/* What You'll Learn */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  What You&apos;ll Learn
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Master core concepts and fundamentals',
                    'Build real-world projects from scratch',
                    'Learn industry best practices',
                    'Optimize for performance and scalability',
                    'Deploy to production confidently',
                    'Write clean, maintainable code',
                    'Debug and troubleshoot effectively',
                    'Stay updated with latest trends',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Curriculum */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Course Curriculum
                </h2>
                <div className="space-y-3">
                  {curriculum.map((module, i) => (
                    <motion.div
                      key={module.module}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl border border-gray-200 bg-white p-5 dark:border-dark-600 dark:bg-dark-700"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                            {module.module}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {module.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {module.lessons} lessons • {module.duration}
                            </p>
                          </div>
                        </div>
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Requirements */}
            <RevealOnScroll>
              <div className="mb-12">
                <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Requirements
                </h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    Basic understanding of programming concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    A computer with internet connection
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    Eagerness to learn and practice
                  </li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <RevealOnScroll>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-dark-600 dark:bg-dark-700">
                  <div className="mb-6 text-center">
                    <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(course.price)}
                    </div>
                    {course.price > 0 && (
                      <p className="text-sm text-gray-500">One-time payment, lifetime access</p>
                    )}
                  </div>

                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="mb-6 w-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 py-4 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl"
                  >
                    Enroll Now
                  </button>

                  <div className="space-y-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-dark-600 dark:text-gray-400">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {feature.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {showEnrollModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowEnrollModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowEnrollModal(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                Enroll in {course.title}
              </h2>

              <form onSubmit={handleSubmit(onEnroll)} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className={cn('input-field pl-11', errors.name && 'border-red-500')}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                      })}
                      type="email"
                      className={cn('input-field pl-11', errors.email && 'border-red-500')}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('phone')}
                      type="tel"
                      className="input-field pl-11"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                      { value: 'paypal', label: 'PayPal', icon: Globe },
                      { value: 'later', label: 'Pay Later', icon: Calendar },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-all hover:border-primary-500 dark:border-dark-600"
                      >
                        <input
                          {...register('paymentMethod')}
                          type="radio"
                          value={method.value}
                          defaultChecked={method.value === 'card'}
                          className="accent-primary-500"
                        />
                        <method.icon className="h-5 w-5 text-gray-500" />
                        <span className="text-gray-900 dark:text-white">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 dark:border-dark-600">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isEnrolling}
                    className="w-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isEnrolling ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      'Complete Enrollment'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
