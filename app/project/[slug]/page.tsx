import { getBreadcrumbsForProject } from "@/lib/db"
import { notFound } from "next/navigation"
import { FlexibleProjectShowcase } from "@/components/flexible-project-showcase"
import { BackNavigation } from "@/components/back-navigation"

export default async function DirectProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const breadcrumbs = await getBreadcrumbsForProject(params.slug)

  if (!breadcrumbs) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="flex justify-end mb-6">
        <BackNavigation />
      </div>
      <FlexibleProjectShowcase projectSlug={params.slug} />
    </div>
  )
}
