import type React from "react"
import { getBreadcrumbsForProject, getProjectsBySubcategory } from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TabGroup } from "@/components/tab-group"
import { Suspense } from "react"

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
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
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${category.slug}`} className="hover:text-foreground">
          {category.name}
        </Link>
        <span>/</span>
        <Link href={`/${category.slug}/${subcategory.slug}`} className="hover:text-foreground">
          {subcategory.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{params.project}</span>
      </div>

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
      <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg bg-muted/30 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-4/6 bg-muted/30 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
