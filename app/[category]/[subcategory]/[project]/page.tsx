import { getBreadcrumbsForProject } from "@/lib/db"
import { getProjectMarkdown } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ProjectPage({
  params,
}: {
  params: { category: string; subcategory: string; project: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.project)

  if (!breadcrumbs) {
    notFound()
  }

  const { project, category, subcategory } = breadcrumbs

  // Try to get content from file system first
  const { exists, frontmatter, content } = await getProjectMarkdown(category.slug, subcategory.slug, params.project)

  // Use file content if it exists, otherwise use database content
  const projectContent = exists ? content : project.content
  const projectTitle = exists && frontmatter?.title ? frontmatter.title : project.title
  const projectImageUrl = exists && frontmatter?.imageUrl ? frontmatter.imageUrl : project.imageUrl
  const projectImageRatio = exists && frontmatter?.imageRatio ? frontmatter.imageRatio : project.imageRatio

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">{projectTitle}</h1>

      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg mb-16">
        <div className="relative w-full h-[700px] mb-4 overflow-hidden rounded-lg">
          <Image
            src={projectImageUrl || "/placeholder.svg"}
            alt={projectTitle}
            fill
            className={`object-cover object-center `}
            priority
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <MarkdownRenderer content={projectContent} />
        </div>
      </div>

      {/* Related Projects */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* We'll fetch related projects here */}
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg border border-border overflow-hidden group"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-muted/30 animate-pulse"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Related Project</h3>
                  <p className="text-muted-foreground line-clamp-2">Loading related project...</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
