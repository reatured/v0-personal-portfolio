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

      <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-lg">
        <Image
          src={projectImageUrl || "/placeholder.svg"}
          alt={projectTitle}
          fill
          className={`object-cover ${projectImageRatio === "portrait" ? "object-top" : "object-center"}`}
          priority
        />
      </div>

      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={projectContent} />
      </div>
    </>
  )
}
