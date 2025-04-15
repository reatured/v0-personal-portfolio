import { getCategoryBySlug, getSubcategoriesByCategory, getTopProjectsBySubcategory } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await getCategoryBySlug(params.category)

  if (!category) {
    notFound()
  }

  // Use the helper function to get subcategories
  const subcategories = await getSubcategoriesByCategory(params.category)

  // Fetch top projects for each subcategory
  const subcategoriesWithProjects = await Promise.all(
    subcategories.map(async (subcategory) => {
      const projects = await getTopProjectsBySubcategory(subcategory.id, 3)
      return { ...subcategory, projects }
    }),
  )

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <p className="text-xl mb-12">{category.description}</p>

      <div className="space-y-16">
        {subcategoriesWithProjects.map((subcategory) => (
          <section key={subcategory.slug} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{subcategory.name}</h2>
              <Link href={`/${params.category}/${subcategory.slug}`} className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>

            <p className="text-muted-foreground">{subcategory.description}</p>

            {subcategory.projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategory.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/${params.category}/${subcategory.slug}/${project.slug}`}
                    className="block bg-card rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${
                          project.imageRatio === "portrait" ? "object-top" : "object-center"
                        }`}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {project.content.split("\n")[0].replace("# ", "")}
                      </p>
                      {project.software && (
                        <div className="mt-4 inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {project.software}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No projects found in this subcategory yet.</p>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
