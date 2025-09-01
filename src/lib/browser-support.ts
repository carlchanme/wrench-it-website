// Browser compatibility utilities and polyfills

/**
 * Detect browser type and version
 */
export function getBrowserInfo() {
  if (typeof window === 'undefined') return null

  const userAgent = navigator.userAgent
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'

  // Chrome
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Chrome'
    const match = userAgent.match(/Chrome\/(\d+)/)
    if (match) browserVersion = match[1]
  }
  // Firefox
  else if (userAgent.includes('Firefox')) {
    browserName = 'Firefox'
    const match = userAgent.match(/Firefox\/(\d+)/)
    if (match) browserVersion = match[1]
  }
  // Safari
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari'
    const match = userAgent.match(/Version\/(\d+)/)
    if (match) browserVersion = match[1]
  }
  // Edge
  else if (userAgent.includes('Edg')) {
    browserName = 'Edge'
    const match = userAgent.match(/Edg\/(\d+)/)
    if (match) browserVersion = match[1]
  }
  // Internet Explorer
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    browserName = 'Internet Explorer'
    const match = userAgent.match(/(?:MSIE |rv:)(\d+)/)
    if (match) browserVersion = match[1]
  }

  return {
    name: browserName,
    version: parseInt(browserVersion),
    userAgent,
    isModern: isModernBrowser(browserName, parseInt(browserVersion))
  }
}

/**
 * Check if browser supports modern features
 */
function isModernBrowser(name: string, version: number): boolean {
  const minimumVersions = {
    'Chrome': 88,
    'Firefox': 85,
    'Safari': 14,
    'Edge': 88,
    'Internet Explorer': 0 // IE is not considered modern
  }

  return version >= (minimumVersions[name as keyof typeof minimumVersions] || 0)
}

/**
 * Feature detection utilities
 */
export const supportsFeature = {
  // CSS features
  cssGrid: () => CSS?.supports?.('display', 'grid') ?? false,
  cssFlexbox: () => CSS?.supports?.('display', 'flex') ?? false,
  cssCustomProperties: () => CSS?.supports?.('--test', 'red') ?? false,
  cssContainerQueries: () => CSS?.supports?.('container-type', 'inline-size') ?? false,
  cssSubgrid: () => CSS?.supports?.('grid-template-rows', 'subgrid') ?? false,

  // JavaScript features
  intersectionObserver: () => 'IntersectionObserver' in window,
  resizeObserver: () => 'ResizeObserver' in window,
  webAnimations: () => 'animate' in document.createElement('div'),
  fetch: () => 'fetch' in window,
  webWorkers: () => 'Worker' in window,
  serviceWorkers: () => 'serviceWorker' in navigator,
  
  // Modern JavaScript features
  async: () => {
    try {
      const asyncFunc = async () => {};
      return asyncFunc.constructor === asyncFunc.constructor;
    } catch {
      return false;
    }
  },
  
  // Touch and input features
  touchEvents: () => 'ontouchstart' in window,
  pointerEvents: () => 'onpointerdown' in window,
  
  // Storage features
  localStorage: () => {
    try {
      return 'localStorage' in window && window.localStorage !== null
    } catch {
      return false
    }
  },
  sessionStorage: () => {
    try {
      return 'sessionStorage' in window && window.sessionStorage !== null
    } catch {
      return false
    }
  },
  
  // Media features
  webP: () => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5
  },
  
  avif: () => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    return canvas.toDataURL('image/avif').indexOf('image/avif') === 5
  }
}

/**
 * Polyfills for missing features
 */
export function loadPolyfills() {
  if (typeof window === 'undefined') return

  // Intersection Observer polyfill
  if (!supportsFeature.intersectionObserver()) {
    import('intersection-observer' as any).catch(() => {
      console.warn('Failed to load IntersectionObserver polyfill')
    })
  }

  // ResizeObserver polyfill  
  if (!supportsFeature.resizeObserver()) {
    import('@juggle/resize-observer').then(({ ResizeObserver }) => {
      if (!window.ResizeObserver) {
        window.ResizeObserver = ResizeObserver
      }
    }).catch(() => {
      console.warn('Failed to load ResizeObserver polyfill')
    })
  }

  // Fetch polyfill for older browsers
  if (!supportsFeature.fetch()) {
    import('whatwg-fetch' as any).catch(() => {
      console.warn('Failed to load fetch polyfill')
    })
  }

  // Web Animations API polyfill
  if (!supportsFeature.webAnimations()) {
    import('web-animations-js' as any).catch(() => {
      console.warn('Failed to load Web Animations API polyfill')
    })
  }
}

/**
 * CSS fallbacks for unsupported features
 */
export function addCSSFallbacks() {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  let css = ''

  // CSS Grid fallback
  if (!supportsFeature.cssGrid()) {
    css += `
      .grid-fallback {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
      }
      .grid-fallback > * {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0.5rem;
      }
    `
  }

  // Flexbox fallback
  if (!supportsFeature.cssFlexbox()) {
    css += `
      .flex-fallback {
        display: block;
      }
      .flex-fallback::after {
        content: "";
        display: table;
        clear: both;
      }
      .flex-fallback > * {
        float: left;
        width: 100%;
      }
    `
  }

  // Custom properties fallback
  if (!supportsFeature.cssCustomProperties()) {
    css += `
      :root {
        /* Fallback colors */
        color: #000000;
        background-color: #ffffff;
      }
    `
  }

  if (css) {
    style.textContent = css
    document.head.appendChild(style)
  }
}

/**
 * Add browser-specific CSS classes to document
 */
export function addBrowserClasses() {
  if (typeof document === 'undefined') return

  const browserInfo = getBrowserInfo()
  if (!browserInfo) return

  const classes = [
    `browser-${browserInfo.name.toLowerCase().replace(/\s+/g, '-')}`,
    `browser-version-${browserInfo.version}`,
    browserInfo.isModern ? 'modern-browser' : 'legacy-browser'
  ]

  // Add touch/pointer classes
  if (supportsFeature.touchEvents()) classes.push('touch-enabled')
  if (supportsFeature.pointerEvents()) classes.push('pointer-events')

  // Add feature support classes
  if (supportsFeature.cssGrid()) classes.push('supports-grid')
  if (supportsFeature.cssFlexbox()) classes.push('supports-flexbox')
  if (supportsFeature.cssCustomProperties()) classes.push('supports-custom-properties')
  if (supportsFeature.webP()) classes.push('supports-webp')
  if (supportsFeature.avif()) classes.push('supports-avif')

  document.documentElement.classList.add(...classes)
}

/**
 * Show warning for unsupported browsers
 */
export function showBrowserWarning() {
  const browserInfo = getBrowserInfo()
  if (!browserInfo || browserInfo.isModern) return

  // Only show warning once per session
  if (sessionStorage?.getItem('browser-warning-shown')) return

  const warningDiv = document.createElement('div')
  warningDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      background: linear-gradient(135deg, #ff6b35, #f7931e);
      color: white;
      padding: 1rem;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    ">
      <p style="margin: 0 0 0.5rem 0; font-weight: 600;">
        ⚠️ Your browser (${browserInfo.name} ${browserInfo.version}) is not fully supported
      </p>
      <p style="margin: 0; font-size: 0.875rem; opacity: 0.9;">
        Please upgrade to a modern browser for the best experience.
        <button onclick="this.closest('div').remove(); sessionStorage.setItem('browser-warning-shown', 'true')"
          style="
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            margin-left: 1rem;
            cursor: pointer;
          "
        >
          Dismiss
        </button>
      </p>
    </div>
  `

  document.body.appendChild(warningDiv)
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (warningDiv.parentNode) {
      warningDiv.remove()
      sessionStorage?.setItem('browser-warning-shown', 'true')
    }
  }, 10000)
}

/**
 * Initialize browser compatibility features
 */
export function initBrowserSupport() {
  if (typeof window === 'undefined') return

  // Add browser classes to HTML element
  addBrowserClasses()
  
  // Add CSS fallbacks
  addCSSFallbacks()
  
  // Load necessary polyfills
  loadPolyfills()
  
  // Show browser warning if needed
  showBrowserWarning()
}

/**
 * Safe event listener that works across browsers
 */
export function addEventListenerSafe(
  element: Element | Window | Document,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
) {
  if ('addEventListener' in element) {
    element.addEventListener(event, handler, options)
  } else if ('attachEvent' in element) {
    // IE8 and below
    ;(element as any).attachEvent(`on${event}`, handler)
  }
}

/**
 * Safe event removal that works across browsers
 */
export function removeEventListenerSafe(
  element: Element | Window | Document,
  event: string,
  handler: EventListener,
  options?: boolean | EventListenerOptions
) {
  if ('removeEventListener' in element) {
    element.removeEventListener(event, handler, options)
  } else if ('detachEvent' in element) {
    // IE8 and below
    ;(element as any).detachEvent(`on${event}`, handler)
  }
}
