"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, Menu, X, User, FileText, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { SubcategoryList } from "./subcategory-list"
import type { Category } from "@/lib/db"
import { trackEvent, EventCategory } from "@/lib/analytics"

interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // Initialize expanded categories based on current path
  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean)
    if (pathParts.length > 0) {
      const categorySlug = pathParts[0]
      setExpandedCategories((prev) => ({
        ...prev,
        [categorySlug]: true,
      }))
    }
  }, [pathname])

  // Close mobile menu when clicking anywhere on the page
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Only apply this behavior on mobile
      if (window.innerWidth < 768 && isOpen) {
        // Check if the click is outside the sidebar
        const sidebar = document.querySelector('[data-sidebar="true"]')
        const menuButton = document.querySelector('[data-menu-button="true"]')

        if (sidebar && menuButton && !sidebar.contains(e.target as Node) && !menuButton.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
    }

    const handleCloseMobileMenu = () => {
      setIsOpen(false)
    }

    document.addEventListener("click", handleDocumentClick)
    document.addEventListener("closeMobileMenu", handleCloseMobileMenu)

    return () => {
      document.removeEventListener("click", handleDocumentClick)
      document.removeEventListener("closeMobileMenu", handleCloseMobileMenu)
    }
  }, [isOpen])

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }))
  }

  // Track navigation clicks
  const handleNavClick = (itemName: string) => {
    trackEvent(EventCategory.NAVIGATION, "click", itemName)

    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-secondary rounded-md p-2"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        data-menu-button="true"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        data-sidebar="true"
        className={cn(
          "w-full md:w-64 border-r border-border bg-card flex-shrink-0 h-screen overflow-y-auto fixed md:sticky top-0 z-40 transition-all duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 pt-16 md:pt-6 flex flex-col h-full">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8">
            Lingyi Zhou
          </Link>

          {/* Projects Navigation */}
          <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2 px-2">Projects</div>
          <nav className="space-y-1">
            {categories.map((category) => {
              const isExpanded = expandedCategories[category.slug]
              const isCategoryActive = pathname.startsWith(`/${category.slug}`)

              return (
                <div key={category.slug} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(category.slug)}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md",
                      isCategoryActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                    )}
                  >
                    <Link
                      href={`/${category.slug}`}
                      className="flex-grow text-left"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (window.innerWidth < 768) {
                          setIsOpen(false)
                        }
                      }}
                    >
                      {category.name}
                    </Link>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>

                  {isExpanded && (
                    <div className="ml-4 space-y-1 border-l border-border pl-2">
                      <SubcategoryList categorySlug={category.slug} />
                    </div>
                  )}
                </div>
              )
            })}

            <div className="mt-2">
              <Link
                href="/latest"
                className={cn(
                  "flex items-center px-2 py-2 text-sm rounded-md",
                  pathname === "/latest" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false)
                  }
                }}
              >
                <span className="flex-grow">Latest</span>
              </Link>
            </div>
          </nav>

          {/* Spacer to push personal links to bottom */}
          <div className="flex-grow"></div>

          {/* Personal Pages at bottom */}
          <div className="mt-6 pt-6 border-t border-border space-y-1">
            <Link
              href="/about"
              className={cn(
                "flex items-center gap-2 px-2 py-2 text-sm rounded-md",
                pathname === "/about" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              )}
              onClick={() => handleNavClick("about")}
            >
              <User size={16} />
              <span>About Me</span>
            </Link>
            <Link
              href="/resume"
              className={cn(
                "flex items-center gap-2 px-2 py-2 text-sm rounded-md",
                pathname === "/resume" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              )}
              onClick={() => handleNavClick("resume")}
            >
              <FileText size={16} />
              <span>Resume</span>
            </Link>
            <Link
              href="/contact"
              className={cn(
                "flex items-center gap-2 px-2 py-2 text-sm rounded-md",
                pathname === "/contact" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              )}
              onClick={() => handleNavClick("contact")}
            >
              <Mail size={16} />
              <span>Contact Me</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
