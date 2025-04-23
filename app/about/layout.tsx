import type { ReactNode } from "react"
import { Suspense } from "react"
import { Breadcrumb } from "@/components/breadcrumb"

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About", current: true },
          ]}
        />
      </div>

      <Suspense fallback={<AboutLoadingState />}>{children}</Suspense>
    </div>
  )
}

function AboutLoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-1/3 skeleton"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="h-64 w-full skeleton mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full skeleton"></div>
            <div className="h-4 w-3/4 skeleton"></div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="h-6 w-1/4 skeleton"></div>
            <div className="h-4 w-full skeleton"></div>
            <div className="h-4 w-full skeleton"></div>
            <div className="h-4 w-3/4 skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
