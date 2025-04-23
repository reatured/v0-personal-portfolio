import type { ReactNode } from "react"
import { getCategoryBySlug } from "@/lib/db"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function CategoryLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { category: string }
}) {
  const category = await getCategoryBySlug(params.category)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<CategoryLoadingState />}>{children}</Suspense>
    </div>
  )
}

function CategoryLoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-1/2 bg-muted/30 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
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
