'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { gsap } from 'gsap'
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUp,
  Heart,
  Sparkles,
  Send,
  ExternalLink,
} from 'lucide-react'
import { MagneticElement } from '@/components/ui/advanced-animations'
import { siteConfig, personalInfo } from '@/lib/constants'

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
  ],
  resources: [
    { label: 'Courses', href: '/courses' },
    { label: 'Blog', href: '/blog' },
    { label: 'Book Session', href: '/appointments' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: 'Email' },
]

export function AdvancedFooter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0.8, 1], ['100px', '0px'])
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubscribed(true)
    setIsSubscribing(false)
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={containerRef} className="relative overflow-hidden bg-dark-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-64 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-64 bottom-0 h-96 w-96 rounded-full bg-secondary-500/10 blur-[100px]"
        />
      </div>

      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-br from-dark-800/50 to-dark-900/50 p-8 backdrop-blur-xl lg:p-12"
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div className="text-center lg:text-left">
              <h3 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold text-white lg:justify-start">
                <Sparkles className="h-6 w-6 text-yellow-400" />
                Stay Updated
              </h3>
              <p className="text-white/60">
                Get the latest insights on tech, AI, and web development.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  disabled={isSubscribing || subscribed}
                />
              </div>
              <MagneticElement strength={0.15}>
                <button
                  type="submit"
                  disabled={isSubscribing || subscribed}
                  className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 disabled:opacity-70"
                >
                  {subscribed ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      ✓ Subscribed
                    </motion.span>
                  ) : isSubscribing ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⟳
                      </motion.span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Subscribe
                    </span>
                  )}
                </button>
              </MagneticElement>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="mb-6 inline-block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                  <span className="font-display text-xl font-bold text-white">AG</span>
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-white">
                    Amr Gharib
                  </div>
                  <div className="text-xs text-white/50">Full Stack Developer</div>
                </div>
              </div>
            </Link>

            <p className="mb-6 text-sm text-white/60">
              Building the future with code, AI, and innovation. 
              {personalInfo.yearsOfExperience}+ years of crafting digital experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4" />
                Egypt • Available Worldwide
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/30">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/30">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/30">
              Connect
            </h4>
            <div className="mb-6 flex gap-3">
              {socialLinks.map((social) => (
                <MagneticElement key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-white/30 hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </MagneticElement>
              ))}
            </div>

            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/30">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/40 transition-colors hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 lg:flex-row"
        >
          <p className="flex items-center gap-1 text-sm text-white/40">
            © {currentYear} Amr Gharib. Built with
            <Heart className="h-4 w-4 text-red-400" />
            and lots of
            <span className="text-yellow-400">☕</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30">Powered by Next.js & Three.js</span>
            
            {/* Scroll to top */}
            <MagneticElement strength={0.3}>
              <button
                onClick={scrollToTop}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-white/30 hover:text-white"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </MagneticElement>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
