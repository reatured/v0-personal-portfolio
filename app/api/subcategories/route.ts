import { getSubcategoriesByCategory } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get("categorySlug")

  if (!categorySlug) {
    return NextResponse.json({ error: "Category slug is required" }, { status: 400 })
  }

  try {
    const subcategories = await getSubcategoriesByCategory(categorySlug)

    // Ensure we're returning a proper JSON response
    return NextResponse.json(subcategories)
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    // Return a proper error response
    return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 })
  }
}
