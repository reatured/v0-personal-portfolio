import type React from "react"
import { getCategoryBySlug, getSubcategoriesByCategory } from "@/lib/db"
import { notFound } from "next/navigation"
import { TabGroup } from "@/components/tab-group"
import Link from "next/link"

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
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href={`/${params.category}`} className="text-muted-foreground hover:text-foreground">
          {category.name}
        </Link>

        {/* TabGroup moved above the title */}
        <div className="mb-4 mt-4">
          <TabGroup items={tabItems} label={`${category.name} subcategories`} />
        </div>
      </div>

      {children}
    </div>
  )
}
