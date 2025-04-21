"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface BackNavigationProps {
  defaultPath?: string
  className?: string
}

export function BackNavigation({ defaultPath = "/projects", className = "" }: BackNavigationProps) {
  const searchParams = useSearchParams()
  const from = searchParams.get("from")
  const area = searchParams.get("area")

  let backPath = defaultPath
  let backText = "Back to Projects"

  if (from === "professional-area" && area) {
    backPath = `/professional-area/${area}`
    backText = "Back to Professional Area"
  } else if (from === "home") {
    backPath = "/"
    backText = "Back to Home"
  }

  return (
    <Link
      href={backPath}
      className={`flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      {backText}
    </Link>
  )
}
