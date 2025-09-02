// Global type declarations

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        page_path?: string
        send_page_view?: boolean
        event_category?: string
        event_label?: string
        custom_parameters?: Record<string, any>
        [key: string]: any
      }
    ) => void
    dataLayer: any[]
  }
}

export {}