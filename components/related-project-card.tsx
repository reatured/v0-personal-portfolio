"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import type { LocalProject } from "@/lib/local-projects"
import { YouTubeEmbed } from "./youtube-embed"

interface RelatedProjectCardProps {
  project: LocalProject
  categorySlug: string
  subcategorySlug: string
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement>,
    categorySlug: string,
    subcategorySlug: string,
    projectSlug: string,
  ) => void
}

export function RelatedProjectCard({ project, categorySlug, subcategorySlug, onClick }: RelatedProjectCardProps) {
  // Use only the description field, no content extraction
  const description = project.description || "No description available"

  // Check if project has a YouTube video ID
  const hasYouTubeVideo = project.youtubeId !== undefined && project.youtubeId !== null && project.youtubeId !== ""

  return (
    <Link
      href={`/${categorySlug}/${subcategorySlug}/${project.slug}`}
      className="block bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
      onClick={onClick ? (e) => onClick(e, categorySlug, subcategorySlug, project.slug) : undefined}
    >
      <div className="relative w-full h-48 overflow-hidden">
        {hasYouTubeVideo ? (
          <YouTubeEmbed
            videoId={project.youtubeId as string}
            title={project.title}
            className="absolute top-0 left-0 h-48 pt-0"
          />
        ) : (
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className={`object-cover transition-transform group-hover:scale-105 ${
              project.imageRatio === "portrait" ? "object-top" : "object-center"
            }`}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
        {project.software && (
          <div className="mt-4 inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {project.software}
          </div>
        )}
      </div>
    </Link>
  )
}
