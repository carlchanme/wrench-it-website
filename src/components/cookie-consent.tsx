"use client"

import { useState, useEffect } from "react"
import { X, Cookie, Settings, Shield, BarChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const cookieTypes = {
  necessary: {
    title: "Necessary Cookies",
    description: "Essential for the website to function properly. Cannot be disabled.",
    icon: Shield,
    examples: ["Session management", "Security features", "Load balancing"]
  },
  analytics: {
    title: "Analytics Cookies", 
    description: "Help us understand how visitors interact with our website.",
    icon: BarChart,
    examples: ["Google Analytics", "Page views", "User behavior"]
  },
  marketing: {
    title: "Marketing Cookies",
    description: "Used to track visitors and display relevant advertisements.",
    icon: Users,
    examples: ["Social media pixels", "Retargeting", "Ad personalization"]
  },
  functional: {
    title: "Functional Cookies",
    description: "Enable enhanced functionality and personalization.",
    icon: Settings,
    examples: ["Theme preferences", "Language settings", "Form data"]
  }
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a delay to not interrupt initial page load
      setTimeout(() => setShowBanner(true), 2000)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      
      // Initialize analytics and other services based on preferences
      if (savedPreferences.analytics) {
        initializeAnalytics()
      }
      if (savedPreferences.marketing) {
        initializeMarketing()
      }
      if (savedPreferences.functional) {
        initializeFunctional()
      }
    }
  }, [])

  const initializeAnalytics = () => {
    // Initialize Google Analytics
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && typeof window !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
      console.log('Analytics initialized')
    }
  }

  const initializeMarketing = () => {
    // Initialize marketing pixels (Facebook, LinkedIn, etc.)
    console.log('Marketing cookies initialized')
  }

  const initializeFunctional = () => {
    // Initialize functional cookies
    console.log('Functional cookies initialized')
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    
    // Initialize all services
    initializeAnalytics()
    initializeMarketing()
    initializeFunctional()
    
    // Track acceptance
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cookie_consent', {
        event_category: 'consent',
        event_label: 'accept_all'
      })
    }
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    
    setPreferences(onlyNecessary)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    setShowBanner(false)
    
    // Clear any existing tracking
    if (typeof window !== 'undefined') {
      // Clear Google Analytics
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          send_page_view: false
        })
      }
    }
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowSettings(false)
    
    // Initialize services based on preferences
    if (preferences.analytics) {
      initializeAnalytics()
    }
    if (preferences.marketing) {
      initializeMarketing()
    }
    if (preferences.functional) {
      initializeFunctional()
    }
    
    // Track preference selection
    if (typeof window !== 'undefined' && window.gtag && preferences.analytics) {
      window.gtag('event', 'cookie_consent', {
        event_category: 'consent',
        event_label: 'custom_preferences',
        custom_parameters: preferences
      })
    }
  }

  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return // Cannot toggle necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  // Don't render if banner shouldn't be shown
  if (!showBanner) return null

  return (
    <>
      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cookie className="h-6 w-6 text-primary" />
                  <CardTitle>Cookie Preferences</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Choose which cookies you want to accept. You can change these settings at any time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cookie Types */}
              {Object.entries(cookieTypes).map(([key, config]) => {
                const isEnabled = preferences[key as keyof CookiePreferences]
                const Icon = config.icon
                const isNecessary = key === 'necessary'
                
                return (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-semibold flex items-center space-x-2">
                            <span>{config.title}</span>
                            {isNecessary && (
                              <Badge variant="secondary" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {config.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => togglePreference(key as keyof CookiePreferences)}
                          disabled={isNecessary}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                          } ${isNecessary ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {/* Examples */}
                    <div className="ml-8 text-xs text-muted-foreground">
                      <span className="font-medium">Examples: </span>
                      {config.examples.join(', ')}
                    </div>
                  </div>
                )
              })}
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
                <Button variant="outline" onClick={handleAcceptAll} className="flex-1">
                  Accept All
                </Button>
                <Button variant="outline" onClick={handleRejectAll} className="flex-1">
                  Reject All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-2xl">
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start space-x-3 flex-1">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="font-semibold">We use cookies</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.{" "}
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="underline hover:no-underline text-primary"
                  >
                    Customize preferences
                  </button>{" "}
                  or read our{" "}
                  <a href="/privacy" className="underline hover:no-underline text-primary">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                variant="outline"
                onClick={handleRejectAll}
                size="sm"
                className="w-full sm:w-auto"
              >
                Reject All
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                onClick={handleAcceptAll}
                size="sm"
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Hook to check cookie consent status
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null)
  
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent')
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent))
    }
  }, [])
  
  const hasConsent = (type: keyof CookiePreferences) => {
    return consent?.[type] ?? false
  }
  
  const updateConsent = (newConsent: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent))
    setConsent(newConsent)
  }
  
  return {
    consent,
    hasConsent,
    updateConsent
  }
}

// Component to show cookie settings link in footer
export function CookieSettingsLink() {
  const [, setShowSettings] = useState(false)
  
  const openSettings = () => {
    // This would need to be connected to the main cookie consent component
    // For now, it opens the preferences again
    localStorage.removeItem('cookie-consent')
    window.location.reload()
  }
  
  return (
    <button 
      onClick={openSettings}
      className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
    >
      Cookie Settings
    </button>
  )
}