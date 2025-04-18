import type React from "react"

interface ImageGrid2ColumnProps {
  children: React.ReactNode
  className?: string
}

export function ImageGrid2Column({ children, className = "" }: ImageGrid2ColumnProps) {
  return <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 rounded-md ${className}`}>{children}</div>
}
