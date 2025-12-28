'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Coffee,
  Rocket
} from 'lucide-react'

// Particle effect for background - using deterministic positions
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${(i * 13 + 7) % 100}%`,
            top: `${(i * 19 + 11) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: (i % 5) * 0.4,
          }}
        />
      ))}
    </div>
  )
}

// Interactive CTA cards
const ctaOptions = [
  {
    id: 'idea',
    icon: Sparkles,
    title: "I have an idea",
    description: "Let's bring it to life together",
    color: "#00d4ff",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 'problem',
    icon: Zap,
    title: "I have a problem",
    description: "I'll find the solution",
    color: "#ff00ff",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 'coffee',
    icon: Coffee,
    title: "Let's just chat",
    description: "Always happy to connect",
    color: "#ffaa00",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: 'hire',
    icon: Rocket,
    title: "I want to hire you",
    description: "Let's discuss the project",
    color: "#00ff88",
    gradient: "from-emerald-500 to-green-600"
  }
]

function CTACard({ option, isSelected, onSelect }: { 
  option: typeof ctaOptions[0]; 
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-6 rounded-2xl text-left transition-all duration-300
        ${isSelected 
          ? `bg-gradient-to-br ${option.gradient} border-transparent` 
          : 'bg-white/5 border border-white/10 hover:border-white/30'}
      `}
    >
      <option.icon 
        className={`w-8 h-8 mb-4 ${isSelected ? 'text-white' : ''}`}
        style={{ color: isSelected ? undefined : option.color }}
      />
      <h4 className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>
        {option.title}
      </h4>
      <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
        {option.description}
      </p>
      
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

export function ViralContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedCTA, setSelectedCTA] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setSelectedCTA(null)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/xgharibx", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/amrgharib", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/amrgharib", label: "Twitter" },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-black overflow-hidden"
    >
      <Particles />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-[100px] animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
            LET&apos;S
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> CREATE</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a problem that needs solving? An idea that needs building?
            <br />
            <span className="text-cyan-400">I&apos;m ready to help.</span>
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* CTA Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {ctaOptions.map((option) => (
              <CTACard
                key={option.id}
                option={option}
                isSelected={selectedCTA === option.id}
                onSelect={() => setSelectedCTA(option.id)}
              />
            ))}
          </motion.div>

          {/* Contact form */}
          <AnimatePresence mode="wait">
            {selectedCTA && !isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 30, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -30, height: 0 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl"
              >
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                      Tell me more about your {selectedCTA === 'idea' ? 'idea' : selectedCTA === 'problem' ? 'problem' : 'project'}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      placeholder={
                        selectedCTA === 'idea' 
                          ? "I have this idea about..." 
                          : selectedCTA === 'problem'
                          ? "The problem I'm facing is..."
                          : selectedCTA === 'hire'
                          ? "I'm looking for someone to..."
                          : "Hey, I'd love to chat about..."
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mb-8 flex items-center justify-center"
                >
                  <MessageCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
                <p className="text-gray-400">I&apos;ll get back to you as soon as possible.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Alternative contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6">Or reach out directly</p>
            
            <motion.a
              href="mailto:amr@gharib.dev"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-white hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-8 h-8" />
              amr@gharib.dev
            </motion.a>

            {/* Social links */}
            <div className="flex justify-center gap-6 mt-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
                >
                  <social.icon className="w-6 h-6 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
