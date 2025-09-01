import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wrenchit.io'
  const currentDate = new Date()
  
  // Get blog posts dynamically
  const posts = getAllPosts()
  
  // Main pages with high priority
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = [
    'web-development',
    'mobile-app-development', 
    'ai-automation',
    'cloud-solutions',
    'devops-consulting',
    'ui-ux-design',
    'api-development',
    'database-design',
    'e-commerce-development',
    'enterprise-solutions',
    'cms-development',
    'consulting'
  ].map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Portfolio/Case study pages
  const portfolioPages: MetadataRoute.Sitemap = [
    'ecommerce-platform-transformation',
    'healthcare-app-development',
    'fintech-mobile-solution',
    'logistics-management-system',
    'social-media-platform',
    'ai-chatbot-integration',
    'enterprise-crm-system',
    'real-estate-platform',
    'education-management-system',
    'restaurant-ordering-app'
  ].map(project => ({
    url: `${baseUrl}/portfolio/${project}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog posts (dynamic from CMS or getAllPosts)
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  // Technology pages
  const technologyPages: MetadataRoute.Sitemap = [
    'react',
    'nextjs', 
    'typescript',
    'nodejs',
    'python',
    'aws',
    'docker',
    'kubernetes',
    'mongodb',
    'postgresql'
  ].map(tech => ({
    url: `${baseUrl}/technologies/${tech}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Industry pages
  const industryPages: MetadataRoute.Sitemap = [
    'healthcare',
    'fintech',
    'e-commerce',
    'education',
    'real-estate',
    'logistics',
    'manufacturing',
    'startups',
    'enterprise'
  ].map(industry => ({
    url: `${baseUrl}/industries/${industry}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Team member pages
  const teamPages: MetadataRoute.Sitemap = [
    'carl-rodriguez',
    'sarah-johnson', 
    'mike-chen',
    'emily-davis',
    'alex-thompson'
  ].map(member => ({
    url: `${baseUrl}/team/${member}`,
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }))

  // Resource pages
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/resources/whitepapers`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/resources/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    }
  ]

  // Legal and policy pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    }
  ]

  return [
    ...mainPages,
    ...servicePages,
    ...portfolioPages,
    ...blogPages,
    ...technologyPages,
    ...industryPages,
    ...teamPages,
    ...resourcePages,
    ...legalPages
  ]
}