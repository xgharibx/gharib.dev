'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: "https://www.gharib.dev", label: "GitHub" },
  { icon: Linkedin, href: "https://www.gharib.dev", label: "LinkedIn" },
  { icon: Twitter, href: "https://www.gharib.dev", label: "Twitter" },
  { icon: Mail, href: "mailto:amr@gharib.dev", label: "Email" },
]

const quickLinks = [
  { href: '#problems', label: 'Problems' },
  { href: '#ideas', label: 'Ideas' },
  { href: '#work', label: 'Work' },
  { href: '#story', label: 'Story' },
  { href: '#contact', label: 'Contact' },
]

export function ViralFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h3 className="text-3xl font-black text-white">
                AMR GHARIB
                <span className="text-cyan-400">.</span>
              </h3>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Problem solver. Idea creator. Building the future, one solution at a time.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <a
                href="mailto:amr@gharib.dev"
                className="block text-gray-400 hover:text-cyan-400 transition-colors"
              >
                amr@gharib.dev
              </a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-bold"
              >
                Start a Project
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Amr Gharib. Built with
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            and endless curiosity.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
