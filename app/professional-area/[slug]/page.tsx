import Link from "next/link"
import { getAllLocalProjects } from "@/lib/local-projects"
import { ProjectCard } from "@/components/project-card"

export default async function ProfessionalAreaPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Get all projects and filter by professional area
  const allProjects = await getAllLocalProjects()
  
  // Map professional areas to category slugs
  const areaToCategoryMap: Record<string, string[]> = {
    '3d-design': ['3DDesign'],
    'game-design': ['InteractiveDevelopment'],
    'full-stack-development': ['fullstack-development'],
    'technical-artist': ['2DDesign', '3DDesign'], // Shader projects are in CreativeCoding and Blender
  }

  const categorySlugs = areaToCategoryMap[slug] || []
  const projects = allProjects.filter(project => categorySlugs.includes(project.categorySlug))

  // Get professional area info
  const areaInfo = {
    '3d-design': {
      name: '3D Design',
      description: 'Explore 3D modeling, animation, and visualization projects created with various tools including Blender, Cinema4D, and Maya.'
    },
    'game-design': {
      name: 'Game Design',
      description: 'Interactive game development projects featuring puzzle mechanics, procedural tools, and narrative-driven experiences.'
    },
    'full-stack-development': {
      name: 'Full Stack Development',
      description: 'Web applications built with modern technologies like Next.js, React, and various backend solutions.'
    },
    'technical-artist': {
      name: 'Technical Artist',
      description: 'Custom shader development for real-time graphics applications, featuring advanced techniques for visual effects.'
    }
  }

  const currentArea = areaInfo[slug as keyof typeof areaInfo]

  if (!currentArea) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Professional Area Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="section-title">{currentArea.name}</h1>
          <p className="text-muted-foreground mt-2">{currentArea.description}</p>
        </div>
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
