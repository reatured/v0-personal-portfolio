"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { YouTubeEmbed } from "./youtube-embed"
import { cn } from "@/lib/utils"

export type ProjectCardSize = "small" | "medium" | "large" | "featured"
export type ProjectCardLayout = "default" | "horizontal" | "minimal"
export type MediaType = "image" | "youtube" | "none"

export interface ProjectCardProps {
  /** Project title */
  title: string
  /** Project description */
  description?: string
  /** URL for the project image or thumbnail */
  imageUrl?: string
  /** YouTube video ID if using YouTube embed */
  youtubeId?: string
  /** Image ratio: square, landscape, or portrait */
  imageRatio?: "square" | "landscape" | "portrait"
  /** Software or technology used */
  software?: string
  /** Link to the project page */
  href: string
  /** Card size variant */
  size?: ProjectCardSize
  /** Card layout variant */
  layout?: ProjectCardLayout
  /** Media height in pixels (for custom heights) */
  mediaHeight?: number
  /** Whether to autoplay media (for YouTube) */
  autoplay?: boolean
  /** Additional CSS classes */
  className?: string
  /** Optional click handler */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  /** Optional badge text */
  badgeText?: string
  /** Optional category name for filtering */
  category?: string
  /** Optional subcategory name for filtering */
  subcategory?: string
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  youtubeId,
  imageRatio = "landscape",
  software,
  href,
  size = "medium",
  layout = "default",
  mediaHeight,
  autoplay = false,
  className,
  onClick,
  badgeText,
  category,
  subcategory,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  // Determine media type
  const mediaType: MediaType = youtubeId ? "youtube" : imageUrl ? "image" : "none"

  // Determine media container height based on size and custom height
  const getMediaHeight = () => {
    if (mediaHeight) return mediaHeight

    switch (size) {
      case "small":
        return 150
      case "medium":
        return 200
      case "large":
        return 300
      case "featured":
        return 400
      default:
        return 200
    }
  }

  // Determine title size based on card size
  const getTitleClass = () => {
    switch (size) {
      case "small":
        return "text-lg font-semibold mb-1"
      case "medium":
        return "text-xl font-semibold mb-2"
      case "large":
        return "text-2xl font-bold mb-2"
      case "featured":
        return "text-3xl font-bold mb-3"
      default:
        return "text-xl font-semibold mb-2"
    }
  }

  // Determine description truncation based on card size
  const getDescriptionClass = () => {
    const baseClass = "text-muted-foreground"
    switch (size) {
      case "small":
        return `${baseClass} text-sm line-clamp-1`
      case "medium":
        return `${baseClass} text-sm line-clamp-2`
      case "large":
        return `${baseClass} line-clamp-3`
      case "featured":
        return `${baseClass} line-clamp-4`
      default:
        return `${baseClass} line-clamp-2`
    }
  }

  // Determine card layout classes
  const getCardClasses = () => {
    const baseClass = "card-base group"

    if (layout === "horizontal") {
      return cn(baseClass, "grid grid-cols-1 md:grid-cols-2 gap-0", className)
    }

    return cn(baseClass, "card-hover", className)
  }

  // Render media content based on type
  const renderMedia = () => {
    const height = getMediaHeight()

    if (mediaType === "youtube" && youtubeId) {
      return (
        <YouTubeEmbed
          videoId={youtubeId}
          title={title}
          className="absolute top-0 left-0 h-full w-full pt-0"
          autoplay={autoplay}
        />
      )
    }

    if (mediaType === "image" && imageUrl && !imageError) {
      return (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className={cn("image-cover", imageRatio === "portrait" ? "image-top" : "image-center")}
          onError={() => setImageError(true)}
        />
      )
    }

    // Fallback for errors or no media
    return (
      <div className="flex items-center justify-center h-full w-full bg-muted/20">
        <span className="text-muted-foreground">{title.charAt(0)}</span>
      </div>
    )
  }

  // Render the card based on layout
  if (layout === "horizontal" && size === "featured") {
    return (
      <Link href={href} className={getCardClasses()} onClick={onClick}>
        <div className="relative w-full h-full min-h-[300px]">{renderMedia()}</div>
        <div className="p-8 flex flex-col">
          <div className="mb-2">
            {software && <span className="badge mb-2">{software}</span>}
            <h2 className={getTitleClass()}>{title}</h2>
          </div>
          {description && <p className={getDescriptionClass()}>{description}</p>}
          <div className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            View Project
          </div>
        </div>
      </Link>
    )
  }

  // Default card layout
  return (
    <Link href={href} className={getCardClasses()} onClick={onClick}>
      <div className="relative w-full overflow-hidden" style={{ height: `${getMediaHeight()}px` }}>
        {renderMedia()}
      </div>
      <div className="p-4 md:p-6">
        <h3 className={getTitleClass()}>{title}</h3>
        {description && <p className={getDescriptionClass()}>{description}</p>}
        {software && <div className="badge">{software}</div>}
        {badgeText && <div className="badge ml-2">{badgeText}</div>}
      </div>
    </Link>
  )
}
