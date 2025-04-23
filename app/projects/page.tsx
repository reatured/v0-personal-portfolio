import Link from "next/link"
import { getAllProjects } from "@/lib/db"
import { ProjectCard } from "@/components/project-card"

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  // Split into featured and regular projects
  const featuredProject = projects[0]
  const regularProjects = projects.slice(1)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="section-title">All Projects</h1>
        <Link
          href="/"
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
          Back to Home
        </Link>
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <div className="mb-8">
          <ProjectCard
            title={featuredProject.title}
            description={featuredProject.description}
            imageUrl={featuredProject.imageUrl}
            youtubeId={featuredProject.youtubeId}
            imageRatio={featuredProject.imageRatio}
            software={featuredProject.software}
            href={`/project/${featuredProject.slug}?from=projects`}
            size="featured"
            layout="horizontal"
            autoplay={false}
          />
        </div>
      )}

      <div className="grid-responsive">
        {regularProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            youtubeId={project.youtubeId}
            imageRatio={project.imageRatio}
            software={project.software}
            href={`/project/${project.slug}?from=projects`}
            size="medium"
          />
        ))}
      </div>
    </div>
  )
}
