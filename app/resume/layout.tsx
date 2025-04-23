import type { ReactNode } from "react"
import { Suspense } from "react"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Resume", current: true },
          ]}
        />
      </div>

      <Suspense fallback={<ResumeLoadingState />}>{children}</Suspense>
    </div>
  )
}

function ResumeLoadingState() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-1/4 skeleton"></div>
        <div className="h-10 w-32 skeleton"></div>
      </div>
      <div className="bg-card border border-border rounded-lg p-8 space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-1/3 skeleton mx-auto"></div>
          <div className="h-4 w-1/2 skeleton mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-1/4 skeleton"></div>
          <div className="h-4 w-full skeleton"></div>
          <div className="h-4 w-5/6 skeleton"></div>
        </div>
      </div>
    </div>
  )
}
