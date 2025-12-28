'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Problem nodes with connections
const problemNodes: ProblemNode[] = [
  {
    id: 1,
    title: 'Performance Bottleneck',
    category: 'Technical',
    description: 'Identifying hidden inefficiencies in system architecture',
    x: 20,
    y: 30,
    connections: [2, 4, 7],
    severity: 'critical',
  },
  {
    id: 2,
    title: 'UX Friction',
    category: 'Design',
    description: 'Removing invisible barriers in user journeys',
    x: 45,
    y: 15,
    connections: [1, 3, 5],
    severity: 'high',
  },
  {
    id: 3,
    title: 'Data Silos',
    category: 'Architecture',
    description: 'Breaking down walls between information systems',
    x: 75,
    y: 25,
    connections: [2, 6, 8],
    severity: 'medium',
  },
  {
    id: 4,
    title: 'Tech Debt',
    category: 'Development',
    description: 'Untangling legacy code that slows innovation',
    x: 15,
    y: 60,
    connections: [1, 5, 7],
    severity: 'high',
  },
  {
    id: 5,
    title: 'Scaling Limits',
    category: 'Infrastructure',
    description: 'Finding growth ceilings before they crash systems',
    x: 40,
    y: 50,
    connections: [2, 4, 6, 8],
    severity: 'critical',
  },
  {
    id: 6,
    title: 'Security Gaps',
    category: 'Security',
    description: 'Detecting vulnerabilities others overlook',
    x: 70,
    y: 55,
    connections: [3, 5, 9],
    severity: 'critical',
  },
  {
    id: 7,
    title: 'Process Inefficiency',
    category: 'Operations',
    description: 'Streamlining workflows that waste time',
    x: 25,
    y: 85,
    connections: [1, 4, 8],
    severity: 'medium',
  },
  {
    id: 8,
    title: 'Integration Complexity',
    category: 'Systems',
    description: 'Simplifying connections between platforms',
    x: 55,
    y: 80,
    connections: [3, 5, 7, 9],
    severity: 'high',
  },
  {
    id: 9,
    title: 'AI Adoption',
    category: 'Innovation',
    description: 'Identifying where AI creates real value',
    x: 80,
    y: 75,
    connections: [6, 8],
    severity: 'medium',
  },
]

interface ProblemNode {
  id: number
  title: string
  category: string
  description: string
  x: number
  y: number
  connections: number[]
  severity: 'critical' | 'high' | 'medium'
}

const severityColors: Record<ProblemNode['severity'], { bg: string; border: string; text: string; glow: string }> = {
  critical: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-400', glow: 'shadow-red-500/50' },
  high: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-400', glow: 'shadow-orange-500/50' },
  medium: { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-400', glow: 'shadow-yellow-500/50' },
}

export function ProblemRadarSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode, setActiveNode] = useState<ProblemNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [scanAngle, setScanAngle] = useState(0)
  const [discoveredNodes, setDiscoveredNodes] = useState<Set<number>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  // Combined ref
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node
    inViewRef(node)
  }, [inViewRef])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Radar scan animation
  useEffect(() => {
    if (!inView) return
    
    let animationId: number
    const animate = () => {
      setScanAngle((prev) => {
        const newAngle = (prev + 0.5) % 360
        
        // Discover nodes as scan passes over them
        problemNodes.forEach((node) => {
          const nodeAngle = Math.atan2(node.y - 50, node.x - 50) * (180 / Math.PI) + 180
          const angleDiff = Math.abs(newAngle - nodeAngle)
          if (angleDiff < 10 || angleDiff > 350) {
            setDiscoveredNodes((prev) => new Set([...prev, node.id]))
          }
        })
        
        return newAngle
      })
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [inView])

  // Draw connections on canvas
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      problemNodes.forEach((node) => {
        if (!discoveredNodes.has(node.id)) return
        
        node.connections.forEach((targetId) => {
          if (!discoveredNodes.has(targetId)) return
          
          const target = problemNodes.find((n) => n.id === targetId)
          if (!target) return
          
          const startX = (node.x / 100) * canvas.width
          const startY = (node.y / 100) * canvas.height
          const endX = (target.x / 100) * canvas.width
          const endY = (target.y / 100) * canvas.height
          
          // Animated pulse along the connection
          const time = Date.now() / 1000
          const pulse = Math.sin(time * 2 + node.id) * 0.5 + 0.5
          
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          
          const isActive = hoveredNode === node.id || hoveredNode === targetId
          ctx.strokeStyle = isActive
            ? `rgba(0, 212, 255, ${0.5 + pulse * 0.5})`
            : `rgba(0, 212, 255, ${0.1 + pulse * 0.1})`
          ctx.lineWidth = isActive ? 2 : 1
          ctx.stroke()
          
          // Draw pulse traveling along the line
          if (isActive) {
            const pulsePos = (time * 0.5) % 1
            const px = startX + (endX - startX) * pulsePos
            const py = startY + (endY - startY) * pulsePos
            
            ctx.beginPath()
            ctx.arc(px, py, 4, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(0, 212, 255, 0.8)'
            ctx.fill()
          }
        })
      })

      requestAnimationFrame(draw)
    }
    
    const animId = requestAnimationFrame(draw)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animId)
    }
  }, [discoveredNodes, hoveredNode])

  return (
    <section
      ref={setRefs}
      className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
      id="problem-radar"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Radar sweep effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `conic-gradient(
            from ${scanAngle}deg at 50% 50%,
            transparent 0deg,
            rgba(0, 212, 255, 0.1) 30deg,
            transparent 60deg,
            transparent 360deg
          )`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            PROBLEM RADAR
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-white">I See What</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Others Miss
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My approach is like a radar system - constantly scanning for hidden problems, 
            mapping their connections, and revealing patterns that lead to breakthrough solutions.
          </p>
        </motion.div>

        {/* Radar visualization */}
        <div className="relative aspect-square max-w-4xl mx-auto">
          {/* Canvas for connections */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Radar circles */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[20, 40, 60, 80].map((r, i) => (
              <circle
                key={r}
                cx="50"
                cy="50"
                r={r / 2}
                fill="none"
                stroke="rgba(0, 212, 255, 0.1)"
                strokeWidth="0.2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
            {/* Cross hairs */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(0, 212, 255, 0.1)" strokeWidth="0.2" />
          </svg>

          {/* Problem nodes */}
          {problemNodes.map((node, index) => {
            const isDiscovered = discoveredNodes.has(node.id)
            const isHovered = hoveredNode === node.id
            const isActive = activeNode?.id === node.id
            const colors = severityColors[node.severity]

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isDiscovered ? 1 : 0,
                  scale: isDiscovered ? 1 : 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setActiveNode(isActive ? null : node)}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${colors.bg} ${
                    isHovered || isActive ? 'opacity-50 scale-150' : 'opacity-20 scale-100'
                  }`}
                />
                
                {/* Node dot */}
                <motion.div
                  className={`
                    relative w-4 h-4 rounded-full cursor-pointer
                    ${colors.bg} ${colors.glow}
                    shadow-lg transition-all duration-300
                    ${isHovered || isActive ? 'scale-150' : 'scale-100'}
                  `}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: isHovered || isActive
                      ? `0 0 20px currentColor`
                      : `0 0 10px currentColor`,
                  }}
                >
                  {/* Pulse rings */}
                  <div className={`absolute inset-0 rounded-full ${colors.border} border animate-ping opacity-50`} />
                  <div className={`absolute inset-0 rounded-full ${colors.border} border animate-ping opacity-30`} style={{ animationDelay: '0.5s' }} />
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isHovered || isActive ? 1 : 0,
                    y: isHovered || isActive ? 0 : 10,
                  }}
                  className={`
                    absolute left-1/2 -translate-x-1/2 top-full mt-2
                    px-3 py-1 bg-black/90 border ${colors.border}
                    rounded-lg whitespace-nowrap text-sm ${colors.text}
                    pointer-events-none z-20
                  `}
                >
                  {node.title}
                </motion.div>
              </motion.div>
            )
          })}

          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Active node details panel */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className={`
                relative p-8 bg-gray-900/80 backdrop-blur-xl rounded-2xl
                border ${severityColors[activeNode.severity].border}
              `}>
                {/* Close button */}
                <button
                  onClick={() => setActiveNode(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close details"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-start gap-4">
                  <div className={`w-4 h-4 mt-1 rounded-full ${severityColors[activeNode.severity].bg}`} />
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-wider ${severityColors[activeNode.severity].text}`}>
                      {activeNode.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                      {activeNode.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {activeNode.description}
                    </p>
                    
                    {/* Connections */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <span className="text-sm text-gray-500">Connected problems:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {activeNode.connections.map((connId) => {
                          const connNode = problemNodes.find((n) => n.id === connId)
                          if (!connNode) return null
                          return (
                            <button
                              key={connId}
                              onClick={() => setActiveNode(connNode)}
                              className={`
                                px-3 py-1 text-sm rounded-full
                                bg-white/5 hover:bg-white/10
                                border border-white/10 hover:border-cyan-500/50
                                text-gray-400 hover:text-cyan-400
                                transition-all duration-200
                              `}
                            >
                              {connNode.title}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {Object.entries(severityColors).map(([severity, colors]) => (
            <div key={severity} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
              <span className="text-sm text-gray-500 capitalize">{severity} Priority</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { value: '500+', label: 'Problems Identified', color: 'text-cyan-400' },
            { value: '98%', label: 'Resolution Rate', color: 'text-purple-400' },
            { value: '3x', label: 'Faster Detection', color: 'text-pink-400' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-5xl font-black ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-500 uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
