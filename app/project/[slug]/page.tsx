import { FlexibleProjectShowcase } from "@/components/flexible-project-showcase"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <FlexibleProjectShowcase projectSlug={params.slug} />
}
