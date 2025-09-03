"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "WrenchIT delivered an exceptional website that perfectly captured our brand. Their attention to detail and technical expertise is unmatched. The results exceeded our expectations.",
    rating: 5,
    avatar: "SJ",
    bgColor: "bg-blue-600"
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "EcoSolutions",
    content: "The mobile app they built for us exceeded all expectations. User engagement increased by 300% after launch. Their team's professionalism is outstanding.",
    rating: 5,
    avatar: "MC",
    bgColor: "bg-green-600"
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "AutoFlow",
    content: "Their AI automation solution saved us countless hours of manual work. The ROI was evident within the first month of implementation. Game-changing results.",
    rating: 5,
    avatar: "ER",
    bgColor: "bg-purple-600"
  },
  {
    name: "David Thompson",
    role: "CTO",
    company: "DataDriven Co.",
    content: "Professional, reliable, and innovative. WrenchIT transformed our legacy system into a modern, scalable platform. The migration was seamless.",
    rating: 5,
    avatar: "DT",
    bgColor: "bg-orange-600"
  },
  {
    name: "Lisa Park",
    role: "Marketing Director",
    company: "GrowthLab",
    content: "Outstanding work on our website redesign. The new site is not only beautiful but also performs incredibly well in search rankings. Traffic increased 250%.",
    rating: 5,
    avatar: "LP",
    bgColor: "bg-indigo-600"
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    company: "InnovateNow",
    content: "WrenchIT's team became an extension of our own. Their expertise in both development and AI automation is truly impressive. Couldn't ask for better partners.",
    rating: 5,
    avatar: "JW",
    bgColor: "bg-red-600"
  }
]

export function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 })
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-6 py-2 text-sm font-medium shadow-sm mb-6">
            <Star className="mr-2 h-4 w-4 fill-current" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients have to say 
            about working with WrenchIT.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                testimonialsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="h-full bg-card border shadow-lg hover:shadow-2xl rounded-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-primary text-primary group-hover:scale-110 transition-transform duration-300" 
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-xl ${testimonial.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-lg font-bold text-white">
                          {testimonial.avatar}
                        </span>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {testimonial.role}
                      </CardDescription>
                      <CardDescription className="text-muted-foreground font-medium">
                        {testimonial.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 text-center transition-all duration-1000 ${
          testimonialsVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '900ms' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground font-medium">Happy Clients</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5.0</div>
              <div className="text-muted-foreground font-medium">Average Rating</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground font-medium">Projects Completed</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full" />
    </section>
  )
}
