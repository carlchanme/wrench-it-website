// Structured data (JSON-LD) utilities for SEO

import { Organization, WebSite, WebPage, BreadcrumbList, Service, Person, FAQPage, Article, Review } from 'schema-dts'

interface StructuredDataProps {
  url?: string
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'webpage' | 'article' | 'service' | 'faq' | 'organization'
  breadcrumbs?: Array<{ name: string; url: string }>
  author?: string
  datePublished?: string
  dateModified?: string
}

// Organization structured data
export function createOrganizationData(): Organization {
  return {
    "@type": "Organization",
    "@id": "https://wrenchit.io/#organization",
    name: "WrenchIt",
    url: "https://wrenchit.io",
    logo: {
      "@type": "ImageObject",
      url: "https://wrenchit.io/logo.png",
      width: 200,
      height: 60
    },
    image: "https://wrenchit.io/og-image.png",
    description: "Professional software development and AI automation services. We build modern websites, mobile apps, and intelligent automation solutions to transform your business.",
    email: "carl@wrenchit.io",
    telephone: "+1-555-123-4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94102",
      addressCountry: "US"
    },
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Carl Rodriguez",
      email: "carl@wrenchit.io"
    },
    sameAs: [
      "https://www.linkedin.com/company/wrenchit-io",
      "https://twitter.com/wrenchit_io",
      "https://github.com/wrenchit-io"
    ],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 37.7749,
        longitude: -122.4194
      },
      geoRadius: "100000" // 100km radius
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description: "Modern web application development using React, Next.js, and TypeScript"
        }
      },
      {
        "@type": "Offer", 
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description: "Native and cross-platform mobile application development"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", 
          name: "AI Automation",
          description: "Intelligent automation solutions and AI integration services"
        }
      }
    ]
  }
}

// Website structured data
export function createWebsiteData(): WebSite {
  return {
    "@type": "WebSite",
    "@id": "https://wrenchit.io/#website",
    url: "https://wrenchit.io",
    name: "WrenchIt - Software Development & AI Automation",
    description: "Professional software development and AI automation services. We build modern websites, mobile apps, and intelligent automation solutions.",
    publisher: {
      "@id": "https://wrenchit.io/#organization"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://wrenchit.io/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "en-US"
  }
}

// Service page structured data
export function createServiceData(service: {
  name: string
  description: string
  price?: string
  url: string
}): Service {
  return {
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@id": "https://wrenchit.io/#organization"
    },
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    serviceType: service.name,
    url: service.url,
    ...(service.price && {
      offers: {
        "@type": "Offer",
        price: service.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      }
    })
  }
}

// FAQ page structured data
export function createFAQData(faqs: Array<{ question: string; answer: string }>): FAQPage {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
}

// Article structured data
export function createArticleData({
  title,
  description,
  url,
  image,
  author = "WrenchIt Team",
  datePublished,
  dateModified
}: {
  title: string
  description: string
  url: string
  image?: string
  author?: string
  datePublished?: string
  dateModified?: string
}): Article {
  return {
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
        width: 1200,
        height: 630
      }
    }),
    author: {
      "@type": "Person",
      name: author
    },
    publisher: {
      "@id": "https://wrenchit.io/#organization"
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    inLanguage: "en-US"
  }
}

// Breadcrumb structured data
export function createBreadcrumbData(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
}

// Person structured data (for team members)
export function createPersonData({
  name,
  jobTitle,
  email,
  image,
  bio
}: {
  name: string
  jobTitle: string
  email?: string
  image?: string
  bio?: string
}): Person {
  return {
    "@type": "Person",
    name: name,
    jobTitle: jobTitle,
    worksFor: {
      "@id": "https://wrenchit.io/#organization"
    },
    ...(email && { email }),
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image
      }
    }),
    ...(bio && { description: bio })
  }
}

// Review structured data
export function createReviewData({
  reviewBody,
  reviewRating,
  author,
  datePublished
}: {
  reviewBody: string
  reviewRating: number
  author: string
  datePublished: string
}): Review {
  return {
    "@type": "Review",
    reviewBody: reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviewRating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      "@type": "Person",
      name: author
    },
    datePublished: datePublished,
    itemReviewed: {
      "@id": "https://wrenchit.io/#organization"
    }
  }
}

// Generate complete structured data for a page
export function generateStructuredData(props: StructuredDataProps) {
  const structuredData: any[] = []

  // Always include organization data
  structuredData.push(createOrganizationData())

  // Always include website data
  structuredData.push(createWebsiteData())

  // Add page-specific data
  if (props.type === 'webpage' || props.type === 'website') {
    const pageData: WebPage = {
      "@type": "WebPage",
      "@id": `${props.url}#webpage`,
      url: props.url || "https://wrenchit.io",
      name: props.title || "WrenchIt - Software Development & AI Automation",
      description: props.description || "Professional software development and AI automation services.",
      isPartOf: {
        "@id": "https://wrenchit.io/#website"
      },
      about: {
        "@id": "https://wrenchit.io/#organization"
      },
      ...(props.image && {
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: props.image,
          width: 1200,
          height: 630
        }
      }),
      inLanguage: "en-US"
    }
    structuredData.push(pageData)
  }

  // Add breadcrumbs if provided
  if (props.breadcrumbs && props.breadcrumbs.length > 0) {
    structuredData.push(createBreadcrumbData(props.breadcrumbs))
  }

  return {
    "@context": "https://schema.org",
    "@graph": structuredData
  }
}

// Local business structured data (if WrenchIt has a physical location)
export function createLocalBusinessData() {
  return {
    "@type": "LocalBusiness",
    "@id": "https://wrenchit.io/#localbusiness",
    name: "WrenchIt",
    url: "https://wrenchit.io",
    telephone: "+1-555-123-4567",
    email: "carl@wrenchit.io",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Street",
      addressLocality: "San Francisco", 
      addressRegion: "CA",
      postalCode: "94102",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00"
      }
    ],
    priceRange: "$$",
    servesCuisine: "Software Development",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1
    }
  }
}

// Software application structured data (for web apps)
export function createSoftwareApplicationData({
  name,
  description,
  url,
  applicationCategory = "WebApplication",
  operatingSystem = "All"
}: {
  name: string
  description: string
  url: string
  applicationCategory?: string
  operatingSystem?: string
}) {
  return {
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    url: url,
    applicationCategory: applicationCategory,
    operatingSystem: operatingSystem,
    creator: {
      "@id": "https://wrenchit.io/#organization"
    },
    aggregateRating: {
      "@type": "AggregateRating", 
      ratingValue: 4.8,
      reviewCount: 45,
      bestRating: 5,
      worstRating: 1
    }
  }
}