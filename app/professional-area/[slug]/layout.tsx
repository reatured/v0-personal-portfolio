import type { ReactNode } from "react"
import Link from "next/link"

export default function ProfessionalAreaLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/professional-areas" className="hover:text-foreground">
            Professional Areas
          </Link>
          <span>/</span>
          <span className="text-foreground">Current Area</span>
        </div>
      </div>

      {children}
    </div>
  )
}
