import { getProjectsBySubcategory } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subcategorySlug = searchParams.get("subcategorySlug")

  if (!subcategorySlug) {
    return NextResponse.json({ error: "Subcategory slug is required" }, { status: 400 })
  }

  try {
    const projects = await getProjectsBySubcategory(subcategorySlug)

    // Ensure we're returning a proper JSON response
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    // Return a proper error response
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
