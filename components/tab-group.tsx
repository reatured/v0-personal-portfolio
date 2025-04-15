"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

interface TabItem {
  name: string
  slug: string
  href: string
}

interface TabGroupProps {
  items: TabItem[]
  label: string
}

export function TabGroup({ items, label }: TabGroupProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0)
  const tabsRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (!tabsRef.current) return

    const container = tabsRef.current
    const scrollAmount = container.clientWidth * 0.75

    if (direction === "left") {
      setScrollPosition(Math.max(scrollPosition - scrollAmount, 0))
    } else {
      setScrollPosition(Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth))
    }
  }

  useEffect(() => {
    if (tabsRef.current) {
      tabsRef.current.scrollLeft = scrollPosition
    }
  }, [scrollPosition])

  // Find the active tab
  const activeTab = items.find((item) => pathname === item.href)

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <button
          onClick={() => handleScroll("left")}
          className="flex-shrink-0 p-1 rounded-full bg-background border border-border hover:bg-accent mr-2"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          ref={tabsRef}
          className="flex-1 overflow-x-auto scrollbar-hide flex items-center space-x-2 py-1"
          aria-label={label}
        >
          {items.map((item) => {
            const isActive = pathname === item.href

            return (
              <a
                key={item.slug}
                href={item.href}
                onClick={(e) => handleTabClick(e, item.href)}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 text-sm rounded-md transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </a>
            )
          })}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="flex-shrink-0 p-1 rounded-full bg-background border border-border hover:bg-accent ml-2"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
