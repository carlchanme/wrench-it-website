import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  fill?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  onLoad?: () => void
  onError?: () => void
  // SEO specific props
  title?: string
  caption?: string
  credit?: string
  schema?: 'person' | 'product' | 'organization' | 'place' | 'artwork'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  sizes,
  fill = false,
  placeholder = 'empty',
  blurDataURL,
  quality = 85,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  title,
  caption,
  credit,
  schema
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate better alt text if not provided or insufficient
  const enhancedAlt = enhanceAltText(alt, src, schema)

  // Generate structured data for images
  const structuredData = schema ? generateImageStructuredData({
    src,
    alt: enhancedAlt,
    width,
    height,
    schema,
    title,
    caption,
    credit
  }) : null

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Fallback image for errors
  const fallbackSrc = '/images/fallback-image.jpg'

  if (hasError && !src.includes(fallbackSrc)) {
    return (
      <OptimizedImage
        src={fallbackSrc}
        alt={`Fallback image for: ${enhancedAlt}`}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={loading}
        sizes={sizes}
        fill={fill}
        quality={quality}
        objectFit={objectFit}
        objectPosition={objectPosition}
      />
    )
  }

  return (
    <figure className={cn("relative", className)}>
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse rounded"
          style={{ 
            aspectRatio: width && height ? `${width}/${height}` : undefined 
          }}
        />
      )}

      {/* Main Image */}
      <Image
        src={src}
        alt={enhancedAlt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        loading={loading}
        sizes={sizes || generateSizes(width)}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          objectFit === 'cover' ? "object-cover" :
          objectFit === 'contain' ? "object-contain" :
          objectFit === 'fill' ? "object-fill" :
          objectFit === 'none' ? "object-none" :
          "object-scale-down"
        )}
        style={{ objectPosition }}
        onLoad={handleLoad}
        onError={handleError}
        title={title}
      />

      {/* Caption */}
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
          {credit && (
            <span className="block text-xs opacity-75">
              Credit: {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}

// Enhance alt text based on context and schema
function enhanceAltText(alt: string, src: string, schema?: string): string {
  if (!alt || alt.trim().length === 0) {
    console.warn(`Missing alt text for image: ${src}`)
    return `Image from ${extractFilenameFromSrc(src)}`
  }

  // Check for insufficient alt text
  const insufficientTerms = ['image', 'picture', 'photo', 'img']
  if (insufficientTerms.some(term => alt.toLowerCase().trim() === term)) {
    console.warn(`Insufficient alt text for image: ${src}. Alt text: "${alt}"`)
  }

  // Add schema context if available
  if (schema) {
    const schemaPrefix = {
      person: 'Portrait of',
      product: 'Product image of',
      organization: 'Logo or image of',
      place: 'Image of location',
      artwork: 'Artwork depicting'
    }[schema]

    if (schemaPrefix && !alt.toLowerCase().includes(schemaPrefix.toLowerCase())) {
      return `${schemaPrefix} ${alt}`
    }
  }

  return alt
}

// Extract filename from image source for fallback alt text
function extractFilenameFromSrc(src: string): string {
  return src.split('/').pop()?.split('.')[0] || 'unknown'
}

// Generate responsive sizes attribute
function generateSizes(width?: number): string {
  if (!width) return '100vw'
  
  if (width <= 640) return '(max-width: 640px) 100vw, 640px'
  if (width <= 1024) return '(max-width: 1024px) 100vw, 1024px'
  return '(max-width: 1200px) 100vw, 1200px'
}

// Generate structured data for images
function generateImageStructuredData({
  src,
  alt,
  width,
  height,
  schema,
  title,
  caption,
  credit
}: {
  src: string
  alt: string
  width?: number
  height?: number
  schema: string
  title?: string
  caption?: string
  credit?: string
}) {
  const baseUrl = 'https://wrenchit.io'
  const fullSrc = src.startsWith('http') ? src : `${baseUrl}${src}`

  const imageObject = {
    "@type": "ImageObject",
    "@id": `${fullSrc}#image`,
    url: fullSrc,
    contentUrl: fullSrc,
    description: alt,
    ...(width && { width }),
    ...(height && { height }),
    ...(caption && { caption }),
    ...(title && { name: title }),
    ...(credit && {
      creator: {
        "@type": "Person",
        name: credit
      }
    })
  }

  // Add schema-specific properties
  switch (schema) {
    case 'person':
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        image: imageObject,
        ...(alt && { name: alt.replace(/portrait of /i, '') })
      }

    case 'product':
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        image: imageObject,
        ...(alt && { name: alt.replace(/product image of /i, '') })
      }

    case 'organization':
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        logo: imageObject,
        ...(alt && { name: alt.replace(/logo or image of /i, '') })
      }

    case 'place':
      return {
        "@context": "https://schema.org",
        "@type": "Place",
        photo: imageObject,
        ...(alt && { name: alt.replace(/image of location /i, '') })
      }

    case 'artwork':
      return {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        image: imageObject,
        ...(alt && { name: alt.replace(/artwork depicting /i, '') })
      }

    default:
      return {
        "@context": "https://schema.org",
        ...imageObject
      }
  }
}

// Hero image component with optimized loading
interface HeroImageProps extends Omit<OptimizedImageProps, 'priority' | 'loading'> {
  overlay?: boolean
  overlayOpacity?: number
}

export function HeroImage({ 
  overlay = false, 
  overlayOpacity = 0.4,
  className,
  ...props 
}: HeroImageProps) {
  return (
    <div className={cn("relative", className)}>
      <OptimizedImage
        {...props}
        priority={true}
        loading="eager"
        className="w-full h-full"
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Gallery image component with lazy loading
interface GalleryImageProps extends OptimizedImageProps {
  index: number
}

export function GalleryImage({ index, ...props }: GalleryImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={index < 6} // Prioritize first 6 images
      loading={index < 6 ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  )
}

// Avatar image component for profiles
interface AvatarImageProps extends Omit<OptimizedImageProps, 'objectFit'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AvatarImage({ 
  size = 'md', 
  className,
  ...props 
}: AvatarImageProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <OptimizedImage
      {...props}
      className={cn(
        "rounded-full",
        sizeClasses[size],
        className
      )}
      objectFit="cover"
      schema="person"
    />
  )
}