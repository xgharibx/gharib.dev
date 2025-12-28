'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/ui/loading-screen'

interface LoadingWrapperProps {
  children: React.ReactNode
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleLoadComplete = () => {
    setShowContent(true)
    // Small delay before fully removing loading screen
    setTimeout(() => setIsLoaded(true), 100)
  }

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={handleLoadComplete} minDuration={2000} />}
      <div 
        style={{ 
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </>
  )
}

export default LoadingWrapper
