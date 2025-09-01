"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight, Award, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  duration: string
  image: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

const caseStudies: CaseStudy[] = [
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform Transformation",
    client: "RetailMax Inc.",
    category: "E-commerce",
    description: "Complete redesign and development of a multi-vendor e-commerce platform with advanced inventory management and AI-powered recommendations.",
    challenge: "The client's legacy system was slow, difficult to maintain, and couldn't handle their growing customer base. They needed a scalable solution with modern features.",
    solution: "We built a new platform using Next.js and Node.js with microservices architecture, integrated AI recommendations, and implemented real-time inventory tracking.",
    results: [
      "300% increase in page load speed",
      "150% boost in conversion rates", 
      "500% improvement in mobile sales",
      "99.9% uptime since launch"
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
    duration: "4 months",
    image: "🛍️",
    liveUrl: "https://example-ecommerce.com",
    featured: true
  },
  {
    id: "healthcare-ai",
    title: "AI-Powered Healthcare Management",
    client: "MediCare Solutions",
    category: "Healthcare",
    description: "Development of an AI-driven patient management system that automates appointment scheduling and provides predictive health insights.",
    challenge: "Manual scheduling led to double-bookings and long wait times. The system needed to handle complex scheduling rules and patient preferences.",
    solution: "Created an intelligent scheduling system with ML algorithms for optimal appointment allocation and automated patient communication workflows.",
    results: [
      "75% reduction in scheduling conflicts",
      "40% decrease in patient wait times",
      "60% improvement in staff efficiency",
      "95% patient satisfaction score"
    ],
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "Docker", "AWS Lambda"],
    duration: "6 months",
    image: "🏥",
    githubUrl: "https://github.com/example/healthcare-ai",
    featured: true
  },
  {
    id: "fintech-mobile",
    title: "Mobile Banking Application",
    client: "FinanceFlow",
    category: "FinTech",
    description: "Cross-platform mobile application for personal finance management with AI-powered spending insights and budget recommendations.",
    challenge: "Users needed a comprehensive financial tool that could provide intelligent insights while maintaining bank-level security standards.",
    solution: "Built a React Native app with advanced security features, real-time transaction processing, and ML-based financial recommendations.",
    results: [
      "1M+ app downloads in first year",
      "85% user retention rate",
      "50% increase in user savings",
      "4.8-star app store rating"
    ],
    technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Plaid API", "Firebase"],
    duration: "5 months",
    image: "💳",
    liveUrl: "https://app.financeflow.com"
  },
  {
    id: "logistics-automation",
    title: "Supply Chain Automation Platform",
    client: "LogiTech Worldwide",
    category: "Logistics",
    description: "Comprehensive automation platform for supply chain management with real-time tracking and predictive analytics.",
    challenge: "Complex supply chain processes were managed manually, leading to inefficiencies, delays, and poor visibility across operations.",
    solution: "Developed an end-to-end automation platform with IoT integration, real-time tracking, and predictive analytics for demand forecasting.",
    results: [
      "45% reduction in operational costs",
      "80% improvement in delivery accuracy",
      "60% faster processing times",
      "Real-time visibility across 50+ locations"
    ],
    technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "IoT Sensors", "Docker"],
    duration: "8 months",
    image: "🚚"
  },
  {
    id: "edtech-platform",
    title: "Online Learning Management System",
    client: "EduTech Academy",
    category: "Education",
    description: "Interactive learning platform with video streaming, assessment tools, and progress tracking for online education.",
    challenge: "The pandemic created urgent need for a robust online learning platform that could handle thousands of concurrent users with interactive features.",
    solution: "Built a scalable LMS with live streaming, interactive assessments, progress analytics, and mobile-responsive design.",
    results: [
      "10,000+ concurrent users supported",
      "90% student completion rate",
      "35% improvement in test scores",
      "Available in 12 languages"
    ],
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "AWS CloudFront", "Socket.io"],
    duration: "3 months",
    image: "📚"
  },
  {
    id: "restaurant-pos",
    title: "Smart Restaurant POS System",
    client: "Bistro Chain",
    category: "Hospitality",
    description: "Modern point-of-sale system with inventory management, staff scheduling, and customer analytics for restaurant chains.",
    challenge: "Outdated POS systems couldn't integrate with modern payment methods or provide detailed analytics across multiple locations.",
    solution: "Created a cloud-based POS system with real-time synchronization, mobile payments, and comprehensive business intelligence dashboard.",
    results: [
      "25% faster order processing",
      "90% reduction in inventory waste",
      "200% increase in customer retention",
      "Deployed across 15 locations"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Square API", "Chart.js", "PWA"],
    duration: "4 months",
    image: "🍽️"
  }
]

const categories = ["All", ...Array.from(new Set(caseStudies.map(study => study.category)))]

interface PortfolioSectionProps {
  title?: string
  subtitle?: string
  maxItems?: number
  showFilter?: boolean
  compact?: boolean
}

export function PortfolioSection({ 
  title = "Our Portfolio",
  subtitle = "Real results for real businesses. Explore our recent projects and the impact we've delivered.",
  maxItems,
  showFilter = true,
  compact = false
}: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredStudies = caseStudies
    .filter(study => selectedCategory === "All" || study.category === selectedCategory)
    .slice(0, maxItems || caseStudies.length)

  const featuredStudies = filteredStudies.filter(study => study.featured)
  const regularStudies = filteredStudies.filter(study => !study.featured)

  return (
    <section className={`${compact ? 'py-12' : 'py-24'} bg-muted/50`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-6 py-2 text-sm font-medium shadow-sm mb-6">
            <Award className="mr-2 h-4 w-4" />
            Case Studies
          </div>
          <h2 className={`${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'} font-bold mb-6`}>
            {title}
          </h2>
          <p className={`${compact ? 'text-base' : 'text-xl'} text-muted-foreground max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        {showFilter && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && !compact && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredStudies.map((study) => (
                <Card key={study.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                    <div className="text-6xl">{study.image}</div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{study.category}</Badge>
                      <span className="text-sm text-muted-foreground">{study.duration}</span>
                    </div>
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <CardDescription className="text-base">{study.client}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{study.description}</p>
                    
                    {/* Key Results */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                        Key Results
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {study.results.slice(0, 4).map((result, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {study.liveUrl && (
                          <Button asChild size="sm" variant="outline">
                            <a href={study.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-2" />
                              Live Site
                            </a>
                          </Button>
                        )}
                        {study.githubUrl && (
                          <Button asChild size="sm" variant="outline">
                            <a href={study.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/portfolio/${study.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Case Studies */}
        {regularStudies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularStudies.map((study) => (
              <Card key={study.id} className="hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-3xl">{study.image}</div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{study.category}</Badge>
                    <span className="text-xs text-muted-foreground">{study.duration}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{study.title}</CardTitle>
                  <CardDescription>{study.client}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{study.description}</p>
                  
                  {/* Top Result */}
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-3 h-3 mr-2 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-400">
                        {study.results[0]}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {study.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {study.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{study.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/portfolio/${study.id}`}>
                      View Case Study
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {!compact && (
          <div className="text-center mt-16 p-8 bg-background rounded-xl shadow-sm">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our satisfied clients and let us help you achieve similar results. 
              Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}