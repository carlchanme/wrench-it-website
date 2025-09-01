"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      budget: "",
      message: ""
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      // EmailJS configuration - replace with your actual service ID, template ID, and public key
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_your_id"
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_your_id"
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"

      const templateParams = {
        to_name: "WrenchIt Team",
        from_name: data.name,
        from_email: data.email,
        company: data.company || "Not specified",
        phone: data.phone || "Not specified",
        service: data.service,
        budget: data.budget || "Not specified",
        message: data.message,
        reply_to: data.email
      }

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

      if (response.status === 200) {
        reset()
      }
    } catch (error) {
      console.error("Email send failed:", error)
      setError("root", {
        type: "manual",
        message: "Failed to send message. Please try again or contact us directly at carl@wrenchit.io"
      })
    }
  }

  if (isSubmitSuccessful) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">
                Message Sent Successfully!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            {...register("email")}
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <Input
            id="company"
            type="text"
            placeholder="Your Company"
            {...register("company")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service Interested In *
          </label>
          <select
            id="service"
            {...register("service")}
            className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              errors.service ? "border-red-500 focus-visible:ring-red-500" : "border-input"
            }`}
          >
            <option value="">Select a service</option>
            <option value="website">Website Development</option>
            <option value="mobile">Mobile App Development</option>
            <option value="ai">AI Automation</option>
            <option value="optimization">Performance Optimization</option>
            <option value="team">Team Augmentation</option>
            <option value="support">Maintenance & Support</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Project Budget
          </label>
          <select
            id="budget"
            {...register("budget")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select budget range</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-15k">$5,000 - $15,000</option>
            <option value="15k-50k">$15,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="over-100k">Over $100,000</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Project Description *
        </label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Please describe your project requirements, goals, and any specific features you have in mind..."
          {...register("message")}
          className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {errors.root && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-700 dark:text-red-300">
                {errors.root.message}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
