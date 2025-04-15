import { NextResponse } from "next/server"
import { getBreadcrumbsForProject, getRelatedProjects } from "@/lib/db"
import { getProjectMarkdown } from "@/lib/markdown"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  if (!slug) {
    return NextResponse.json({ error: "Project slug is required" }, { status: 400 })
  }

  try {
    // Get project data with category and subcategory info
    const breadcrumbs = await getBreadcrumbsForProject(slug)

    if (!breadcrumbs) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const { project, category, subcategory } = breadcrumbs

    // Get related projects from the same subcategory
    const relatedProjects = await getRelatedProjects(project.id, subcategory.id, 3)

    // Try to get content from file system
    const { exists, content: fileContent } = await getProjectMarkdown(category.slug, subcategory.slug, slug)

    return NextResponse.json({
      project,
      category,
      subcategory,
      relatedProjects,
      fileContent: exists ? fileContent : null,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}
