"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Google Analytics component
export function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()

    // Send pageview to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return null
}

// Analytics utilities for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: eventName,
      ...parameters
    })
  }
}

export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
      event_category: 'conversion',
      event_label: conversionName,
      value: value,
      currency: 'USD'
    })
  }
}

// Common tracking functions for business events
export const analyticsEvents = {
  // Contact form events
  contactFormSubmit: () => trackEvent('contact_form_submit', { event_category: 'form' }),
  contactFormView: () => trackEvent('contact_form_view', { event_category: 'form' }),
  
  // Newsletter events
  newsletterSignup: (email: string) => trackEvent('newsletter_signup', { 
    event_category: 'email_marketing',
    user_email: email 
  }),
  
  // Service page events
  servicePageView: (service: string) => trackEvent('service_page_view', { 
    event_category: 'services',
    service_name: service 
  }),
  serviceInquiry: (service: string) => trackEvent('service_inquiry', { 
    event_category: 'lead_generation',
    service_name: service 
  }),
  
  // Portfolio events
  portfolioItemView: (projectId: string) => trackEvent('portfolio_view', { 
    event_category: 'portfolio',
    project_id: projectId 
  }),
  portfolioExternalLink: (projectId: string, linkType: 'live' | 'github') => trackEvent('portfolio_external_link', { 
    event_category: 'portfolio',
    project_id: projectId,
    link_type: linkType 
  }),
  
  // Blog events
  blogPostView: (postId: string, category: string) => trackEvent('blog_post_view', { 
    event_category: 'content',
    post_id: postId,
    post_category: category 
  }),
  blogShare: (postId: string, platform: string) => trackEvent('blog_share', { 
    event_category: 'content',
    post_id: postId,
    share_platform: platform 
  }),
  
  // CTA events
  ctaClick: (ctaLocation: string, ctaText: string) => trackEvent('cta_click', { 
    event_category: 'cta',
    cta_location: ctaLocation,
    cta_text: ctaText 
  }),
  
  // Phone and email events
  phoneClick: () => trackEvent('phone_click', { event_category: 'contact' }),
  emailClick: () => trackEvent('email_click', { event_category: 'contact' }),
  
  // File downloads
  fileDownload: (fileName: string) => trackEvent('file_download', { 
    event_category: 'downloads',
    file_name: fileName 
  }),
  
  // Search events
  siteSearch: (searchTerm: string) => trackEvent('search', { 
    event_category: 'site_search',
    search_term: searchTerm 
  }),
  
  // Conversions
  projectInquiry: (value?: number) => trackConversion('project_inquiry', value),
  consultationBooked: (value?: number) => trackConversion('consultation_booked', value),
}

// Enhanced event tracking hook
export function useAnalytics() {
  const trackPageView = (pageName: string, customParameters?: Record<string, any>) => {
    trackEvent('page_view', {
      page_name: pageName,
      ...customParameters
    })
  }

  const trackUserEngagement = (engagementType: string, duration?: number) => {
    trackEvent('user_engagement', {
      engagement_type: engagementType,
      engagement_time_msec: duration
    })
  }

  const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'error') => {
    trackEvent('form_interaction', {
      form_name: formName,
      form_action: action
    })
  }

  return {
    trackPageView,
    trackUserEngagement,
    trackFormInteraction,
    ...analyticsEvents
  }
}

// Performance tracking
export const trackWebVitals = (metric: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

// Scroll tracking
export const useScrollTracking = () => {
  useEffect(() => {
    let maxScroll = 0
    let scrollTimeouts: number[] = []

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        
        // Track milestone scroll percentages
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          trackEvent('scroll_depth', {
            event_category: 'engagement',
            scroll_depth: scrollPercent
          })
        }
      }
    }

    const handleScroll = () => {
      // Clear existing timeouts
      scrollTimeouts.forEach(clearTimeout)
      
      // Set a new timeout to track scroll after user stops scrolling
      const timeout = window.setTimeout(trackScroll, 150)
      scrollTimeouts.push(timeout)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollTimeouts.forEach(clearTimeout)
    }
  }, [])
}

// Time on page tracking
export const useTimeOnPage = () => {
  useEffect(() => {
    const startTime = Date.now()
    let isVisible = true

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }

    const trackTimeOnPage = () => {
      if (isVisible) {
        const timeSpent = Date.now() - startTime
        const minutes = Math.floor(timeSpent / 60000)
        
        if (minutes > 0) {
          trackEvent('time_on_page', {
            event_category: 'engagement',
            time_minutes: minutes
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', trackTimeOnPage)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', trackTimeOnPage)
      trackTimeOnPage() // Track time when component unmounts
    }
  }, [])
}