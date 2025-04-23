import type { ReactNode } from "react"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", current: true },
          ]}
        />
      </div>

      {children}
    </div>
  )
}
