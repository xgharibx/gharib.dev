'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { href: '#problems', label: 'Problems I Solve' },
  { href: '#ideas', label: 'My Ideas' },
  { href: '#work', label: 'My Work' },
  { href: '#story', label: 'My Story' },
  { href: '#contact', label: 'Let\'s Talk' },
]

export function ViralNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setIsVisible(latest < previous || latest < 100)
    setIsScrolled(latest > 50)
  })

  return (
    <>
      {/* Main navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : ''
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black text-white"
              >
                AG
                <span className="text-cyan-400">.</span>
              </motion.span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, -1).map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-400 hover:text-white transition-colors text-sm font-medium"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-400 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-bold text-sm flex items-center gap-2"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 text-white"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 lg:hidden"
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-b from-gray-900 to-black z-50 lg:hidden"
            >
              {/* Close button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-white"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Links */}
              <div className="flex flex-col justify-center h-full px-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="text-4xl font-black text-white py-4 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Social links */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <p className="text-gray-500 text-sm mb-4">Get in touch</p>
                  <a
                    href="mailto:amr@gharib.dev"
                    className="text-xl text-white hover:text-cyan-400 transition-colors"
                  >
                    amr@gharib.dev
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
