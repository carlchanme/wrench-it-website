import Link from "next/link"
import { ArrowRight, Phone, Mail, MessageCircle, Calendar, CheckCircle, Star, Zap, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CTAProps {
  variant?: "primary" | "secondary" | "minimal" | "urgent" | "social-proof"
  title?: string
  subtitle?: string
  primaryAction?: {
    text: string
    href: string
    icon?: any
  }
  secondaryAction?: {
    text: string
    href: string
    icon?: any
  }
  features?: string[]
  testimonial?: {
    text: string
    author: string
    role: string
    rating?: number
  }
  urgency?: string
  className?: string
}

export function PrimaryCTA({ 
  title = "Ready to Transform Your Business?",
  subtitle = "Join 100+ satisfied clients and start your digital transformation journey today. Get a free consultation and project estimate.",
  primaryAction = {
    text: "Start Your Project",
    href: "/contact",
    icon: ArrowRight
  },
  secondaryAction = {
    text: "View Our Work",
    href: "/portfolio",
    icon: Star
  },
  features = [
    "Free initial consultation",
    "Detailed project roadmap",
    "Transparent pricing",
    "24/7 support included"
  ],
  className = ""
}: CTAProps) {
  return (
    <section className={`py-24 bg-primary text-primary-foreground relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground mb-6">
              <Zap className="mr-2 h-4 w-4" />
              Let's Build Something Amazing
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-primary-foreground/90">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href={primaryAction.href}>
                {primaryAction.text}
                {primaryAction.icon && <primaryAction.icon className="ml-2 h-5 w-5" />}
              </Link>
            </Button>
            {secondaryAction && (
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href={secondaryAction.href}>
                  {secondaryAction.text}
                  {secondaryAction.icon && <secondaryAction.icon className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
            )}
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call: +1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email: carl@wrenchit.io</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SecondaryCTA({
  title = "Have a Project in Mind?",
  subtitle = "Let's discuss your requirements and explore how we can help you achieve your goals.",
  primaryAction = {
    text: "Get Free Consultation",
    href: "/contact",
    icon: MessageCircle
  },
  className = ""
}: CTAProps) {
  return (
    <section className={`py-16 bg-muted/50 ${className}`}>
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href={primaryAction.href}>
                  {primaryAction.text}
                  {primaryAction.icon && <primaryAction.icon className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export function MinimalCTA({
  title = "Ready to start your project?",
  primaryAction = {
    text: "Get Started",
    href: "/contact"
  },
  className = ""
}: CTAProps) {
  return (
    <div className={`py-8 text-center ${className}`}>
      <p className="text-lg mb-4">{title}</p>
      <Button asChild>
        <Link href={primaryAction.href}>
          {primaryAction.text}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export function UrgentCTA({
  title = "Limited Time: Free Project Analysis",
  subtitle = "Get a comprehensive analysis of your project requirements and timeline. Available for the next 7 days only.",
  urgency = "Offer expires in 7 days",
  primaryAction = {
    text: "Claim Free Analysis",
    href: "/contact",
    icon: ArrowRight
  },
  className = ""
}: CTAProps) {
  return (
    <section className={`py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="bg-white/20 text-white mb-4">
            <Calendar className="mr-2 h-4 w-4" />
            {urgency}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-90 mb-8">{subtitle}</p>
          
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href={primaryAction.href}>
              {primaryAction.text}
              {primaryAction.icon && <primaryAction.icon className="ml-2 h-5 w-5" />}
            </Link>
          </Button>
          
          <p className="text-sm opacity-75 mt-4">
            No commitment required • Free consultation • Response within 24 hours
          </p>
        </div>
      </div>
    </section>
  )
}

export function SocialProofCTA({
  title = "Join 100+ Successful Projects",
  subtitle = "See why leading companies choose WrenchIT for their most important digital initiatives.",
  testimonial = {
    text: "WrenchIT delivered exceptional results and transformed our business operations. Their expertise and professionalism are unmatched.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    rating: 5
  },
  primaryAction = {
    text: "Start Your Success Story",
    href: "/contact",
    icon: ArrowRight
  },
  className = ""
}: CTAProps) {
  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
            
            <Button asChild size="lg" className="text-lg px-8">
              <Link href={primaryAction.href}>
                {primaryAction.text}
                {primaryAction.icon && <primaryAction.icon className="ml-2 h-5 w-5" />}
              </Link>
            </Button>
          </div>

          {/* Testimonial */}
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg italic mb-6">
                "{testimonial.text}"
              </blockquote>
              <div>
                <cite className="font-semibold">{testimonial.author}</cite>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Floating CTA Component
export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
      <Card className="shadow-2xl border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">Need Help?</p>
              <p className="text-xs text-muted-foreground">Get free consultation</p>
            </div>
            <Button asChild size="sm">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sticky CTA Bar
export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-primary-foreground p-4 shadow-lg lg:hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Ready to start?</p>
            <p className="text-xs opacity-75">Free consultation available</p>
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link href="/contact">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}