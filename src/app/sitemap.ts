import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gharib.dev'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/portfolio',
    '/services',
    '/courses',
    '/blog',
    '/appointments',
    '/contact',
  ]

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Course pages (you can fetch these dynamically from your database)
  const coursePages = [
    'full-stack-mastery',
    'ai-ml-bootcamp',
    'system-design-masterclass',
  ]

  const courseRoutes = coursePages.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Portfolio/Project pages (you can fetch these dynamically)
  const projectPages = [
    'enterprise-ai-platform',
    'defi-trading-platform',
    'healthcare-ml-system',
  ]

  const projectRoutes = projectPages.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...courseRoutes, ...projectRoutes]
}
