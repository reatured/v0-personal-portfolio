import Image from "next/image"
import Link from "next/link"

interface ProfessionalAreaCardProps {
  title: string
  slug: string
  description: string
  imageUrl: string
  projectCount?: number
}

export function ProfessionalAreaCard({ title, slug, description, imageUrl, projectCount }: ProfessionalAreaCardProps) {
  return (
    <Link
      href={`/professional-area/${slug}`}
      className="block bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {projectCount !== undefined && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
            {projectCount} {projectCount === 1 ? "project" : "projects"}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </Link>
  )
}
