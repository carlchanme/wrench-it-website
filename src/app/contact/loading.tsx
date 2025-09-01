import { Skeleton } from "@/components/loading-spinner"

export default function ContactLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Skeleton className="h-12 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact Form & Info Skeleton */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form Skeleton */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-lg border bg-card space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-72" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-32 w-full" />
                </div>
                
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            {/* Contact Info Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-lg border bg-card space-y-4">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}