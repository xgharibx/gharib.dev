'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Coffee,
  Lightbulb,
  Code,
  Brain,
  Rocket,
  Music,
  Gamepad2,
  Book,
  Camera
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Timeline data
const timeline = [
  { year: 2007, age: 9, event: "Wrote first line of code", detail: "HTML on Notepad. Changed my life forever.", icon: Code },
  { year: 2010, age: 12, event: "Built first website", detail: "A gaming forum with 500+ members.", icon: Rocket },
  { year: 2014, age: 16, event: "Won first hackathon", detail: "Built an app in 24 hours that judges couldn't believe.", icon: Lightbulb },
  { year: 2016, age: 18, event: "Started teaching", detail: "Realized teaching is the best way to learn.", icon: Book },
  { year: 2018, age: 20, event: "First ML project", detail: "Built a neural network from scratch. Mind = Blown.", icon: Brain },
  { year: 2020, age: 22, event: "Launched first startup", detail: "Failed fast, learned faster.", icon: Rocket },
  { year: 2022, age: 24, event: "Led AI team", detail: "Shipped products used by millions.", icon: Code },
  { year: 2025, age: 27, event: "The journey continues", detail: "Every day is a new problem to solve.", icon: Lightbulb },
]

// Skills with visual representation
const skills = [
  { name: "Problem Solving", level: 98, color: "#00d4ff" },
  { name: "Full-Stack Development", level: 95, color: "#ff00ff" },
  { name: "AI/Machine Learning", level: 90, color: "#00ff88" },
  { name: "UI/UX Design", level: 85, color: "#ffaa00" },
  { name: "System Architecture", level: 92, color: "#ff5555" },
  { name: "Team Leadership", level: 88, color: "#8855ff" },
]

// Fun facts
const funFacts = [
  { icon: Coffee, label: "Coffee consumed", value: "∞ cups" },
  { icon: Music, label: "Coding soundtrack", value: "Lo-Fi Beats" },
  { icon: Gamepad2, label: "Favorite game", value: "Chess" },
  { icon: Camera, label: "Side hobby", value: "Photography" },
]

// Animated skill bar
function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(barRef, { once: true })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setWidth(skill.level), index * 100)
    }
  }, [isInView, skill.level, index])

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">
          {skill.name}
        </span>
        <span className="text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Timeline item
function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: "-50px" })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all"
        >
          <span className="text-cyan-400 font-black text-3xl">{item.year}</span>
          <span className="text-gray-500 ml-2">(Age {item.age})</span>
          <h4 className="text-xl font-bold text-white mt-2">{item.event}</h4>
          <p className="text-gray-400 mt-1">{item.detail}</p>
        </motion.div>
      </div>

      {/* Center icon */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 items-center justify-center z-10">
        <item.icon className="w-6 h-6 text-white" />
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  )
}

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-gradient-to-b from-black via-gray-900/30 to-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ y }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">
            THE
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"> STORY</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Not just a developer. Not just a designer. 
            <br />
            <span className="text-cyan-400">A problem solver with 18 years of curiosity.</span>
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Left: Photo and quick facts */}
          <motion.div
            ref={imageRef}
            style={{ scale }}
            className="relative"
          >
            {/* Profile image */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-30" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Amr Gharib"
                  fill
                  className="object-cover"
                />
                {/* Overlay with name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-black text-white">Amr Gharib</h3>
                  <div className="flex items-center gap-4 mt-2 text-gray-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      27 years old
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Earth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fun facts */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <fact.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-xs">{fact.label}</p>
                  <p className="text-white font-bold">{fact.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Philosophy and skills */}
          <div className="space-y-12">
            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-black text-white flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-400" />
                My Philosophy
              </h3>
              <div className="space-y-4 text-lg text-gray-300">
                <p>
                  I believe <span className="text-cyan-400 font-bold">problems are gifts</span> — 
                  opportunities disguised as obstacles. Where others see complexity, I see puzzles waiting to be solved.
                </p>
                <p>
                  I&apos;m not interested in building what already exists. I want to create 
                  <span className="text-purple-400 font-bold"> what hasn&apos;t been imagined yet</span>.
                </p>
                <p>
                  Every line of code I write, every interface I design, every system I architect 
                  starts with one question: <span className="text-pink-400 font-bold">&ldquo;What problem does this solve?&rdquo;</span>
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-black text-white">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-4xl font-black text-white text-center mb-16">
            The Journey
          </h3>

          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-16 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

          {/* Timeline items */}
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
