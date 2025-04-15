import type React from "react"
import { getCategoryBySlug, getSubcategoriesByCategory } from "@/lib/db"
import { notFound } from "next/navigation"
import { TabGroup } from "@/components/tab-group"

export default async function SubcategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { category: string; subcategory: string }
}) {
  const category = await getCategoryBySlug(params.category)
  if (!category) {
    notFound()
  }

  // Get all subcategories for this category for the TabGroup
  const subcategories = await getSubcategoriesByCategory(params.category)

  // Format subcategories for TabGroup
  const tabItems = subcategories.map((sub) => ({
    name: sub.name,
    slug: sub.slug,
    href: `/${params.category}/${sub.slug}`,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-xl font-bold mb-4">{category.name}</h1>
        <div className="mt-2">
          <TabGroup items={tabItems} label={`${category.name} subcategories`} />
        </div>
      </div>

      {children}
    </div>
  )
}
