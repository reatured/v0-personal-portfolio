import { getBreadcrumbsForProject } from "@/lib/db"
import { notFound } from "next/navigation"
import { FlexibleProjectShowcase } from "@/components/flexible-project-showcase"

export default async function DirectProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.slug)

  if (!breadcrumbs) {
    notFound()
  }

  return <FlexibleProjectShowcase projectSlug={params.slug} />
}
