import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { ViralNavbar } from '@/components/layout/viral-navbar'
import { ViralFooter } from '@/components/layout/viral-footer'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gharib.dev'),
  title: {
    default: 'Amr Gharib - Problem Solver & Idea Creator | The World Has Problems, I Have Solutions',
    template: '%s | Amr Gharib',
  },
  description: 'The world has problems. I have solutions. 18+ years of turning impossible into inevitable. Full-stack developer, AI/ML engineer, and relentless innovator. I see the problems others overlook and create solutions others can\'t imagine.',
  keywords: [
    'Amr Gharib',
    'Problem Solver',
    'Full Stack Developer',
    'Software Engineer',
    'Tech Educator',
    'AI/ML Expert',
    'Blockchain Developer',
    'Cloud Architect',
    'React Developer',
    'Next.js Expert',
    'Node.js Developer',
    'Python Developer',
    'Web Development',
    'Mobile Development',
    'System Design',
    'Programming Courses',
    'Tech Consulting',
    'Startup CTO',
    'Technical Mentor',
    'Cairo Developer',
    'Egypt Tech',
  ],
  authors: [{ name: 'Amr Gharib', url: 'https://gharib.dev' }],
  creator: 'Amr Gharib',
  publisher: 'Amr Gharib',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gharib.dev',
    siteName: 'Amr Gharib',
    title: 'Amr Gharib - Problem Solver & Idea Creator',
    description: 'The world has problems. I have solutions. 18+ years of turning impossible into inevitable.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Amr Gharib - Problem Solver & Idea Creator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amr Gharib - Problem Solver & Idea Creator',
    description: 'The world has problems. I have solutions. 18+ years of turning impossible into inevitable.',
    creator: '@amrgharib',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://gharib.dev',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#101113' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <ViralNavbar />
            <div className="flex-1">{children}</div>
            <ViralFooter />
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'glass-card',
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
