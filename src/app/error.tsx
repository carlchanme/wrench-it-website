"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, RefreshCw, Home, Mail, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
    
    // Track error in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: true,
        event_category: 'application_error'
      })
    }
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error)
      // Send error to custom error reporting endpoint
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(reportError => {
        console.error('Failed to report error:', reportError)
      })
    }
  }, [error])

  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20"
      role="main"
      aria-labelledby="error-title"
    >
      <Card className="w-full max-w-2xl border-red-200 dark:border-red-800" role="dialog" aria-labelledby="error-title" aria-describedby="error-description">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-full bg-red-100 dark:bg-red-900/20 w-fit">
            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" aria-hidden="true" />
          </div>
          <div className="text-6xl md:text-8xl font-bold text-red-200 dark:text-red-800/50 mb-4" aria-hidden="true">
            500
          </div>
          <CardTitle id="error-title" className="text-3xl text-red-800 dark:text-red-200">Server Error</CardTitle>
          <CardDescription id="error-description" className="text-lg text-red-700 dark:text-red-300">
            Something went wrong on our end. We're working to fix this issue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Details (Development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                Error Details (Development Mode)
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* What Happened */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">What happened?</h3>
            <p className="text-muted-foreground">
              Our servers encountered an unexpected error while processing your request. 
              Our team has been automatically notified and is working on a fix.
            </p>
          </div>

          {/* Main Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              onClick={reset}
              variant="default" 
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
              Try Again
            </Button>
            <Button 
              onClick={handleGoHome}
              variant="outline"
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Go to Homepage
            </Button>
          </div>

          {/* What you can do */}
          <div className="pt-4 border-t space-y-4">
            <div className="text-center">
              <h4 className="font-semibold mb-3">What you can do:</h4>
              <div className="grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span>Wait a few minutes and try again</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span>Check if the issue persists on different pages</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span>Clear your browser cache and cookies</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span>Try using a different browser or device</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="pt-4 border-t text-center space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Still having issues?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                If the problem persists, please contact our support team. 
                Include the error ID if available.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Contact Support
                </Link>
              </Button>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  Email:{" "}
                  <a 
                    href="mailto:support@wrenchit.io" 
                    className="text-primary hover:underline focus:underline focus:outline-none"
                  >
                    support@wrenchit.io
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a 
                    href="tel:+15551234567" 
                    className="text-primary hover:underline focus:underline focus:outline-none"
                  >
                    +1 (555) 123-4567
                  </a>
                </p>
                {error.digest && (
                  <p className="font-mono">
                    Reference: {error.digest}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}