import { NextResponse } from "next/server"
import { findLocalProjectBySlug, getLocalProjectsBySubcategory } from "@/lib/local-projects"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  if (!slug) {
    return NextResponse.json({ error: "Project slug is required" }, { status: 400 })
  }

  try {
    // Get project data from local files
    const project = await findLocalProjectBySlug(slug)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Get related projects from the same subcategory
    const relatedProjects = await getLocalProjectsBySubcategory(project.categorySlug, project.subcategorySlug)
    // Filter out the current project and limit to 3
    const filteredRelatedProjects = relatedProjects
      .filter(p => p.slug !== project.slug)
      .slice(0, 3)

    // Create category and subcategory objects
    const category = {
      slug: project.categorySlug,
      name: project.categorySlug.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      description: `${project.categorySlug} projects`,
    }

    const subcategory = {
      slug: project.subcategorySlug,
      name: project.subcategorySlug.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      description: `${project.subcategorySlug} projects`,
    }

    return NextResponse.json({
      project,
      category,
      subcategory,
      relatedProjects: filteredRelatedProjects,
      fileContent: project.content,
    })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}
