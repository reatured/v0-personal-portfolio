import type React from "react"
import { getBreadcrumbsForProject } from "@/lib/db"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function DirectProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.slug)

  if (!breadcrumbs) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <Suspense fallback={<ProjectLoadingState />}>{children}</Suspense>
    </div>
  )
}

function ProjectLoadingState() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-3/4 bg-muted/30 rounded animate-pulse"></div>
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg mb-16">
        <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg bg-muted/30 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse"></div>
          <div className="h-4 w-4/6 bg-muted/30 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="mt-16">
        <div className="h-8 w-1/4 bg-muted/30 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border overflow-hidden"
            >
              <div className="h-48 bg-muted/30 animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-muted/30 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
