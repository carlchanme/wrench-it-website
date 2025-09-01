// Mobile performance optimization utilities

/**
 * Detect if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768
}

/**
 * Detect if device has limited resources
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  // Check for hardware concurrency (CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  
  // Check for device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory || 4

  // Check for connection speed
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  const effectiveType = connection?.effectiveType

  return (
    hardwareConcurrency <= 2 ||
    deviceMemory <= 2 ||
    effectiveType === 'slow-2g' ||
    effectiveType === '2g'
  )
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages(): void {
  if (typeof window === 'undefined') return

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        const srcset = img.dataset.srcset
        
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
        }
        
        if (srcset) {
          img.srcset = srcset
          img.removeAttribute('data-srcset')
        }
        
        img.classList.remove('lazy')
        observer.unobserve(img)
      }
    })
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  })

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img)
  })
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(): void {
  if (typeof document === 'undefined') return

  const criticalResources = [
    // Critical CSS files
    '/fonts/inter-var.woff2',
    // Critical images
    '/images/hero-bg.webp',
    '/logo.svg'
  ]

  criticalResources.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    
    if (url.includes('.woff2')) {
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
    } else if (url.includes('.webp') || url.includes('.jpg') || url.includes('.png')) {
      link.as = 'image'
    } else if (url.includes('.svg')) {
      link.as = 'image'
      link.type = 'image/svg+xml'
    }
    
    document.head.appendChild(link)
  })
}

/**
 * Optimize animations based on device capabilities
 */
export function optimizeAnimations(): void {
  if (typeof document === 'undefined') return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const isLowEnd = isLowEndDevice()
  
  if (prefersReducedMotion.matches || isLowEnd) {
    // Disable non-essential animations
    const style = document.createElement('style')
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      
      .animate-spin,
      .animate-bounce,
      .animate-pulse {
        animation: none !important;
      }
    `
    document.head.appendChild(style)
    document.documentElement.classList.add('reduce-motion')
  }

  // Listen for changes in motion preference
  prefersReducedMotion.addEventListener('change', optimizeAnimations)
}

/**
 * Implement virtual scrolling for large lists
 */
export class VirtualScroller {
  private container: HTMLElement
  private itemHeight: number
  private visibleItems: number
  private totalItems: number
  private scrollTop = 0
  private renderItem: (index: number) => HTMLElement

  constructor(
    container: HTMLElement,
    itemHeight: number,
    totalItems: number,
    renderItem: (index: number) => HTMLElement
  ) {
    this.container = container
    this.itemHeight = itemHeight
    this.totalItems = totalItems
    this.renderItem = renderItem
    this.visibleItems = Math.ceil(container.offsetHeight / itemHeight) + 2

    this.init()
  }

  private init(): void {
    this.container.style.height = `${this.totalItems * this.itemHeight}px`
    this.container.style.position = 'relative'
    this.container.style.overflow = 'auto'

    this.container.addEventListener('scroll', () => {
      this.scrollTop = this.container.scrollTop
      this.render()
    })

    this.render()
  }

  private render(): void {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight)
    const endIndex = Math.min(startIndex + this.visibleItems, this.totalItems)

    // Clear existing items
    this.container.innerHTML = ''

    // Render visible items
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.renderItem(i)
      item.style.position = 'absolute'
      item.style.top = `${i * this.itemHeight}px`
      item.style.width = '100%'
      item.style.height = `${this.itemHeight}px`
      this.container.appendChild(item)
    }
  }
}

/**
 * Optimize touch events for mobile
 */
export function optimizeTouchEvents(): void {
  if (typeof document === 'undefined' || !isMobileDevice()) return

  // Add passive event listeners for better performance
  const passiveIfSupported = supportsPassiveEvents() ? { passive: true } : false

  // Optimize scroll events
  let scrollTimer: number | undefined
  document.addEventListener('scroll', () => {
    if (scrollTimer) {
      cancelAnimationFrame(scrollTimer)
    }
    scrollTimer = requestAnimationFrame(() => {
      document.body.classList.add('is-scrolling')
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 100)
    })
  }, passiveIfSupported)

  // Optimize touch events
  document.addEventListener('touchstart', () => {
    document.body.classList.add('is-touching')
  }, passiveIfSupported)

  document.addEventListener('touchend', () => {
    setTimeout(() => {
      document.body.classList.remove('is-touching')
    }, 300)
  }, passiveIfSupported)
}

/**
 * Check if browser supports passive event listeners
 */
function supportsPassiveEvents(): boolean {
  let passiveSupported = false
  
  try {
    const options = {
      get passive() {
        passiveSupported = true
        return false
      }
    }
    window.addEventListener('test', null as any, options)
    window.removeEventListener('test', null as any)
  } catch (err) {
    passiveSupported = false
  }
  
  return passiveSupported
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = undefined
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func(...args)
  }
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Resource hints for better loading performance
 */
export function addResourceHints(): void {
  if (typeof document === 'undefined') return

  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.googletagmanager.com',
    'www.google-analytics.com'
  ]

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = `//${domain}`
    document.head.appendChild(link)
  })

  // Preconnect to critical third-party origins
  const preconnectDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ]

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = `https://${domain}`
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Progressive Web App utilities
 */
export function initPWAOptimizations(): void {
  if (typeof window === 'undefined') return

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    })
  }

  // Handle app install prompt
  let deferredPrompt: any

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e

    // Show custom install button
    const installButton = document.querySelector('#install-app-button') as HTMLElement
    if (installButton) {
      installButton.style.display = 'block'
      
      installButton.addEventListener('click', () => {
        if (deferredPrompt) {
          deferredPrompt.prompt()
          deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt')
            }
            deferredPrompt = null
          })
        }
      })
    }
  })
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations(): void {
  if (typeof window === 'undefined') return

  // Core optimizations
  preloadCriticalResources()
  optimizeAnimations()
  optimizeTouchEvents()
  addResourceHints()

  // Lazy load images when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages)
  } else {
    lazyLoadImages()
  }

  // PWA optimizations
  initPWAOptimizations()

  // Add performance observer if available
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime)
        }
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value)
        }
      })
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
  }
}