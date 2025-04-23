import type { ReactNode } from "react"
import { getBreadcrumbsForProject, getProjectsBySubcategory } from "@/lib/db"
import { notFound } from "next/navigation"
import { TabGroup } from "@/components/tab-group"
import { Suspense } from "react"

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { category: string; subcategory: string; project: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.project)

  if (!breadcrumbs) {
    notFound()
  }

  const { category, subcategory } = breadcrumbs

  // Get all projects for this subcategory for the TabGroup
  const projects = await getProjectsBySubcategory(params.subcategory)

  // Format projects for TabGroup
  const tabItems = projects.map((proj) => ({
    name: proj.title,
    slug: proj.slug,
    href: `/${category.slug}/${subcategory.slug}/${proj.slug}`,
  }))

  return (
    <>
      {/* TabGroup moved above the title */}
      <div className="mb-6">
        <TabGroup items={tabItems} label={`${subcategory.name} projects`} />
      </div>

      <Suspense fallback={<ProjectLoadingState />}>{children}</Suspense>
    </>
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
