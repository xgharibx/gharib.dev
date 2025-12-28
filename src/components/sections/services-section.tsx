'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/constants'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
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
} from 'lucide-react'

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  monitor: Monitor,
  smartphone: Smartphone,
  brain: Brain,
  cloud: Cloud,
  lightbulb: Lightbulb,
  presentation: Presentation,
}

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 dark:bg-dark-800 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl dark:bg-primary-500/10" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl dark:bg-accent-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700 dark:bg-accent-900/30 dark:text-accent-300">
              Services
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Solutions That
              <span className="gradient-text"> Drive Results</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              From concept to deployment, I deliver end-to-end solutions that exceed expectations
            </p>
          </div>
        </RevealOnScroll>

        {/* Services Grid */}
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Lightbulb
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-dark-600 dark:bg-dark-700"
                >
                  {/* Gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative mb-6 inline-flex">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                      <Icon className="h-7 w-7" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -right-1 -top-1"
                    >
                      <Sparkles className="h-4 w-4 text-accent-500" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="relative mb-3 font-display text-xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="relative mb-6 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="relative mb-6 space-y-2">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="h-4 w-4 text-accent-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="relative flex items-center justify-between border-t border-gray-100 pt-6 dark:border-dark-600">
                    <span className="font-display text-lg font-bold text-primary-600 dark:text-primary-400">
                      {service.price}
                    </span>
                    <Link
                      href={`/services#${service.id}`}
                      className="group/btn inline-flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* CTA */}
        <RevealOnScroll>
          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl"
            >
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
