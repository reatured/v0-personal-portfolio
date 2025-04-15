"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, User, FileText, Mail } from "lucide-react"
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
          "w-full md:w-72 border-r border-border bg-card flex-shrink-0 h-screen overflow-y-auto fixed md:sticky top-0 z-40 transition-all duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 pt-16 md:pt-6 flex flex-col h-full">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8">
            Lingyi Zhou
          </Link>

          {/* Projects Navigation */}
          <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2 px-2">Projects</div>
          <nav className="space-y-1 overflow-y-auto flex-grow">
            {categories.map((category) => {
              const isCategoryActive = pathname.startsWith(`/${category.slug}`)

              return (
                <div key={category.slug} className="space-y-1 mb-3">
                  {/* Category link */}
                  <Link
                    href={`/${category.slug}`}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-2 text-sm rounded-md",
                      isCategoryActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                    )}
                    onClick={() => handleNavClick(category.name)}
                  >
                    {category.name}
                  </Link>

                  {/* Subcategories with projects */}
                  <div className="ml-2 space-y-1">
                    <SubcategoryList categorySlug={category.slug} />
                  </div>
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
                onClick={() => handleNavClick("latest")}
              >
                <span className="flex-grow">Latest</span>
              </Link>
            </div>
          </nav>

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
