import { NextRequest, NextResponse } from "next/server"
import { getLocalSubcategoriesByCategory } from "@/lib/local-projects"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("categorySlug")

  if (!categorySlug) {
    return NextResponse.json({ error: "Category slug is required" }, { status: 400 })
  }

  try {
    const subcategories = await getLocalSubcategoriesByCategory(categorySlug)
    return NextResponse.json(subcategories)
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 })
  }
}
