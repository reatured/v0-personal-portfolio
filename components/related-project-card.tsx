import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface RelatedProjectCardProps {
  project: {
    id: number
    title: string
    slug: string
    imageUrl?: string
    imageRatio?: string
    software?: string
    content?: string
  }
  categorySlug: string
  subcategorySlug: string
  className?: string
}

export function RelatedProjectCard({ project, categorySlug, subcategorySlug, className }: RelatedProjectCardProps) {
  // Extract a brief description from the content
  const description = project.content
    ? project.content
        .split("\n")
        .slice(1, 2)
        .join(" ")
        .replace(/^#+\s+|^\*\*|\*\*$|^-\s+/gm, "")
        .trim()
        .substring(0, 100) + (project.content.length > 100 ? "..." : "")
    : ""

  return (
    <div className={cn("bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full", className)}>
      <div className="relative w-full pt-[60%] overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg?height=400&width=600&query=project"}
          alt={project.title}
          fill
          className={`object-cover ${project.imageRatio === "portrait" ? "object-top" : "object-center"}`}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        {description && <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>}

        <div className="mt-auto flex items-center justify-between">
          {project.software && (
            <div className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              {project.software}
            </div>
          )}

          <Link
            href={`/${categorySlug}/${subcategorySlug}/${project.slug}`}
            className="text-primary hover:underline ml-auto text-sm"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  )
}
