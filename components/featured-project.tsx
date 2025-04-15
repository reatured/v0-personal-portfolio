import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/db"

interface FeaturedProjectProps {
  project: Project
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  // Get the first paragraph of content for the description
  const description = project.content
    .split("\n")
    .slice(1, 4)
    .join(" ")
    .replace(/^#+\s+|^\*\*|\*\*$|^-\s+/gm, "")
    .trim()

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative w-full h-full min-h-[300px]">
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className={`object-cover ${project.imageRatio === "portrait" ? "object-top" : "object-center"}`}
          />
        </div>
        <div className="p-8 flex flex-col">
          <div className="mb-2">
            {project.software && (
              <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full mb-2">
                {project.software}
              </span>
            )}
            <h2 className="text-2xl font-bold">{project.title}</h2>
          </div>
          <p className="text-muted-foreground mb-6 line-clamp-6">{description}</p>
          <Link
            href={`/project/${project.slug}`}
            className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  )
}
