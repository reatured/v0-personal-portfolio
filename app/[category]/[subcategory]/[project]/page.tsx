import { getBreadcrumbsForProject, getProjectsBySubcategory } from "@/lib/db"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { TabGroup } from "@/components/tab-group"

export default async function ProjectPage({
  params,
}: {
  params: { category: string; subcategory: string; project: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.project)

  if (!breadcrumbs) {
    notFound()
  }

  const { category, subcategory, project } = breadcrumbs

  // Get all projects for this subcategory for the TabGroup
  const projects = await getProjectsBySubcategory(params.subcategory)

  // Format projects for TabGroup
  const tabItems = projects.map((proj) => ({
    name: proj.title,
    slug: proj.slug,
    href: `/${category.slug}/${subcategory.slug}/${proj.slug}`,
  }))

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      {/* Changed from max-w-5xl to max-w-7xl */}
      <div className="mb-8">
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
          <span className="text-foreground">{project.title}</span>
        </div>

        {/* TabGroup moved above the title */}
        <div className="mb-6">
          <TabGroup items={tabItems} label={`${subcategory.name} projects`} />
        </div>
      </div>

      <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg">
        {/* Increased height from 400px to 500px */}
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover ${project.imageRatio === "portrait" ? "object-top" : "object-center"}`}
          priority
        />
      </div>

      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={project.content} />
      </div>
    </div>
  )
}
