"use client"

import { useState, useEffect } from "react"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
  autoplay?: boolean
  startAt?: number
}

export function YouTubeEmbed({
  videoId,
  title = "YouTube video player",
  className = "",
  autoplay = false,
  startAt = 0,
}: YouTubeEmbedProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Build the YouTube URL with parameters
  const youtubeParams = new URLSearchParams({
    rel: "0", // Disable related videos at the end
    showinfo: "0", // Hide video title and uploader info
    modestbranding: "1", // Hide YouTube logo
    controls: "0", // Hide video controls
    disablekb: "1", // Disable keyboard controls
    fs: "0", // Disable fullscreen button
    iv_load_policy: "3", // Hide video annotations
    ...(autoplay && { autoplay: "1", mute: "1" }),
    ...(startAt > 0 && { start: startAt.toString() }),
    playsinline: "1", // Play inline on mobile devices
    vq: "small", // Set video quality to low
    mute: "1", // Always mute by default
    loop: "1", // Loop the video
    playlist: videoId, // Required for looping a single video
  }).toString()

  // Only render the iframe on the client side to avoid hydration errors
  if (!isClient) {
    return <div className={`relative w-full pt-[56.25%] bg-black ${className}`} aria-label={title} />
  }

  return (
    <div className={`relative w-full pt-[56.25%] ${className}`}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?${youtubeParams}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
