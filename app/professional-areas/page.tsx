import { getAllProfessionalAreas } from "@/lib/db"
import { ProjectCard } from "@/components/project-card"

export default async function ProfessionalAreasPage() {
  const professionalAreas = await getAllProfessionalAreas()

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="section-title">Professional Areas</h1>
      <p className="text-xl mb-8">Browse projects by professional expertise</p>

      <div className="grid-responsive">
        {professionalAreas.map((area) => (
          <ProjectCard
            key={area.slug}
            title={area.name}
            description={area.description}
            imageUrl={area.imageUrl}
            href={`/professional-area/${area.slug}`}
            size="medium"
            badgeText={`${area.projectCount} ${area.projectCount === 1 ? "project" : "projects"}`}
          />
        ))}
      </div>
    </div>
  )
}
