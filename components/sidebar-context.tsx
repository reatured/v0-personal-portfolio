"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Project } from "@/lib/db"

type SidebarContextType = {
  expandedSubcategories: Record<number, boolean>
  subcategoryProjects: Record<number, Project[]>
  toggleSubcategory: (subcategoryId: number, subcategorySlug: string) => void
  isSubcategoryLoading: Record<number, boolean>
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<number, boolean>>({})
  const [subcategoryProjects, setSubcategoryProjects] = useState<Record<number, Project[]>>({})
  const [isSubcategoryLoading, setIsSubcategoryLoading] = useState<Record<number, boolean>>({})
  const [fetchingSubcategories, setFetchingSubcategories] = useState<Record<number, boolean>>({})

  const toggleSubcategory = useCallback(
    async (subcategoryId: number, subcategorySlug: string) => {
      const newExpandedState = !expandedSubcategories[subcategoryId]

      setExpandedSubcategories((prev) => ({
        ...prev,
        [subcategoryId]: newExpandedState,
      }))

      // Fetch projects if expanding and we don't have them yet
      // Also check if we're already fetching to prevent duplicate requests
      if (newExpandedState && !subcategoryProjects[subcategoryId] && !fetchingSubcategories[subcategoryId]) {
        try {
          // Mark as fetching to prevent duplicate requests
          setFetchingSubcategories((prev) => ({
            ...prev,
            [subcategoryId]: true,
          }))

          setIsSubcategoryLoading((prev) => ({
            ...prev,
            [subcategoryId]: true,
          }))

          const response = await fetch(`/api/projects?subcategorySlug=${encodeURIComponent(subcategorySlug)}`)

          if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`)
          }

          const projects = await response.json()

          setSubcategoryProjects((prev) => ({
            ...prev,
            [subcategoryId]: projects,
          }))
        } catch (err) {
          console.error("Error fetching projects:", err)
        } finally {
          setIsSubcategoryLoading((prev) => ({
            ...prev,
            [subcategoryId]: false,
          }))

          // Mark as no longer fetching
          setFetchingSubcategories((prev) => ({
            ...prev,
            [subcategoryId]: false,
          }))
        }
      }
    },
    [expandedSubcategories, subcategoryProjects, fetchingSubcategories],
  )

  return (
    <SidebarContext.Provider
      value={{
        expandedSubcategories,
        subcategoryProjects,
        toggleSubcategory,
        isSubcategoryLoading,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
