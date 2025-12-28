'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Newspaper,
  Calendar,
  Layers,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { MagneticElement } from '@/components/ui/advanced-animations'
import { siteConfig } from '@/lib/constants'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/services', label: 'Services', icon: Layers },
  { href: '/courses', label: 'Courses', icon: GraduationCap },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/appointments', label: 'Book', icon: Calendar },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function AdvancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Animate indicator on hover
  useEffect(() => {
    if (activeHover && navRef.current && indicatorRef.current) {
      const activeItem = navRef.current.querySelector(`[data-nav="${activeHover}"]`) as HTMLElement
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem
        gsap.to(indicatorRef.current, {
          x: offsetLeft,
          width: offsetWidth,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    } else if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        duration: 0.2,
      })
    }
  }, [activeHover])

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-dark-900/80 backdrop-blur-xl shadow-xl shadow-dark-900/50'
            : 'bg-transparent'
        }`}
      >
        <nav
          ref={navRef}
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        >
          {/* Logo */}
          <MagneticElement strength={0.2}>
            <Link href="/" className="group relative flex items-center gap-3">
              <motion.div
                className="relative flex h-12 w-12 items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                {/* Logo background */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 opacity-90" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ opacity: 0.5 }}
                />
                <span className="relative z-10 font-display text-xl font-bold text-white">
                  AG
                </span>
              </motion.div>
              <div className="hidden sm:block">
                <div className="font-display text-lg font-bold text-white">
                  Amr Gharib
                </div>
                <div className="text-xs text-white/50">Full Stack Developer</div>
              </div>
            </Link>
          </MagneticElement>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {/* Hover indicator */}
            <div
              ref={indicatorRef}
              className="absolute h-10 rounded-lg bg-white/10 opacity-0 transition-opacity"
            />

            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <MagneticElement key={item.href} strength={0.1}>
                  <Link
                    href={item.href}
                    data-nav={item.href}
                    onMouseEnter={() => setActiveHover(item.href)}
                    onMouseLeave={() => setActiveHover(null)}
                    className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary-400'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-primary-500/10 border border-primary-500/20"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </MagneticElement>
              )
            })}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Social links - Desktop */}
            <div className="hidden items-center gap-2 md:flex">
              {[
                { icon: Github, href: siteConfig.social.github },
                { icon: Linkedin, href: siteConfig.social.linkedin },
                { icon: Twitter, href: siteConfig.social.twitter },
              ].map((social, i) => (
                <MagneticElement key={i} strength={0.3}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-white/30 hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </MagneticElement>
              ))}
            </div>

            {/* Let's Talk CTA */}
            <MagneticElement strength={0.15}>
              <Link
                href="/contact"
                className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 md:inline-flex"
              >
                <span className="relative z-10">Let&apos;s Talk</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </MagneticElement>

            {/* Mobile Menu Button */}
            <MagneticElement strength={0.2}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </MagneticElement>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-dark-900/80 backdrop-blur-lg lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm border-l border-white/10 bg-dark-900/95 backdrop-blur-xl lg:hidden"
            >
              <div className="flex h-full flex-col p-6">
                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav Items */}
                <nav className="mt-8 flex-1 space-y-2">
                  {navItems.map((item, i) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-4 rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                            isActive
                              ? 'bg-primary-500/10 text-primary-400'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                          {isActive && (
                            <motion.div
                              layoutId="mobile-nav-active"
                              className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Social Links */}
                <div className="border-t border-white/10 pt-6">
                  <div className="mb-4 text-sm text-white/50">Connect with me</div>
                  <div className="flex gap-3">
                    {[
                      { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
                      { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
                      { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
                      { icon: Mail, href: `mailto:${siteConfig.email}`, label: 'Email' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 font-semibold text-white"
                >
                  Let&apos;s Work Together
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
