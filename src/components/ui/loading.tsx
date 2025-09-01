import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2, Skeleton } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  height?: string
}

interface LoadingButtonProps {
  loading?: boolean
  children: React.ReactNode
  className?: string
  loadingText?: string
}

interface LoadingOverlayProps {
  loading: boolean
  text?: string
  className?: string
  children: React.ReactNode
}

// Spinning loader component
export function LoadingSpinner({ 
  size = 'md', 
  className,
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Loader2 
        className={cn("animate-spin text-primary", sizeClasses[size])}
        aria-hidden="true"
      />
      {text && (
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Skeleton loading placeholder
export function LoadingSkeleton({ 
  className,
  lines = 3,
  height = "h-4"
}: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)} aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "bg-muted animate-pulse rounded",
            height,
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
          role="presentation"
        />
      ))}
    </div>
  )
}

// Loading button with spinner
export function LoadingButton({ 
  loading = false, 
  children, 
  className,
  loadingText = "Loading..."
}: LoadingButtonProps) {
  return (
    <span className={cn("inline-flex items-center justify-center", className)}>
      {loading && (
        <Loader2 
          className="w-4 h-4 animate-spin mr-2" 
          aria-hidden="true"
        />
      )}
      <span className={loading ? "sr-only" : ""}>{children}</span>
      {loading && (
        <span aria-live="polite">{loadingText}</span>
      )}
    </span>
  )
}

// Loading overlay for sections
export function LoadingOverlay({ 
  loading, 
  text = "Loading...",
  className,
  children 
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {loading && (
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          role="status"
          aria-live="polite"
          aria-label={text}
        >
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground">{text}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Card skeleton for loading states
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 border rounded-lg space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-muted animate-pulse rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted animate-pulse rounded" />
        <div className="h-3 bg-muted animate-pulse rounded" />
        <div className="h-3 bg-muted animate-pulse rounded w-5/6" />
      </div>
    </div>
  )
}

// Table skeleton
export function TableSkeleton({ 
  rows = 5, 
  columns = 4,
  className 
}: { 
  rows?: number
  columns?: number
  className?: string 
}) {
  return (
    <div className={cn("space-y-3", className)} role="status" aria-label="Loading table">
      {/* Header */}
      <div className="flex space-x-4 pb-2 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-muted animate-pulse rounded flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div 
              key={j} 
              className={cn(
                "h-3 bg-muted animate-pulse rounded flex-1",
                j === 0 ? "w-1/4" : j === columns - 1 ? "w-1/6" : "w-full"
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Loading dots animation
export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)} aria-label="Loading">
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

// Progress bar
export function LoadingProgress({ 
  progress, 
  className,
  showText = true
}: { 
  progress: number
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn("w-full", className)}>
      {showText && (
        <div className="flex justify-between text-sm mb-1">
          <span>Loading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div 
        className="w-full bg-muted rounded-full h-2"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`Loading progress: ${Math.round(progress)}%`}
      >
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

// Full page loading
export function LoadingPage({ text = "Loading..." }: { text?: string }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <p className="text-lg font-medium">{text}</p>
        <p className="text-sm text-muted-foreground">Please wait while we load the content...</p>
      </div>
    </div>
  )
}