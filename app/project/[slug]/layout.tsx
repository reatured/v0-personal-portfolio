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
      <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg bg-muted/30 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-4/6 bg-muted/30 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
