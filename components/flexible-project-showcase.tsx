"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Project } from "@/types/project"
import type { Category } from "@/types/category"
import type { Subcategory } from "@/types/subcategory"
import type { ProjectShowcaseProps } from "@/types/project-showcase"
import { RelatedProjectCard } from "@/components/related-project-card"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export function FlexibleProjectShowcase({ projectSlug }: ProjectShowcaseProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjectData() {
      try {
        setLoading(true)
        // Fetch project data
        const response = await fetch(`/api/projects/${projectSlug}`)

        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }

        const data = await response.json()
        setProject(data.project)
        setCategory(data.category)
        setSubcategory(data.subcategory)
        setRelatedProjects(data.relatedProjects || [])
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    if (projectSlug) {
      fetchProjectData()
    }
  }, [projectSlug])

  if (loading) {
    return <ProjectSkeleton />
  }

  if (error || !project) {
    return <div className="text-center py-12 text-red-500">{error || "Project not found"}</div>
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      {/* Changed from max-w-5xl to max-w-7xl */}
      {/* Breadcrumbs */}
      {category && subcategory && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
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
      )}
      {/* Project Title */}
      <h1 className="text-3xl font-bold mb-8">{project.title}</h1>
      {/* Project Content - Using our enhanced markdown renderer that supports HTML */}
      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={project.content} />
      </div>
      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <RelatedProjectCard
                key={relatedProject.id}
                project={relatedProject}
                categorySlug={category?.slug || ""}
                subcategorySlug={subcategory?.slug || ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      {/* Updated this to match */}
      <div className="h-4 w-64 bg-muted/30 rounded animate-pulse mb-6"></div>
      <div className="h-10 w-3/4 bg-muted/30 rounded animate-pulse mb-8"></div>
      <div className="space-y-4">
        <div className="h-64 w-full bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-muted/30 rounded animate-pulse"></div>
        <div className="h-4 w-4/6 bg-muted/30 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
