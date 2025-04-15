import type React from "react"
import { Suspense } from "react"
import Link from "next/link"

export default function LatestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Latest</span>
        </div>
      </div>

      <Suspense fallback={<LatestLoadingState />}>{children}</Suspense>
    </div>
  )
}

function LatestLoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-1/2 bg-muted/30 rounded animate-pulse"></div>
      <div className="h-64 w-full bg-muted/30 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="h-48 bg-muted/30 animate-pulse"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 w-3/4 bg-muted/30 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
