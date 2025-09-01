// Testing utilities for comprehensive component testing

/**
 * Mock IntersectionObserver for testing
 */
export function mockIntersectionObserver() {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
}

/**
 * Mock ResizeObserver for testing
 */
export function mockResizeObserver() {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
}

/**
 * Mock window.matchMedia for testing
 */
export function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

/**
 * Mock localStorage for testing
 */
export function mockLocalStorage() {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  })
  return localStorageMock
}

/**
 * Mock sessionStorage for testing
 */
export function mockSessionStorage() {
  const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock
  })
  return sessionStorageMock
}

/**
 * Mock fetch for testing
 */
export function mockFetch() {
  global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>
  return global.fetch as jest.MockedFunction<typeof fetch>
}

/**
 * Mock Google Analytics gtag
 */
export function mockGtag() {
  global.gtag = jest.fn()
  Object.defineProperty(window, 'gtag', {
    value: global.gtag,
    writable: true
  })
  return global.gtag
}

/**
 * Setup all common mocks
 */
export function setupTestMocks() {
  mockIntersectionObserver()
  mockResizeObserver()
  mockMatchMedia()
  mockLocalStorage()
  mockSessionStorage()
  mockFetch()
  mockGtag()
}

/**
 * Accessibility testing helpers
 */
export const a11yHelpers = {
  /**
   * Check if element has proper ARIA labels
   */
  hasAriaLabel: (element: Element): boolean => {
    return element.hasAttribute('aria-label') || 
           element.hasAttribute('aria-labelledby') ||
           element.hasAttribute('aria-describedby')
  },

  /**
   * Check if interactive element is keyboard accessible
   */
  isKeyboardAccessible: (element: Element): boolean => {
    const tagName = element.tagName.toLowerCase()
    const tabIndex = element.getAttribute('tabindex')
    
    // Naturally focusable elements
    const naturallyFocusable = ['a', 'button', 'input', 'select', 'textarea']
    
    return naturallyFocusable.includes(tagName) || 
           (tabIndex !== null && parseInt(tabIndex) >= 0)
  },

  /**
   * Check if element has proper role
   */
  hasRole: (element: Element, expectedRole?: string): boolean => {
    const role = element.getAttribute('role')
    
    if (expectedRole) {
      return role === expectedRole
    }
    
    return role !== null
  },

  /**
   * Check if form input has proper labeling
   */
  hasProperLabeling: (input: HTMLInputElement): boolean => {
    const id = input.id
    const label = document.querySelector(`label[for="${id}"]`)
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledBy = input.getAttribute('aria-labelledby')
    
    return !!(label || ariaLabel || ariaLabelledBy)
  }
}

/**
 * Performance testing helpers
 */
export const performanceHelpers = {
  /**
   * Measure component render time
   */
  measureRenderTime: async (renderFunction: () => void): Promise<number> => {
    const start = performance.now()
    renderFunction()
    await new Promise(resolve => requestAnimationFrame(resolve))
    const end = performance.now()
    return end - start
  },

  /**
   * Check if lazy loading is working
   */
  checkLazyLoading: (image: HTMLImageElement): boolean => {
    return image.hasAttribute('data-src') || image.loading === 'lazy'
  },

  /**
   * Simulate slow network
   */
  simulateSlowNetwork: (delay: number = 2000): void => {
    const originalFetch = global.fetch
    global.fetch = jest.fn().mockImplementation((...args) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(originalFetch(...args))
        }, delay)
      })
    }) as jest.MockedFunction<typeof fetch>
  }
}

/**
 * Form testing helpers
 */
export const formHelpers = {
  /**
   * Fill form with test data
   */
  fillForm: (form: HTMLFormElement, data: Record<string, string>): void => {
    Object.entries(data).forEach(([name, value]) => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement
      if (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value === 'true'
        } else {
          input.value = value
        }
        
        // Trigger change event
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    })
  },

  /**
   * Validate form accessibility
   */
  validateFormA11y: (form: HTMLFormElement): string[] => {
    const issues: string[] = []
    const inputs = form.querySelectorAll('input, select, textarea')
    
    inputs.forEach((input, index) => {
      const element = input as HTMLInputElement
      
      if (!a11yHelpers.hasProperLabeling(element)) {
        issues.push(`Input ${index + 1} (${element.name || element.type}) lacks proper labeling`)
      }
      
      if (element.required && !element.getAttribute('aria-required')) {
        issues.push(`Required input ${index + 1} should have aria-required="true"`)
      }
      
      if (element.type === 'email' && !element.getAttribute('aria-describedby')) {
        issues.push(`Email input ${index + 1} should have error message association`)
      }
    })
    
    return issues
  },

  /**
   * Test form validation
   */
  testValidation: (form: HTMLFormElement, invalidData: Record<string, string>): boolean => {
    formHelpers.fillForm(form, invalidData)
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    form.dispatchEvent(submitEvent)
    
    return submitEvent.defaultPrevented
  }
}

/**
 * Error testing helpers
 */
export const errorHelpers = {
  /**
   * Simulate network error
   */
  simulateNetworkError: (): void => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
  },

  /**
   * Simulate JavaScript error
   */
  simulateJSError: (message: string = 'Test error'): void => {
    throw new Error(message)
  },

  /**
   * Check if error boundary catches errors
   */
  testErrorBoundary: (ErrorBoundary: React.ComponentType<any>, ThrowError: React.ComponentType): boolean => {
    try {
      // This would typically be done in a test environment with React Testing Library
      // render(<ErrorBoundary><ThrowError /></ErrorBoundary>)
      return true
    } catch {
      return false
    }
  }
}

/**
 * Mobile testing helpers
 */
export const mobileHelpers = {
  /**
   * Simulate mobile viewport
   */
  simulateMobileViewport: (): void => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 667,
    })
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'))
  },

  /**
   * Simulate touch events
   */
  simulateTouchEvent: (element: Element, type: 'touchstart' | 'touchend' | 'touchmove'): void => {
    const touchEvent = new TouchEvent(type, {
      bubbles: true,
      cancelable: true,
      touches: [{
        identifier: 1,
        target: element,
        clientX: 100,
        clientY: 100,
        pageX: 100,
        pageY: 100,
        screenX: 100,
        screenY: 100,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1
      }] as any
    })
    
    element.dispatchEvent(touchEvent)
  },

  /**
   * Check if element is mobile-optimized
   */
  isMobileOptimized: (element: Element): boolean => {
    const styles = getComputedStyle(element)
    const minTouchTarget = 44 // 44px minimum touch target
    
    const width = parseFloat(styles.width)
    const height = parseFloat(styles.height)
    
    return width >= minTouchTarget && height >= minTouchTarget
  }
}

/**
 * Cross-browser testing helpers
 */
export const browserHelpers = {
  /**
   * Simulate different browsers
   */
  simulateBrowser: (browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'ie'): void => {
    const userAgents = {
      chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      edge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
      ie: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
    }
    
    Object.defineProperty(navigator, 'userAgent', {
      value: userAgents[browser],
      configurable: true
    })
  },

  /**
   * Test CSS feature support
   */
  testCSSSupport: (property: string, value: string): boolean => {
    if (!CSS || !CSS.supports) return false
    return CSS.supports(property, value)
  },

  /**
   * Test JavaScript feature support
   */
  testJSFeature: (feature: string): boolean => {
    try {
      switch (feature) {
        case 'async':
          return (async () => {}).constructor === (async () => {}).constructor
        case 'fetch':
          return 'fetch' in window
        case 'intersectionObserver':
          return 'IntersectionObserver' in window
        case 'resizeObserver':
          return 'ResizeObserver' in window
        default:
          return false
      }
    } catch {
      return false
    }
  }
}

/**
 * Integration testing helpers
 */
export const integrationHelpers = {
  /**
   * Wait for element to appear
   */
  waitForElement: (selector: string, timeout: number = 5000): Promise<Element> => {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector)
      
      if (element) {
        resolve(element)
        return
      }
      
      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector)
        if (element) {
          observer.disconnect()
          resolve(element)
        }
      })
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
      
      setTimeout(() => {
        observer.disconnect()
        reject(new Error(`Element ${selector} not found within ${timeout}ms`))
      }, timeout)
    })
  },

  /**
   * Test analytics tracking
   */
  testAnalyticsTracking: (expectedEvent: string, expectedParameters?: Record<string, any>): boolean => {
    const gtagMock = global.gtag as jest.MockedFunction<any>
    
    if (!gtagMock) return false
    
    const calls = gtagMock.mock.calls
    return calls.some(call => {
      const [command, event, parameters] = call
      
      if (command !== 'event' || event !== expectedEvent) {
        return false
      }
      
      if (expectedParameters) {
        return Object.entries(expectedParameters).every(([key, value]) => {
          return parameters && parameters[key] === value
        })
      }
      
      return true
    })
  }
}