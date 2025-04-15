"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Subcategory } from "@/lib/db"

interface SubcategoryListProps {
  categorySlug: string
}

export function SubcategoryList({ categorySlug }: SubcategoryListProps) {
  const pathname = usePathname()
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
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
      } catch (err) {
        console.error("Error fetching subcategories:", err)
        setError("Failed to load subcategories")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubcategories()
  }, [categorySlug])

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

        return (
          <Link
            key={subcategory.slug}
            href={`/${categorySlug}/${subcategory.slug}`}
            className={cn(
              "block px-2 py-1.5 text-sm rounded-md",
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
        )
      })}
    </>
  )
}
