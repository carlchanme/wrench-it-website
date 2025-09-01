import type { Metadata } from "next"
import { Users, Target, Award, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About WrenchIt - Expert Software Development Team",
  description: "Meet the WrenchIt team led by founder Carl Anderson. Learn about our mission, values, and 10+ years of experience in software development and AI automation services.",
  keywords: [
    "about WrenchIt",
    "software development team",
    "Carl Anderson founder",
    "AI automation experts",
    "experienced developers",
    "software development company",
    "technology consulting"
  ],
  openGraph: {
    title: "About WrenchIt - Expert Software Development Team",
    description: "Meet the WrenchIt team and learn about our mission to deliver world-class software development and AI automation services.",
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About WrenchIt - Expert Software Development Team", 
    description: "Meet our team of expert developers and AI specialists dedicated to transforming businesses.",
  },
  alternates: {
    canonical: "https://wrenchit.io/about",
  },
}

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to delivering solutions that drive real business value and help our clients achieve their goals."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in code quality, design, and user experience across all our projects."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients as partners, ensuring transparent communication throughout the development process."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Our team is passionate about technology and dedicated to staying at the forefront of industry innovations."
  }
]

const team = [
  {
    name: "Carl Anderson",
    role: "Founder & CEO",
    email: "carl@wrenchit.io",
    description: "Full-stack developer and AI enthusiast with over 10 years of experience building scalable web applications."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About WrenchIt</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're a passionate team of developers and AI specialists dedicated to building
              innovative solutions that transform businesses and improve lives.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  WrenchIt was founded with a simple yet powerful vision: to bridge the gap
                  between cutting-edge technology and practical business solutions. We believe
                  that every business, regardless of size, should have access to world-class
                  software development and AI automation.
                </p>
                <p className="mb-4">
                  What started as a small consulting practice has grown into a comprehensive
                  development studio. We've helped dozens of companies transform their operations
                  through custom software solutions, mobile applications, and intelligent automation.
                </p>
                <p>
                  Our approach is simple: we listen, we understand, and we deliver. Every project
                  is an opportunity to solve real problems and create lasting value for our clients.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">🔧</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get to know the people behind WrenchIt who are passionate about creating
              exceptional software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                  <CardDescription>
                    <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                      {member.email}
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with innovative
            software solutions and AI automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary-foreground/20 rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
