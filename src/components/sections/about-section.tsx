'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { skills, timeline } from '@/lib/constants'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
import {
  GraduationCap,
  Rocket,
  Globe,
  Code2,
  Building,
  Brain,
  Users,
  Link as LinkIcon,
  Star,
  ArrowRight,
  Download,
} from 'lucide-react'

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'rocket': Rocket,
  'globe': Globe,
  'code': Code2,
  'graduation-cap': GraduationCap,
  'building': Building,
  'brain': Brain,
  'users': Users,
  'link': LinkIcon,
  'star': Star,
}

export function AboutSection() {
  const allSkills = [
    { title: 'Languages', skills: skills.languages },
    { title: 'Frontend', skills: skills.frontend },
    { title: 'Backend', skills: skills.backend },
    { title: 'Database', skills: skills.database },
    { title: 'DevOps & Cloud', skills: skills.devops },
    { title: 'AI & ML', skills: skills.ai_ml },
  ]

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/5" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/5" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              About Me
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Crafting Digital Excellence
              <br />
              <span className="gradient-text">Since Age 9</span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Main content grid */}
        <div className="mb-24 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image/Visual side */}
          <RevealOnScroll direction="left">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
                <div className="h-full w-full overflow-hidden rounded-[22px] bg-gray-100 dark:bg-dark-800">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 font-display text-4xl font-bold text-white shadow-2xl shadow-primary-500/40">
                        AG
                      </div>
                      <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                        Amr Gharib
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Full Stack Developer & Educator
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-dark-600 dark:bg-dark-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Education</p>
                    <p className="font-semibold text-gray-900 dark:text-white">AUC Graduate</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -right-6 -top-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-dark-600 dark:bg-dark-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                    <p className="font-semibold text-gray-900 dark:text-white">20+ Years</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Text content */}
          <RevealOnScroll direction="right">
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Transforming Ideas Into Digital Reality
              </h3>
              <div className="mt-6 space-y-4 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  I&apos;m Amr Gharib, a passionate technologist who started coding at the age of 9. 
                  What began as curiosity has evolved into a lifelong journey of building, learning, 
                  and teaching technology.
                </p>
                <p>
                  With dual degrees in MICT and Computer Engineering from The American University 
                  in Cairo, I&apos;ve worked with Fortune 500 companies, led innovative startups, and 
                  trained thousands of developers worldwide.
                </p>
                <p>
                  I believe in pushing boundaries, whether it&apos;s implementing cutting-edge AI 
                  solutions, architecting systems that scale to millions, or simplifying complex 
                  concepts for aspiring developers.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-primary-500 hover:text-primary-600 dark:border-dark-600 dark:text-gray-200 dark:hover:border-primary-400 dark:hover:text-primary-400"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Skills Section */}
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Technical Expertise
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Mastery across the full spectrum of modern technologies
            </p>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allSkills.map((category) => (
            <StaggerItem key={category.title}>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-xl dark:border-dark-700 dark:bg-dark-800">
                <h4 className="mb-4 font-display text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h4>
                <div className="space-y-3">
                  {category.skills.slice(0, 5).map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="skill-bar-fill"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Timeline Section */}
        <div className="mt-24">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                My Journey
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Key milestones in my career
              </p>
            </div>
          </RevealOnScroll>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 md:left-1/2 md:block md:-translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, index) => {
                const Icon = iconMap[item.icon] || Star
                return (
                  <RevealOnScroll
                    key={item.year}
                    delay={index * 0.1}
                    direction={index % 2 === 0 ? 'left' : 'right'}
                  >
                    <div
                      className={`relative flex flex-col md:flex-row ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Content */}
                      <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                        <div
                          className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-dark-700 dark:bg-dark-800 ${
                            index % 2 === 0 ? 'md:text-right' : ''
                          }`}
                        >
                          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                            {item.year}
                          </span>
                          <h4 className="mt-3 font-display text-xl font-bold text-gray-900 dark:text-white">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Timeline dot */}
                      <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 md:left-1/2">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </RevealOnScroll>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
