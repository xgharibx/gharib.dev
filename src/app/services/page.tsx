'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/constants'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import {
  Monitor,
  Smartphone,
  Brain,
  Cloud,
  Lightbulb,
  Presentation,
  ArrowRight,
  Check,
  Sparkles,
  Star,
  Zap,
  Shield,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  monitor: Monitor,
  smartphone: Smartphone,
  brain: Brain,
  cloud: Cloud,
  lightbulb: Lightbulb,
  presentation: Presentation,
}

const processSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We start with a detailed consultation to understand your goals, requirements, and vision.',
    icon: MessageSquare,
  },
  {
    step: 2,
    title: 'Planning',
    description: 'I create a comprehensive project plan with timelines, milestones, and deliverables.',
    icon: Lightbulb,
  },
  {
    step: 3,
    title: 'Development',
    description: 'Building your solution with best practices, regular updates, and your feedback.',
    icon: Zap,
  },
  {
    step: 4,
    title: 'Delivery',
    description: 'Final testing, deployment, and handover with documentation and support.',
    icon: Shield,
  },
]

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
              Services
            </span>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Solutions That
              <span className="gradient-text"> Drive Results</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              From concept to deployment, I deliver end-to-end solutions that exceed expectations
            </p>
          </div>
        </RevealOnScroll>

        {/* Services Grid */}
        <StaggerContainer className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Lightbulb
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  id={service.id}
                  whileHover={{ y: -8 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-dark-600 dark:bg-dark-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative mb-6 inline-flex">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                      <Icon className="h-8 w-8" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -right-1 -top-1"
                    >
                      <Sparkles className="h-5 w-5 text-accent-500" />
                    </motion.div>
                  </div>

                  <h3 className="relative mb-3 font-display text-2xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="relative mb-6 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>

                  <ul className="relative mb-6 space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900/30">
                          <Check className="h-3 w-3 text-accent-600 dark:text-accent-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="relative flex items-center justify-between border-t border-gray-100 pt-6 dark:border-dark-600">
                    <span className="font-display text-xl font-bold text-primary-600 dark:text-primary-400">
                      {service.price}
                    </span>
                    <Link
                      href="/contact"
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-primary-100 px-5 py-2 font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-500 dark:hover:text-white"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Process Section */}
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              My Process
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              How I Work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              A proven methodology for delivering successful projects
            </p>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <StaggerItem key={step.step}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-dark-600 dark:bg-dark-700"
              >
                <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-600 font-bold text-white">
                  {step.step}
                </div>
                <div className="mx-auto mb-4 mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-6 w-6 text-gray-300 dark:text-dark-500" />
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Why Choose Me */}
        <RevealOnScroll>
          <div className="rounded-3xl bg-gradient-to-br from-dark-800 to-dark-900 p-8 text-white md:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  Why Choose Me
                </span>
                <h2 className="font-display text-3xl font-bold sm:text-4xl">
                  Quality That Speaks for Itself
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  With over 20 years of experience and 500+ successful projects, I bring a unique
                  combination of technical expertise, creative problem-solving, and business acumen
                  to every project.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-all hover:bg-gray-100"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { icon: Clock, title: 'On-Time Delivery', desc: '99% projects delivered on schedule' },
                  { icon: Shield, title: 'Quality Assured', desc: 'Rigorous testing & code review' },
                  { icon: MessageSquare, title: '24/7 Support', desc: 'Always available when you need me' },
                  { icon: Star, title: 'Satisfaction Guaranteed', desc: 'Your success is my priority' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <item.icon className="mb-3 h-8 w-8 text-primary-400" />
                    <h3 className="mb-1 font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
