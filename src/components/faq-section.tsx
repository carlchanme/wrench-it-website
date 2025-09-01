"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

const faqData: FAQItem[] = [
  {
    id: "project-timeline",
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation, including milestones and delivery dates.",
    category: "General"
  },
  {
    id: "pricing-structure",
    question: "How do you structure your pricing?",
    answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers. Pricing depends on project complexity, timeline, and specific requirements. We provide detailed quotes after understanding your needs and always discuss budget upfront.",
    category: "Pricing"
  },
  {
    id: "ongoing-support",
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes! We offer comprehensive maintenance and support packages including 24/7 monitoring, security updates, bug fixes, performance optimization, and feature enhancements. Our support plans are tailored to your specific needs and budget.",
    category: "Support"
  },
  {
    id: "technology-stack",
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern web technologies including React, Next.js, TypeScript, Node.js for web development; React Native and Flutter for mobile apps; and Python, TensorFlow, OpenAI API for AI automation. We choose the best technology stack for each project's requirements.",
    category: "Technical"
  },
  {
    id: "project-process",
    question: "What's your development process?",
    answer: "We follow an agile development approach with 5 key phases: Discovery & Planning, Design & Architecture, Development & Testing, Deployment & Launch, and ongoing Support & Maintenance. We provide regular updates and maintain transparent communication throughout.",
    category: "Process"
  },
  {
    id: "team-augmentation",
    question: "Can you work with our existing development team?",
    answer: "Absolutely! We offer team augmentation services and can seamlessly integrate with your existing development processes, tools, and workflows. Our developers are experienced in collaborative environments and can adapt to your team's methodology.",
    category: "Collaboration"
  },
  {
    id: "ai-automation",
    question: "How can AI automation benefit my business?",
    answer: "AI automation can significantly reduce manual work, improve accuracy, and increase efficiency. Common applications include customer service chatbots, data analysis, process automation, and predictive analytics. We'll assess your specific needs and identify the best automation opportunities.",
    category: "AI & Automation"
  },
  {
    id: "project-ownership",
    question: "Who owns the code and intellectual property?",
    answer: "You retain full ownership of all code, designs, and intellectual property created for your project. We provide complete source code, documentation, and transfer all rights upon project completion. No vendor lock-in or ongoing dependencies.",
    category: "Legal"
  },
  {
    id: "communication",
    question: "How do you handle project communication?",
    answer: "We maintain regular communication through your preferred channels (email, Slack, Teams, etc.). You'll receive weekly progress reports, have access to project management tools, and can schedule regular check-ins. We're committed to transparent, proactive communication.",
    category: "Communication"
  },
  {
    id: "revisions-changes",
    question: "How do you handle revisions and scope changes?",
    answer: "Minor revisions are included in our projects. For significant scope changes, we'll discuss the impact on timeline and budget upfront. We use a formal change request process to ensure clarity and prevent scope creep while maintaining project quality.",
    category: "Process"
  }
]

const categories = ["All", ...Array.from(new Set(faqData.map(faq => faq.category).filter(Boolean)))]

interface FAQSectionProps {
  title?: string
  subtitle?: string
  maxItems?: number
  showCategories?: boolean
  compact?: boolean
}

export function FAQSection({ 
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services and process.",
  maxItems,
  showCategories = true,
  compact = false
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFAQs = faqData
    .filter(faq => selectedCategory === "All" || faq.category === selectedCategory)
    .slice(0, maxItems || faqData.length)

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const openAll = () => {
    setOpenItems(new Set(filteredFAQs.map(faq => faq.id)))
  }

  const closeAll = () => {
    setOpenItems(new Set())
  }

  return (
    <section className={`${compact ? 'py-12' : 'py-24'} bg-background`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-6 py-2 text-sm font-medium shadow-sm mb-6">
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </div>
            <h2 className={`${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-bold mb-4`}>
              {title}
            </h2>
            <p className={`${compact ? 'text-base' : 'text-lg'} text-muted-foreground max-w-2xl mx-auto`}>
              {subtitle}
            </p>
          </div>

          {/* Category Filter */}
          {showCategories && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Bulk Actions */}
          {!compact && (
            <div className="flex justify-center gap-4 mb-8">
              <Button variant="outline" size="sm" onClick={openAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={closeAll}>
                Collapse All
              </Button>
            </div>
          )}

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <span className={`${compact ? 'text-sm' : 'text-base'} font-medium text-primary flex-shrink-0`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-left`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                        openItems.has(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                
                {openItems.has(faq.id) && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="ml-8">
                      {faq.category && (
                        <div className="mb-2">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {faq.category}
                          </span>
                        </div>
                      )}
                      <p className={`${compact ? 'text-sm' : 'text-base'} text-muted-foreground leading-relaxed`}>
                        {faq.answer}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          {!compact && (
            <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our team is here to help. Get in touch and we'll respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:carl@wrenchit.io">Email Directly</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}