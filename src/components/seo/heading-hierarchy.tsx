"use client"

import { ReactNode, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// SEO-optimized heading components with proper hierarchy

interface HeadingProps {
  readonly children: ReactNode
  readonly className?: string
  readonly id?: string
}

// H1 - Page title (should only be used once per page)
export function H1({ children, className, id }: HeadingProps) {
  return (
    <h1 
      id={id}
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
        "text-balance", // Better text wrapping
        className
      )}
    >
      {children}
    </h1>
  )
}

// H2 - Main sections
export function H2({ children, className, id }: HeadingProps) {
  return (
    <h2 
      id={id}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        "text-balance",
        className
      )}
    >
      {children}
    </h2>
  )
}

// H3 - Subsections
export function H3({ children, className, id }: HeadingProps) {
  return (
    <h3 
      id={id}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        "text-balance",
        className
      )}
    >
      {children}
    </h3>
  )
}

// H4 - Sub-subsections
export function H4({ children, className, id }: HeadingProps) {
  return (
    <h4 
      id={id}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        "text-balance",
        className
      )}
    >
      {children}
    </h4>
  )
}

// H5 - Minor sections
export function H5({ children, className, id }: HeadingProps) {
  return (
    <h5 
      id={id}
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        "text-balance",
        className
      )}
    >
      {children}
    </h5>
  )
}

// H6 - Smallest headings
export function H6({ children, className, id }: HeadingProps) {
  return (
    <h6 
      id={id}
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-tight",
        "text-balance",
        className
      )}
    >
      {children}
    </h6>
  )
}

// Utility to automatically generate anchor IDs from heading text
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// SEO Section component that enforces proper heading structure
interface SEOSectionProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6
  readonly title: string
  readonly children: ReactNode
  readonly className?: string
  readonly id?: string
  readonly generateId?: boolean
}

export function SEOSection({ 
  level, 
  title, 
  children, 
  className,
  id,
  generateId = true 
}: SEOSectionProps) {
  const headingId = id || (generateId ? generateHeadingId(title) : undefined)
  
  const HeadingComponent = {
    1: H1,
    2: H2, 
    3: H3,
    4: H4,
    5: H5,
    6: H6
  }[level]

  return (
    <section className={className} aria-labelledby={headingId}>
      <HeadingComponent id={headingId}>
        {title}
      </HeadingComponent>
      {children}
    </section>
  )
}

// Breadcrumb component for better navigation and SEO
interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}

interface BreadcrumbsProps {
  readonly items: readonly BreadcrumbItem[]
  readonly className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length <= 1) return null

  return (
    <nav 
      className={cn("mb-4", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-foreground transition-colors"
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={index === items.length - 1 ? "text-foreground font-medium" : ""}
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Table of Contents component for long pages
interface TOCItem {
  readonly id: string
  readonly title: string
  readonly level: number
  readonly children?: readonly TOCItem[]
}

interface TableOfContentsProps {
  readonly items: readonly TOCItem[]
  readonly className?: string
  readonly activeId?: string
}

export function TableOfContents({ 
  items, 
  className, 
  activeId 
}: Readonly<TableOfContentsProps>) {
  if (items.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getPaddingClass = (level: number) => {
    if (level === 2) return "pl-0"
    if (level === 3) return "pl-4"
    if (level === 4) return "pl-8"
    return "pl-12"
  }

  const getChildPaddingClass = (level: number) => {
    if (level === 3) return "pl-4"
    if (level === 4) return "pl-8"
    return "pl-12"
  }

  return (
    <nav className={cn("", className)} aria-label="Table of contents">
      <div className="text-sm font-semibold mb-4">Contents</div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                "text-left hover:text-primary transition-colors w-full",
                getPaddingClass(item.level),
                activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {item.title}
            </button>
            {item.children && item.children.length > 0 && (
              <ul className="mt-1 space-y-1">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <button
                      onClick={() => scrollToHeading(child.id)}
                      className={cn(
                        "text-left hover:text-primary transition-colors w-full text-xs",
                        getChildPaddingClass(child.level),
                        activeId === child.id ? "text-primary font-medium" : "text-muted-foreground"
                      )}
                    >
                      {child.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Hook to automatically generate table of contents from page headings
export function useTableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter(heading => heading.id) // Only include headings with IDs
      .map(heading => ({
        id: heading.id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      }))

    setToc(headings)

    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return { toc, activeId }
}
