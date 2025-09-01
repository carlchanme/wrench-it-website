'use client'

import { useEffect } from 'react'
import { initBrowserSupport } from '@/lib/browser-support'
import { initPerformanceOptimizations } from '@/lib/performance'
import { initPerformanceMonitoring } from '@/lib/performance-monitoring'

export default function ClientSideInit() {
  useEffect(() => {
    // Initialize browser support features
    initBrowserSupport()
    
    // Initialize performance optimizations
    initPerformanceOptimizations()
    
    // Initialize performance monitoring
    initPerformanceMonitoring()
    
    // Add critical CSS classes for progressive enhancement
    document.documentElement.classList.add('js-enabled')
    
    // Remove no-js class if present
    document.documentElement.classList.remove('no-js')
    
    // Add loaded class after everything is initialized
    const handleLoad = () => {
      document.documentElement.classList.add('loaded')
      window.removeEventListener('load', handleLoad)
    }
    
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }
    
    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  // This component doesn't render anything
  return null
}