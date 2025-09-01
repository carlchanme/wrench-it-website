"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, CheckCircle, AlertCircle, Loader2, Gift, TrendingUp, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const newsletterSchema = z.object({
  email: z.string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .max(254, "Email address is too long")
    .refine(email => !email.includes('..'), "Email cannot contain consecutive dots")
    .refine(email => !email.startsWith('.'), "Email cannot start with a dot")
    .refine(email => !email.endsWith('.'), "Email cannot end with a dot"),
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes")
    .optional()
    .or(z.literal("")),
  interests: z.array(z.string()).optional()
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "modal" | "footer"
  title?: string
  subtitle?: string
  placeholder?: string
  showBenefits?: boolean
  showInterests?: boolean
  compact?: boolean
}

const benefits = [
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description: "Latest trends in software development and AI"
  },
  {
    icon: Gift,
    title: "Exclusive Content",
    description: "Free resources, templates, and guides"
  },
  {
    icon: Bell,
    title: "Early Access", 
    description: "First to know about new services and updates"
  }
]

const interests = [
  "Web Development",
  "Mobile Apps", 
  "AI Automation",
  "Cloud & DevOps",
  "Case Studies",
  "Industry News"
]

export function NewsletterSignup({
  variant = "card",
  title = "Stay Updated",
  subtitle = "Get the latest insights on software development, AI automation, and technology trends delivered to your inbox.",
  placeholder = "Enter your email address",
  showBenefits = true,
  showInterests = false,
  compact = false
}: NewsletterSignupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      interests: []
    }
  })

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Add selected interests to form data
      const formDataWithInterests = {
        ...data,
        interests: selectedInterests
      }

      // Validate email format one more time client-side
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        setError("email", {
          type: "manual",
          message: "Please enter a valid email address"
        })
        return
      }

      // Check for common typos in email domains
      const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']
      const domain = data.email.split('@')[1]?.toLowerCase()
      
      // Here you would integrate with your email service (Mailchimp, ConvertKit, etc.)
      console.log("Newsletter signup:", formDataWithInterests)
      
      // Simulate API call with potential failures
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 10% failure rate for testing
          if (Math.random() < 0.1) {
            reject(new Error("Network error"))
          } else {
            resolve(undefined)
          }
        }, 1000)
      })
      
      setIsSubmitted(true)
      reset()
      setSelectedInterests([])
    } catch (error: any) {
      console.error("Newsletter signup error:", error)
      
      // Handle specific error types
      let errorMessage = "Failed to subscribe. Please try again."
      
      if (error.message?.includes("Network")) {
        errorMessage = "Network error. Please check your connection and try again."
      } else if (error.message?.includes("already subscribed")) {
        errorMessage = "This email is already subscribed to our newsletter."
      } else if (error.message?.includes("invalid email")) {
        errorMessage = "Please enter a valid email address."
      }
      
      setError("root", {
        type: "manual",
        message: errorMessage
      })
    }
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const renderContent = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thanks for subscribing!</h3>
          <p className="text-muted-foreground mb-4">
            Check your email for a confirmation link to complete your subscription.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            size="sm"
          >
            Subscribe Another Email
          </Button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className={variant === "inline" ? "text-left" : "text-center"}>
          <h3 className={`font-bold mb-2 ${compact ? 'text-lg' : 'text-xl md:text-2xl'}`}>
            {title}
          </h3>
          <p className={`text-muted-foreground ${compact ? 'text-sm' : 'text-base'}`}>
            {subtitle}
          </p>
        </div>

        {/* Benefits */}
        {showBenefits && !compact && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <benefit.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">{benefit.title}</div>
                  <div className="text-xs text-muted-foreground">{benefit.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field (optional) */}
          {variant === "card" && !compact && (
            <div>
              <label htmlFor="newsletter-firstName" className="sr-only">
                First Name (Optional)
              </label>
              <Input
                id="newsletter-firstName"
                {...register("firstName")}
                placeholder="First Name (Optional)"
                className={errors.firstName ? "border-red-500" : ""}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                  <AlertCircle className="inline w-4 h-4 mr-1" />
                  {errors.firstName.message}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className={variant === "inline" ? "flex space-x-2" : ""}>
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address (Required)
              </label>
              <Input
                id="newsletter-email"
                {...register("email")}
                type="email"
                placeholder={placeholder}
                className={errors.email ? "border-red-500" : ""}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                autoComplete="email"
                required
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  <AlertCircle className="inline w-4 h-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>
            
            {variant === "inline" && (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                aria-describedby={errors.root ? "form-error" : undefined}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span className="sr-only">Submitting subscription...</span>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            )}
          </div>

          {/* Interests */}
          {showInterests && !compact && (
            <fieldset>
              <legend className="block text-sm font-medium mb-3">
                What interests you? (Optional)
              </legend>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Interest selection">
                {interests.map((interest, index) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none"
                    onClick={() => toggleInterest(interest)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleInterest(interest)
                      }
                    }}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={selectedInterests.includes(interest)}
                    aria-label={`${interest} interest`}
                  >
                    {interest}
                    {selectedInterests.includes(interest) && (
                      <CheckCircle className="ml-1 w-3 h-3" aria-hidden="true" />
                    )}
                  </Badge>
                ))}
              </div>
            </fieldset>
          )}

          {/* Error Message */}
          {errors.root && (
            <div 
              id="form-error" 
              className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm font-medium">{errors.root.message}</p>
            </div>
          )}

          {/* Submit Button (for non-inline variants) */}
          {variant !== "inline" && (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
              size={compact ? "sm" : "default"}
              aria-describedby={errors.root ? "form-error" : undefined}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Submitting subscription...</span>
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Subscribe to Newsletter
                </>
              )}
            </Button>
          )}
        </form>

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground text-center">
          We respect your privacy. Unsubscribe at any time.{" "}
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    )
  }

  // Render based on variant
  switch (variant) {
    case "card":
      return (
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      )

    case "modal":
      return (
        <div className="max-w-md mx-auto p-6 bg-background rounded-lg">
          {renderContent()}
        </div>
      )

    case "footer":
      return (
        <div className="max-w-sm">
          {renderContent()}
        </div>
      )

    case "inline":
    default:
      return (
        <div className="max-w-2xl mx-auto">
          {renderContent()}
        </div>
      )
  }
}