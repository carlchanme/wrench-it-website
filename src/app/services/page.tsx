import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Code, Smartphone, Bot, Zap, Users, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Professional Software Development Services",
  description: "Comprehensive software development and AI automation services including custom websites, mobile apps, intelligent automation, performance optimization, and team augmentation. Starting from $1,500.",
  keywords: [
    "software development services",
    "custom web development", 
    "mobile app development",
    "AI automation services",
    "performance optimization",
    "team augmentation",
    "React development",
    "Next.js development",
    "professional software solutions"
  ],
  openGraph: {
    title: "Professional Software Development Services | WrenchIT",
    description: "Expert software development and AI automation services. Custom websites, mobile apps, and intelligent automation solutions starting from $1,500.",
    url: "/services",
    type: "website",
  },
  twitter: {
    title: "Professional Software Development Services | WrenchIT",
    description: "Expert software development and AI automation services. Custom solutions starting from $1,500.",
  },
  alternates: {
    canonical: "https://wrenchit.io/services",
  },
}

const services = [
  {
    icon: Code,
    title: "Website Development",
    description: "Custom websites and web applications built with modern frameworks and technologies.",
    features: [
      "Responsive Design & Mobile Optimization",
      "SEO-Friendly Architecture",
      "Fast Loading Performance",
      "Content Management Systems",
      "E-commerce Solutions",
      "Progressive Web Apps (PWAs)"
    ],
    technologies: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Node.js"],
    startingPrice: "$2,500"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "Native iOS & Android Development",
      "Cross-Platform Solutions",
      "App Store Deployment",
      "Offline Functionality",
      "Push Notifications",
      "In-App Purchases"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS"],
    startingPrice: "$5,000"
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Intelligent automation solutions to streamline your business processes.",
    features: [
      "Process Automation",
      "AI Chatbots & Virtual Assistants",
      "Data Analysis & Insights",
      "API Integrations",
      "Workflow Optimization",
      "Machine Learning Solutions"
    ],
    technologies: ["Python", "TensorFlow", "OpenAI API", "AWS Lambda", "Azure AI", "Google Cloud AI"],
    startingPrice: "$3,000"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Optimize your existing applications for better performance and user experience.",
    features: [
      "Speed & Performance Audits",
      "Code Quality Reviews",
      "Database Optimization",
      "Scalability Planning",
      "Security Enhancements",
      "Monitoring Setup"
    ],
    technologies: ["Lighthouse", "New Relic", "Datadog", "CloudFlare", "AWS", "Google Cloud"],
    startingPrice: "$1,500"
  },
  {
    icon: Users,
    title: "Team Augmentation",
    description: "Extend your development team with our experienced developers and experts.",
    features: [
      "Skilled Full-Stack Developers",
      "Project Management Support",
      "Agile Development Methodology",
      "Remote Collaboration",
      "Knowledge Transfer",
      "Long-term Partnerships"
    ],
    technologies: ["Full-Stack", "DevOps", "Cloud", "Agile", "Scrum", "Jira"],
    startingPrice: "$4,000/month"
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description: "Ongoing maintenance, updates, and technical support for your applications.",
    features: [
      "24/7 System Monitoring",
      "Security Updates & Patches",
      "Bug Fixes & Improvements",
      "Performance Monitoring",
      "Backup & Recovery",
      "Technical Support"
    ],
    technologies: ["Monitoring Tools", "Security Scanners", "Backup Solutions", "CI/CD", "Docker", "Kubernetes"],
    startingPrice: "$500/month"
  }
]

const process = [
  {
    step: "1",
    title: "Discovery & Planning",
    description: "We start by understanding your business needs, goals, and technical requirements through detailed consultations."
  },
  {
    step: "2",
    title: "Design & Architecture",
    description: "Our team creates detailed designs and technical architecture plans that align with your objectives and best practices."
  },
  {
    step: "3",
    title: "Development & Testing",
    description: "We build your solution using agile methodologies, with regular testing and quality assurance throughout the process."
  },
  {
    step: "4",
    title: "Deployment & Launch",
    description: "We handle the deployment process and ensure your solution goes live smoothly with minimal disruption."
  },
  {
    step: "5",
    title: "Support & Maintenance",
    description: "We provide ongoing support, maintenance, and updates to keep your solution running optimally."
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive software development and AI automation services designed 
              to transform your business and drive growth.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="text-2xl font-bold text-primary">{service.startingPrice}</p>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We follow a proven process to ensure your project is delivered on time, 
              within budget, and exceeds your expectations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {process.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-secondary-foreground hover:bg-primary-foreground/10">
              <Link href="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}