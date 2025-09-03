"use client"

import { useState, useEffect } from "react"
import { Star, Building } from "lucide-react"

interface Client {
  id: string
  name: string
  logo?: string
  industry: string
  description?: string
  testimonial?: string
  rating?: number
}

const clients: Client[] = [
  {
    id: "techstart-inc",
    name: "TechStart Inc.",
    logo: "🚀",
    industry: "Technology",
    description: "AI-powered startup platform",
    testimonial: "WrenchIT delivered exceptional results",
    rating: 5
  },
  {
    id: "ecommercemax",
    name: "EcommerceMax",
    logo: "🛍️", 
    industry: "E-commerce",
    description: "Multi-vendor marketplace",
    rating: 5
  },
  {
    id: "financeflow",
    name: "FinanceFlow",
    logo: "💳",
    industry: "FinTech",
    description: "Digital banking solutions",
    rating: 5
  },
  {
    id: "healthtech-solutions",
    name: "HealthTech Solutions",
    logo: "🏥",
    industry: "Healthcare",
    description: "Patient management systems",
    rating: 5
  },
  {
    id: "edutech-academy",
    name: "EduTech Academy",
    logo: "📚",
    industry: "Education",
    description: "Online learning platforms",
    rating: 5
  },
  {
    id: "retailmax-inc",
    name: "RetailMax Inc.",
    logo: "🏬",
    industry: "Retail",
    description: "Inventory management systems",
    rating: 5
  },
  {
    id: "logistics-worldwide",
    name: "Logistics Worldwide",
    logo: "🚚",
    industry: "Logistics",
    description: "Supply chain automation",
    rating: 5
  },
  {
    id: "restaurant-chain",
    name: "Bistro Chain",
    logo: "🍽️",
    industry: "Hospitality",
    description: "POS and management systems",
    rating: 5
  },
  {
    id: "autoflow-systems",
    name: "AutoFlow Systems",
    logo: "⚙️",
    industry: "Manufacturing",
    description: "Process automation solutions",
    rating: 5
  },
  {
    id: "datadriven-co",
    name: "DataDriven Co.",
    logo: "📊",
    industry: "Analytics",
    description: "Business intelligence platforms",
    rating: 5
  },
  {
    id: "growthhub-marketing",
    name: "GrowthHub Marketing",
    logo: "📈",
    industry: "Marketing",
    description: "Digital marketing automation",
    rating: 5
  },
  {
    id: "innovatenow-labs",
    name: "InnovateNow Labs",
    logo: "🔬",
    industry: "Research",
    description: "R&D management systems",
    rating: 5
  }
]

interface ClientLogosSectionProps {
  title?: string
  subtitle?: string
  showTestimonials?: boolean
  animated?: boolean
  compact?: boolean
  maxItems?: number
}

export function ClientLogosSection({ 
  title = "Trusted by Industry Leaders",
  subtitle = "Join 100+ satisfied clients who trust WrenchIT with their most critical projects.",
  showTestimonials = false,
  animated = true,
  compact = false,
  maxItems
}: ClientLogosSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const displayClients = maxItems ? clients.slice(0, maxItems) : clients
  
  useEffect(() => {
    if (!animated) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayClients.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [animated, displayClients.length])

  return (
    <section className={`${compact ? 'py-12' : 'py-20'} bg-background`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {!compact && (
            <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-6 py-2 text-sm font-medium shadow-sm mb-6">
              <Building className="mr-2 h-4 w-4" />
              Our Clients
            </div>
          )}
          <h2 className={`${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} font-bold mb-4`}>
            {title}
          </h2>
          <p className={`${compact ? 'text-sm' : 'text-lg'} text-muted-foreground max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Stats */}
        {!compact && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        )}

        {/* Client Logos Grid */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-8">
            {displayClients.map((client, index) => (
              <div
                key={client.id}
                className={`group relative p-6 rounded-lg bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  animated && index === currentIndex ? 'ring-2 ring-primary/20 shadow-lg' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                    {client.logo}
                  </div>
                  <div className="font-semibold text-sm mb-1">{client.name}</div>
                  <div className="text-xs text-muted-foreground mb-2">{client.industry}</div>
                  
                  {client.rating && (
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(client.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                  
                  {client.description && (
                    <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {client.description}
                    </div>
                  )}
                </div>
                
                {/* Hover overlay with testimonial */}
                {showTestimonials && client.testimonial && (
                  <div className="absolute inset-0 bg-card/95 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs italic mb-2">"{client.testimonial}"</p>
                      <div className="text-xs font-medium">{client.name}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4">
              {displayClients.slice(0, 8).map((client, index) => (
                <div
                  key={client.id}
                  className="group p-4 rounded-lg bg-card border hover:shadow-md transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{client.logo}</div>
                    <div className="font-semibold text-xs mb-1">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.industry}</div>
                    
                    {client.rating && (
                      <div className="flex justify-center space-x-1 mt-2">
                        {[...Array(client.rating)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        {showTestimonials && !compact && (
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold mb-8">What Our Clients Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.filter(client => client.testimonial).slice(0, 3).map((client) => (
                <div key={client.id} className="p-6 bg-muted/50 rounded-lg">
                  <div className="flex justify-center mb-3">
                    {[...Array(client.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm italic mb-4">"{client.testimonial}"</p>
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-lg">{client.logo}</span>
                    <div>
                      <div className="font-semibold text-sm">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.industry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {!compact && (
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Ready to join our growing list of satisfied clients?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Your Project
              </button>
              <button className="px-8 py-3 border border-input rounded-lg font-medium hover:bg-accent transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        )}

        {/* Industry Diversity */}
        {!compact && (
          <div className="mt-16 text-center">
            <h3 className="text-lg font-semibold mb-4">Industries We Serve</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from(new Set(clients.map(client => client.industry))).map((industry) => (
                <span 
                  key={industry}
                  className="px-4 py-2 bg-muted text-sm rounded-full"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}