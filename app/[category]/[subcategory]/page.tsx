import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getLocalProjectsBySubcategory, getLocalSubcategoriesByCategory } from "@/lib/local-projects"
import { YouTubeEmbed } from "@/components/youtube-embed"

export default async function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  try {
    const { category, subcategory } = params

    // Get subcategories for the category
    const subcategories = await getLocalSubcategoriesByCategory(category)
    const currentSubcategory = subcategories.find(s => s.slug === subcategory)

    if (!currentSubcategory) {
      notFound()
    }

    // Get projects for the subcategory
    const projects = await getLocalProjectsBySubcategory(category, subcategory)

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href={`/${category}`}
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
            Back to {category}
          </Link>

          <div>
            <h1 className="text-3xl font-bold mt-6">{currentSubcategory.name}</h1>

            <p className="text-lg mt-4">{currentSubcategory.description}</p>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {projects.map((project) => {
                  // Check if project has a YouTube video ID
                  const hasYouTubeVideo = project.youtubeId !== undefined && project.youtubeId !== null && project.youtubeId !== ""

                  return (
                    <Link
                      key={project.id}
                      href={`/${category}/${subcategory}/${project.slug}`}
                      className="block bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
                    >
                      <div className="relative w-full h-48 overflow-hidden">
                        {hasYouTubeVideo ? (
                          <div className="absolute inset-0 overflow-hidden">
                            <YouTubeEmbed
                              videoId={project.youtubeId as string}
                              title={project.title}
                              className="absolute top-0 left-0 h-full w-full pt-0"
                              autoplay={true}
                            />
                          </div>
                        ) : (
                          <Image
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className={`object-cover transition-transform group-hover:scale-105 ${
                              project.imageRatio === "portrait" ? "object-top" : "object-center"
                            }`}
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                        {project.software && (
                          <div className="mt-4 inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                            {project.software}
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">No projects found in this subcategory.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in subcategory page:", error)
    notFound()
  }
}
