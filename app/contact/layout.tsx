import type React from "react"
import { Suspense } from "react"
import Link from "next/link"

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Contact</span>
        </div>
      </div>

      <Suspense fallback={<ContactLoadingState />}>{children}</Suspense>
    </div>
  )
}

function ContactLoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-1/3 bg-muted/30 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="h-6 w-1/2 bg-muted/30 rounded animate-pulse mb-6"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-muted/30 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="h-6 w-1/2 bg-muted/30 rounded animate-pulse mb-6"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-muted/30 rounded animate-pulse"></div>
                    <div className="h-10 w-full bg-muted/30 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted/30 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-muted/30 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-muted/30 rounded animate-pulse"></div>
                <div className="h-32 w-full bg-muted/30 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-full bg-muted/30 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
