"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

interface SubcategoryListProps {
  categorySlug: string
}

export function SubcategoryList({ categorySlug }: SubcategoryListProps) {
  const pathname = usePathname()
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({})
  const [projects, setProjects] = useState<{ [key: number]: any[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const response = await fetch(`/api/subcategories?categorySlug=${categorySlug}`)
        if (response.ok) {
          const data = await response.json()
          setSubcategories(data)
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubcategories()
  }, [categorySlug])

  // Determine which subcategory should be expanded based on the current path
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean)

    if (parts.length > 1 && parts[0] === categorySlug) {
      const subcategorySlug = parts[1]
      const subcategory = subcategories.find((s) => s.slug === subcategorySlug)

      if (subcategory) {
        setExpandedSubcategories((prev) => ({
          ...prev,
          [subcategory.id]: true,
        }))

        // Fetch projects for this subcategory
        fetchProjects(subcategory.id)
      }
    }
  }, [pathname, categorySlug, subcategories])

  const fetchProjects = async (subcategoryId: number) => {
    if (projects[subcategoryId]) return // Already fetched

    try {
      const response = await fetch(`/api/projects?subcategoryId=${subcategoryId}`)
      if (response.ok) {
        const data = await response.json()
        setProjects((prev) => ({
          ...prev,
          [subcategoryId]: data,
        }))
      }
    } catch (error) {
      console.error(`Error fetching projects for subcategory ${subcategoryId}:`, error)
    }
  }

  const toggleSubcategory = (subcategoryId: number) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }))

    // Fetch projects if expanding and not already loaded
    if (!expandedSubcategories[subcategoryId] && !projects[subcategoryId]) {
      fetchProjects(subcategoryId)
    }
  }

  if (loading) {
    return <div className="text-sm text-muted-foreground py-2">Loading...</div>
  }

  if (subcategories.length === 0) {
    return <div className="text-sm text-muted-foreground py-2">No subcategories found</div>
  }

  return (
    <div className="space-y-1">
      {subcategories.map((subcategory) => {
        const isExpanded = expandedSubcategories[subcategory.id]
        const isActive = pathname === `/${categorySlug}/${subcategory.slug}`

        return (
          <div key={subcategory.id} className="space-y-1">
            <div className="flex items-center">
              <button onClick={() => toggleSubcategory(subcategory.id)} className="mr-1 p-1 hover:bg-accent rounded-sm">
                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>
              <Link
                href={`/${categorySlug}/${subcategory.slug}`}
                className={cn(
                  "flex flex-1 items-center py-1 text-sm hover:underline",
                  isActive ? "text-accent-foreground font-semibold" : "text-muted-foreground",
                )}
              >
                {subcategory.name}
              </Link>
            </div>

            {/* Show projects when subcategory is expanded */}
            {isExpanded && (
              <div className="ml-6 space-y-1 border-l border-border pl-2">
                {projects[subcategory.id] ? (
                  projects[subcategory.id].length > 0 ? (
                    projects[subcategory.id].map((project) => (
                      <Link
                        key={project.id}
                        href={`/${categorySlug}/${subcategory.slug}/${project.slug}`}
                        className={cn(
                          "flex items-center py-1 text-xs font-medium hover:underline",
                          pathname === `/${categorySlug}/${subcategory.slug}/${project.slug}`
                            ? "text-accent-foreground font-semibold"
                            : "text-muted-foreground",
                        )}
                      >
                        {project.title}
                      </Link>
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground py-1">No projects</div>
                  )
                ) : (
                  <div className="text-xs text-muted-foreground py-1">Loading projects...</div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
