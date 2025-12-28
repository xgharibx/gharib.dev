'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import { MotionProvider, PerformanceMonitor } from '@/lib/motion-system'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if device is mobile for optimized smooth scrolling
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      )
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <MotionProvider>
          {children}
        </MotionProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <MotionProvider>
        <ReactLenis 
          root 
          options={{ 
            lerp: isMobile ? 0.15 : 0.1, 
            duration: isMobile ? 1.2 : 1.5, 
            smoothWheel: !isMobile,
            touchMultiplier: 1.5,
          }}
        >
          <div className="contents">
            {children}
            <PerformanceMonitor />
          </div>
        </ReactLenis>
      </MotionProvider>
    </ThemeProvider>
  )
}
