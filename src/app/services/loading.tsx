import { ServiceSkeleton } from "@/components/loading-spinner"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="h-12 bg-muted rounded-lg animate-pulse mx-auto w-64" />
            <div className="h-6 bg-muted rounded-lg animate-pulse mx-auto w-96" />
            <div className="h-6 bg-muted rounded-lg animate-pulse mx-auto w-80" />
            <div className="h-12 bg-muted rounded-lg animate-pulse mx-auto w-40 mt-8" />
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}