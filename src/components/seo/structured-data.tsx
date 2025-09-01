import { generateStructuredData } from '@/lib/structured-data'

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

export function StructuredData(props: StructuredDataProps) {
  const structuredData = generateStructuredData(props)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}