"use client"

import { useState, useEffect } from "react"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import Image from "next/image"
import Link from "next/link"
import { trackEvent, EventCategory } from "@/lib/analytics"

interface Project {
  id: number
  title: string
  slug: string
  content: string
  imageUrl: string
  software?: string
  imageRatio?: "square" | "landscape" | "portrait"
}

interface Subcategory {
  id: number
  name: string
  slug: string
}

interface Category {
  id: number
  name: string
  slug: string
}

interface ProjectShowcaseProps {
  projectSlug: string
}

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
    <div className="container mx-auto py-12 px-4 max-w-4xl">
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

function RelatedProjectCard({
  project,
  categorySlug,
  subcategorySlug,
}: { project: Project; categorySlug: string; subcategorySlug: string }) {
  return (
    <Link
      href={`/${categorySlug}/${subcategorySlug}/${project.slug}`}
      className="block bg-card rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
      onClick={() => trackEvent(EventCategory.PROJECT, "click_related", project.title)}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-transform group-hover:scale-105 ${
            project.imageRatio === "portrait" ? "object-top" : "object-center"
          }`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
        {project.software && (
          <div className="mt-2 inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {project.software}
          </div>
        )}
      </div>
    </Link>
  )
}

function ProjectSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
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
