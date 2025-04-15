import { getBreadcrumbsForProject } from "@/lib/db"
import { notFound } from "next/navigation"
import { FlexibleProjectShowcase } from "@/components/flexible-project-showcase"

export default async function ProjectPage({
  params,
}: {
  params: { category: string; subcategory: string; project: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.project)

  if (!breadcrumbs) {
    notFound()
  }

  return <FlexibleProjectShowcase projectSlug={params.project} />
}
