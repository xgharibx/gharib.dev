'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig, navigation } from '@/lib/constants'
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUpRight,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const socialLinks = [
  { name: 'GitHub', href: siteConfig.social.github, icon: Github },
  { name: 'LinkedIn', href: siteConfig.social.linkedin, icon: Linkedin },
  { name: 'Twitter', href: siteConfig.social.twitter, icon: Twitter },
  { name: 'YouTube', href: siteConfig.social.youtube, icon: Youtube },
  { name: 'Instagram', href: siteConfig.social.instagram, icon: Instagram },
]

const quickLinks = [
  { name: 'About Me', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
  { name: 'Courses', href: '/courses' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const resources = [
  { name: 'Book Appointment', href: '/appointments' },
  { name: 'Free Resources', href: '/resources' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success('Successfully subscribed to newsletter!')
    setEmail('')
    setIsSubmitting(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative mt-auto overflow-hidden bg-gray-50 dark:bg-dark-800">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl dark:bg-primary-500/10" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent-500/5 blur-3xl dark:bg-accent-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative -mt-20 rounded-2xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-dark-600/50 dark:bg-dark-700 md:p-12"
        >
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                Subscribe to My Newsletter
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Get the latest articles, tutorials, and updates delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field flex-1"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 font-display text-lg font-bold text-white">
                AG
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-gray-900 dark:text-white">Amr</span>
                <span className="gradient-text">Gharib</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              World-class programmer, educator, and entrepreneur. Transforming ideas
              into reality with cutting-edge technology.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-dark-600 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-8 dark:border-dark-600 md:flex-row"
        >
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Amr Gharib. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            Crafted with
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            in Cairo, Egypt
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
