import type React from "react"
import { Suspense } from "react"
import Link from "next/link"

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Resume</span>
        </div>
      </div>

      <Suspense fallback={<ResumeLoadingState />}>{children}</Suspense>
    </div>
  )
}

function ResumeLoadingState() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-1/4 bg-muted/30 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-muted/30 rounded animate-pulse"></div>
      </div>
      <div className="bg-card border border-border rounded-lg p-8 space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-1/3 bg-muted/30 rounded animate-pulse mx-auto"></div>
          <div className="h-4 w-1/2 bg-muted/30 rounded animate-pulse mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-1/4 bg-muted/30 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
