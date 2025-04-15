"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Category {
  id: number
  name: string
  slug: string
  subcategories: Subcategory[]
}

interface Subcategory {
  id: number
  name: string
  slug: string
  category_id: number
}

interface Project {
  id: number
  title: string
  slug: string
  subcategory_id: number
}

interface SidebarNavProps {
  categories: Category[]
  allProjects: Project[] // Pass all projects from the server
}

export function SidebarNav({ categories, allProjects }: SidebarNavProps) {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [expandedSubcategories, setExpandedSubcategories] = useState<number[]>([])

  // Group projects by subcategory_id for easy access
  const projectsBySubcategory = allProjects.reduce<Record<number, Project[]>>((acc, project) => {
    if (!acc[project.subcategory_id]) {
      acc[project.subcategory_id] = []
    }
    acc[project.subcategory_id].push(project)
    return acc
  }, {})

  // Determine which category and subcategory should be expanded based on the current path
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean)

    if (parts.length > 0) {
      const categorySlug = parts[0]

      // Don't expand for special pages
      if (
        categorySlug === "latest" ||
        categorySlug === "about" ||
        categorySlug === "resume" ||
        categorySlug === "contact"
      ) {
        return
      }

      const category = categories.find((c) => c.slug === categorySlug)

      if (category) {
        setExpandedCategories((prev) => (prev.includes(category.id) ? prev : [...prev, category.id]))

        if (parts.length > 1) {
          const subcategorySlug = parts[1]
          const subcategory = category.subcategories.find((s) => s.slug === subcategorySlug)

          if (subcategory) {
            setExpandedSubcategories((prev) => (prev.includes(subcategory.id) ? prev : [...prev, subcategory.id]))
          }
        }
      }
    }
  }, [pathname, categories])

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleSubcategory = (subcategoryId: number) => {
    setExpandedSubcategories((prev) =>
      prev.includes(subcategoryId) ? prev.filter((id) => id !== subcategoryId) : [...prev, subcategoryId],
    )
  }

  return (
    <div className="space-y-1">
      <div className="py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
        <div className="space-y-1">
          <Link
            href="/"
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            Home
          </Link>

          <Link
            href="/latest"
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/latest" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            Latest
          </Link>

          {categories.map((category) => (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname.startsWith(`/${category.slug}`) ? "text-accent-foreground" : "text-foreground",
                )}
              >
                <span>{category.name}</span>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {expandedCategories.includes(category.id) && (
                <div className="ml-4 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="space-y-1">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleSubcategory(subcategory.id)}
                          className="mr-1 p-1 hover:bg-accent rounded-sm"
                        >
                          {expandedSubcategories.includes(subcategory.id) ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </button>
                        <Link
                          href={`/${category.slug}/${subcategory.slug}`}
                          className={cn(
                            "flex flex-1 items-center py-1 text-sm font-medium hover:underline",
                            pathname === `/${category.slug}/${subcategory.slug}`
                              ? "text-accent-foreground font-semibold"
                              : "text-muted-foreground",
                          )}
                        >
                          {subcategory.name}
                        </Link>
                      </div>

                      {/* Show projects when subcategory is expanded */}
                      {expandedSubcategories.includes(subcategory.id) && (
                        <div className="ml-6 space-y-1 border-l border-border pl-2">
                          {projectsBySubcategory[subcategory.id] && projectsBySubcategory[subcategory.id].length > 0 ? (
                            projectsBySubcategory[subcategory.id].map((project) => (
                              <Link
                                key={project.id}
                                href={`/${category.slug}/${subcategory.slug}/${project.slug}`}
                                className={cn(
                                  "flex items-center py-1 text-xs font-medium hover:underline",
                                  pathname === `/${category.slug}/${subcategory.slug}/${project.slug}`
                                    ? "text-accent-foreground font-semibold"
                                    : "text-muted-foreground",
                                )}
                              >
                                {project.title}
                              </Link>
                            ))
                          ) : (
                            <div className="text-xs text-muted-foreground py-1">No projects</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">About</h2>
        <div className="space-y-1">
          <Link
            href="/about"
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/about" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            About Me
          </Link>
          <Link
            href="/resume"
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/resume" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/contact" ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  )
}
