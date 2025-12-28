'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code,
  Brain,
  Cloud,
  Database,
  Globe,
  Smartphone,
  Zap,
  Award,
  Users,
  Rocket,
  Heart,
  Coffee,
  Sparkles,
  ArrowRight,
  Calendar,
  MapPin,
  GraduationCap,
} from 'lucide-react'
import { MagneticElement, SpringCounter, ParallaxText, TiltCard, MaskReveal } from '@/components/ui/advanced-animations'
import { SpotlightCard } from '@/components/ui/advanced-animations'
import { GradientBorder } from '@/components/effects/aurora-background'
import { personalInfo, timeline, skills, siteConfig } from '@/lib/constants'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const expertiseAreas = [
  { 
    icon: Code, 
    title: 'Full Stack Development', 
    description: 'Building scalable web applications with React, Next.js, Node.js, and more.',
    color: 'from-blue-500 to-cyan-500',
  },
  { 
    icon: Brain, 
    title: 'AI & Machine Learning', 
    description: 'Developing intelligent solutions using TensorFlow, PyTorch, and LLMs.',
    color: 'from-purple-500 to-pink-500',
  },
  { 
    icon: Cloud, 
    title: 'Cloud Architecture', 
    description: 'Designing robust cloud solutions on AWS, GCP, and Azure.',
    color: 'from-orange-500 to-red-500',
  },
  { 
    icon: Database, 
    title: 'System Design', 
    description: 'Creating distributed systems that scale to millions of users.',
    color: 'from-green-500 to-emerald-500',
  },
]

const funFacts = [
  { icon: Coffee, value: 5000, suffix: '+', label: 'Cups of Coffee' },
  { icon: Code, value: 1000000, suffix: '+', label: 'Lines of Code' },
  { icon: Users, value: 10000, suffix: '+', label: 'Students Taught' },
  { icon: Heart, value: 1, suffix: '', label: 'Passion for Tech' },
]

export function EnhancedAboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [activeTimeline, setActiveTimeline] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 py-32"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1 }}
          className="absolute -right-64 top-0 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-[150px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -left-64 bottom-0 h-[500px] w-[500px] rounded-full bg-secondary-500/10 blur-[150px]"
        />
      </div>

      {/* Parallax Text Background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <ParallaxText text="ABOUT ME • EXPERIENCE • SKILLS • " speed={0.5} />
        <div className="mt-20">
          <ParallaxText text="DEVELOPER • EDUCATOR • INNOVATOR • " speed={-0.5} />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-400"
          >
            <Sparkles className="h-4 w-4" />
            About Me
          </motion.span>

          <h2 className="mb-6 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            <MaskReveal>Crafting Digital</MaskReveal>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              <MaskReveal>Excellence Since {personalInfo.startedCodingYear}</MaskReveal>
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-white/60">
            From writing my first line of code at age {personalInfo.startedCodingAge} to building 
            enterprise-grade solutions, my journey has been driven by an insatiable 
            curiosity and passion for technology.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Image & Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <TiltCard className="relative">
              {/* Profile Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <GradientBorder className="h-full w-full rounded-3xl">
                  <div className="relative h-full w-full overflow-hidden rounded-3xl bg-dark-800">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"
                      alt="Amr Gharib"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  </div>
                </GradientBorder>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-4 top-8 z-10"
                >
                  <SpotlightCard className="rounded-2xl border border-white/10 bg-dark-800/90 p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{personalInfo.yearsOfExperience}+ Years</div>
                        <div className="text-xs text-white/50">Experience</div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-4 bottom-24 z-10"
                >
                  <SpotlightCard className="rounded-2xl border border-white/10 bg-dark-800/90 p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">500+</div>
                        <div className="text-xs text-white/50">Projects</div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>

                {/* Info at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-bold text-white">Amr Gharib</h3>
                  <div className="mb-4 flex items-center gap-2 text-white/60">
                    <MapPin className="h-4 w-4" />
                    <span>Egypt • {personalInfo.age} years old</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'AI/ML'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column - Text & Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-white/80">
                I&apos;m a <span className="font-semibold text-white">full-stack developer</span>, 
                <span className="font-semibold text-primary-400"> AI engineer</span>, and 
                <span className="font-semibold text-secondary-400"> tech educator</span> with a 
                mission to build technology that makes a difference.
              </p>
              <p className="leading-relaxed text-white/60">
                My journey began when I was just {personalInfo.startedCodingAge} years old, 
                tinkering with code and dreaming of building the future. Today, I&apos;ve had the 
                privilege of working with startups and enterprises alike, helping them transform 
                their ideas into scalable, production-ready solutions.
              </p>
              <p className="leading-relaxed text-white/60">
                When I&apos;m not coding, you&apos;ll find me teaching the next generation of 
                developers, exploring cutting-edge AI technologies, or enjoying a good cup of coffee.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <fact.icon className="mx-auto mb-2 h-5 w-5 text-primary-400" />
                  <div className="text-2xl font-bold text-white">
                    {isInView ? <SpringCounter value={fact.value} /> : 0}{fact.suffix}
                  </div>
                  <div className="text-xs text-white/50">{fact.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Expertise Areas */}
            <div className="grid gap-4 sm:grid-cols-2">
              {expertiseAreas.map((area, i) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/20"
                >
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${area.color}`}>
                    <area.icon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="mb-1 font-semibold text-white">{area.title}</h4>
                  <p className="text-sm text-white/50">{area.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <MagneticElement strength={0.15}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40"
                >
                  Learn More About Me
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticElement>
              <MagneticElement strength={0.15}>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  <GraduationCap className="h-4 w-4" />
                  Download CV
                </a>
              </MagneticElement>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32"
        >
          <div className="mb-12 text-center">
            <h3 className="mb-4 font-display text-3xl font-bold text-white">
              My Journey
            </h3>
            <p className="text-white/60">Key milestones in my {personalInfo.yearsOfExperience}+ year career</p>
          </div>

          {/* Timeline Cards */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary-500/50 via-secondary-500/50 to-transparent" />

            <div className="space-y-12">
              {timeline.slice(0, 6).map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex items-center ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <SpotlightCard className="inline-block rounded-2xl border border-white/10 bg-dark-800/80 p-6 backdrop-blur-xl">
                      <div className={`flex items-center gap-3 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <span className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-sm font-bold text-white">
                          {item.year}
                        </span>
                        <Calendar className="h-4 w-4 text-white/40" />
                      </div>
                      <h4 className="mt-3 font-semibold text-white">{item.title}</h4>
                      <p className="mt-1 text-sm text-white/60">{item.description}</p>
                    </SpotlightCard>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 shadow-lg shadow-primary-500/50"
                    >
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
