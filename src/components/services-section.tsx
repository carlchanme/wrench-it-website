"use client"

import Link from "next/link"
import { ArrowRight, Code, Smartphone, Bot, Zap, Users, Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    icon: Code,
    title: "Website Development",
    description: "Custom websites and web applications built with modern frameworks like React, Next.js, and Vue.js.",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"],
    iconColor: "text-white",
    iconBg: "bg-blue-600",
    hoverBg: "hover:bg-blue-500"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter.",
    features: ["Native Performance", "Cross-Platform", "App Store Deployment", "Offline Support"],
    iconColor: "text-white",
    iconBg: "bg-green-600",
    hoverBg: "hover:bg-green-500"
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Intelligent automation solutions that streamline your business processes and increase efficiency.",
    features: ["Process Automation", "AI Chatbots", "Data Analysis", "Integration APIs"],
    iconColor: "text-white",
    iconBg: "bg-purple-600",
    hoverBg: "hover:bg-purple-500"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimize your existing applications for better performance, user experience, and search rankings.",
    features: ["Speed Optimization", "Code Review", "Architecture Audit", "Scalability Planning"],
    iconColor: "text-white",
    iconBg: "bg-orange-600",
    hoverBg: "hover:bg-orange-500"
  },
  {
    icon: Users,
    title: "Team Augmentation",
    description: "Extend your development team with our experienced developers and technical experts.",
    features: ["Skilled Developers", "Project Management", "Agile Methodology", "Remote Collaboration"],
    iconColor: "text-white",
    iconBg: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-500"
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description: "Ongoing maintenance, updates, and technical support for your applications and systems.",
    features: ["24/7 Monitoring", "Security Updates", "Bug Fixes", "Performance Monitoring"],
    iconColor: "text-white",
    iconBg: "bg-red-600",
    hoverBg: "hover:bg-red-500"
  }
]

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="py-32 bg-muted/50 relative overflow-hidden">
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
            <Zap className="mr-2 h-4 w-4" />
            Comprehensive Solutions
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Our Services
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive software development and automation services 
            to help your business thrive in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mb-20"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                servicesVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full">
                {/* Card */}
                <Card className="relative h-full bg-card border shadow-lg hover:shadow-2xl rounded-2xl transition-all duration-500 hover:-translate-y-2">
                  <CardHeader className="p-8 pb-6">
                    <div className={`p-4 rounded-xl ${service.iconBg} w-fit mb-6 group-${service.hoverBg} group-hover:scale-110 transition-all duration-300`}>
                      <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm font-medium text-card-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-1000 ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <Button asChild size="lg" className="text-lg px-10 py-6 h-auto">
            <Link href="/services">
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/10 rounded-full" />
    </section>
  )
}