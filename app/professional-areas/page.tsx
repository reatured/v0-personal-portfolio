import { ProfessionalAreaCard } from "@/components/professional-area-card"
import { getAllProfessionalAreas } from "@/lib/db"

export default async function ProfessionalAreasPage() {
  const professionalAreas = await getAllProfessionalAreas()

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Professional Areas</h1>
      <p className="text-xl mb-8">Browse projects by professional expertise</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalAreas.map((area) => (
          <ProfessionalAreaCard
            key={area.slug}
            title={area.name}
            slug={area.slug}
            description={area.description}
            imageUrl={area.imageUrl}
            projectCount={area.projectCount}
          />
        ))}
      </div>
    </div>
  )
}
