import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProjectsByProfessionalArea, getProfessionalAreaBySlug } from "@/lib/db"
import { YouTubeEmbed } from "@/components/youtube-embed"

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
          <h1 className="text-3xl font-bold mb-2">{professionalArea.name}</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const hasYouTubeVideo =
              project.youtubeId !== undefined && project.youtubeId !== null && project.youtubeId !== ""

            return (
              <Link
                key={project.id}
                href={`/project/${project.slug}?from=professional-area&area=${slug}`}
                className="block bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors overflow-hidden group"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  {hasYouTubeVideo ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <YouTubeEmbed
                        videoId={project.youtubeId as string}
                        title={project.title}
                        className="absolute top-0 left-0 h-full w-full pt-0"
                        autoplay={false}
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
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1.5">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  {project.software && (
                    <div className="mt-3 inline-block px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
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
          <p className="text-lg text-muted-foreground">No projects found in this professional area.</p>
        </div>
      )}
    </div>
  )
}
