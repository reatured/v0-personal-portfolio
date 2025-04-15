import type React from "react"
import { Suspense } from "react"
import Link from "next/link"

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">About</span>
        </div>
      </div>

      <Suspense fallback={<AboutLoadingState />}>{children}</Suspense>
    </div>
  )
}

function AboutLoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-1/3 bg-muted/30 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="h-64 w-full bg-muted/30 rounded animate-pulse mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="h-6 w-1/4 bg-muted/30 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
