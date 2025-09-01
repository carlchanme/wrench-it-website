import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact Us - Get Your Free Project Quote",
  description: "Contact WrenchIt for expert software development and AI automation services. Free consultation and project quotes. Email carl@wrenchit.io or use our contact form. Response within 24 hours.",
  keywords: [
    "contact software developers",
    "free project quote", 
    "software development consultation",
    "AI automation experts",
    "custom software inquiry",
    "web development contact",
    "mobile app development quote"
  ],
  openGraph: {
    title: "Contact WrenchIt - Get Your Free Project Quote",
    description: "Contact WrenchIt for expert software development and AI automation services. Free consultation and project quotes available.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact WrenchIt - Get Your Free Project Quote",
    description: "Get expert software development and AI automation services. Free consultation available.",
  },
  alternates: {
    canonical: "https://wrenchit.io/contact",
  },
}

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "carl@wrenchit.io",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
    description: "Call us during business hours"
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Remote & On-site",
    description: "We work with clients worldwide"
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon-Fri 9AM-6PM EST",
    description: "We'll respond within 24 hours"
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to transform your business with cutting-edge software solutions? 
              Let's discuss your project and how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        <p className="text-lg font-medium text-primary">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose WrenchIt?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      10+ years of development experience
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      Proven track record with 50+ projects
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      Latest technologies and best practices
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      Transparent communication
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      Ongoing support and maintenance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Here are some common questions we get from our clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does a typical project take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Project timelines vary based on complexity and scope. Simple websites can take 2-4 weeks, 
                  while complex applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you provide ongoing support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We offer comprehensive maintenance and support packages to keep your applications 
                  running smoothly, secure, and up-to-date with the latest technologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What technologies do you specialize in?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We specialize in modern web technologies like React, Next.js, Node.js, TypeScript, 
                  as well as mobile development with React Native and Flutter, plus AI/ML technologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can you work with our existing team?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! We offer team augmentation services and can seamlessly integrate with 
                  your existing development processes and workflows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}