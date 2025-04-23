interface SkeletonProps {
  width?: string
  height?: string
  className?: string
}

export function Skeleton({ width = "100%", height = "1rem", className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={{ width, height }}></div>
}

interface ProjectCardSkeletonProps {
  count?: number
  columns?: number
}

export function ProjectCardSkeleton({ count = 3, columns = 3 }: ProjectCardSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="card-base">
          <div className="h-48 skeleton"></div>
          <div className="p-6 space-y-3">
            <div className="h-6 w-3/4 skeleton"></div>
            <div className="h-4 w-full skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-3/4 skeleton"></div>
      <div className="card-base mb-16">
        <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg skeleton"></div>
        <div className="space-y-2">
          <div className="h-4 w-full skeleton"></div>
          <div className="h-4 w-5/6 skeleton"></div>
          <div className="h-4 w-4/6 skeleton"></div>
        </div>
      </div>

      <div className="mt-16">
        <div className="h-8 w-1/4 skeleton mb-6"></div>
        <ProjectCardSkeleton />
      </div>
    </div>
  )
}
