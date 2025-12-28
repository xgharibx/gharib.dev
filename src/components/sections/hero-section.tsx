'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { TypeAnimation } from 'react-type-animation'
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  ChevronDown,
  Play,
  Sparkles,
  Code2,
  Rocket,
  Zap,
} from 'lucide-react'
import { siteConfig, stats } from '@/lib/constants'
import { FloatingBlobs } from '@/components/ui/particle-background'
import { CountUp, MagneticButton, RevealOnScroll } from '@/components/ui/animated-text'

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(
  () => import('@/components/three/scene-3d').then((mod) => mod.Scene3D),
  { ssr: false }
)

export function HeroSection() {
  const socialLinks = [
    { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
    { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Elements */}
      <FloatingBlobs />
      <Scene3D />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-5 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(92, 124, 250, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(92, 124, 250, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center text-center"
        >
          {/* Announcement badge */}
          <motion.div variants={itemVariants}>
            <Link
              href="/courses"
              className="group mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200/50 bg-primary-50/50 px-4 py-2 text-sm text-primary-700 backdrop-blur-sm transition-all hover:border-primary-300 hover:bg-primary-100/50 dark:border-primary-800/50 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:border-primary-700"
            >
              <Sparkles className="h-4 w-4" />
              <span>New courses available</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-gray-900 dark:text-white">Hi, I&apos;m </span>
            <span className="gradient-text">Amr Gharib</span>
          </motion.h1>

          {/* Animated subtitle */}
          <motion.div
            variants={itemVariants}
            className="mt-6 h-12 font-display text-xl font-medium text-gray-600 dark:text-gray-300 sm:text-2xl md:text-3xl"
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'AI/ML Engineer',
                2000,
                'Cloud Architect',
                2000,
                'Tech Educator',
                2000,
                'Blockchain Developer',
                2000,
                'System Designer',
                2000,
                'Entrepreneur',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl"
          >
            With 20+ years of experience, I transform complex ideas into elegant solutions.
            From AI-powered applications to enterprise systems, I build technology that matters.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <Link
                href="/portfolio"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl hover:shadow-primary-500/40"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/appointments"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-primary-500 hover:text-primary-600 dark:border-dark-600 dark:text-gray-200 dark:hover:border-primary-400 dark:hover:text-primary-400"
              >
                <Play className="h-5 w-5" />
                <span>Book a Call</span>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-4"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Follow me:
            </span>
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-dark-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative border-t border-gray-200 bg-white/80 backdrop-blur-xl dark:border-dark-700 dark:bg-dark-800/80">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.slice(0, 4).map((stat, i) => (
              <RevealOnScroll key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                    {stat.value.includes('+') ? (
                      <>
                        <CountUp
                          end={parseInt(stat.value)}
                          suffix=""
                          duration={2}
                        />
                        <span>+</span>
                      </>
                    ) : stat.value.includes('K') ? (
                      <>
                        <CountUp
                          end={parseInt(stat.value)}
                          suffix=""
                          duration={2}
                        />
                        <span>K+</span>
                      </>
                    ) : stat.value.includes('M') ? (
                      <>
                        <CountUp
                          end={parseInt(stat.value)}
                          suffix=""
                          duration={2}
                        />
                        <span>M+</span>
                      </>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
