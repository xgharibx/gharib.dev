'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/animated-text'
import { FloatingBlobs } from '@/components/ui/particle-background'
import { categories } from '@/lib/constants'
import { cn, formatDate } from '@/lib/utils'
import {
  Search,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  BookOpen,
} from 'lucide-react'

// Sample blog posts data
const blogPosts = [
  {
    id: 'mastering-nextjs-14',
    title: 'Mastering Next.js 14: The Complete Guide to App Router',
    excerpt: 'Dive deep into the revolutionary App Router, Server Components, and everything new in Next.js 14. Learn how to build blazing-fast web applications with the latest features.',
    content: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    category: 'web',
    tags: ['Next.js', 'React', 'Server Components', 'App Router'],
    author: 'Amr Gharib',
    publishedAt: '2024-01-15',
    readTime: 12,
    views: 4523,
    likes: 234,
    comments: 45,
    featured: true,
  },
  {
    id: 'ai-ml-beginners',
    title: 'AI & Machine Learning for Beginners: Your 2024 Roadmap',
    excerpt: 'Start your journey into artificial intelligence with this comprehensive guide. From Python basics to building your first neural network, we cover everything you need to know.',
    content: '',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    category: 'ai-ml',
    tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow'],
    author: 'Amr Gharib',
    publishedAt: '2024-01-10',
    readTime: 18,
    views: 6789,
    likes: 456,
    comments: 78,
    featured: true,
  },
  {
    id: 'flutter-vs-react-native',
    title: 'Flutter vs React Native in 2024: Which Should You Choose?',
    excerpt: 'An in-depth comparison of the two most popular cross-platform mobile development frameworks. Performance, developer experience, and real-world use cases analyzed.',
    content: '',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    category: 'mobile',
    tags: ['Flutter', 'React Native', 'Mobile Development', 'Cross-Platform'],
    author: 'Amr Gharib',
    publishedAt: '2024-01-05',
    readTime: 15,
    views: 3456,
    likes: 189,
    comments: 34,
    featured: false,
  },
  {
    id: 'cloud-architecture-patterns',
    title: 'Cloud Architecture Patterns Every Developer Should Know',
    excerpt: 'Learn the essential cloud architecture patterns that power modern applications. From microservices to serverless, understand when and how to use each pattern.',
    content: '',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    category: 'cloud',
    tags: ['AWS', 'Cloud', 'Architecture', 'Microservices'],
    author: 'Amr Gharib',
    publishedAt: '2024-01-01',
    readTime: 20,
    views: 2890,
    likes: 167,
    comments: 28,
    featured: false,
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Enterprise Applications',
    excerpt: 'Take your TypeScript skills to the next level with advanced patterns, generics, type guards, and more. Real-world examples from production codebases.',
    content: '',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    category: 'web',
    tags: ['TypeScript', 'JavaScript', 'Patterns', 'Enterprise'],
    author: 'Amr Gharib',
    publishedAt: '2023-12-28',
    readTime: 14,
    views: 4123,
    likes: 278,
    comments: 56,
    featured: false,
  },
  {
    id: 'building-saas-from-scratch',
    title: 'Building a SaaS from Scratch: Technical & Business Guide',
    excerpt: 'A complete guide to building and launching a successful SaaS product. From technical architecture to monetization strategies, learn from my experience.',
    content: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    category: 'business',
    tags: ['SaaS', 'Entrepreneurship', 'Business', 'Startup'],
    author: 'Amr Gharib',
    publishedAt: '2023-12-20',
    readTime: 25,
    views: 5678,
    likes: 345,
    comments: 89,
    featured: true,
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="relative min-h-screen pt-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              <BookOpen className="h-4 w-4" />
              Blog & Articles
            </span>
            <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Insights &
              <span className="gradient-text"> Tutorials</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Sharing knowledge, experiences, and insights from 20+ years in the tech industry
            </p>
          </div>
        </RevealOnScroll>

        {/* Search & Filters */}
        <RevealOnScroll>
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:border-dark-600 dark:bg-dark-700 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  selectedCategory === 'all'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300'
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-600 dark:text-gray-300'
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <>
            <RevealOnScroll>
              <div className="mb-8 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-500" />
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                  Featured Articles
                </h2>
              </div>
            </RevealOnScroll>

            <StaggerContainer className="mb-16 grid gap-8 lg:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.id}`}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-2xl dark:border-dark-600 dark:bg-dark-700"
                    >
                      <div className="relative aspect-[2/1] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-medium">
                              Featured
                            </span>
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                              {categories.find((c) => c.id === post.category)?.name}
                            </span>
                          </div>
                          <h3 className="mb-2 font-display text-2xl font-bold">
                            {post.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-gray-300">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime} min read
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.views.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}

        {/* All Posts */}
        <RevealOnScroll>
          <div className="mb-8 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-500" />
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              All Articles
            </h2>
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-600 dark:bg-dark-600 dark:text-gray-400">
              {filteredPosts.length}
            </span>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(regularPosts.length > 0 ? regularPosts : filteredPosts).map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl dark:border-dark-600 dark:bg-dark-700"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm dark:bg-dark-800/90 dark:text-gray-300">
                        {categories.find((c) => c.id === post.category)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 line-clamp-2 font-display text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-dark-600 dark:text-gray-400"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <RevealOnScroll>
          <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 font-display text-3xl font-bold">
              Subscribe to My Newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/80">
              Get the latest articles, tutorials, and insights delivered straight to your inbox.
              No spam, unsubscribe anytime.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-2 border-white/20 bg-white/10 px-6 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-white focus:bg-white/20 focus:outline-none"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-white/90"
              >
                Subscribe
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
