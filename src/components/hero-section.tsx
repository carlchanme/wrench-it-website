import Link from "next/link"
import { ArrowRight, Code, Smartphone, Bot, Award, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center space-y-8 mb-20">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-6 py-2 text-sm font-medium shadow-sm">
              <Award className="mr-2 h-4 w-4" />
              Trusted by 100+ businesses worldwide
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
              <span className="block">Build the</span>
              <span className="block text-primary">Future</span>
              <span className="block">with WrenchIT</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional software development and AI automation services that transform 
              your business with reliable, scalable solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="text-lg px-10 py-6 h-auto">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-10 py-6 h-auto">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm">
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm border">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-card-foreground">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm border">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium text-card-foreground">Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm border">
                <Award className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-card-foreground">Award Winning</span>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group relative">
              <div className="bg-card border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-4 rounded-xl bg-blue-600 w-fit mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Web Development</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Modern, responsive websites and web applications built with cutting-edge 
                  technologies like React, Next.js, and TypeScript.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-card border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-4 rounded-xl bg-green-600 w-fit mb-6 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">Mobile Apps</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Native iOS and Android applications, plus cross-platform solutions 
                  that deliver exceptional user experiences across all devices.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-card border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="p-4 rounded-xl bg-purple-600 w-fit mb-6 group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">AI Automation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Intelligent automation solutions and AI integrations that streamline 
                  workflows and unlock new possibilities for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
        
        {/* Subtle accent shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-primary/5 rounded-full" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-secondary/10 rounded-full" />
        
        {/* Clean lines */}
        <div className="absolute top-0 left-1/4 w-px h-40 bg-border" />
        <div className="absolute bottom-0 right-1/3 w-px h-32 bg-border" />
      </div>
    </section>
  )
}