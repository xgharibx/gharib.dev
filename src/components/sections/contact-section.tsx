'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { siteConfig, faqs } from '@/lib/constants'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Calendar,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      reset()
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
    { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  ]

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 dark:bg-dark-800 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              <MessageSquare className="h-4 w-4" />
              Get In Touch
            </span>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Let&apos;s Start a
              <span className="gradient-text"> Conversation</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Have a project in mind? Want to collaborate? Or just want to say hi?
              I&apos;d love to hear from you!
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <RevealOnScroll direction="left">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-dark-600 dark:bg-dark-700">
              <h3 className="mb-6 font-display text-2xl font-bold text-gray-900 dark:text-white">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className={cn(
                        'input-field',
                        errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className={cn(
                        'input-field',
                        errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    placeholder="+1 (234) 567-8900"
                    className="input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Subject *
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    id="subject"
                    placeholder="Project Inquiry"
                    className={cn(
                      'input-field',
                      errors.subject && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message *
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 20,
                        message: 'Message must be at least 20 characters',
                      },
                    })}
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={cn(
                      'input-field resize-none',
                      errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </RevealOnScroll>

          {/* Contact Info & FAQs */}
          <RevealOnScroll direction="right">
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <motion.a
                  href={`mailto:${siteConfig.email}`}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-dark-600 dark:bg-dark-700"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {siteConfig.email}
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${siteConfig.phone}`}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-dark-600 dark:bg-dark-700"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                    <Phone className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {siteConfig.phone}
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-dark-600 dark:bg-dark-700"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {siteConfig.location}
                    </div>
                  </div>
                </motion.div>

                <Link href="/appointments">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex h-full cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50 p-6 transition-all hover:border-primary-500 dark:border-primary-700 dark:bg-primary-900/20"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-white">
                      <Calendar className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-sm text-primary-600 dark:text-primary-400">
                        Schedule a Call
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Book Appointment
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-600 dark:bg-dark-700">
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Connect With Me
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-dark-600 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mini FAQ */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-600 dark:bg-dark-700">
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h4>
                <div className="space-y-3">
                  {faqs.slice(0, 4).map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0 dark:border-dark-600">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="flex w-full items-center justify-between text-left"
                      >
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 text-gray-500 transition-transform',
                            openFaq === index && 'rotate-180'
                          )}
                        />
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: openFaq === index ? 'auto' : 0,
                          opacity: openFaq === index ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
