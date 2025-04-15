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
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
