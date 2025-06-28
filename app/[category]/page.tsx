import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllLocalCategories, getLocalSubcategoriesByCategory } from "@/lib/local-projects"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  try {
    const categorySlug = params.category

    // Get all categories to check if this one exists
    const categories = await getAllLocalCategories()
    const category = categories.find(c => c.slug === categorySlug)

    if (!category) {
      notFound()
    }

    // Get subcategories for this category
    const subcategories = await getLocalSubcategoriesByCategory(categorySlug)

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors mb-4"
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
            Back to Home
          </Link>

          <div>
            <h1 className="text-3xl font-bold mt-6">{category.name}</h1>
            <p className="text-lg mt-4">{category.description}</p>

            {subcategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/${categorySlug}/${subcategory.slug}`}
                    className="block bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      {subcategory.imageUrl ? (
                        <Image
                          src={subcategory.imageUrl}
                          alt={subcategory.name}
                          fill
                          className={`object-cover transition-transform group-hover:scale-105 ${
                            subcategory.imageRatio === "portrait" ? "object-top" : "object-center"
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                          <span className="text-muted-foreground">{subcategory.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{subcategory.name}</h3>
                      <p className="text-muted-foreground line-clamp-2">{subcategory.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">No subcategories found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in category page:", error)
    notFound()
  }
}
