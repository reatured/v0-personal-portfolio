import { getLatestProjects } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { FeaturedProject } from "@/components/featured-project"
import { neon } from "@neondatabase/serverless"

async function getProjectWithDetails(projectId: number) {
  const sql = neon(process.env.DATABASE_URL!)

  const [project] = await sql`
    SELECT 
      p.id, 
      p.title, 
      p.slug, 
      p.content, 
      p.image_url as "imageUrl", 
      p.software,
      p.image_ratio as "imageRatio",
      s.id as "subcategory_id",
      s.name as "subcategory_name",
      s.slug as "subcategory_slug",
      c.slug as "category_slug"
    FROM 
      projects p
    JOIN 
      subcategories s ON p.subcategory_id = s.id
    JOIN 
      categories c ON s.category_id = c.id
    WHERE 
      p.id = ${projectId}
  `

  return project
}

export default async function LatestPage() {
  // Get the latest projects
  const initialLatestProjects = await getLatestProjects(9)

  // Get the Ugly Face AR Filters project with full details
  const uglyFaceProject = await getProjectWithDetails(20)

  // Add the Ugly Face AR Filters project to the beginning of the array
  const latestProjects = [uglyFaceProject, ...initialLatestProjects]

  // Split into featured and regular projects
  const featuredProject = latestProjects[0]
  const regularProjects = latestProjects.slice(1)

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Latest Projects</h1>
      <p className="text-xl mb-8">A collection of my most recent work and updates</p>

      {/* Featured Project */}
      {featuredProject && (
        <div className="mb-12">
          <FeaturedProject project={featuredProject} />
        </div>
      )}

      {/* Regular Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularProjects.map((project) => {
          // Get the first paragraph of content for the description
          const description = project.content
            .split("\n")
            .slice(1, 3)
            .join(" ")
            .replace(/^#+\s+|^\*\*|\*\*$|^-\s+/gm, "")
            .trim()

          return (
            <div
              key={project.id}
              className="bg-card rounded-lg border border-border overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full pt-[60%] overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className={`object-cover ${project.imageRatio === "portrait" ? "object-top" : "object-center"}`}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>

                <div className="mt-auto flex items-center justify-between">
                  {project.software && (
                    <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                      {project.software}
                    </div>
                  )}

                  <Link
                    href={`/${project.category_slug}/${project.subcategory_slug}/${project.slug}`}
                    className="text-primary hover:underline ml-auto"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Featured Update Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Latest Updates</h2>
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-xl font-semibold mb-2">Portfolio Redesign</h3>
          <p className="text-muted-foreground mb-4">
            I've recently redesigned my portfolio website with a documentation-style layout and dark theme. The new
            design features improved navigation, markdown support for project descriptions, and a more organized
            structure to showcase my work.
          </p>
          <div className="text-sm text-muted-foreground">Posted on April 14, 2025</div>
        </div>
      </div>
    </div>
  )
}
