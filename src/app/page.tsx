import { Metadata } from 'next'
import { ViralHeroSection } from '@/components/sections/viral-hero'
import { ProblemsSection } from '@/components/sections/problems-section'
import { IdeasSection } from '@/components/sections/ideas-section'
import { ShowcaseSection } from '@/components/sections/showcase-section'
import { TechStackSection } from '@/components/sections/tech-stack-section'
import { StorySection } from '@/components/sections/story-section'
import { TestimonialShowcase } from '@/components/sections/testimonial-showcase'
import { ViralContactSection } from '@/components/sections/viral-contact'
import { StatementMarquee } from '@/components/ui/marquee'
import { ProblemRadarSection } from '@/components/sections/problem-radar'
import { LoadingWrapper } from '@/components/ui/loading-wrapper'

export const metadata: Metadata = {
  title: 'Amr Gharib - Problem Solver & Idea Creator | The World Has Problems',
  description: 'The world has problems. I have solutions. 18+ years of turning impossible into inevitable. Meet Amr Gharib - Full-stack developer, AI/ML engineer, and relentless innovator who sees the problems others overlook.',
}

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amr Gharib',
  url: 'https://gharib.dev',
  image: 'https://gharib.dev/og.png',
  sameAs: [
    'https://github.com/xgharibx',
    'https://linkedin.com/in/amrgharib',
    'https://twitter.com/amrgharib',
  ],
  jobTitle: 'Problem Solver & Full Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Gharib.dev',
  },
  description: 'The world has problems. I have solutions. 18+ years of turning impossible into inevitable.',
  knowsAbout: [
    'Full Stack Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Cloud Architecture',
    'System Design',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'TypeScript',
  ],
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingWrapper>
        <main className="bg-black">
          <ViralHeroSection />
          <StatementMarquee 
            statements={[
              'Problem Solver',
              'Idea Creator',
              'Full Stack Developer',
              'AI/ML Engineer',
              'Tech Educator',
              'Innovation Leader',
            ]}
          />
          <ProblemRadarSection />
          <ProblemsSection />
          <IdeasSection />
          <ShowcaseSection />
          <TechStackSection />
          <StorySection />
          <TestimonialShowcase />
          <ViralContactSection />
        </main>
      </LoadingWrapper>
    </>
  )
}
