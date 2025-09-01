// Performance monitoring and web vitals tracking

interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
  id: string
  navigationType: string
}

interface PerformanceData {
  url: string
  timestamp: number
  userAgent: string
  connection?: string
  deviceMemory?: number
  hardwareConcurrency?: number
  metrics: {
    lcp?: number // Largest Contentful Paint
    fid?: number // First Input Delay  
    cls?: number // Cumulative Layout Shift
    fcp?: number // First Contentful Paint
    ttfb?: number // Time to First Byte
    inp?: number // Interaction to Next Paint
  }
  navigation?: {
    type: string
    redirectCount: number
  }
  resources?: {
    totalSize: number
    imageSize: number
    jsSize: number
    cssSize: number
    fontSize: number
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Track page load performance
  trackPageLoad()
  
  // Track Core Web Vitals
  trackWebVitals()
  
  // Track resource timing
  trackResourceTiming()
  
  // Track navigation timing
  trackNavigationTiming()
  
  // Track long tasks
  trackLongTasks()
  
  // Track memory usage
  trackMemoryUsage()
}

// Track page load performance
function trackPageLoad() {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const loadTime = perfData.loadEventEnd - perfData.loadEventStart
    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
    const totalTime = perfData.loadEventEnd - perfData.fetchStart
    
    reportPerformanceMetric({
      name: 'page_load',
      value: totalTime,
      metrics: {
        loadTime,
        domContentLoaded,
        totalTime
      }
    })
  })
}

// Track Core Web Vitals
function trackWebVitals() {
  // Track Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as any
        
        const lcp = lastEntry.startTime
        reportWebVital({
          name: 'LCP',
          value: lcp,
          rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor'
        })
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch (e) {
      console.warn('LCP observer failed:', e)
    }

    // Track First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[]
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime
          reportWebVital({
            name: 'FID', 
            value: fid,
            rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor'
          })
        })
      })
      fidObserver.observe({ type: 'first-input', buffered: true })
    } catch (e) {
      console.warn('FID observer failed:', e)
    }

    // Track Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[]
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        
        reportWebVital({
          name: 'CLS',
          value: clsValue,
          rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor'
        })
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })
    } catch (e) {
      console.warn('CLS observer failed:', e)
    }

    // Track First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries[0]
        const fcp = fcpEntry.startTime
        
        reportWebVital({
          name: 'FCP',
          value: fcp,
          rating: fcp <= 1800 ? 'good' : fcp <= 3000 ? 'needs-improvement' : 'poor'
        })
      })
      fcpObserver.observe({ type: 'paint', buffered: true })
    } catch (e) {
      console.warn('FCP observer failed:', e)
    }

    // Track Time to First Byte (TTFB)
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      
      reportWebVital({
        name: 'TTFB',
        value: ttfb,
        rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor'
      })
    } catch (e) {
      console.warn('TTFB calculation failed:', e)
    }
  }
}

// Track resource timing
function trackResourceTiming() {
  if ('PerformanceObserver' in window) {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[]
        
        entries.forEach((entry) => {
          const resourceData = {
            name: entry.name,
            type: getResourceType(entry.name),
            size: entry.transferSize || 0,
            duration: entry.duration,
            startTime: entry.startTime,
            cacheHit: entry.transferSize === 0 && entry.decodedBodySize > 0
          }
          
          // Report slow resources
          if (resourceData.duration > 1000) {
            reportPerformanceMetric({
              name: 'slow_resource',
              value: resourceData.duration,
              resource: resourceData
            })
          }
        })
        
        // Calculate total resource sizes by type
        const resourcesByType = entries.reduce((acc, entry) => {
          const type = getResourceType(entry.name)
          acc[type] = (acc[type] || 0) + (entry.transferSize || 0)
          return acc
        }, {} as Record<string, number>)
        
        reportPerformanceMetric({
          name: 'resource_sizes',
          value: entries.reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
          breakdown: resourcesByType
        })
      })
      
      resourceObserver.observe({ type: 'resource', buffered: true })
    } catch (e) {
      console.warn('Resource observer failed:', e)
    }
  }
}

// Track navigation timing
function trackNavigationTiming() {
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const timings = {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      load: navigation.loadEventEnd - navigation.loadEventStart
    }
    
    reportPerformanceMetric({
      name: 'navigation_timing',
      value: navigation.loadEventEnd - navigation.fetchStart,
      timings
    })
  })
}

// Track long tasks (>50ms)
function trackLongTasks() {
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          reportPerformanceMetric({
            name: 'long_task',
            value: entry.duration,
            startTime: entry.startTime
          })
        })
      })
      
      longTaskObserver.observe({ type: 'longtask', buffered: true })
    } catch (e) {
      console.warn('Long task observer failed:', e)
    }
  }
}

// Track memory usage
function trackMemoryUsage() {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    
    reportPerformanceMetric({
      name: 'memory_usage',
      value: memory.usedJSHeapSize,
      metrics: {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit
      }
    })
  }
}

// Helper function to determine resource type
function getResourceType(url: string): string {
  if (url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) return 'image'
  if (url.match(/\.(js|mjs)$/i)) return 'script'
  if (url.match(/\.css$/i)) return 'stylesheet'
  if (url.match(/\.(woff|woff2|ttf|otf|eot)$/i)) return 'font'
  if (url.match(/\.(mp4|webm|ogg|avi)$/i)) return 'video'
  if (url.match(/\.(mp3|wav|ogg)$/i)) return 'audio'
  return 'other'
}

// Report Web Vital metric
function reportWebVital(vital: { name: string; value: number; rating: string }) {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', vital.name, {
      event_category: 'Web Vitals',
      value: Math.round(vital.value),
      metric_rating: vital.rating,
      non_interaction: true
    })
  }
  
  // Send to performance monitoring service
  sendToMonitoringService({
    type: 'web_vital',
    name: vital.name,
    value: vital.value,
    rating: vital.rating,
    url: window.location.href,
    timestamp: Date.now()
  })
}

// Report general performance metric
function reportPerformanceMetric(metric: any) {
  // Send to analytics if significant
  if (typeof window !== 'undefined' && window.gtag && metric.value > 1000) {
    window.gtag('event', 'performance_metric', {
      event_category: 'Performance',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true
    })
  }
  
  // Send to performance monitoring service
  sendToMonitoringService({
    type: 'performance_metric',
    ...metric,
    url: window.location.href,
    timestamp: Date.now()
  })
}

// Send data to monitoring service
async function sendToMonitoringService(data: any) {
  try {
    // In production, send to your monitoring service (DataDog, New Relic, etc.)
    if (process.env.NODE_ENV === 'production') {
      await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true
      })
    } else {
      console.log('Performance metric:', data)
    }
  } catch (error) {
    console.warn('Failed to send performance data:', error)
  }
}

// Track user interactions
export function trackUserInteraction(event: string, data?: any) {
  const interactionData = {
    event,
    data,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }
  
  if (window.gtag) {
    window.gtag('event', 'user_interaction', {
      event_category: 'Engagement',
      event_label: event,
      custom_parameters: data
    })
  }
  
  sendToMonitoringService({
    type: 'user_interaction',
    ...interactionData
  })
}

// Track errors
export function trackError(error: Error, context?: any) {
  const errorData = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    context,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  }
  
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      event_category: 'JavaScript Error'
    })
  }
  
  sendToMonitoringService({
    type: 'error',
    ...errorData
  })
}

// Performance budget monitoring
export function checkPerformanceBudget() {
  const budgets = {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    fcp: 1800, // 1.8s
    ttfb: 800, // 800ms
    totalSize: 1024 * 1024 * 2, // 2MB
    jsSize: 1024 * 500, // 500KB
    cssSize: 1024 * 100, // 100KB
    imageSize: 1024 * 1024 // 1MB
  }
  
  // Check against budgets and alert if exceeded
  // This would be called after collecting metrics
  
  return budgets
}

// Real User Monitoring (RUM) data collection
export function collectRUMData(): PerformanceData {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  
  const rumData: PerformanceData = {
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    connection: (navigator as any).connection?.effectiveType,
    deviceMemory: (navigator as any).deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    metrics: {},
    navigation: {
      type: navigation.type === 0 ? 'navigate' : navigation.type === 1 ? 'reload' : 'back_forward',
      redirectCount: navigation.redirectCount
    },
    resources: {
      totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
      imageSize: resources.filter(r => getResourceType(r.name) === 'image').reduce((sum, r) => sum + (r.transferSize || 0), 0),
      jsSize: resources.filter(r => getResourceType(r.name) === 'script').reduce((sum, r) => sum + (r.transferSize || 0), 0),
      cssSize: resources.filter(r => getResourceType(r.name) === 'stylesheet').reduce((sum, r) => sum + (r.transferSize || 0), 0),
      fontSize: resources.filter(r => getResourceType(r.name) === 'font').reduce((sum, r) => sum + (r.transferSize || 0), 0),
    }
  }
  
  return rumData
}