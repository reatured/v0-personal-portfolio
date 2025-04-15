"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Subcategory } from "@/lib/db"
import { useSidebar } from "./sidebar-context"

interface SubcategoryListProps {
  categorySlug: string
}

export function SubcategoryList({ categorySlug }: SubcategoryListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { expandedSubcategories, subcategoryProjects, toggleSubcategory, isSubcategoryLoading } = useSidebar()
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)

  // Memoize the navigation handler to prevent it from changing on every render
  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      router.push(href)

      if (window.innerWidth < 768) {
        // Close mobile menu if needed
        const event = new CustomEvent("closeMobileMenu")
        document.dispatchEvent(event)
      }
    },
    [router],
  )

  // Separate the initial path check from the data fetching
  const initializeExpandedState = useCallback(
    (subcategories: Subcategory[]) => {
      const pathParts = pathname.split("/").filter(Boolean)
      if (pathParts.length > 1) {
        const currentSubcategorySlug = pathParts[1]
        const currentSubcategory = subcategories.find((sub) => sub.slug === currentSubcategorySlug)

        if (currentSubcategory) {
          toggleSubcategory(currentSubcategory.id, currentSubcategorySlug)
        }
      }
    },
    [pathname, toggleSubcategory],
  )

  // Fetch subcategories only once when the component mounts or categorySlug changes
  useEffect(() => {
    if (!categorySlug || fetchAttempted) return

    async function fetchSubcategories() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/subcategories?categorySlug=${encodeURIComponent(categorySlug)}`)

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        setSubcategories(data)

        // Initialize expanded state after fetching data
        initializeExpandedState(data)
      } catch (err) {
        console.error("Error fetching subcategories:", err)
        setError(`Failed to load subcategories: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setIsLoading(false)
        setFetchAttempted(true)
      }
    }

    fetchSubcategories()
  }, [categorySlug, fetchAttempted, initializeExpandedState])

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
    return (
      <div className="text-sm text-red-500 px-2">
        {error}
        <button
          onClick={() => {
            setFetchAttempted(false) // Reset fetch attempted to try again
          }}
          className="block mt-2 text-xs bg-secondary px-2 py-1 rounded hover:bg-secondary/80"
        >
          Retry
        </button>
      </div>
    )
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
        const isLoading = isSubcategoryLoading[subcategory.id] || false

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
              <a
                href={`/${categorySlug}/${subcategory.slug}`}
                onClick={(e) => handleNavigation(e, `/${categorySlug}/${subcategory.slug}`)}
                className={cn(
                  "flex-grow px-2 py-1.5 text-sm rounded-md",
                  isSubcategoryActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
              >
                {subcategory.name}
              </a>
            </div>

            {/* Projects list */}
            {isExpanded && (
              <div className="ml-5 mt-1 space-y-1 border-l border-border pl-2">
                {isLoading ? (
                  <div className="px-2 py-1">
                    <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse mb-1"></div>
                    <div className="h-4 w-1/2 bg-muted/30 rounded animate-pulse"></div>
                  </div>
                ) : projects.length > 0 ? (
                  projects.map((project) => {
                    const isProjectActive = pathname === `/${categorySlug}/${subcategory.slug}/${project.slug}`
                    const projectHref = `/${categorySlug}/${subcategory.slug}/${project.slug}`

                    return (
                      <a
                        key={project.slug}
                        href={projectHref}
                        onClick={(e) => handleNavigation(e, projectHref)}
                        className={cn(
                          "block px-2 py-1 text-xs rounded-md",
                          isProjectActive
                            ? "bg-accent/80 text-accent-foreground"
                            : "hover:bg-accent/30 text-muted-foreground",
                        )}
                      >
                        {project.title}
                      </a>
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
