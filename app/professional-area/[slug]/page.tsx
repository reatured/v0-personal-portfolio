import { notFound } from "next/navigation"
import Link from "next/link"
import { getProjectsByProfessionalArea, getProfessionalAreaBySlug } from "@/lib/db"
import { ProjectCard } from "@/components/project-card"

export default async function ProfessionalAreaPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Get professional area info
  const professionalArea = await getProfessionalAreaBySlug(slug)

  if (!professionalArea) {
    notFound()
  }

  // Get projects for this professional area
  const projects = await getProjectsByProfessionalArea(slug)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="section-title mb-2">{professionalArea.name}</h1>
          <p className="text-lg text-muted-foreground">{professionalArea.description}</p>
        </div>
        <Link
          href="/professional-areas"
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Areas
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid-responsive">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              youtubeId={project.youtubeId}
              imageRatio={project.imageRatio}
              software={project.software}
              href={`/project/${project.slug}?from=professional-area&area=${slug}`}
              size="medium"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">No projects found in this professional area.</p>
        </div>
      )}
    </div>
  )
}
