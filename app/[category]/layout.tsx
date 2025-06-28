import { getAllLocalCategories } from "@/lib/local-projects"
import { notFound } from "next/navigation"

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { category: string }
}) {
  const categorySlug = params.category

  // Get all categories to check if this one exists
  const categories = await getAllLocalCategories()
  const category = categories.find(c => c.slug === categorySlug)

  if (!category) {
    notFound()
  }

  return <>{children}</>
}
