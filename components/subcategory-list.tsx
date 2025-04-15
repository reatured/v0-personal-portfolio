"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Subcategory, Project } from "@/lib/db"

interface SubcategoryListProps {
  categorySlug: string
}

export function SubcategoryList({ categorySlug }: SubcategoryListProps) {
  const pathname = usePathname()
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [subcategoryProjects, setSubcategoryProjects] = useState<Record<number, Project[]>>({})
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<number, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/subcategories?categorySlug=${categorySlug}`)

        if (!response.ok) {
          throw new Error("Failed to fetch subcategories")
        }

        const data = await response.json()
        setSubcategories(data)

        // Initialize expanded state based on current path
        const pathParts = pathname.split("/").filter(Boolean)
        if (pathParts.length > 1) {
          const currentSubcategorySlug = pathParts[1]
          const currentSubcategory = data.find((sub: Subcategory) => sub.slug === currentSubcategorySlug)

          if (currentSubcategory) {
            setExpandedSubcategories((prev) => ({
              ...prev,
              [currentSubcategory.id]: true,
            }))

            // Fetch projects for the expanded subcategory
            fetchProjectsForSubcategory(currentSubcategory.id, currentSubcategorySlug)
          }
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err)
        setError("Failed to load subcategories")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubcategories()
  }, [categorySlug, pathname])

  const fetchProjectsForSubcategory = async (subcategoryId: number, subcategorySlug: string) => {
    try {
      const response = await fetch(`/api/projects?subcategorySlug=${subcategorySlug}`)

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const projects = await response.json()
      setSubcategoryProjects((prev) => ({
        ...prev,
        [subcategoryId]: projects,
      }))
    } catch (err) {
      console.error("Error fetching projects:", err)
    }
  }

  const toggleSubcategory = (subcategoryId: number, subcategorySlug: string) => {
    const newExpandedState = !expandedSubcategories[subcategoryId]

    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: newExpandedState,
    }))

    // Fetch projects if expanding and we don't have them yet
    if (newExpandedState && !subcategoryProjects[subcategoryId]) {
      fetchProjectsForSubcategory(subcategoryId, subcategorySlug)
    }
  }

  if (isLoading) {
    return (
      <div className="py-2 px-2">
        <div className="h-5 bg-muted/30 rounded animate-pulse mb-2"></div>
        <div className="h-5 bg-muted/30 rounded animate-pulse mb-2"></div>
        <div className="h-5 bg-muted/30 rounded animate-pulse"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-sm text-red-500 px-2">{error}</div>
  }

  if (subcategories.length === 0) {
    return <div className="text-sm text-muted-foreground px-2">No subcategories found</div>
  }

  return (
    <>
      {subcategories.map((subcategory) => {
        const isSubcategoryActive = pathname.startsWith(`/${categorySlug}/${subcategory.slug}`)
        const isExpanded = expandedSubcategories[subcategory.id] || false
        const projects = subcategoryProjects[subcategory.id] || []

        return (
          <div key={subcategory.slug} className="mb-2">
            <div className="flex items-center">
              <button
                onClick={() => toggleSubcategory(subcategory.id, subcategory.slug)}
                className="w-4 h-4 flex items-center justify-center text-muted-foreground mr-1"
                aria-label={isExpanded ? "Collapse projects" : "Expand projects"}
              >
                {isExpanded ? "−" : "+"}
              </button>
              <Link
                href={`/${categorySlug}/${subcategory.slug}`}
                className={cn(
                  "flex-grow px-2 py-1.5 text-sm rounded-md",
                  isSubcategoryActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    // Close mobile menu if needed
                    const event = new CustomEvent("closeMobileMenu")
                    document.dispatchEvent(event)
                  }
                }}
              >
                {subcategory.name}
              </Link>
            </div>

            {/* Projects list */}
            {isExpanded && (
              <div className="ml-5 mt-1 space-y-1 border-l border-border pl-2">
                {projects.length > 0 ? (
                  projects.map((project) => {
                    const isProjectActive = pathname === `/${categorySlug}/${subcategory.slug}/${project.slug}`

                    return (
                      <Link
                        key={project.slug}
                        href={`/${categorySlug}/${subcategory.slug}/${project.slug}`}
                        className={cn(
                          "block px-2 py-1 text-xs rounded-md",
                          isProjectActive
                            ? "bg-accent/80 text-accent-foreground"
                            : "hover:bg-accent/30 text-muted-foreground",
                        )}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            const event = new CustomEvent("closeMobileMenu")
                            document.dispatchEvent(event)
                          }
                        }}
                      >
                        {project.title}
                      </Link>
                    )
                  })
                ) : (
                  <div className="text-xs text-muted-foreground px-2 py-1">No projects found</div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
