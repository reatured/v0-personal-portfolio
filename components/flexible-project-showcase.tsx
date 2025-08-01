"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { LocalProject, LocalCategory, LocalSubcategory } from "@/lib/local-projects"
import { RelatedProjectCard } from "@/components/related-project-card"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import Image from "next/image"
import { YouTubeEmbed } from "@/components/youtube-embed"

// Helper function to extract YouTube video ID from various YouTube URL formats
function extractYouTubeId(url: string): string {
  if (!url) return ""

  // Handle youtu.be format
  if (url.includes("youtu.be")) {
    const parts = url.split("/")
    return parts[parts.length - 1].split("?")[0]
  }

  // Handle youtube.com/watch?v= format
  const match = url.match(/[?&]v=([^&]+)/)
  if (match) return match[1]

  // Handle youtube.com/embed/ format
  const embedMatch = url.match(/embed\/([^/?]+)/)
  if (embedMatch) return embedMatch[1]

  return ""
}

interface ProjectShowcaseProps {
  projectSlug: string
}

interface ProjectData {
  project: LocalProject
  category: LocalCategory
  subcategory: LocalSubcategory
  relatedProjects: LocalProject[]
  fileContent?: string | null
}

export function FlexibleProjectShowcase({ projectSlug }: ProjectShowcaseProps) {
  const router = useRouter()
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
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
        setProjectData(data)
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

  // Handle navigation to a related project
  const handleRelatedProjectClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    categorySlug: string,
    subcategorySlug: string,
    projectSlug: string,
  ) => {
    e.preventDefault()
    router.push(`/${categorySlug}/${subcategorySlug}/${projectSlug}`)
  }

  if (loading) {
    return <ProjectSkeleton />
  }

  if (error || !projectData) {
    return <div className="text-center py-12 text-red-500">{error || "Project not found"}</div>
  }

  const { project, category, subcategory, relatedProjects, fileContent } = projectData

  // Use file content if available, otherwise use database content
  const content = fileContent || project.content

  return (
    <>
      {/* Main content with semi-transparent background */}
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg mb-16">
        {/* Project Title */}
        <h1 className="text-3xl font-bold mb-8">{project.title}</h1>

        {/* Project Image */}
        <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg">
          {project.youtubeId ? (
            <YouTubeEmbed
              videoId={project.youtubeId}
              title={project.title}
              className="absolute top-0 left-0 h-full w-full pt-0"
              autoplay={true}
              loop={true}
            />
          ) : (
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className={`object-cover ${project.imageRatio === "portrait" ? "object-top" : "object-center"}`}
              priority
            />
          )}
        </div>

        {/* Project Content */}
        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={content} />
        </div>
      </div>

      {/* Related Projects - Always shown at the bottom */}
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
                onClick={handleRelatedProjectClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ProjectSkeleton() {
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
