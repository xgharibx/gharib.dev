import { Metadata } from 'next'
import { AboutSection } from '@/components/sections/about-section'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn about Amr Gharib - a world-class programmer with 20+ years of experience, educator, and entrepreneur. Dual degrees from The American University in Cairo.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
    </div>
  )
}
