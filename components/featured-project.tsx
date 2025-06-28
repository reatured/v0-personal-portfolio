import Image from "next/image"
import Link from "next/link"
import type { LocalProject } from "@/lib/local-projects"
import { YouTubeEmbed } from "./youtube-embed"

interface FeaturedProjectProps {
  project: LocalProject
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  // Use the description field directly
  const description = project.description || "No description available"

  // Check if project has a YouTube video ID
  const hasYouTubeVideo = project.youtubeId !== undefined && project.youtubeId !== null && project.youtubeId !== ""

  return (
    <div className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative w-full h-full min-h-[300px]">
          {hasYouTubeVideo ? (
            <YouTubeEmbed
              videoId={project.youtubeId as string}
              title={project.title}
              className="absolute top-0 left-0 h-full pt-0"
            />
          ) : (
            <Image
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              fill
              className={`object-cover ${project.imageRatio === "portrait" ? "object-top" : "object-center"}`}
            />
          )}
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
