import type { ReactNode } from "react"
import { Suspense } from "react"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", current: true },
          ]}
        />
      </div>

      <Suspense fallback={<ContactLoadingState />}>{children}</Suspense>
    </div>
  )
}

function ContactLoadingState() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-1/3 skeleton"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="h-6 w-1/2 skeleton mb-6"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="icon-container"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 skeleton"></div>
                    <div className="h-4 w-32 skeleton"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="h-6 w-1/2 skeleton mb-6"></div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 skeleton"></div>
                    <div className="h-10 w-full skeleton"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 skeleton"></div>
                <div className="h-10 w-full skeleton"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-20 skeleton"></div>
                <div className="h-32 w-full skeleton"></div>
              </div>
              <div className="h-10 w-full skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
