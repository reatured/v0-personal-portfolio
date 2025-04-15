import { getCategoryBySlug, getSubcategoryBySlug, getProjectsBySubcategory, getSubcategoriesByCategory } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { TabGroup } from "@/components/tab-group"

export default async function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  const category = await getCategoryBySlug(params.category)
  if (!category) {
    notFound()
  }

  const subcategory = await getSubcategoryBySlug(params.subcategory)
  if (!subcategory) {
    notFound()
  }

  // Get all subcategories for this category for the TabGroup
  const subcategories = await getSubcategoriesByCategory(params.category)

  // Format subcategories for TabGroup
  const tabItems = subcategories.map((sub) => ({
    name: sub.name,
    slug: sub.slug,
    href: `/${params.category}/${sub.slug}`,
  }))

  // Use the helper function to get projects
  const projects = await getProjectsBySubcategory(params.subcategory)

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href={`/${params.category}`} className="text-muted-foreground hover:text-foreground">
          {category.name}
        </Link>

        {/* TabGroup moved above the title */}
        <div className="mb-4 mt-4">
          <TabGroup items={tabItems} label={`${category.name} subcategories`} />
        </div>

        <h1 className="text-3xl font-bold mt-6">{subcategory.name}</h1>

        <p className="text-lg mt-4">{subcategory.description}</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${params.category}/${params.subcategory}/${project.slug}`}
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
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-muted-foreground">{project.content.split("\n")[0].replace("# ", "")}</p>
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
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No projects found in this subcategory yet.</p>
        </div>
      )}
    </div>
  )
}
