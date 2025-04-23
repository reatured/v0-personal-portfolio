"use client"

import React from "react"

import { useRouter, usePathname } from "next/navigation"
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
  const router = useRouter()
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

  // Track navigation clicks and handle client-side navigation
  const handleNavClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, itemName: string) => {
      e.preventDefault()
      trackEvent(EventCategory.NAVIGATION, "click", itemName)

      router.push(href)

      if (window.innerWidth < 768) {
        setIsOpen(false)
      }
    },
    [router],
  )

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
        key="main-sidebar"
        data-sidebar="true"
        className={cn(
          "w-full md:w-72 border-r border-border bg-card bg-opacity-80 backdrop-blur-md flex-shrink-0 h-screen overflow-y-auto fixed md:sticky top-0 z-40 transition-all duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 pt-16 md:pt-6 flex flex-col h-full">
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-xl mb-8"
            onClick={(e) => handleNavClick(e, "/", "home")}
          >
            Lingyi Zhou
          </a>

          {/* Projects Navigation */}
          <div className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2 px-2">Projects</div>
          <nav className="space-y-0.5 overflow-y-auto flex-grow">
            {categories.map((category) => {
              const isCategoryActive = pathname.startsWith(`/${category.slug}`)

              return (
                <div key={category.slug} className="space-y-0.5 mb-2">
                  {/* Category link */}
                  <a
                    href={`/${category.slug}`}
                    onClick={(e) => handleNavClick(e, `/${category.slug}`, category.name)}
                    className={cn(
                      "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md",
                      isCategoryActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                    )}
                  >
                    {category.name}
                  </a>

                  {/* Subcategories with projects */}
                  <div className="ml-2 space-y-0.5">
                    <SubcategoryList categorySlug={category.slug} />
                  </div>
                </div>
              )
            })}

            <div className="mt-1.5">
              <a
                href="/projects"
                onClick={(e) => handleNavClick(e, "/projects", "projects")}
                className={cn(
                  "flex items-center px-2 py-1.5 text-sm rounded-md",
                  pathname === "/projects" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
              >
                <span className="flex-grow">All Projects</span>
              </a>
            </div>
          </nav>

          {/* Personal Pages at bottom */}
          <div className="mt-4 pt-4 border-t border-border space-y-0.5">
            <a
              href="/about"
              onClick={(e) => handleNavClick(e, "/about", "about")}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                pathname === "/about" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              )}
            >
              <User size={16} />
              <span>About Me</span>
            </a>
            <a
              href="/resume"
              onClick={(e) => handleNavClick(e, "/resume", "resume")}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                pathname === "/resume" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              )}
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, "/contact", "contact")}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md",
                pathname === "/contact" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
              )}
            >
              <Mail size={16} />
              <span>Contact Me</span>
            </a>
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
