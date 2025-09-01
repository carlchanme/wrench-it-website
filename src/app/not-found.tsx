"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft, FileQuestion, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function NotFoundPage() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center p-4 bg-muted/50"
      aria-labelledby="not-found-title"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
            <FileQuestion className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>
          <div className="text-6xl md:text-8xl font-bold text-muted/30 mb-4" aria-hidden="true">
            404
          </div>
          <CardTitle id="not-found-title" className="text-3xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            We couldn't find the page you're looking for. It may have been moved, deleted, or you may have mistyped the URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Button asChild variant="default" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                Go to Homepage
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/services">
                <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                Browse Services
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Or search for what you're looking for:
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Search our website..."
                className="flex-1"
                aria-label="Search website"
              />
              <Button type="button" size="icon" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Popular Links */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-3 text-center">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="ghost" size="sm">
                <Link href="/services">Services</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/portfolio">Portfolio</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/about">About Us</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">Blog</Link>
              </Button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Still can't find what you're looking for?
            </p>
            <div className="space-y-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Contact Support
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Or email us directly at{" "}
                <a 
                  href="mailto:carl@wrenchit.io" 
                  className="text-primary hover:underline focus:underline focus:outline-none"
                >
                  carl@wrenchit.io
                </a>
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
