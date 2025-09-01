"use client"

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

// Default configuration constants
const DEFAULT_THRESHOLD = 0.1;
const DEFAULT_ROOT_MARGIN = '0px';
const DEFAULT_TRIGGER_ONCE = true;

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { 
    threshold = DEFAULT_THRESHOLD, 
    rootMargin = DEFAULT_ROOT_MARGIN, 
    triggerOnce = DEFAULT_TRIGGER_ONCE 
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver is not supported');
      setIsVisible(true); // Fallback to showing element
      return
    }

    let observer: IntersectionObserver | null = null;

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce && observer) {
              observer.unobserve(element)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(element)
    } catch (error) {
      console.error('Error setting up IntersectionObserver:', error);
      setIsVisible(true); // Fallback to showing element
    }

    return () => {
      if (observer && element) {
        try {
          observer.unobserve(element)
          observer.disconnect()
        } catch (error) {
          console.error('Error cleaning up IntersectionObserver:', error);
        }
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}